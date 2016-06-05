post = {
    title: "Sands of Time",
    published_date: "Jan 24, 1967",
    body: "I've got a nice body!"
}

$(function() {
  var post_template = Handlebars.compile($("#post_template").html());
  $("body").append(post_template(post));
})