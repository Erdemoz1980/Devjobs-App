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
    logo:{type:GraphQLString},
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
})

//Queries
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    jobs: {
      type: new GraphQLList(JobType),
      resolve(parent, args) {
        return Job.find();
      }
    },
    job: {
      type: JobType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Job.findById(args.id)
      }
    },
    searchJobs: {
      type: new GraphQLList(JobType),
      args: { searchTerm: { type: GraphQLString } },
      resolve(parent, args) {
        const regexPattern = new RegExp(args.searchTerm, 'i');
        const fieldsToSearch = Object.keys(Job.schema.paths);
        const searchConditions = fieldsToSearch.map(field => ({
          [field]: { $regex: regexPattern }
        }));
        return Job.find({$or:searchConditions});

      }
    }
  }
});

module.exports = new GraphQLSchema({
query:RootQuery  
})