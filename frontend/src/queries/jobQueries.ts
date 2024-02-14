import { gql } from '@apollo/client';

const GET_JOBS = gql`
query getJobs{
  jobs{
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

const GET_JOB_DETAIL = gql`
query getJobDetail ($id:ID!){
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
    role
  }
}
`;

const SEARCH_JOBS = gql`
query searchJobs($searchTerm: String!){
  searchJobs(searchTerm:$searchTerm){
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

export { GET_JOBS, GET_JOB_DETAIL, SEARCH_JOBS };