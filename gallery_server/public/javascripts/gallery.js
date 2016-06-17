$(function() {
  var figure_template = Handlebars.compile($("#figure_template").html());
  var info_template = Handlebars.compile($("#info_template").html());
  var comment_template = Handlebars.compile($("#comment_template").html());
  var current_id = 1;

  get_info = function(id) {
    $.ajax({
      url: "/photos",
      success: function(json) {
        $(".group").html(info_template(json[id - 1]));
      }
    });
  }

  get_comments = function(id) {
    $.ajax({
      url: "/comments?photo_id=" + id,
      success: function(json) {
        console.dir(json);
        $("#comments").html(comment_template({ comments: json }));
      }
    });
  }

  update_counter = function(id, counter_name) {
    $.ajax({
      method: "POST",
      url: "/photos/" + counter_name,
      data: id
    });
  }

  collect_form_data = function(id) {
    var comment = {
      name: $("input[type='text']").val(),
      photo_id: id,
      gravatar: "",
      date: Date(),
      body: $("textarea").val()
    };
    return comment;
  }

  $.ajax({
    url: "/photos",
    success: function(json) {
      $("#photos").append(figure_template({ photos: json }));
      $("#photos div:first").addClass("active");
      get_info(1);
      get_comments(1);
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
    current_id = $("div.active").index() - 1;
    get_info(current_id);
    get_comments(current_id);
  });

  $("#icon_right").on("click", function(){
    if ($("div.active").next("div")[0] === undefined) {
      $new_photo = $("#photos div:first");
    } else {
      $new_photo = $("div.active").next();
    }
    $("div.active").removeClass();
    $new_photo.addClass("active");
    current_id = $("div.active").index() - 1;
    get_info(current_id);
    get_comments(current_id);
  });

  $("#favourites").on("click", function(){
    console.log("favourite!");
    update_counter(current_id, "favorites");
  });

  $("#likes").on("click", function(){
    update_counter(current_id, "favorites");
  });

  $("input[type='submit']").on("click", function(e){
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/comments/new",
      data: collect_form_data(current_id)
    });
    get_comments(current_id);
  });
  // $("figure").html(figure_template(photo1.figure));
  // $("#group").html(info_template(photo1.info));
  // $("#comments").html(comment_template({ comments: photo1.comments }));
});