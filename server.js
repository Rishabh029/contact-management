const express = require("express");
const connectDB = require("./config/dbConnection")
const { errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactroutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Hello ${PORT}`)
});