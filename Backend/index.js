const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const router = require("./Routes/CreateUser");
const main = require("./db");
const displaydata = require("./Routes/DisplayData");
const Orderdata = require("./Routes/OrderData");

main();

const allowedOrigins = [
  'https://bite-blitz-three.vercel.app',
  'http://localhost:5000',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use("/api", router);
app.use("/api", displaydata);
app.use("/api", Orderdata);

app.get('/', (req, res) => {
  res.send('Hello Bite good morning to u');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});