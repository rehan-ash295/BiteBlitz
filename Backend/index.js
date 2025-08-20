const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const router = require("./Routes/CreateUser");
const main = require("./db")
const displaydata= require("./Routes/DisplayData");
const Orderdata= require("./Routes/OrderData");




main();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://bite-blitz-three.vercel.app/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");

    next();

});

app.use(express.json());
app.use("/api", router);
app.use("/api", displaydata);
app.use("/api", Orderdata);
app.get('/', (req, res) => {
    res.send('Hello Bite good morning to u')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})