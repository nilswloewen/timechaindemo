<template>
  <canvas :id="this.id"/>
</template>

<script>

  export default {
    props: {
      id: String,
      guesses: [],
      target: Object,
      encoding: String,
    },

    mounted() {
      this.bgColor = '#f9f9fb';

      const canvasHeight = document.documentElement.clientHeight;
      const canvasWidth = document.documentElement.clientWidth;

      const canvas = document.getElementById(this.id);
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
      this.zero = { x: this.width + this.xPad + this.xPad, y: this.height + this.yPad};

      this.tickSpeed = 1 / 1280;
      this.ticks = [];
      this.setTicks(16);

      this.calcGraph();
      this.drawGraph();
    },
    data() {
      return {
        ctx: Object,
        bgColor: '#f9f9fb',
        xPad: Number,
        yPad: Number,
        width: Number,
        height: Number,
        zero: Object,
        tickSpeed: 1 / 1280,
        ticks: [],
      }
    },

    methods: {
      // If num is 4 populate ticks with [0.0, 0.25, 0.5, 0.75].
      setTicks(num) {
        for (let i = 1; i < num + 1; i += 1) {
          this.ticks.push(num + i / num);
        }
      },

      clear() {
        this.ctx.clearRect(0, 0, this.width + this.xPad * 2, this.height + this.yPad * 2);
      },

      drawXAxis() {
        const xGrd = this.ctx.createLinearGradient(this.xPad, this.zero.y, this.width, this.zero.y);
        xGrd.addColorStop(0, this.bgColor);
        xGrd.addColorStop(1, 'black');

        // X-axis.
        this.ctx.beginPath();
        this.ctx.strokeStyle = xGrd;
        this.ctx.moveTo(this.xPad, this.zero.y);
        this.ctx.lineTo(this.xPad + this.width + this.xPad, this.zero.y);
        this.ctx.stroke();
        this.ctx.closePath();
      },
      drawYAxis() {
        this.drawVerticalLine(0);
      },

      drawTarget(yRatio) {
        this.ctx.direction = 'ltr';
        this.ctx.fillStyle = 'green';
        this.ctx.fillText(
          '🠔Target',
          this.zero.x + 3,
          this.zero.y - (this.height * yRatio) + 4
        );
      },

      calcTicks() {
        for (let i = 0; i < this.ticks.length; i += 1) {
          this.ticks[i] += this.tickSpeed;
          this.ticks[i] %= 1;
        }
      },

      calcGuesses(guesses) {
        for (let i = 0; i < guesses.length; i += 1) {
          guesses[i].xRatio += this.tickSpeed;

          // Delete old guesses.
          if (guesses[i].xRatio > 3) {
            guesses.shift();
          }
        }
      },

      drawTicks() {
        for (let i = 0; i < this.ticks.length; i += 1) {
          this.drawVerticalLine(this.ticks[i], 'gray');
        }
      },

      drawGuesses(guesses) {
        for (let i = 0; i < guesses.length; i += 1) {
          const guess = guesses[i];
          const opacity = i / guesses.length;
          this.drawHorizontalLine(guess.xRatio, guess.yRatio, guess.hash[this.encoding], opacity);
        }
      },

      drawVerticalLine(xRatio) {
        const x = this.zero.x - (this.width * xRatio);

        const grd = this.ctx.createLinearGradient(this.zero.x, this.zero.y, this.zero.x, this.yPad);
        grd.addColorStop(1, this.bgColor);
        grd.addColorStop(0, `rgba(0, 0, 0, ${0.5 - xRatio})`);

        this.ctx.beginPath();
        this.ctx.strokeStyle = grd;
        this.ctx.moveTo(x, this.zero.y);
        this.ctx.lineTo(x, this.zero.y - this.height);
        this.ctx.stroke();
        this.ctx.closePath();
      },

      drawHorizontalLine(xRatio, yRatio, label, opacity = 1) {
        const arrowLabel = '🠔' + label;

        const x = this.zero.x - (this.width * xRatio);
        const y = this.zero.y - (this.height * yRatio);

        // Background
        const labelMetrics = this.ctx.measureText(arrowLabel);
        this.ctx.fillStyle = 'rgba(249, 249, 251, 0.8)';
        this.ctx.fillRect(
          x - 2, y - 12,
          labelMetrics.width + 5, 20,
        );

        // Label
        this.ctx.direction = 'ltr';
        this.ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        this.ctx.fillText(arrowLabel, x, y + 4);
      },

      drawEndCaps() {
        const leftGrd = this.ctx.createLinearGradient(100, 0, 300, 0);
        leftGrd.addColorStop(0, this.bgColor);
        leftGrd.addColorStop(1, 'rgba(249,249,251,0)');

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
      },

      calcGraph() {
        this.calcTicks();
        this.calcGuesses(this.guesses);
        setTimeout(this.calcGraph, 25);
      },
      drawGraph() {
        this.clear();
        this.drawXAxis();

        this.drawGuesses(this.guesses);
        this.drawTicks();
        // this.drawEndCaps();

        this.drawTarget(this.target.yRatio);
        this.drawYAxis();

        window.requestAnimationFrame(this.drawGraph);
      },
    }
  };
</script>
