var photo1 = {
  figure: {
    photo_src: "https://placehold.it/1280x1024/2266cc/ffffff",
    photo_placeholder: "photo 1",
    photo_caption: "This is the first photo. Isn't it beautiful?"
  },
  info: {
    photo_title: "First Photo",
    favourites: 2,
    likes: 5,
    photo_date: "3/12/16"
  },
  comments: [{
    name: "Shane Riley",
    comment_date: "3/13/16",
    comment_body: "This is a comment from Shane. Hi I'm Shane!"
  },
  {
    name: "Joe Schmoe",
    comment_date: "5/13/16",
    comment_body: "Joe like this picture."
  }
  ]
}

var photo2 = {
  figure: {
    photo_src: "https://placehold.it/1280x1024/b22222/ffffff",
    photo_placeholder: "photo 2",
    photo_caption: "This is the second photo. First one was better."
  },
  info: {
    photo_title: "Another Nice Photo",
    favourites: 0,
    likes: 2,
    photo_date: "3/15/16"
  },
  comments: [{
    name: "Shane Riley",
    comment_date: "3/19/16",
    comment_body: "I really like this aperature."
  }]
}

var photos = [photo1, photo2];


$(function() {
  var figure_template = Handlebars.compile($("#figure_template").html());
  var info_template = Handlebars.compile($("#info_template").html());
  var comment_template = Handlebars.compile($("#comment_template").html());

  $("figure").html(figure_template(photo1.figure));
  $("#group").html(info_template(photo1.info));
  $("#comments").html(comment_template({ comments: photo1.comments }));
});