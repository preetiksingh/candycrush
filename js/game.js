var Game;

Game = {
  shapes: ["heart", "star", "square", "circle", "rocket", "car"],
  randomShapeClass: function() {
    return "fa-" + Game.shapes[Math.floor(Math.random() * Game.shapes.length)];
  },
  populateCellsWithShapes: function() {
    return $.each($(".cell i"), function(i, ele) {
      return $(ele).addClass(Game.randomShapeClass).addClass('animated').addClass('infinite');
    });
  },
  popualateCellCoordinates: function() {
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
    Game.rowsCount = rowNo;
    return Game.columnsCount = colNo;
  },
  fetchCell: function(rowNo, colNo) {
    var selector;
    selector = ".cell";
    selector += "[data-row-no='" + rowNo + "']";
    selector += "[data-col-no='" + colNo + "']";
    return $(selector);
  },
  highlightCell: function(cell) {
    return $(cell).children('i').addClass('jello');
  },
  selectCell: function(cell) {
    var colNo, rowNo;
    if (Game.selectedCell === null) {
      Game.selectedCell = cell;
      $(cell).children('i').addClass('flash');
      colNo = parseInt(cell.dataset.colNo);
      rowNo = parseInt(cell.dataset.rowNo);
      Game.highlightCell(Game.fetchCell(rowNo - 1, colNo));
      Game.highlightCell(Game.fetchCell(rowNo + 1, colNo));
      Game.highlightCell(Game.fetchCell(rowNo, colNo - 1));
      return Game.highlightCell(Game.fetchCell(rowNo, colNo + 1));
    } else {
      return Game.deselectCell();
    }
  },
  deselectCell: function() {
    $('.cell i').removeClass('jello').removeClass('flash');
    return Game.selectedCell = null;
  },
  bindCellsForClick: function() {
    return $('.cell').click(function() {
      return Game.selectCell(this);
    });
  },
  checkMatches: function() {
    return console.log("Checking matches");
  },
  init: function() {
    Game.rowsCount = 0;
    Game.columnsCount = 0;
    Game.deselectCell();
    Game.populateCellsWithShapes();
    Game.popualateCellCoordinates();
    Game.bindCellsForClick();
    return Game.checkMatches();
  }
};

$(function() {
  return Game.init();
});
