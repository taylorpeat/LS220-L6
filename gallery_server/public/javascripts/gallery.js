$(function() {
  $.ajax({
    url: "/photos",
    success: function(json) {
      console.dir(json);
      $("#photos").append(figure_template({ photos: json }));
      $("#photos div:first").addClass("active");
    }
  });

  $("#icon_left").on("click", function(){
    if ($("div.active").prev("div")[0] === undefined) {
      $new_photo = $("#photos div:last");
    } else {
      $new_photo = $("div.active").prev();
    }
    $("div.active").removeClass();
    $new_photo.addClass("active");
  });

  $("#icon_right").on("click", function(){
    if ($("div.active").next("div")[0] === undefined) {
      $new_photo = $("#photos div:first");
    } else {
      $new_photo = $("div.active").next();
    }
    $("div.active").removeClass();
    $new_photo.addClass("active");
  });

  var figure_template = Handlebars.compile($("#figure_template").html());
  var info_template = Handlebars.compile($("#info_template").html());
  var comment_template = Handlebars.compile($("#comment_template").html());

  // $("figure").html(figure_template(photo1.figure));
  // $("#group").html(info_template(photo1.info));
  // $("#comments").html(comment_template({ comments: photo1.comments }));
});