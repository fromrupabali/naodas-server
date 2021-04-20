const { gql } = require('apollo-server');

module.exports = gql`
    #USER
    type User{
        _id: ID
        user_name: String
        email: String
        phone: String
        password: String
    }
    input UserUpdateInput{
        user_name: String
        email: String
        password: String
    }
    type AuthData{
        success: Boolean
        userId: String
        token: String
        error_message:String
        phone: String
    }
  
    #AD
    
    type Ad{
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
        images:[String]
        planName:String
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
        contactType: String,
        conatctPhone: String
        user: String
        sold: Boolean
    }
    input AdInput{
        title: String
        priceType: String
        price: Int
        categoryId: String
        categoryName: String
        subcategoryId: String
        subcategoryName: String
        quantity: Int
        description: String
        images:[String]
        planName:String
        days:Int
        planStartDate: String
        planEndDate: String
        country: String
        city: String
        area: String
        shippingType: String
        collectionPrice: Int
        contactType: String,
        conatctPhone: String
        token: String
    }

    #FILE
    type File {
        url:String
   }

    type Query{
        #USER
        signIn(email:String!, password: String!): AuthData!
        user(userId: String!): User!

        #AD
        createAd(adInput:AdInput): Ad

        #CATEGORY
        

        #ADMIN
       
    }
    type Mutation{
        #USER
        signUp(email: String!, userName: String!,password:String!):AuthData!
        updateUser(updateInput: UserUpdateInput):User!
        forgotPassword(phone:String):AuthData!
        confirmResetCode(phone: String, resetCode: String):AuthData!
        resetPassword(phone: String, newPassword: String):AuthData!
        changePassword(token:String!, newPassword:String!, oldPassword: String!): AuthData!

          #AD
          createAd(adInput:AdInput): Ad
       

        #ADMIN

        #FILE UPLOAD
        uploadToAws(file: Upload!): File!
        

        
    } 
`