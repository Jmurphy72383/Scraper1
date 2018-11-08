
var express = require("express");
var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");

//REQUIRE ALL MODELS
var db = require("./models");
//INITIALIZE EXPRESS
var app = express();
//SETTING PORT
var PORT = 3500;

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/charlotteScraper"), { useNewUrlParser: true };

app.get("/scrape/:sub", function(req, res) {
    var subReddit = req.params.sub;
    axios.get("https://www.reddit.com/r/" + subReddit).then(function(response) {
    var $ = cheerio.load(response.data);
    var results = [];
        $("span.y8HYJ-y_lTUHkQIc1mdCq").each(function(i, element) {
            var title = $(element).children().attr("class", "cIujan").text();
            var link = $(element).children().attr("href");
            results.push({
                title: title,
                link: link
            });

            db.Article.create(results)
        });
        res.send(results);
    });
});


app.get("/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
    }).catch(function(err) {
            res.send(err);
    });
});







//START THE SERVER
app.listen(PORT, function() {
    console.log("App running on port: " + PORT + "!");
})