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
  coordinatesOfCell: function(cell) {
    var colNo, rowNo;
    rowNo = parseInt(cell.dataset.rowNo);
    colNo = parseInt(cell.dataset.colNo);
    return [rowNo, colNo];
  },
  highlightCell: function(cell) {
    return $(cell).children('i').addClass('jello');
  },
  handleCellClick: function(cell) {
    var absDiff, colNo, coords, orgColNo, orgRowNo, rowNo;
    if (Game.selectedCell === null) {
      return Game.selectCell(cell);
    } else {
      coords = Game.coordinatesOfCell(cell);
      rowNo = coords[0];
      colNo = coords[1];
      coords = Game.coordinatesOfCell(Game.selectedCell);
      orgRowNo = coords[0];
      orgColNo = coords[1];
      absDiff = [Math.abs(rowNo - orgRowNo), Math.abs(colNo - orgColNo)].sort();
      if (absDiff[0] === 0 && absDiff[1] === 1) {
        return console.log("Neighbor clicked");
      } else {
        return Game.deselectCell();
      }
    }
  },
  selectCell: function(cell) {
    var colNo, coords, rowNo;
    Game.selectedCell = cell;
    $(cell).children('i').addClass('flash');
    coords = Game.coordinatesOfCell(cell);
    rowNo = coords[0];
    colNo = coords[1];
    Game.highlightCell(Game.fetchCell(rowNo - 1, colNo));
    Game.highlightCell(Game.fetchCell(rowNo + 1, colNo));
    Game.highlightCell(Game.fetchCell(rowNo, colNo - 1));
    return Game.highlightCell(Game.fetchCell(rowNo, colNo + 1));
  },
  deselectCell: function() {
    $('.cell i').removeClass('jello').removeClass('flash');
    return Game.selectedCell = null;
  },
  bindCellsForClick: function() {
    return $('.cell').click(function() {
      return Game.handleCellClick(this);
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
