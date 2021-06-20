import { ApolloServer } from "apollo-server-express";
import { env } from "../config/environment";
import schema from "./schema"; // We imported this

const apolloServer = new ApolloServer({
  schema, // We added this
  playground: env.development,
  context: ({ req, res }) => ({ req, res })
});

export default apolloServer;
