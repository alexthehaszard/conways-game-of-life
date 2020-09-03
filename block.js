class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.on = false;
    this.next = false;
    this.div = document.createElement("div");
  }

  setup() {
    this.div.classList = "block";
    this.div.setAttribute(
      "onmouseover",
      `blocks[${this.x}][${this.y}].turnOn()`
    );
    appWrapper.appendChild(this.div);
  }

  turnOn() {
    if (mouseDown) {
      this.on = !this.on;
      this.update(true);
    }
  }

  update(dontCheck) {
    if (!dontCheck) this.checkOn();
    if (this.on) {
      this.div.style = "background: orange";
    } else {
      this.div.style = "background: blue";
    }
  }

  checkOn() {
    let partners = 0;
    if (this.x - 1 >= 0 && blocks[this.x - 1][this.y].on) partners++;
    if (this.x + 1 < rows && blocks[this.x + 1][this.y].on) partners++;
    if (this.y - 1 >= 0 && blocks[this.x][this.y - 1].on) partners++;
    if (this.y + 1 < cols && blocks[this.x][this.y + 1].on) partners++;

    if (this.x - 1 >= 0 && this.y - 1 >= 0 && blocks[this.x - 1][this.y - 1].on)
      partners++;
    if (
      this.x + 1 < rows &&
      this.y + 1 < cols &&
      blocks[this.x + 1][this.y + 1].on
    )
      partners++;
    if (
      this.y - 1 >= 0 &&
      this.x + 1 < rows &&
      blocks[this.x + 1][this.y - 1].on
    )
      partners++;
    if (
      this.y + 1 < cols &&
      this.x - 1 >= 0 &&
      blocks[this.x - 1][this.y + 1].on
    )
      partners++;

    if (
      (partners < 2 && this.on === true) ||
      (partners >= 4 && this.on === true)
    )
      this.next = false;
    else if (partners !== 3 && this.on === false) this.next = false;
    else this.next = true;
  }
}
