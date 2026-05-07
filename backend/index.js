const express = require("express");
require("dotenv").config();
const connectDb=require("./config/connectDb")

const app = express();

const PORT=process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectDb();

app.use("/api/admin",require("./routers/adminRouter"))

app.listen(5000, () => {
  console.log(`Listening to port ${PORT}.....`);
});
