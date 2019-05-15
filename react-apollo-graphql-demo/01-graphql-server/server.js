var express = require('express');
var graphqlHTTP = require('express-graphql');
var buildSchema = require('graphql').buildSchema;

var schema = buildSchema(`
  type Century {
    runs: String
    against: String
    date: String
  }
  
  type Query {
    firstName: String
    lastName: String
    profession: String
    nationality: String
    noOfCenturies: String
    centuries: [Century]
  }
`);

var root = {
  firstName: () => 'Ketan',
  lastName: () => 'Patel',
  profession: () => 'Husband | Father | Cricketer | Developer',
  nationality: () => 'India',
  noOfCenturies: () => '10',
  centuries: () => [
        { "runs" : 199, "against" : "England", "date" : "9 August 1999" },
        { "runs" : 146, "against" : "Australia", "date" : "2 January 2002" },
        { "runs" : 107, "against" : "Pakistan", "date" : "1 February 2018" }
    ],
};

var app = express();

var cors=require('cors');
app.use(cors({origin:true,credentials: true}));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
