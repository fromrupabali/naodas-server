const { gql } = require("apollo-server");

module.exports = gql`
  #USER
  type User {
    _id: ID
    userName: String
    email: String
    phone: String
    password: String
  }
  input UserUpdateInput {
    user_name: String
    email: String
    password: String
  }
  type AuthData {
    success: Boolean
    userId: String
    token: String
    error_message: String
    phone: String
  }

  #AD

  type Ad {
    _id: ID
    title: String
    priceType: String
    price: Int
    categoryId: String
    categoryName: String
    subcategoryId: String
    subcategoryName: String
    quantity: Int
    description: String
    images: [String]
    planName: String
    days: Int
    planStartDate: String
    planEndDate: String
    paid: Boolean
    cardId: String
    country: String
    city: String
    address: String
    shippingType: String
    collectionPrice: Int
    contactType: String
    conatctPhone: String
    user: String
    sold: Boolean
    watchingUsers:[String]
  }
  input AdCreateInput {
    title: String
    priceType: String
    price: Int
    categoryId: String
    categoryName: String
    subcategoryId: String
    subcategoryName: String
    quantity: Int
    description: String
    images: [String]
    planName: String
    days: Int
    planStartDate: String
    planEndDate: String
    country: String
    city: String
    address: String
    shippingType: String
    collectionPrice: Int
    contactType: String
    conatctPhone: String
    token: String
    paid: Boolean
  }
  type AdView{
    ad: Ad!
    otherAds:[Ad!]
  }

  #FILE
  type File {
    url: String
  }
  
  #Watch
  type Watch{
      _id: ID
      userId: String
      adId: String
      ad:Ad
  }
  type Query {
    #USER
    signIn(email: String!, password: String!): AuthData!
    user(token: String!): User!

    #AD
    homePageAds:[Ad!]
    searchAds(searchText:String!):[Ad!]
    watchAds(token: String!):[Watch!]
    singleAd(adId: String!): AdView!
    userAds(token: String!):[Ad!]

    #CATEGORY
    categoryAds(catId:String!):[Ad!]

    #ADMIN
  }
  type Mutation {
    #USER
    signUp(email: String!, userName: String!, password: String!): AuthData!
    updateUser(updateInput: UserUpdateInput): User!
    forgotPassword(phone: String): AuthData!
    confirmResetCode(phone: String, resetCode: String): AuthData!
    resetPassword(phone: String, newPassword: String): AuthData!
    changePassword(
      token: String!
      newPassword: String!
      oldPassword: String!
    ): AuthData!
    watchAd(userId:String!, adId:String!):Ad!

    #AD
    createAd(input: AdCreateInput): Ad!

    #ADMIN

    #PAYMENT
    payment(source: String!, adId: String!, amount: Int!, email:String): User!

    #FILE UPLOAD
    uploadToAws(file: Upload!): File!
  }
`;
