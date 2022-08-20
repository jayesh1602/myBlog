//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://jayesh1602:jayesh1234@cluster0.gxmvk.mongodb.net/BlogDBNew"
);

const BlogSchema = {
  title: String,
  desc: String,
};

const Blog = mongoose.model("BlogItem", BlogSchema);

const blog1 = new Blog({
  title: "blog no. 1",
  desc: "this is good blog",
});

const blog2 = new Blog({
  title: "blog no. 2",
  desc: "this is blog more than good and informative",
});

const arrOfAllBlogs = [blog1, blog2];

// var allPosts = [];

app.get("/", (req, res) => {
  Blog.find({}, function (err, data) {
    if (data.length === 0) {
      Blog.insertMany(arrOfAllBlogs, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("all data inserted..");
        }
      });
      res.redirect("/");
    } else {
      res.render("home", { homeDesc: homeStartingContent, posts: data });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutDesc: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactDesc: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  var postTitle = req.body.composeTitle;
  var postDesc = req.body.composeDesc;
  const blog3 = new Blog({
    title: postTitle,
    desc: postDesc,
  });
  blog3.save();
  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  let newParams = req.params.postName;
  {
    for (var i = 0; i < arrOfAllBlogs.length; i++) {
      let lowerTitle = _.lowerCase(arrOfAllBlogs[i].title);
      let lowerNewParams = _.lowerCase(newParams);
      if (lowerNewParams === lowerTitle) {
        res.render("post", {
          postTitle: arrOfAllBlogs[i].title,
          postBody: arrOfAllBlogs[i].desc,
        });
      }
    }
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listenig at 3000 port..");
});

{
  /* <div>
      
      <h2>
          <%= posts[i].title %>
      </h2>
      <p>
          <%= posts[i].body.substring(0,100) + "..." %>
              <a href="/posts/<%= posts[i].title %>">read more</a>
      </p>
  </div> */
}
