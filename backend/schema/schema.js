const { Job } = require('../models/models');
const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema
} = require('graphql');


//Types
//Common Type
const CommonType = new GraphQLObjectType({
  name: 'Requirements',
  fields: () => ({
    content: { type: GraphQLString },
    items: { type: new GraphQLList(GraphQLString) }
  })
});

//Job Type
const JobType = new GraphQLObjectType({
  name: 'Job',
  fields: () => ({
    id: { type: GraphQLID },
    company: { type: GraphQLString },
    logo: { type: GraphQLString },
    logoBackground: { type: GraphQLString },
    position: { type: GraphQLString },
    postedAt: { type: GraphQLString },
    contract: { type: GraphQLString },
    location: { type: GraphQLString },
    website: { type: GraphQLString },
    apply: { type: GraphQLString },
    description: { type: GraphQLString },
    requirements: { type: CommonType },
    role: { type: CommonType }
  })
});

//Queries
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    job: {
      type: JobType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Job.findById(args.id)
      }
    },
    jobs: {
      type: new GraphQLList(JobType),
      args: {
        searchTerm: { type: GraphQLString },
        location: { type: GraphQLString },
        contract: { type: GraphQLString }
      },
      resolve(parent, args) {
        if (!args.searchTerm || args.searchTerm.trim() === '') {
          return Job.find()
        };
        const queryRegex = new RegExp(args.searchTerm, 'i');
        const searchFields = Object.keys(Job.schema.paths).filter(field=>field!=='_id' && field!=='__v')
        
        const searchTerms = searchFields.map(field => {
          if (field === 'requirements' || field === 'role') {
            return [
              { [`${field}.content`]: { $regex: queryRegex }  },
              { [`${field}.items`]:  {$regex: queryRegex } }
            ]
          };

          return { [field]: { $regex: queryRegex } }

        });

        const flattenedSearchTerms = [].concat(...searchTerms)
        return Job.find({ $or: flattenedSearchTerms });
      
      }
    }
  }
});

module.exports = new GraphQLSchema({
query:RootQuery  
})