$(function() {
  if (localStorage.getItem("tab_selcted")) {
    var tab_num = localStorage.getItem("tab_selcted"),
        idx = +tab_num,
        $li = $("nav li:nth-child(" + idx + ")");
    toggleTabs($li, idx);
  }

  if (localStorage.getItem("bg_color")) {
    var bg_color = localStorage.getItem("bg_color");
    $("body").css("background-color", bg_color);
    $("form li input").filter(function() {
      return this.value === bg_color;
    }).attr("checked", "checked");
  }

  if (localStorage.getItem("note")) {
    var note = localStorage.getItem("note");
    $("textarea").val(note);
  }

  $("nav li").on("click", function(e) {
    e.preventDefault();

    var $li = $(e.target),
        idx = $li.index() + 1;
    toggleTabs($li, idx);
    localStorage.setItem("tab_selcted", idx);
  })

  $("form").on("click", "input", function(e) {
    var new_color = e.target.getAttribute("value");
    $("body").css("background-color", new_color);
    localStorage.setItem("bg_color", new_color);
  });

  $(window).on("unload", function() {
    var note = $("textarea").val();
    localStorage.setItem("note", note);  
  });
})

function toggleTabs($li, idx) {
  $(".active").removeClass();
  $li.addClass("active");
  $("p:visible").hide();
  $("p:nth-child(" + idx + ")").show();
}