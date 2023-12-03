global.envConfig = {
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
};
require("dotenv").config(global.envConfig);

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const routes = require("./routes/index");

const db = require("./models/index");

db.mongoose
  .connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to mongoDB");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log("Server started at port: ", PORT);
});
