var Game;

Game = {
  shapes: ["heart", "star", "square", "flash", "circle", "rocket", "car"],
  randomShapeClass: function() {
    return "fa-" + Game.shapes[Math.floor(Math.random() * Game.shapes.length)];
  },
  populateCellsWithShapes: function() {
    return $.each($(".cell i"), function(i, ele) {
      return $(ele).addClass(Game.randomShapeClass);
    });
  },
  populateCellCoordinates: function() {
    var colNo, rowNo;
    rowNo = 1;
    colNo = 1;
    $.each($("#board .row"), function(i, row) {
      colNo = 1;
      $.each($(row).children('.cell'), function(j, cell) {
        cell.dataset.rowNo = rowNo;
        cell.dataset.colNo = colNo;
        return colNo++;
      });
      return rowNo++;
    });
    Game.rowCount = rowNo - 1;
    return Game.colCount = colNo - 1;
  },
  checkMatches: function() {
    return console.log("Checking matches");
  },
  init: function() {
    Game.rowCount = 0;
    Game.colCount = 0;
    Game.populateCellsWithShapes();
    Game.populateCellCoordinates();
    return Game.checkMatches();
  }
};

$(function() {
  return Game.init();
});
