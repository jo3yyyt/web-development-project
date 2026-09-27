import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {BASE_URL} from '../config.js';

class MoodWidget extends LitElement {
    static styles = css`
    :host {
      --happy-image: url('https://static.vecteezy.com/system/resources/previews/011/765/527/non_2x/smiley-face-seamless-pattern-design-cute-colorful-retro-doodle-emoji-smile-background-free-vector.jpg');
      --sad-image: url('https://static.vecteezy.com/system/resources/previews/036/107/891/original/seamless-pattern-of-blue-balloons-with-sad-face-design-concept-for-greetings-or-invitation-cards-vector.jpg');
      --excited-image: url('https://static.vecteezy.com/system/resources/previews/002/449/749/non_2x/yellow-bright-stars-sparkle-seamless-pattern-background-free-vector.jpg');
      --calm-image: url('https://static.vecteezy.com/system/resources/previews/002/194/347/non_2x/calm-color-texture-from-smooth-rounded-shapes-of-lines-and-spirals-in-pastel-colors-seamless-pattern-for-decorating-blue-fabric-or-wrapping-paper-with-light-lines-vector.jpg');
      --worried-image: url('https://static.vecteezy.com/system/resources/previews/020/675/255/original/round-abstract-comic-faces-with-sad-emotions-unhappy-faces-upset-emoji-face-seamless-background-pattern-vector.jpg');
    }
    .mood-widget {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 250px;
      height: 250px;
      border: 1px solid black;
      background-size: cover;
      background-position: center;
      font-family: "Kanit", sans-serif;
      font-weight: 700;
      font-style: normal;
      font-size: 18px;
    }
    .happy {
      background-image: var(--happy-image);
      text-shadow: -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white, 1px 1px 2px white;
    }
    .sad {
      background-image: var(--sad-image);
      text-shadow: -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white, 1px 1px 2px white;
    }
    .excited {
      background-image: var(--excited-image);
      text-shadow: -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white, 1px 1px 2px white;
    }
    .calm {
      background-image: var(--calm-image);
      text-shadow: -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white, 1px 1px 2px white;
    }
    .worried {
      background-image: var(--worried-image);
      color: white;
      text-shadow: -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black, 1px 1px 2px black;
    }
    `;
    constructor() {
      super();
      this.taskCounts = {
        todo: 0,
        doing: 0,
        done: 0
      };
    }
    render() {
      const mood = this.calculateMood();
      return html`
        <div class="mood-widget ${mood}">
          <p>${this.getHeader()}</p>
          <p>${this.getMoodMessage(mood)}</p>
        </div>
      `;
    }
    getTimeOfDay() {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return 'Morning';
      else if (hour >= 12 && hour < 17) return 'Afternoon';
      else if (hour >= 17 && hour < 20) return 'Evening';
      else return 'Night';
    }
    getDayOfWeek() {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[new Date().getDay()];
    }
    calculateMood() {
      /* The code snippet `const hour = new Date().getHours(); const dayOfWeek = new Date().getDay();
      const tasks = this.taskCounts.todo + this.taskCounts.inProgress + this.taskCounts.done;` is
      performing the following actions: */
      const timeOfDay = this.getTimeOfDay();
      const dayOfWeek = this.getDayOfWeek();
      const tasksToDo = this.taskCounts.todo; 
      const tasks = this.taskCounts.todo + this.taskCounts.doing + this.taskCounts.done;
  
      if (timeOfDay === 'Morning' && dayOfWeek === 'Friday' && this.taskCounts.todo === 0) {
        return 'happy';
      } else if (timeOfDay === 'Night') {
        return 'calm';
      } else if (tasksToDo > 5) {
        return 'worried';
      } else {
        return 'excited';
      }
    }
    getHeader() {
      const timeOfDay = this.getTimeOfDay();
      const dayOfWeek = this.getDayOfWeek();
      return `It's ${timeOfDay} on ${dayOfWeek}`;
    }
    getMoodMessage(mood) {
      if (mood === 'happy') return 'It\'s Friday and no more Todo tasks!';
      else if (mood === 'calm') return 'It\'s night time. Relax!';
      else if (mood === 'worried') return 'You have many tasks to do. Prioritize and stay focused!';
      else return 'Enjoy your day!';
    }
}

customElements.define('mood-widget', MoodWidget);