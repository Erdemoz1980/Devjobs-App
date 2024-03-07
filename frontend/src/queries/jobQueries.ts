import { gql } from '@apollo/client';

const GET_JOB_DETAILS = gql`
query getJobDetails ($id:ID!){
  job(_id:$id){
    _id
    company
    logo
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
/*
const SEARCH_JOBS = gql`
query searchJobs($searchTerm: String, $location:String, $contract:String, $lastItemId:ID){
  jobs(searchTerm:$searchTerm, location:$location, contract:$contract, lastItemId:$lastItemId){
    _id
    company
    logo
    logoBackground
    position
    postedAt
    contract
    location
    website
    apply
    totalCount
  }
}`;*/
const SEARCH_JOBS = gql`
  query searchJobs($searchTerm: String, $location: String, $contract: String, $lastItemId: ID) {
    jobs(searchTerm: $searchTerm, location: $location, contract: $contract, lastItemId: $lastItemId) {
      jobs {
        _id
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
      totalCount
    }
  }
`;



export { SEARCH_JOBS, GET_JOB_DETAILS };





