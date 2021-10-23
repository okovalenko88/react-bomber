import logo from './logo.svg';
import './App.css';
import React from 'react';

function Cell(props) {
  let cls = 'grid-button-item'
  if (props.status === 'opened') {
    cls = 'grid-button-item-opened'
    if (props.bomb) {
      cls = 'grid-button-item-bomb'
    }
  }

  return (
    <button className = {cls}
       onClick={props.handleClick}>
      {props.name}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: this.generateCells()
    }
  }

  bombExpoded() {
    const cells = this.state.cells.map(c => {
      c.status = 'opened';
      return c;
    })
  }

  handleClick(i) {
    console.log(`${i} clicked. status: ${this.state.cells[i].status}`);
    const cells = this.state.cells.slice();
    cells[i].status = 'opened';
    if (this.state.cells[i].bomb) {
      cells[i].bomb = true;
      this.bombExpoded();
    }
    this.setState({cells: cells});
    // console.log(`${this.state.cells[i].name} clicked. Status: ${this.state.cells[i].status}`);
  }

  generateCells() {
    const size = 3;
    const cellMax = size**2;
    const bombIdx = Math.floor(Math.random() * (cellMax-1))
    if (size%3 != 0) {
      const errMsg = `Error: grid size ${size} should be divisible to 3`
      return (
        <div>
          {errMsg}
        </div>
      )
    }
    let cells = [];
    for (let i = 0; i < cellMax; i++) {
      cells.push({name: i, status: 'closed', bomb: i == bombIdx ? true : false});
    }
    return cells;
  }

  renderCell(i) {
    return (
      <Cell 
        name={this.state.cells[i].name} 
        status={this.state.cells[i].status}
        bomb={this.state.cells[i].bomb}
        handleClick={() => this.handleClick(i)}
      />
    )
  }

  render() {
    return (
      <div className="grid-container">
        {this.state.cells.map(c => this.renderCell(c.name))}
      </div>
    )
  }
}

function App() {
  return (
    <div>
      <Board/>
    </div>
  )
}

export default App;
