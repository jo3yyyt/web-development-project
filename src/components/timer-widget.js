import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class TimerWidget extends LitElement {
  static styles = css`
    .timer-widget {
        display: block;
        width: 250px;
        height: 250px;
        border: 1px solid black;
        font-family: Arial, sans-serif;
        text-align: center;
        background: black;
    }
    #timer {
      font-size: 40px;
      margin-bottom: 60px;
      color: white;
      
      background: blue;
    }
  `;

  static get properties() {
    return {
      minutes: { type: Number }
    };
  }

  constructor() {
    super();
    this.minutes = 0;
    this.timerInterval = null;
  }

  render() {
    return html`
      <div class="timer-widget">
        <div id="timer">${this.formatTime()}</div>
        <input type="number" id="minutes" min="1" @input="${this.updateMinutes}" placeholder="Enter minutes">
        <button @click="${this.startTimer}">Start</button>
        <button @click="${this.pauseTimer}">Stop</button>
      </div>
    `;
  }

  formatTime() {
    const hours = Math.floor(this.minutes / 60);
    const minutes = Math.floor(this.minutes % 60);
    const seconds = 0;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  updateMinutes(e) {
    this.minutes = parseInt(e.target.value);
  }

  startTimer() {
    const total_time = this.minutes * 60;
    if (isNaN(total_time) || total_time <= 0) {
      alert('Please try again with a valid time.');
      return;
    }
    let time_remains = total_time;
    this.timer = setInterval(() => {
      time_remains--;
      const hours = Math.floor(time_remains / 3600);
      const minutes = Math.floor((time_remains % 3600) / 60);
      const seconds = time_remains % 60;
      const formatted_time = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
      this.shadowRoot.getElementById('timer').textContent = formatted_time; // Update displayed time
      if (time_remains === 0) {
        clearInterval(this.timer);
        alert('Time it\'s up!');
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.minutes = 0;
  }

  pad(number) {
    return (number < 10 ? '0' : '') + number;
  }
}

customElements.define('timer-widget', TimerWidget);
