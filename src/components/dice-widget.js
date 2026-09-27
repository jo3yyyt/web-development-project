import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class DiceWidget extends LitElement {
  static styles = css`
  .dice-widget {
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

  #dice {
    font-size: 40px;
    margin-bottom: 10px;
  }

  button {
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
  }
`;


static get properties() {
  return {
    dice20: {type:Number},
    dice20m: {type:Number},
    diceTypes: { type: Array },
    selectedDice: { type: Number },
    numDice: { type: Number },
    results: { type: Array },
    total: { type: Number },
    modifier20: { type: Number },
    modifier: { type: Number }
  };
}

constructor() {
  super();
  this.dice20 = 0; //D20
  this.dice20m = 0; //D20 Total
  this.diceTypes = [4, 6, 8, 10, 12,]; // Damage Dice
  this.selectedDice = 6; // Default selected dice type
  this.numDice = 1; // Default number of dice
  this.results = []; // Array to store results of each die
  this.total = 0; // Total sum of all dice results
  this.modifier20 = 0; // D20 modifier
  this.modifier = 0; // Damage modifier

}
rollDice() {
  this.results = [];
  this.total = 0;
  for (let i = 0; i < this.numDice; i++) {
    const roll = Math.floor(Math.random() * this.selectedDice) + 1;
    this.results.push(roll);
    this.total += roll;
  }
  this.total += this.modifier;
}

rollDice20() {
  this.dice20 = Math.floor(Math.random() * 20) + 1;
  this.dice20m = this.modifier20 + this.dice20; 
}

render() {
    return html`
      <h1>D20 Rolls</h1>
      <p>Result: ${this.dice20}</p>
      <button @click=${this.rollDice20}>Roll Dice</button>
      <br>
      <label for="modifier20">Roll Modifier:</label>
      <input type="number" id="modifier20" value="${this.modifier20}" @input="${this.handleD20ModifierChange}">
      <br>
      <p>Roll Total: ${this.dice20m}</p>
      <h2>Damage Dice</h2>
      <label for="dice-type">Select Dice Type:</label>
      <select id="dice-type" @change="${this.handleDiceChange}">
        ${this.diceTypes.map(type => html`
          <option value="${type}" ?selected="${type === this.selectedDice}">d${type}</option>
        `)}
      </select>
      <br>
      <label for="num-dice">Number of Dice:</label>
      <input type="number" id="num-dice" min="1" value="${this.numDice}" @input="${this.handleNumDiceChange}">
      <br>
      <label for="modifier">Damage Modifier:</label>
      <input type="number" id="modifier" value="${this.modifier}" @input="${this.handleModifierChange}">
      <br>
      <button @click="${this.rollDice}">Roll Dice</button>
      <div class="results">
        <p>Results: ${this.results.join(', ')}</p>
        <p>Damage Total: ${this.total}</p>
      </div>
    `;
  }

  handleDiceChange(event) {
    this.selectedDice = parseInt(event.target.value);
  }

  handleNumDiceChange(event) {
    this.numDice = parseInt(event.target.value);
  }
  handleModifierChange(event) {
    this.modifier = parseInt(event.target.value);
  }
  handleD20ModifierChange(event) {
    this.modifier20 = parseInt(event.target.value);
  }
}

customElements.define('dice-widget', DiceWidget);