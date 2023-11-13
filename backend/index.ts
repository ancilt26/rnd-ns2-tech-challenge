import express from 'express';
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers } from "@graphql-tools/merge";
import companyTypes from "domains/company/graphql/index";
import companyResolver from "domains/company/resolvers/index";
import { companyLoader } from './domains/company/dataloaders/index'

const executableSchema = makeExecutableSchema({
  typeDefs: [companyTypes],
  resolvers: mergeResolvers([companyResolver]),
});

const app = express()

const context = () => {
  return {
    loaders: {
      companyLoader
    }
  }
}

const yoga = createYoga({ schema: executableSchema, context })

app.use(yoga.graphqlEndpoint, yoga)
app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
})
