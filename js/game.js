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
    Game.rowsCount = rowNo - 1;
    return Game.columnsCount = colNo - 1;
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
        Game.swapCells(Game.selectedCell, cell);
      }
      return Game.deselectCell();
    }
  },
  candyInCell: function(cell) {
    return $(cell).children('i');
  },
  shapeClassOfCandy: function(candy) {
    return candy.attr('class').split(" ").find(function(className) {
      return className.match(/fa\-/) != null;
    });
  },
  swapCells: function(c1, c2) {
    var child1, child2, className1, className2;
    child1 = Game.candyInCell(c1);
    child2 = Game.candyInCell(c2);
    className1 = Game.shapeClassOfCandy(child1);
    className2 = Game.shapeClassOfCandy(child2);
    child1.removeClass(className1).addClass(className2);
    child2.removeClass(className2).addClass(className1);
    return Game.checkMatches();
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
    var checkingShape, currentCandy, currentCell, currentColNo, currentLength, currentRowNo, currentShape, results;
    console.log("Checking matches");
    currentRowNo = Game.rowsCount;
    currentColNo = 1;
    checkingShape = null;
    currentLength = 0;
    results = [];
    while (currentColNo <= Game.columnsCount) {
      currentCell = Game.fetchCell(currentRowNo, currentColNo);
      currentCandy = Game.candyInCell(currentCell);
      currentShape = Game.shapeClassOfCandy(currentCandy);
      if (checkingShape == null) {
        checkingShape = currentShape;
      }
      if (checkingShape = currentShape) {
        currentLength++;
      } else {
        if (currentLength > 2) {
          console.log("The length is more: " + currentLength);
        }
        checkingShape = currentShape;
        currentLength = 1;
      }
      results.push(currentColNo++);
    }
    return results;
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
