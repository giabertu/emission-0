const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router.js");
const { mongoose } = require("./db");

const PORT = 3005;

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/emisssion0?");
    console.log("Database connection successful 🍏");
  } catch (error) {
    console.log("Database connection failed 🍎");
  }
})();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on  http://127.0.0.1:${PORT} 🍏`);
});
