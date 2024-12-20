const express = require("express");
const app = express();
const cors = require("cors")

app.use(cors())
app.use(express.json());

require("dotenv").config();
require("./conn/conn")
const User = require("./routes/user")
const Books = require("./routes/book")
const Favourite = require("./routes/favourite")
const Cart = require("./routes/cart")
const Order = require("./routes/order")


// routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);


// app.get("/",(req,res) =>{
//     res.send("backend!");
// });

// create port
app.listen(process.env.PORT, () =>{
    console.log(`server started at port ${process.env.PORT}`);
    
});