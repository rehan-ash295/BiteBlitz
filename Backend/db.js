const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.URI;
const monguri = uri;
console.log(monguri)
async function main() {
    try {
        await mongoose.connect(monguri, { dbName: "BIteBlitz" });
        console.log("DB connected");
        const foodCollection = mongoose.connection.db.collection("FoodItems");
        const data = await foodCollection.find({}).toArray();
        if (data) {
            console.log("Data found:");
            global.food_items = data;


        }
        else {
            console.log("sorry food collection not found")
        }

        const foodCatCollection = mongoose.connection.db.collection("Food_Category");
        const Catdata = await foodCatCollection.find({}).toArray();
        if (Catdata) {
            console.log("Data found:");
            global.Cat_foodItems = Catdata;
            console.log(global.Cat_foodItems)


        }
        else {
            console.log("sorry Category collection not found")
        }


    } catch (err) {
        console.log(`Sorry, DB not connected: ${err.message}`);
    }
}

module.exports = main;
