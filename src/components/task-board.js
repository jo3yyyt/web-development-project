import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './task-card.js';

/**
 * TaskBoard <task-board category="XXX">
 * Display tasks in the given category
 */
class TaskBoard extends LitElement {
  static properties = {
    category: {},
    _tasks: {state: true},
    _collapsed: {state: true},
    _filter: {type:String, state:true},
    _order: {type: String, state: true},
    _showFilters: {type: Boolean, state:true}
  };

  static styles = css`
    :host {
      display: block;
      max-width: 100%;
      background-color: rgba(255,255,255,0.8);
      color: #003000;
      border-radius: 10px;  
      margin: 0.2rem;
      padding: 0.5rem; 
    }

    table {
      width: 100%; 
      border-collapse: collapse; 
    }

    th, td {
      border: 1px solid black; 
      padding: 8px; 
      text-align: left;
      overflow: hidden; 
      white-space: nowrap;
      text-overflow: ellipsis; 
    }

    th {
      background-color: #f4f4f4; 
      font-weight: bold;
    }

    .category-name {
      font-size: 40px; 
      font-weight: bold; 
      display: block; 
    }
    
    h3 {
      font-size: 30px; // Increased font size
      background-color: rgba(255, 255, 255, 0.8);
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 1s ease;
    }

    :host input {
        width: 5em;
    }
   
    .filter-controls {
      text-align: right;
    }
    .show-filters .filter-controls {
      display: block;
    }

    .category-todo {
      color: rgb(223, 47, 74);
    }
    
    .category-doing {
      color: rgb(253, 171, 61);
    }
    
    .category-done {
      color: rgb(0, 200, 117);
    }

    .center-align {
      padding-left: 50%; 
      transform: translateX(-60%); 
      transition: padding-left 0.8s ease,
    }
    
    .left-align {
      padding-left: 0; 
      transform: translateX(0); 
      transition: padding-left 0.8s ease, transform 0.7s ease; 
    }

    .filter-button {
      text-align: right; 
      width: 100%; 
      padding: 10px 0; 
  }
    .show-filters .filter-controls {
      display: block;
  }
  .tooltip {
    visibility: hidden;
    width: auto;
    background-color: black; 
    color: white;
    text-align: center;
    border-radius: 4px;
    padding: 5px 10px;
    position: absolute; 
    z-index: 1;
    bottom: 120%; 
    left: 50%; 
    transform: translateX(-50%); 
    opacity: 0;
    transition: opacity 0.3s ease; 
  }
  
  button:hover .tooltip {
    visibility: visible; /* Make tooltip visible on hover */
    opacity: 1; /* Fade in effect */
  }
  `;

  constructor() {
    super();
    this._collapsed = true;
    this._filter = 'priority';
    this._order='asc';
    this._showFilters=false;
    // set an event listener to refresh the display when the data is ready
    window.addEventListener('tasks', () => {
      console.log(this.category);
      this._loadData();
    });
  }

  _toggleCollapse() {
    this._collapsed = !this._collapsed;
    this._showFilters = false;
    this.requestUpdate(); // Request an update to re-render the element
  }

  _toggleFilterVisibility() {
    this._showFilters = !this._showFilters;
    this.requestUpdate();
  }

  _loadData() {
    // get the up to date task list
    this._tasks = TaskModel.getTasks(this.category);
    this.requestUpdate();
    this._applyFilter();
  }

  _applyFilter() {
    if (!this._tasks) return;
    const multiplier = this._order === 'asc' ? 1 : -1;
    this._tasks.sort((a, b) => {
      const aValue = a[this._filter];
      const bValue = b[this._filter];
      if (aValue < bValue) return -1 * multiplier;
      if (aValue > bValue) return 1 * multiplier;
      return 0;
    });
  }

  _changeFilter(newFilter) {
    this._filter = newFilter;
    this._applyFilter();
    this.requestUpdate();
  }

  _changeOrder(newOrder) {
    this._order = newOrder;
    this._applyFilter();
    this.requestUpdate();
  }

  _addTask() {
    TaskModel.addTask(this.category);
    this._loadTasks();
  }

  _deleteTask(taskId) {
    TaskModel.deleteTask(taskId);
    this._loadTasks();
  }
  
 render() {
    let categoryClass = '';
    switch(this.category) {
        case 'ToDo':
            categoryClass = 'category-todo';
            break;
        case 'Doing':
            categoryClass = 'category-doing';
            break;
        case 'Done':
            categoryClass = 'category-done';
            break;
    }
    
    const taskCount = this._tasks ? this._tasks.length : 0;
    const displayTasks = !this._collapsed ? `${this.category} (${taskCount} tasks)` : this.category;
    const alignmentClass = this._collapsed ? 'left-align' : 'center-align' ;

    return html`
    <h3 @click="${this._toggleCollapse}" class="${categoryClass} ${alignmentClass}">
      <span class="category-name">${displayTasks}</span>
    </h3>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    
    ${!this._collapsed ? html`

      <div class="filter-button">
        <button @click="${this._toggleFilterVisibility}"><i class='bx bx-filter' style="font-size: 30px;"></i></button>
      </div>

      <div class="filter-controls ${this._showFilters ? 'show-filters' : ''}">
        <button @click="${() => this._changeFilter('priority')}">Priority</button>
        <button @click="${() => this._changeFilter('due')}">Due Date</button>
        <button @click="${() => this._changeFilter('created')}">Date Created</button>
        <button @click="${() => this._changeOrder('asc')}">Ascending</button>
        <button @click="${() => this._changeOrder('desc')}">Descending</button>
      </div>
      
        <table>
          <thead>
            <tr>
              <th style="width: 20%;">Task</th>
              <th style="width: 15%;">Date Created</th>
              <th style="width: 15%;">Due Date</th>
              <th style="width: 30%;">Description</th>
              <th style="width: 10%;">Priority</th>
              <th style="width: 10%;">Edit</th>
            </tr>
          </thead>

          <tbody>
            ${this._tasks.map(task => html`
              <task-card id=${task.id}></task-card>
              <td><button @click="${() => this._deleteTask(task.id)}"><i class='bx bxs-trash-alt' ></i></button></td>
            `)}
          </tbody>
          
        </table>
        <button @click="${this._addTask}"><i class='bx bxs-book-add' style="font-size: 26px;"></i></button>
      ` : ''}
    `;
}

}

customElements.define('task-board', TaskBoard);
