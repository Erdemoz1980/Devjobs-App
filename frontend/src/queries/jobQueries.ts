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
    requirements
    role
  }
}
`

export { GET_JOBS, GET_JOB_DETAIL };