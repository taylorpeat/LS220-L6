$(function() {
  var templates = {},
      current_id = 1;

  $("[type='text/x-handlebars']").each(function() {
    var $tmpl = $(this);
    templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
  });

  $("[data-type='partial']").each(function() {
    var $tmpl = $(this);
    Handlebars.registerPartial($tmpl.attr("id"), $tmpl.html());
  });

  get_info = function(id) {
    $.ajax({
      url: "/photos",
      success: function(json) {
        $(".info").html(templates.info(json[id - 1]));
      }
    });
  }

  get_comments = function(id) {
    $.ajax({
      url: "/comments?photo_id=" + id,
      success: function(json) {
        $("#comments").html(templates.comments({ comments: json }));
      }
    });
  }

  update_counter = function(id, counter_name) {
    $.ajax({
      url: "/photos/" + counter_name,
      method: "POST",
      data: "photo_id=" + id,
      success: function(json) {
        $( "#" + counter_name ).text(function(i, txt) {
          return txt.replace(/\d/, json.total);
        });
      }
    });
  }

  $.ajax({
    url: "/photos",
    success: function(json) {
      $("#photos").append(templates.figures({ photos: json }));
      $("#photos div:first").addClass("active");
      get_info(1);
      get_comments(1);
    }
  });

  $("#icon_left").on("click", function() {
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

  $("#icon_right").on("click", function() {
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

  $(".info").on("click", "#favorite", function () {
    update_counter(current_id, "favorite");
  });

  $(".info").on("click", "#like", function() {
    update_counter(current_id, "like");
  });

  $("form").on("submit", function(e) {
    e.preventDefault();

    $.ajax({
      url: "/comments/new",
      method: "POST",
      data: $("form").serialize() + "&photo_id=" + current_id,
      success: function(json) {
        $("#comments").append(templates.comment(json));
      }
    });
  });
});