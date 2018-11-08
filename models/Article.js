var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article