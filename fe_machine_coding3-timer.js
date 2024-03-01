const hourEl = document.getElementById("hour");
const minEl = document.getElementById("min");
const secEl = document.getElementById("sec");

const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const resetButton = document.getElementById("reset-btn");

const service = {
  hour: 0,
  min: 0,
  sec: 0,
  timerId: null,
  startTimer: function () {
    if (this.timerId) return;
    this.timerId = setInterval(() => {
      this.sec += 1;

      if (this.sec === 60) {
        this.min += 1;
        this.sec = 0;
      }

      if (this.min === 60) {
        this.hour += 1;
        this.min = 0;
      }

      this.reRenderState();
    }, 1000);
  },
  reRenderState: function () {
    secEl.innerText = this.sec;
    minEl.innerText = this.min;
    hourEl.innerText = this.hour;
  },
  stopTimer: function () {
    if (!this.timerId) return;
    clearInterval(this.timerId);
    this.timerId = null;
  },
  resetTimer: function () {
    this.stopTimer();
    this.hour = 0;
    this.min = 0;
    this.sec = 0;
    this.timerId = null;
    this.reRenderState();
  },
};

startButton.addEventListener("click", () => {
  service.startTimer();
});

stopButton.addEventListener("click", function () {
  service.stopTimer();
});

resetButton.addEventListener("click", function () {
  service.resetTimer();
});
