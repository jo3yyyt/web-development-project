import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './task-board.js';
import './login-widget.js';
import './widget-block.js';
import './blog-block.js';
import './widget-container.js';
import './ad-widget.js';
import './login-widget.js';
import './task-manager.js';
import './task-card.js';
import './mood-widget.js';
import './timer-widget.js';
import './dice-widget.js';

 
/**
 * TaskManager <task-manager>
 * Display a set of task boards for three categories of task
 * Todo, Doing and Done
 */
class TaskManager extends LitElement {
  static properties = {
    _tasks: {state: true},
    _message: {state: true},
    _leftBoxCollapsed: { type: Boolean, state: true }, 
  };

  static styles = css`
  :host {
    display: block; 
    height: 200vh; 
    display:flex;
    justify-content: center;
    align-items:center; 
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 4fr; 
    gap: 20px;
    padding: 20px;
    height: calc(100% - 40px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: grid-template-columns 0.3s ease; 

  .left-box {
    background-color: rgba(255,255,255,1);
    padding: 20px;
    border-radius: 5px;

    .task-manager {
    display: flex;
    grid-template-rows: auto; 
    gap: 10px; 
    }

    @media (max-width: 1000px) {
    .container {
      grid-template-columns: 1fr;
    }
  }

  .left-box.collapsed {
    width: 20px; 
    padding: 20px 0; 
  }
  
  .container.left-collapsed {
    grid-template-columns: 20px 1fr; 
  }

  .right-box {
    padding: 20px;
    border-radius: 5px;
    width: 100%; 
  }
  

  .toggle-collapse {
    cursor: pointer;
    padding: 10px;
    font-size: 24px; 
    user-select: none; 
  }


  p {
    font-size: 60px; 
    font-weight: bold; 
    text-align: left; 
    background-color: rgba(255, 255, 255, 0.5); 
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 20px; 
}

  h3 {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 5px;
    border-radius: 5px;
  }

  .task-board {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    width: 30%;
    float: left;
  }
  `;

  constructor() {
    super();
    this._leftBoxCollapsed = false;
    // trigger loading of task data
    TaskModel.loadData();
  }

  connectedCallback() {
    super.connectedCallback();
  }
  _toggleLeftBox() {
    this._leftBoxCollapsed = !this._leftBoxCollapsed;
  }
  
  render() {
    return html`
    <head>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    </head>

    <div class="container ${this._leftBoxCollapsed ? 'left-collapsed' : ''}">
      <div class="left-box ${this._leftBoxCollapsed ? 'collapsed' : ''}">
        <span class="toggle-collapse" @click="${this._toggleLeftBox}">${this._leftBoxCollapsed ? '>' : '<'}</span>
        ${!this._leftBoxCollapsed ? html`
          <login-widget></login-widget>
          <widget-container header="Widgets">
            <ad-widget></ad-widget>
            <mood-widget></mood-widget>
            <timer-widget></timer-widget>
            <dice-widget></dice-widget>
          </widget-container>
        ` : ''}
      </div>

      <div class="right-box">
      <p style="font-size:40px; text-align:left; color: rgba(255, 61, 61, 0) 60%; font-weight: bold; text-shadow: 0 0 8px #C267EC;">
        <i class='bx bxs-calendar-star'></i>Status </p>
      
        <div class="task-manager">
          <task-board category='ToDo'></task-board>
          <task-board category='Doing'></task-board>
          <task-board category='Done'></task-board>
        </div>

      </div>
    </div>`;
        
  }
}

customElements.define('task-manager', TaskManager);
