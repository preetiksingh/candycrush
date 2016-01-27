Game = 
  shapes: ["heart", "star", "square", "flash", "circle","rocket", "car"]
  randomShapeClass: ->
    "fa-" + Game.shapes[Math.floor(Math.random()*Game.shapes.length)]
  populateCellsWithShapes: ->
    $.each $(".cell i"), (i, ele) -> $(ele).addClass Game.randomShapeClass

  populateCellCoordinates: ->
    rowNo = 1
    colNo = 1
    $.each $("#board .row") , (i, row) ->
      colNo = 1
      $.each $(row).children('.cell') ,(j, cell) ->
        cell.dataset.rowNo = rowNo
        cell.dataset.colNo = colNo
        colNo++
      rowNo++

    Game.rowCount = rowNo - 1
    Game.colCount = colNo - 1


  checkMatches: ->
    console.log "Checking matches"

  init: ->
    Game.rowCount = 0
    Game.colCount = 0
    Game.populateCellsWithShapes()
    Game.populateCellCoordinates()
    Game.checkMatches()
    
$ ->
  Game.init()


#example for each function 

# each is a function which takes two parameters.First is an array and the second is a 
#function that executes for each element in the array.

# $.each([ 52, 97 ], function( index, value ) {
#   alert( index + ": " + value );
# });