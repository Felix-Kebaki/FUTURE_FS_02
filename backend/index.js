const express = require("express");
require("dotenv").config();
const connectDb = require("./config/connectDb");
const cookieParser = require("cookie-parser");
const cors=require("cors")

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

connectDb();

app.use("/api/admin", require("./routers/adminRouter"));
app.use("/api/lead", require("./routers/leadRouter"));

app.listen(5000, () => {
  console.log(`Listening to port ${PORT}.....`);
});
