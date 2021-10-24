import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function shallowCopy(o) {
  return JSON.parse(JSON.stringify(o));
}

function OpenAllCell(props) {
  return (
    <button onClick={props.handleClearAllClick}>
      Open all
    </button>
  )
}

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

  openAll(cells) {
    return cells.map(c => {
      c.status = 'opened';
      return c;
    })
  }

  shallowCopy(o) {
    return JSON.parse(JSON.stringify(o));
  }

  handleClick(i) {
    console.log(`${i} clicked. status: ${this.state.cells[i].status}`);
    let cells = shallowCopy(this.state.cells);
    cells[i].status = 'opened';
    if (this.state.cells[i].bomb) {
      cells[i].bomb = true;
      cells = this.openAll(cells);
    }
    this.setState({cells: cells});
  }

  handleClearAllClick() {
    let cells = shallowCopy(this.state.cells);
    cells = this.openAll(cells);
    this.setState({cells: cells});
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

  renderClearAllCell() {
    return (
      <OpenAllCell
        // handleClearAllClick={() => this.handleClearAllClick()} // this works too
        handleClearAllClick={this.handleClearAllClick.bind(this)}
      />
    )
  }

  render() {
    return (
      <>
        <div className="grid-container">
          {this.state.cells.map(c => this.renderCell(c.name))}
          {/* {this.renderClearAllCell()} */}
        </div>
        <div>
          {this.renderClearAllCell()}
        </div>
      </>
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
