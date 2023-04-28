import express from "express";
import dotenv from "dotenv";
import HttpCodes from "./utils/httpCodes.js";
import routes from "./routes/indexRoute.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8181;
const API = process.env.PATH_URL;
// App Use Json
app.use(express.json());

app.use(API + "/hitunggaji", routes.incomesRoute);

// Handle Error
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Server Not Found";
  const errorStack = err.stack;
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: errorStack,
  });
});

// Handle Error URL Not Found
app.all("*", (req, res) => {
  return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
    status: false,
    message: "Server Error",
    stack: req.originalUrl + " URL Not Found",
  });
});

app.listen(port, () => {
  console.info(`Server Running On Port ${port}`);
});
