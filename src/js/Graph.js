class Graph {
  constructor(id, canvasHeight, canvasWidth) {
    this.bgColor = '#f9f9fb';
    const canvas = document.getElementById(id);
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    canvas.style.backgroundColor = this.bgColor;
    this.ctx = canvas.getContext('2d');
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.font = '16px Fira Code';

    this.xPad = canvasWidth * 0.1;
    this.yPad = canvasHeight * 0.05;

    this.width = canvasWidth - (this.xPad * 2);
    this.height = canvasHeight - (this.yPad * 2);

    // Shortcut for bottom right of graph where axis meet.
    this.zero = { x: this.width + this.xPad, y: this.height + this.yPad };

    this.tickSpeed = 1 / 1280;
    this.ticks = [];
    this.guesses = [];
    this.encoding = 'decimal';
    this.setTicks(16);
  }

  // If num is 4 populate ticks with [0.0, 0.25, 0.5, 0.75].
  setTicks(num) {
    for (let i = 1; i < num + 1; i += 1) {
      this.ticks.push(num + i / num);
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width + this.xPad * 2, this.height + this.yPad * 2);
  }

  drawAxis(xLabel) {
    const xGrd = this.ctx.createLinearGradient(this.xPad, this.zero.y, this.width, this.zero.y);
    xGrd.addColorStop(0, this.bgColor);
    xGrd.addColorStop(1, 'black');

    // X-axis.
    this.ctx.beginPath();
    this.ctx.strokeStyle = xGrd;
    this.ctx.moveTo(this.xPad, this.zero.y);
    this.ctx.lineTo(this.xPad + this.width, this.zero.y);
    this.ctx.stroke();
    this.ctx.closePath();

    // X-axis label.
    const xLabelMetrics = this.ctx.measureText(xLabel);
    this.ctx.fillStyle = 'black';
    const center = this.zero.x - (this.width / 2) - (xLabelMetrics.width / 2);
    this.ctx.fillText(xLabel, center, this.zero.y + 20);

    // Y-axis.
    this.drawVerticalLine(0);
  }

  drawAxisLabels() {
    this.ctx.direction = 'ltr';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('Max', this.zero.x - 10, this.yPad - 20);
    this.ctx.fillText('Min', this.zero.x - 10, this.zero.y + 20);
    this.ctx.fillText('0', this.zero.x - 30, this.zero.y + 20);
  }

  drawTarget(yRatio) {
    this.ctx.direction = 'ltr';
    this.ctx.fillStyle = 'green';
    this.ctx.fillText(
        '🠔Target',
        this.zero.x + 3,
        this.zero.y - (this.height * yRatio) + 4
    );
  }

  calcTicks() {
    for (let i = 0; i < this.ticks.length; i += 1) {
      this.ticks[i] += this.tickSpeed;
      this.ticks[i] %= 1;
    }
  }

  calcGuesses() {
    for (let i = 0; i < this.guesses.length; i += 1) {
      this.guesses[i].xRatio += this.tickSpeed;

      // Delete old guesses.
      if (this.guesses[i].xRatio > 3) {
        this.guesses.shift();
      }
    }
  }

  drawTicks() {
    for (let i = 0; i < this.ticks.length; i += 1) {
      this.drawVerticalLine(this.ticks[i], 'gray');
    }
  }

  drawGuesses() {
    for (let i = 0; i < this.guesses.length; i += 1) {
      const guess = this.guesses[i];
      const opacity = i / this.guesses.length;
      this.drawHorizontalLine(guess.xRatio, guess.yRatio, guess.hash[this.encoding], opacity);
    }
  }

  drawVerticalLine(xRatio) {
    const x = this.zero.x - (this.width * xRatio);

    const grd = this.ctx.createLinearGradient(this.zero.x, this.zero.y, this.zero.x, this.yPad);
    grd.addColorStop(1, this.bgColor);
    grd.addColorStop(0, `rgba(0, 0, 0, ${1 - xRatio})`);

    this.ctx.beginPath();
    this.ctx.strokeStyle = grd;
    this.ctx.moveTo(x, this.zero.y);
    this.ctx.lineTo(x, this.zero.y - this.height);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawHorizontalLine(xRatio, yRatio, label, opacity = 1) {
    const x = this.zero.x - (this.width * xRatio);
    const y = this.zero.y - (this.height * yRatio);

    // Background
    const labelMetrics = this.ctx.measureText(label);
    this.ctx.fillStyle = 'rgba(249, 249, 251, 0.8)';
    this.ctx.fillRect(
        x + 27, y - 10,
        labelMetrics.width + 9, 19,
    );

    // Label
    this.ctx.direction = 'ltr';
    this.ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
    this.ctx.fillText('🠔' + label, x + 30, y + 4);
    //
    // // Point
    // this.ctx.beginPath();
    // this.ctx.strokeStyle = 'blue';
    // this.ctx.moveTo(x, y);
    // this.ctx.lineTo(x + 20, y);
    // this.ctx.stroke();
    // this.ctx.closePath();
  }

  drawEndCaps() {
    const leftGrd = this.ctx.createLinearGradient(100, 0, 300, 0);
    leftGrd.addColorStop(0, this.bgColor);
    leftGrd.addColorStop(1, 'rgba(255,255,255,0)');

    this.ctx.fillStyle = leftGrd;
    this.ctx.fillRect(0, this.yPad, this.xPad + this.width, this.height + 5);

    // Right
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(
        this.xPad + this.width,
        0,
        this.xPad * 2 + this.width,
        this.height + this.yPad * 2,
    );
  }
}

export default Graph;
