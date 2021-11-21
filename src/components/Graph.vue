<template>
  <canvas id="graph"/>
</template>

<script>

import Num from '@/services/Num';

export default {
  props: {
    guesses: { type: Array },
    target: Num,
    localEncoding: String,
  },

  mounted() {
    this.screenHeight = document.documentElement.clientHeight;
    this.screenWidth = document.documentElement.clientWidth;

    const canvas = document.getElementById('graph');
    canvas.height = this.screenHeight;
    canvas.width = this.screenWidth;
    canvas.style.backgroundColor = this.bgColor;

    this.ctx = canvas.getContext('2d');
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.font = '16px Fira Code';

    this.xPad = this.screenWidth * 0.1;
    this.yPad = this.screenHeight * 0.05;

    this.width = this.screenWidth - (this.xPad * 2);
    this.height = this.screenHeight - (this.yPad * 2);

    // Shortcut for bottom right of graph where axis meet.
    this.zero = { x: this.screenWidth - this.xPad, y: this.screenHeight - this.yPad };

    this.setTicks(16);

    this.calcGraph();
    this.drawGraph();
  },
  data() {
    return {
      ctx: Object,
      bgColor: 'rgba(0, 0, 0, 0.2)',
      lineColor: 'white',
      textColor: 'white',
      winningColor: 'rgba(247, 148, 19, 1)',
      xPad: Number,
      yPad: Number,
      width: Number,
      height: Number,
      screenWidth: Number,
      screenHeight: Number,
      zero: Object,
      tickSpeed: 1 / 1280,
      ticks: [],
    };
  },

  methods: {
    // If num is 4 populate ticks with [0.0, 0.25, 0.5, 0.75].
    setTicks(num) {
      for (let i = 1; i < num + 1; i += 1) {
        this.ticks.push(num + i / num);
      }
    },

    clear() {
      this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    },

    drawXAxis() {
      const xGrd = this.ctx.createLinearGradient(this.xPad, this.zero.y, this.zero.x, this.zero.y);
      xGrd.addColorStop(0, this.bgColor);
      xGrd.addColorStop(1, this.lineColor);

      // X-axis.
      this.ctx.beginPath();
      this.ctx.strokeStyle = xGrd;
      this.ctx.moveTo(this.xPad, this.zero.y);
      this.ctx.lineTo(this.zero.x, this.zero.y);
      this.ctx.stroke();
      this.ctx.closePath();
    },
    drawYAxis() {
      const grd = this.ctx.createLinearGradient(this.zero.x, this.zero.y, this.zero.x, this.yPad);
      grd.addColorStop(1, this.bgColor);
      grd.addColorStop(0, 'white');

      this.ctx.beginPath();
      this.ctx.strokeStyle = grd;
      this.ctx.moveTo(this.zero.x, this.zero.y);
      this.ctx.lineTo(this.zero.x, this.zero.y - this.height);
      this.ctx.stroke();
      this.ctx.closePath();
    },

    drawTarget(yRatio) {
      const y = this.zero.y - (this.height * yRatio);

      const xGrd = this.ctx.createLinearGradient(this.xPad, y, this.zero.x, y);
      xGrd.addColorStop(0, this.bgColor);
      xGrd.addColorStop(1, this.winningColor);

      this.ctx.beginPath();
      this.ctx.strokeStyle = xGrd;
      this.ctx.moveTo(this.xPad, y);
      this.ctx.lineTo(this.zero.x - 80, y);
      this.ctx.stroke();
      this.ctx.closePath();

      this.ctx.direction = 'ltr';
      this.ctx.fillStyle = this.winningColor;
      this.ctx.fillText(
        'Target',
        this.zero.x - 80,
        this.zero.y - (this.height * yRatio) + 4,
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
        // eslint-disable-next-line no-param-reassign
        guesses[i].xRatio += this.tickSpeed;

        // Delete old guesses.
        if (guesses[i].xRatio > 3) {
          guesses.shift();
        }
      }
    },

    drawTicks() {
      for (let i = 0; i < this.ticks.length; i += 1) {
        const xRatio = this.ticks[i];
        const x = this.width - (this.width * xRatio);

        const grd = this.ctx.createLinearGradient(this.zero.x, this.zero.y, this.zero.x, this.yPad);
        grd.addColorStop(1, this.bgColor);
        grd.addColorStop(0, `rgba(255, 255, 255, ${0.5 - xRatio})`);

        this.ctx.beginPath();
        this.ctx.strokeStyle = grd;
        this.ctx.moveTo(this.xPad + x, this.zero.y);
        this.ctx.lineTo(this.xPad + x, this.zero.y - this.height);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    },

    drawGuesses(guesses) {
      for (let i = 0; i < guesses.length; i += 1) {
        const guess = guesses[i];

        // Fade out older guesses.
        let opacity = i / guesses.length;

        // Min val.
        opacity = opacity < 0.6 ? 0.6 : opacity;

        // Fade out all guess at edge of graph.
        if (guess.xRatio > 0.9) {
          opacity -= 1 - guess.xRatio;
        }

        this.drawGuess(
          guess.xRatio,
          guess.yRatio,
          guess.hash[this.localEncoding],
          opacity,
          guess.isHashValid
        );
      }
    },

    drawGuess(xRatio, yRatio, label, opacity = 1, isHashValid = false) {
      this.ctx.font = isHashValid ? '20px Fira Code' : '16px Fira Code';
      const arrowLabel = `${label}`;

      const x = this.zero.x - (this.width * xRatio);
      const y = this.zero.y - (this.height * yRatio);

      // Background
      const labelMetrics = this.ctx.measureText(arrowLabel);
      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(
        x - 2, y - 12,
        labelMetrics.width + 5, 20,
      );

      // Label
      this.ctx.direction = 'ltr';
      this.ctx.fillStyle = isHashValid ? `rgba(247, 148, 19, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;
      this.ctx.fillText(arrowLabel, x, y + 4);
    },


    drawEndCaps() {
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
      this.drawEndCaps();

      this.drawTarget(this.target.yRatio);
      this.drawYAxis();

      window.requestAnimationFrame(this.drawGraph);
    },
  },
};
</script>
