<template>
<canvas :id="id"/>
</template>

<script>
import Num from '@/services/Num';

export default {
  props: {
    animate: Boolean,
    guesses: Array,
    id: String,
    localEncoding: String,
    target: Num,
  },

  mounted() {
    this.screenHeight = document.documentElement.clientHeight;
    this.screenWidth = document.documentElement.clientWidth;

    const canvas = document.getElementById(this.id);
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

    if (this.animate) {
      this.setTicks(16);
      this.calcGraph();
      this.drawGraph();
      return;
    }

    this.drawGraph();
  },
  data() {
    return {
      bgColor: 'transparent',
      ctx: Object,
      height: Number,
      lineColor: 'white',
      screenHeight: Number,
      screenWidth: Number,
      textColor: 'white',
      tickSpeed: 1 / 1280,
      ticks: [],
      width: Number,
      winningColor: 'rgba(247, 148, 19, 1)',
      xPad: Number,
      yPad: Number,
      zero: Object,
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
      let xGrd = this.ctx.createLinearGradient(this.xPad, this.zero.y, this.zero.x, this.zero.y);
      xGrd.addColorStop(0, this.bgColor);
      xGrd.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
      xGrd.addColorStop(1, this.bgColor);

      // Top.
      this.ctx.beginPath();
      this.ctx.strokeStyle = xGrd;
      this.ctx.moveTo(this.xPad, this.yPad);
      this.ctx.lineTo(this.zero.x, this.yPad);
      this.ctx.stroke();
      this.ctx.closePath();

      // Bottom.
      xGrd = this.ctx.createLinearGradient(this.xPad, this.zero.y, this.zero.x, this.zero.y);
      xGrd.addColorStop(0, this.bgColor);
      xGrd.addColorStop(1, this.lineColor);

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
      this.ctx.lineTo(this.zero.x - 74, y);
      this.ctx.stroke();
      this.ctx.closePath();

      if (y > (this.zero.y - 20)) {
        this.ctx.fillStyle = 'blue';
        this.ctx.clearRect(this.zero.x - 6, this.zero.y + 2, -60, -4);
      }

      this.ctx.font = 'bold 16px Fira Code';
      this.ctx.direction = 'ltr';
      this.ctx.fillStyle = this.winningColor;
      this.ctx.fillText('Target', this.zero.x - 64, y + 6);
    },

    drawMinMax() {
      this.ctx.font = '16px Fira Code';

      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      this.ctx.fillText('Max', this.zero.x - 14, this.yPad - 10);

      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      this.ctx.fillText('Min 0', this.zero.x - 14, this.zero.y + 24);
    },

    calcTicks() {
      for (let i = 0; i < this.ticks.length; i += 1) {
        this.ticks[i] += this.tickSpeed;
        this.ticks[i] %= 1;
      }
    },

    calcGuesses(guesses) {
      for (let i = 0; i < guesses.length; i += 1) {
        const guess = guesses[i];
        guess.xRatio += this.tickSpeed;

        let x = this.zero.x - (this.width * guess.xRatio);
        const labelMetrics = this.ctx.measureText(guess.hash[this.localEncoding]);
        let backOfLabel = x + labelMetrics.width;

        // Ensure opacity is never greater than 1.
        if (backOfLabel > this.width) {
          backOfLabel = this.width;
        }

        guess.opacity = backOfLabel / this.width;
        guess.opacity -= 0.3;

        // Delete guess when the right side of it passes xPad.
        if (guess.opacity < 0) {
          guesses.shift();
        }
      }

      // Make latest guess brightest.
      if (guesses.length > 0) {
        guesses[guesses.length - 1].opacity = 1;
      }
    },
    drawTicks() {
      for (let i = 0; i < this.ticks.length; i += 1) {
        const xRatio = this.ticks[i];
        const x = this.width - (this.width * xRatio);

        const grd = this.ctx.createLinearGradient(this.zero.x, this.zero.y, this.zero.x, this.yPad);
        grd.addColorStop(1, this.bgColor);
        grd.addColorStop(0, `rgba(255, 255, 255, ${ 0.5 - xRatio })`);

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

        this.drawGuess(
          guess.xRatio,
          guess.yRatio,
          guess.hash[this.localEncoding],
          guess.opacity,
          guess.isHashValid,
        );
      }
    },

    drawGuess(xRatio, yRatio, label, opacity, isHashValid = false) {
      let x = this.zero.x - (this.width * xRatio);
      const y = this.zero.y - (this.height * yRatio);

      if (!this.animate) {
        x -= 34;
      }

      // Label
      this.ctx.direction = 'ltr';
      this.ctx.font = '16px Fira Code';
      this.ctx.fillStyle = isHashValid ? `rgba(247, 148, 19, ${ opacity })` : `rgba(255, 255, 255, ${ opacity })`;
      this.ctx.fillText(label, x, y + 4);
    },

    drawEndCaps() {
      // Left pad.
      this.ctx.clearRect(0, this.zero.y + 8, this.xPad, -(this.height + 18));
      // Right pad.
      this.ctx.clearRect(this.zero.x + 1, this.zero.y + 8, this.xPad, -(this.height + 18));
    },

    calcGraph() {
      this.calcTicks();
      this.calcGuesses(this.guesses);
      setTimeout(this.calcGraph, 25);
    },
    drawGraph() {
      this.clear();
      this.drawXAxis();
      this.drawYAxis();
      this.drawMinMax();

      this.drawTarget(this.target.yRatio);
      this.drawGuesses(this.guesses);
      this.drawTicks();
      this.drawEndCaps();

      window.requestAnimationFrame(this.drawGraph);
    },
  },
};
</script>
