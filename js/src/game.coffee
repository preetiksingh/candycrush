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
    Game.rowsCount = rowNo
    Game.columnsCount = colNo
  fetchCell: (rowNo, colNo) ->
    selector = ".cell"
    selector += "[data-row-no='#{rowNo}']"
    selector += "[data-col-no='#{colNo}']"
    $(selector)
  highlightCell: (cell) ->
    $(cell).children('i').addClass('jello')
  selectCell: (cell) ->
    if Game.selectedCell == null
      Game.selectedCell = cell
      $(cell).children('i').addClass('flash')
      colNo = parseInt(cell.dataset.colNo)
      rowNo = parseInt(cell.dataset.rowNo)
      Game.highlightCell(Game.fetchCell(rowNo-1, colNo))
      Game.highlightCell(Game.fetchCell(rowNo+1, colNo))
      Game.highlightCell(Game.fetchCell(rowNo, colNo-1))
      Game.highlightCell(Game.fetchCell(rowNo, colNo+1))
    else
      Game.deselectCell()
  deselectCell: ->
    $('.cell i').removeClass('jello').removeClass('flash')
    Game.selectedCell = null
  bindCellsForClick: ->
    $('.cell').click ->
      Game.selectCell(@)
  checkMatches: ->
    console.log "Checking matches"
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