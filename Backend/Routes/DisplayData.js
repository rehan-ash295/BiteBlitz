const express = require("express");
const router = express.Router();

router.post("/fooditem",(req, res)=>{
    try {
        res.send([global.food_items,global.Cat_foodItems])
        
    } catch (error) {
        console.log("sorry no data found")
        
    }

})

module.exports = router