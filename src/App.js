import React from 'react';
import './App.css';
import Form from './Components/Form';
import OutputMoves from './Components/OutputMoves';
import Decoration from './Components/decoration';
import BottomDecoration from './Components/BottomDecoration';
import './scss/app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movementLimits: [1, -1, 2, -2], // limits of possible movement on each axis
      axisX: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      availableMoves: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAllMoves = this.getAllMoves.bind(this);
    this.getAllAvailableMoves = this.getAllAvailableMoves.bind(this);
  }

  /*
    extracts X/Y coordinates,
    gathers all theoretically possible moves,
    passes data to resolver
  */
  handleSubmit(e) {
    e.preventDefault();
    const inputValue = e.target.elements[0].value;
    const startCoordsY = parseInt(inputValue[1]);
    const startCoordsX = this.state.axisX.indexOf(inputValue[0]) + 1;
    const xAxisMoves = this.getAllMoves(startCoordsX);
    const yAxisMoves = this.getAllMoves(startCoordsY);
    this.getAllAvailableMoves(startCoordsX, startCoordsY, xAxisMoves, yAxisMoves);
    e.target.elements[0].focus();
  }

  /*
    recieves initial coords,
    evaluates theoretically possible moves(*tpm*)
  */

  getAllMoves(coordinates) {
    const moves = [];
    this.state.movementLimits.map(move => (((coordinates - move > 0) && (coordinates - move < 9))
      ? moves.push(coordinates - move) : null));
    return moves;
  }

  /*
    recieves initial coords & tpm,
    evaluates module number of total movement X+Y axis, should be equal to 3,
    pushes to state converted (X axis number => letter) data,
    compensates index to reverse Y numbers from top to bottom;
  */

  getAllAvailableMoves(startCoordsX, startCoordsY, xAxisMoves, yAxisMoves) {
    const gotAllMoves = [];
    xAxisMoves.map(i => yAxisMoves.map(j => ((Math.abs(startCoordsX - i) + Math.abs(startCoordsY - j) === 3)
      ? gotAllMoves.push([this.state.axisX[i - 1], j + 1]) : null)));
    this.setState({ availableMoves: gotAllMoves.map(i => i[0] + i[1]) });
  }

  render() {
    return (
      <div className="app">
        <h1>Where does the knight step?</h1>
        <Decoration />
        <Form handleSubmit={this.handleSubmit} />
        {this.state.availableMoves.length ? <OutputMoves data={this.state.availableMoves} /> : <h3>Input correct data:(A1 - H8)</h3>}
        <BottomDecoration />
      </div>
    );
  }
}

export default App;
