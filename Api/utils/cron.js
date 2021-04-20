const cron = require('node-cron');

const Shop = require('../models/shop');

cron.schedule('* * * * *', async() => {
    console.log('Cron started....');
    const shops = await Shop.find();
    // console.log(shops);
    //check shop subscription date
    shops.map(shop => {
        if(new Date().valueOf() < shop.subscribeFor.valueOf()){
            console.log("Checking shop..")
            console.log("Shop", shop.name);
        }else{
            console.log('Expired..', shop.name);
        }
    })
    //If date expired update subscription status and send notifications to shop.

    const d = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    const d2 = new Date().valueOf();

    // console.log("Date", d.valueOf(), "Date now", d2);
});