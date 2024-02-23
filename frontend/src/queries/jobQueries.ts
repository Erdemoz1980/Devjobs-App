import { gql } from '@apollo/client';

const GET_JOB_DETAILS = gql`
query getJobDetails ($id:ID!){
  job(id:$id){
    id
    company
    logoBackground
    position
    postedAt
    contract
    location
    website
    description
    requirements {
      content
      items
    }
    role{
      content
      items
    }
  }
}
`;

const SEARCH_JOBS = gql`
query searchJobs($searchTerm: String){
  jobs(searchTerm:$searchTerm){
    id
    company
    logo
    logoBackground
    position
    postedAt
    contract
    location
    website
    apply

  }
}
`;

export { GET_JOB_DETAILS, SEARCH_JOBS };