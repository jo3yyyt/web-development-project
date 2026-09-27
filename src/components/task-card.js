import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './edit-task.js';

class TaskCard extends LitElement {
  static properties = {
    id: 0,
    _task: {state: true},
  };

  static styles = css`
  :host {
    display: table-row;
  }
  
  ::slotted(td) {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
    td {
      border: 1px solid black; 
      border-collapse:collapse;
      padding: 8px; 
      text-align: left;
      overflow: hidden; 
      white-space: nowrap; 
      text-overflow: ellipsis; 
    }

    h2 {
      background-color: red;
      font-size: large;
      font-variant: small-caps;
    }
  
    button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    
    .tooltip {
      visibility: hidden;
      width: 50px;
      background-color: black;
      color: white;
      text-align: center;
      border-radius: 5px;
      padding: 5px;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      margin-left: -25px;
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    button:hover .tooltip {
      visibility: visible;
      opacity: 1;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    this._task = TaskModel.getTask(this.id);
  }

  render() {
    if (this._task) {
      const ts = new Date(parseInt(this._task.timestamp));
      const due = new Date(parseInt(this._task.due));
      return html`
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

        <td><h2>${this._task.summary}</h2></td>
        <td>${ts.toDateString()}</td>
        <td>${due.toDateString()}</td>
        <td>${this._task.text}</td>
        <td>${this._task.priority}</td>
        <td>
        <button onclick="${() => this._editTask()}">
          <i class='bx bxs-edit'></i>
          <span class="tooltip">Edit</span>
        </button>
      </td>
      `;
    } else {
      return html`<tr><td colspan="6">Loading...</td></tr>`;
    }
  }
}

customElements.define('task-card', TaskCard);
