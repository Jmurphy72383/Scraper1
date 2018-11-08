console.log("connected!");

$(".btn-scrape").on("click", function() {
    console.log("clicked");
    var subReddit = $(".searchInput").val();
    $.get("/scrape/" + subReddit, function(data) {
        console.log(data);
        for(var i = 0; i < data.length; i++) {
            var title = data[i].title;
            var link = data[i].link;
            var newDiv = $("<div>");
            newDiv.attr("class", "topicDiv");
            var newH3 = $("<h3>");
            var newA = $("<a>");
            newH3.text(title);
            newA.text("link");
            newA.attr("href", "http://www.reddit.com" + link);
            newA.attr("target", "_blank");
            $(".topicDiv").append(newH3);
            $(".topicDiv").append(newA);
            $(".article-container").append(newDiv);
        }
    })
})