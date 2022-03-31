import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Step 7.1: Replace the square class with a function
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // Step 10.2: delete the constructor in the board component

  renderSquare(i) {
    // Step 1.1: add 'value={i}'
    return (
      <Square
        // Step 10.3: Replace this.state.squares[i] with this.props.squares[i]
        value={this.props.squares[i]}
        // Step 10.4: Replace this.handleClick(i) with this.props.onClick(i)
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // Step 10.8: Remove the code from the boards render

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  // Step 10.1: add a constructor to the game class
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  // Step 10.9: move the handleCLick from the board component to the game component and update it
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  // Step 10.5: Update the render function
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          {/* Step 10.6: Add props to the board component */}
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          {/* Step 10./7: add the status to the div below */}
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// Step 9: helper function to declare a winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

// ========================================

/* 
NOTES:

Step 1:
    - Passing a prop

Step 2: 
    - Adding a click event to the square button

Step 3: 
    - State
    - We need the button click to "remember" that it was click so we add an "X"
    - To "remember" things, components use "STATE"
    - setState() is the same as .innerHTML 

Step 4:
    - Lifting state
    - We need the squares to communicate with each other so we'll do that by passing props from the parent (board) to the children (squares)

Step 5: 
    - change what happens when a Square is clicked

Step 6: 
    - Create the handleClick() function 

Step 7: 
  - function components

Step 8: 
  - Taking turns
  - Adding 'O's

Step 9: 
  - Declaring a winner

IMPORTANT NOTES:
    -In React, it’s conventional to use on[Event] names for props which represent events and handle[Event] for the methods which handle the events.

*/
