Game =
  shapes: ["heart", "star", "square", "circle", "rocket", "car"]
  randomShapeClass: ->
    "fa-" + Game.shapes[Math.floor(Math.random()*Game.shapes.length)]
  populateCellsWithShapes: ->
    $.each $(".cell i"), (i, ele) -> $(ele).addClass(Game.randomShapeClass).addClass('animated').addClass('infinite')
  popualateCellCoordinates: ->
    rowNo = 1
    colNo = 1
    $.each $("#board .row")
    , (i, row) ->
      colNo = 1
      $.each $(row).children('.cell')
      , (j, cell) ->
        cell.dataset.rowNo = rowNo
        cell.dataset.colNo = colNo
        colNo++
      rowNo++
    Game.rowsCount = rowNo - 1
    Game.columnsCount = colNo - 1
  fetchCell: (rowNo, colNo) ->
    selector = ".cell"
    selector += "[data-row-no='#{rowNo}']"
    selector += "[data-col-no='#{colNo}']"
    $(selector)
  coordinatesOfCell: (cell) ->
    rowNo = parseInt(cell.dataset.rowNo)
    colNo = parseInt(cell.dataset.colNo)
    [rowNo, colNo]
  highlightCell: (cell) ->
    $(cell).children('i').addClass('jello')
  handleCellClick: (cell) ->
    if Game.selectedCell == null
      Game.selectCell(cell)
    else
      coords = Game.coordinatesOfCell(cell)
      rowNo = coords[0]
      colNo = coords[1]
      coords = Game.coordinatesOfCell(Game.selectedCell)
      orgRowNo = coords[0]
      orgColNo = coords[1]
      absDiff = [Math.abs(rowNo - orgRowNo), Math.abs(colNo - orgColNo)].sort()
      if absDiff[0] == 0 && absDiff[1] == 1
        Game.swapCells(Game.selectedCell, cell)
      Game.deselectCell()

  candyInCell: (cell) ->
    $(cell).children('i')
  shapeClassOfCandy: (candy) ->
    candy
    .attr('class')
    .split(" ")
    .find((className) -> className.match(/fa\-/)?)


  swapCells:(c1, c2) ->
    child1 = Game.candyInCell(c1)
    child2 = Game.candyInCell(c2)
    # Get fa-* className of first child
    className1 = Game.shapeClassOfCandy(child1)
    # Get fa-* className of second child
    className2 = Game.shapeClassOfCandy(child2)
    # Interchange classes
    child1.removeClass(className1).addClass(className2)
    child2.removeClass(className2).addClass(className1)
    Game.checkMatches()
  selectCell: (cell) ->
    Game.selectedCell = cell
    $(cell).children('i').addClass('flash')
    coords = Game.coordinatesOfCell(cell)
    rowNo = coords[0]
    colNo = coords[1]
    Game.highlightCell(Game.fetchCell(rowNo-1, colNo))
    Game.highlightCell(Game.fetchCell(rowNo+1, colNo))
    Game.highlightCell(Game.fetchCell(rowNo, colNo-1))
    Game.highlightCell(Game.fetchCell(rowNo, colNo+1))
  deselectCell: ->
    $('.cell i').removeClass('jello').removeClass('flash')
    Game.selectedCell = null
  bindCellsForClick: ->
    $('.cell').click ->
      Game.handleCellClick(@)
  checkMatches: ->
    console.log "Checking matches"
    currentRowNo = Game.rowsCount
    currentColNo = 1
    checkingShape = null
    currentLength = 0

    while currentColNo <= Game.columnsCount
      currentCell = Game.fetchCell(currentRowNo, currentColNo)
      currentCandy = Game.candyInCell(currentCell)
      currentShape = Game.shapeClassOfCandy(currentCandy)
      checkingShape = currentShape unless checkingShape?
      if checkingShape = currentShape
        currentLength++
      else
        if currentLength > 2 
          console.log "The length is more: #{currentLength}"
          #Remove the matching element
          #Bring down the elements above the remove elements
          #Populate above blank cells with random shapes
          #Break down the check process 
        checkingShape = currentShape
        currentLength = 1
      currentColNo++

  init: ->
    Game.rowsCount = 0
    Game.columnsCount = 0
    Game.deselectCell()
    Game.populateCellsWithShapes()
    Game.popualateCellCoordinates()
    Game.bindCellsForClick()
    Game.checkMatches()

$ ->
  Game.init()
#example for each function 

# each is a function which takes two parameters.First is an array and the second is a 
#function that executes for each element in the array.

# $.each([ 52, 97 ], function( index, value ) {
#   alert( index + ": " + value );
# });