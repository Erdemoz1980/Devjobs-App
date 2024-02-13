import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Navbar from './components/Navbar';
import JobDetailsPage from './pages/JobDetailsPage';
import { GlobalProvider } from './context/GlobalState';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
  Query: {
    fields: {
      jobs: {
        merge(existing, incoming) {
          return incoming
        }
      }
    }
  }
}
})

const client = new ApolloClient({
  uri: "http://localhost:7000/graphql",
  cache
})

const App: React.FC = () => {

  return (
    <ApolloProvider client={client}>
    <GlobalProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/jobdetails/:id' element={<JobDetailsPage />} />
        </Routes>
      </BrowserRouter>
      </GlobalProvider>
      </ApolloProvider>
  )
};

export default App