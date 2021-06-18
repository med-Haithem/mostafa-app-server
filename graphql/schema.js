import { join } from "path";
import { readdirSync, readFileSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers";

const gqlFiles = readdirSync(join(__dirname, "./typedefs"));

let typeDefs = "";

import { GraphQLScalarType } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.toISOString();
  },
});

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, "./typedefs", file), {
    encoding: "utf8",
  });
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    ...resolvers,
    Date: dateScalar,
  },
});

export default schema;
