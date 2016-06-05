posts = [{
    title: "Sands of Time",
    published_date: "Jan 24, 1967",
    body: "<strong>I've got a nice body!</strong>",
    tags: ["great", "inspirational", "truth", "sports"]
  },
  {
    title: "Five for Fighting",
    published_date: "May 5, 2015",
    body: "FFIIIIGGGHHT!!!!!!!!!",
    tags: ["ji"]
  }];

$(function() {
  var post_template = Handlebars.compile($("#post_template").html());
  var tag_template = Handlebars.compile($("#tag_template").html());
  Handlebars.registerPartial("tag_template", $("#tag_template").html());

  $("body").append(post_template({ posts: posts }));
})