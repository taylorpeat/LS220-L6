$(function() {
  var canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d");

  var drawShapes = {
    findX: function(e, shape_offset) {
      return e.offsetX - shape_offset;
    },
    findY: function(e, shape_offset) {
      return e.offsetY - shape_offset;
    },
    findColor: function() {
      return $("input[type='text']").val() || "black";
    },
    circle: function(e) {
      var radius = 30,
          x = this.findX(e, 0),
          y = this.findY(e, 0);

      ctx.fillStyle = this.findColor();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    },
    square: function(e) {
      var side = 50,
          x = this.findX(e, side / 2),
          y = this.findY(e, side / 2);

      ctx.fillStyle = this.findColor();
      ctx.fillRect(x, y, side, side);
    },
    triangle: function(e) {
      var height = 60,
          width = 80,
          x = this.findX(e, 0),
          y = this.findY(e, height / 2);

      ctx.beginPath();
      ctx.strokeStyle = this.findColor();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width / 2, y + height);
      ctx.lineTo(x - width / 2, y + height);
      ctx.lineTo(x, y);
      ctx.lineTo(x + width / 2, y + height);
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.closePath();
    }
  };

  $("canvas").on("click", function(e) {
    var shape = $(":checked").val();
    
    drawShapes[shape](e);
  });

  $("button").on("click", function(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  })

});