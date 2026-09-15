const express=require('express');
const {connectToMongoDB}=require('./connection/connect');
const cookieParser=require('cookie-parser');
const {checkForAuthenticated,restrictTo}=require('./middleware/auth');

const path=require('path');
const URL=require('./model/url');
const PORT=3000;
const app=express();


const urlRoutes=require('./routes/url');
const staticRoutes=require('./routes/staticRouter');
const userRoutes=require('./routes/user');



connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


  
app.set('view engine', 'ejs');
app.set('views', path.resolve("./view"));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());



app.use(checkForAuthenticated);
app.use("/url",restrictTo(["NORMAL"]), urlRoutes);
app.use("/user", userRoutes);
app.use("/",staticRoutes);


app.get('/test', async(req, res) => {
  const allUrls = await URL.find({});
  return res.render('home', { urls: allUrls });
});


app.get("/:shortId", async (req, res) => {
  // Handle the GET request for the short URL
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortID: shortId },
    { $push: { visitsHistory: { timestamp: Date.now() } } },
    { returnDocument: "after" }
  );
  if (!entry) {
    return res.status(404).json({ error: "URL not found" })
  }
  res.redirect(entry.redirectUrl);
});





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
