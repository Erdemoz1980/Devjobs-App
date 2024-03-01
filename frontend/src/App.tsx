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
  uri: "https://vercel.com/_next/static/chunks/59157-155d91716d59ef39.js?dpl=dpl_AC8Kfwk9KzUVuQfNYJ4B24p9woom",
  cache
})

const App: React.FC = () => {

  return (
    <GlobalProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/jobdetails/:id' element={<JobDetailsPage />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </GlobalProvider>
  )
};

export default App