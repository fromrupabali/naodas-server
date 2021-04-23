const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

require('dotenv').config();
// require('./Api/utils/cron');

const app = express();

const typeDefs = require('./Api/typeDefs');
const resolvers = require('./Api/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true
});
server.applyMiddleware({app});


mongoose.connect(
    process.env.mongoURI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      }
  );



const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
});