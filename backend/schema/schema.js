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
        let query = {};
    
        if (args.searchTerm && args.searchTerm.trim() !== '') {
          const queryRegex = new RegExp(args.searchTerm, 'i');
          const searchFields = Object.keys(Job.schema.paths).filter(field => field !== '_id' && field !== '__v');
    
          const searchTerms = searchFields.map(field => {
            if (field === 'requirements' || field === 'role') {
              return [
                { [`${field}.content`]: { $regex: queryRegex } },
                { [`${field}.items`]: { $regex: queryRegex } }
              ];
            }
    
            return { [field]: { $regex: queryRegex } };
          });
    
          const flattenedSearchTerms = [].concat(...searchTerms);
          query.$or = flattenedSearchTerms;
        }
    
        // New logic for location and contract
        if (args.location && args.location.trim() !== '') {
          query.location = { $regex: new RegExp(args.location, 'i') };
         
        }
    
        if (args.contract && args.contract.trim() !== '') {
          query.contract = { $regex: new RegExp(args.contract, 'i') };
        }
        
        console.log(args.location)
        return Job.find(query);
      }
    }
    
  }
});

module.exports = new GraphQLSchema({
query:RootQuery  
})