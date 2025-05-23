const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT || 5001;

// databases connections
const ConnectDB = require("./DataBase/ConnectDb");
ConnectDB();

// middleware

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      // "https://zenithsns.com",
    ],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads/"));

// user routes defined
const userrouter = require("./Routes/UserRoutes");
app.use("/api/v1", userrouter);

// products routes defined
const productRouter = require("./Routes/ProductRoute");
app.use("/api/v1/products", productRouter);

// category routes defined
const categoryRouter = require("./Routes/categoryRoute");
app.use("/api/v1/category", categoryRouter);

// category routes defined
const contactRouter = require("./Routes/ContactRoute");
app.use("/api/v1/contact", contactRouter);

// gallery routes defined
const galleryRouter = require("./Routes/galleryRoute");
app.use("/api/v1/gallery", galleryRouter);

// event routes defined
const eventRouter = require("./Routes/eventRoute");
app.use("/api/v1/event", eventRouter);

// get quote routes defined

app.listen(PORT, () => {
  console.log(` Server listening on ${PORT}`);
});
