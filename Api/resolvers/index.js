const { mergeResolvers } = require("@graphql-tools/merge");

const userResolver = require("./userResolvers");
const adResolver = require("./adResolvers");
const uploadResolver = require("./uploadResolvers");

const resolver = [userResolver, adResolver, uploadResolver];

module.exports = mergeResolvers(resolver);
