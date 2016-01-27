var Game;

Game = {
  shapes: ["heart", "star", "square", "flash", "circle"],
  randomShapeClass: function() {
    return "fa-" + Game.shapes[Math.floor(Math.random() * Game.shapes.length)];
  },
  init: function() {
    return $.each($(".cell i"), function(i, ele) {
      return $(ele).addClass(Game.randomShapeClass);
    });
  }
};

$(function() {
  return Game.init();
});
