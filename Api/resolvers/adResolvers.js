const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

var Secret_Key =
  "sk_test_51IzHbbEF1W6drQ5LpnjboZ2Os8wHseoxQYJQvX6rkWqVbPW6NkP8skJ9FVuMS0qyN5REmJt2dh393OvIa9NAzfiE00JMu37HMh";

const stripe = require("stripe")(Secret_Key);

const Ad = require("../models/ad");
const User = require("../models/user");

const others = async (user, adId) => {
  try {
    console.log("others", adId);
    const ads = await Ad.find({ user: user, _id: { $ne: adId } });
    return ads.map((ad) => {
      return {
        ...ad._doc,
      };
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  Query: {
    homePageAds: async (args, req) => {
      try {
        const ads = await Ad.find({ planName: "HOME_PAGE" })
          .sort({
            createdAt: -1,
          })
          .skip(req.skip)
          .limit(12);
        console.log(ads);
        return ads.map((ad) => {
          return {
            ...ad._doc,
          };
        });
      } catch (error) {
        throw error;
      }
    },
    searchAds: async (args, req) => {
      try {
        const ads = await Ad.find({ $text: { $search: req.searchText } });
        return ads.map((ad) => {
          return {
            ...ad._doc,
          };
        });
      } catch (error) {
        throw error;
      }
    },
    categoryAds: async (args, req) => {
      try {
        const ads = await Ad.find({ categoryId: req.catId });
        return ads.map((ad) => {
          return {
            ...ad._doc,
          };
        });
      } catch (error) {
        throw error;
      }
    },
    singleAd: async (args, req) => {
      try {
        const ad = await Ad.findById(req.adId);
        if (!ad) {
          throw new Error("Ad noy found");
        }
        return {
          ad,
          otherAds: others.bind(this, ad.user, ad._id),
        };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createAd: async (args, req) => {
      try {
        const decodedToken = jwt.verify(
          req.input.token,
          process.env.SECRET_KEY
        );
        const user = await User.findById(decodedToken.userId);
        console.log("User", user);
        let planName = "FREE";
        if (req.input.planName) {
          planName = "HOME_PAGE";
        }
        const ad = new Ad({
          _id: new mongoose.Types.ObjectId(),
          title: req.input.title,
          priceType: req.input.priceType,
          price: req.input.price,
          categoryId: req.input.categoryId,
          categoryName: req.input.categoryName,
          subcategoryId: req.input.subcategoryId,
          subcategoryName: req.input.subcategoryName,
          quantity: req.input.quantity,
          description: req.input.description,
          images: req.input.images,
          planName: planName,
          days: req.input.days,
          planStartDate: req.input.planStartDate,
          planEndDate: req.input.planEndDate,
          country: req.input.country,
          city: req.input.city,
          address: req.input.address,
          shippingType: req.input.shippingType,
          collectionPrice: req.input.collectionPrice,
          contactType: req.input.contactType,
          contactPhone: req.input.contactPhone,
          user: user._id,
          createdAt: new Date().toISOString(),
        });
        console.log(ad);

        await ad.save();
        user.ads.push(ad._id);
        await user.save();

        return {
          ...ad._doc,
        };

        return {
          ...ad._doc,
        };
      } catch (error) {
        throw error;
      }
    },
    payment: async (args, req) => {
      try {
        const customer = await stripe.customers.create({
          email: req.email,
          source: req.source,
          name: req.email,
        });
        const charge = await stripe.charges.create({
          customer: customer.id,
          amount: req.amount * 100,
          currency: "usd",
        });

        if (charge.status == "succeeded") {
          console.log("Payment successfull.", req.adId);
          const ad = await Ad.findById(req.adId);
          console.log("Find ad", ad);
          await ad.updateOne({
            paid: true,
          });
          const updatedAd = await Ad.findById(req.adId);
          console.log("updated Ad", updatedAd);

          // const order = await Order.findById(req.orderId);
          // await order.updateOne({
          //     paid: true,
          //     cardId: req.source
          // });
          // const resturant = await Resturant.findById(order.resturant);
          // await resturant.updateOne({
          //      total_sale: resturant.total_sale + order.total,
          //      current_balance: resturant.current_balance + order.total
          // });

          // return{
          //     ...order._doc
          // }
        }
      } catch (error) {
        throw error;
      }
    },
  },
};
