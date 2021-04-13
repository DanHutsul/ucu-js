// falling - new figure is put on the playgound
// static - figure stoped moving. This happens when there are obstacles for any cells bellow
function Figure(obstacles, state = STATES.FALLING) {
  // Public properties
  this.cells = [];
  this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  this.id = helperMethods.idGenerator.next().value;
  this.state = state;
  this.obstacles = obstacles;

  // Private methods
  const validFor = (direction) =>
    this.cells.every(cell => cell.validFor(direction));

  // initialise figure cells
  const addCell = (x, y) =>
    this.cells.push(new Cell(x, y, this.color, this.id, this.obstacles, this.state));

  const generateCoordinates = () => {
    var out = INITIAL_POSITIONS[Math.floor(Math.random() * INITIAL_POSITIONS.length)];
    console.log(out);
    var x = [];
    out.forEach(cell => x.push(cell[0]));
    var offset = Math.floor(Math.random() * (PLAYGROUND_WIDTH-Math.max(...x)));
    var len = out.length;
    while (len--) {
      out[len][0] += offset;
    }
    return out;
  }

  generateCoordinates().forEach(([x, y]) =>
    addCell(x, y));

  const destroyLine = () => {
    var destroyedLines = [];
    for (var r = PLAYGROUND_HEIGHT - 1; r >= 0; r--) {
      let num = 0;
      for (var i = 0; i < figures.length; i++) {
        figures[i].cells.forEach((item) => {
          if(item.y == r) {
            num++;
          }})
      }
      
      if (num == PLAYGROUND_WIDTH) {
        destroyedLines.push(r);
        //console.log(this.obstacles);

        for (var k = 0; k < figures.length; k++) {
          for (var c = 0; c < figures[k].cells.length; c++) {
            if (figures[k].cells[c].y == r) {
              figures[k].cells[c].deRender();
              delete(figures[k].cells[c]);
              figures[k].cells = figures[k].cells.filter(n => n);
              //console.log(figures[k].cells);
            }
          }
        }

        for (var k = 0; k < figures.length; k++) {
          if (figures[k].cells.length == 0) {
            delete(figures[k]);
            figures = figures.filter(n => n);
          }
        }


      }
    }


    for (var n = 0; n < destroyedLines.length; n++) {
      figures = figures.filter(n => n);
      for (var i = 0; i < figures.length; i++) {
        for (var c = 1; c < PLAYGROUND_HEIGHT; c++) {
          figures[i].cells.forEach((item) => {
            if(item.y == c) {
              item.deRender();
              item.moveDown();
            }})
        }
    }

    while (destroyedLines--) {
      figures = figures.filter(n => n);
      for (var i = 0; i < figures.length; i++) {
        if(figures[i].validFor(DOWN)) {
          figures[i].cells.forEach(cell => cell.deRender());
          figures[i].cells.forEach(cell => cell.moveDown());
        } 
      }
    }
  }
}
  // Public methods
  this.moveDown = () => {
    if (validFor(DOWN)) {
      this.cells.forEach(cell => cell.deRender());
      this.cells.forEach(cell => cell.moveDown());
    } else {
      this.state = STATES.STATIC
      destroyLine();
    }
  };

  this.validFor = (direction) => {
    this.cells.every(cell => cell.validFor(direction));
  };

  this.moveSideways = (direction) => {
    if (direction == RIGHT) {
      if (!validFor(RIGHT)) return;

      this.cells.forEach(cell => cell.deRender());
      this.cells.forEach(cell => cell.moveRight());
    } else if (direction == LEFT) {
      if (!validFor(LEFT)) return;

    this.cells.forEach(cell => cell.deRender());
    this.cells.forEach(cell => cell.moveLeft());
    }

  }

  this.rotate = () => {
    // TODO: this is complicated. But really can be solved with basic math.
    //       make sure you are rotating around the center element
    //       all figures will be eaither 3 cells wide or 3 cells hight
  }
}
