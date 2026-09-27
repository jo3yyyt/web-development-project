import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-container.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/task-manager.js';
import './components/task-card.js';
import './components/mood-widget.js';
import './components/dice-widget.js';

/**
 * Comp2110TaskManager component constructs the main UI of the application
 */
class Comp2110TaskManager extends LitElement {
  static properties = {
    header: {type: String},
  };

  static styles = css`
    :host {
      min-height: 100vh;   
      font-family: Figtree, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif;
      font-weight: 400;
      font-style: normal;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
    }

    main {
      display: flex;
      justify-content: space-between;
    }

    .kanit-semibold {
      font-family: "Kanit", sans-serif;
      font-weight: 600;
      font-style: normal;
      color: #0073EA;
      text-shadow: 0 0 8px #EF5350;
    }
  
    .kanit-thin {
      font-family: "Kanit", sans-serif;
      font-weight: 300;
      font-style: normal;
      color:rgba(255, 61, 61, 0) 60%;
    }

    header h1 {
      font-family: "Rubik Doodle Shadow", system-ui;
      font-weight: 400;
      font-style: normal;
      text-align:left;
      color:black;
    }

    login-widget {
      display: block; 
      background-color: rgb(235, 214, 135); 
      width: 100%;  
      box-sizing: border-box; 
      padding: 5px 50px;  
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  constructor() {
    super();
    this.header = 'COMP2110 Task Management Tools';
  }

  render() {
    return html`
      <header>
        <h1><span class="kanit-semibold">COMP 2110</span><span class="kanit-thin">Task Management Tools</h1>
      </header>

      <main>      
        <task-manager></task-manager> 
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}


customElements.define('comp2110-task-manager', Comp2110TaskManager);
