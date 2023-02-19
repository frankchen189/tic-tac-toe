import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Function component
function Square(props) {
    return (
        <button className="square"
            onClick={props.onClick}  // event handler
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)} // prop
            />
        );
    }

    render() {
        return (
            <div>
                <div>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];

        const winner = calculateWinner(current.squares);
        if (winner) {
            console.log('Winner: ' + winner);
        } else {
            console.log('Next player: ' + (this.state.xIsNext ? 'X' : 'O'));
        }

        const squares = current.squares.slice();
        // Can't click a previously-clicked square.
        if (squares[i]) {
            return;
        }

        // Early return.
        if (calculateWinner(squares)) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState(
            {
                history: history.concat([{
                    squares: squares,
                }]),
                xIsNext: !this.state.xIsNext,
            }
        );

    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];

        return (
            <div className="game">
                <Board 
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
        );

    }   
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
    /**
        [
            0,1,2,
            3,4,5,
            6,7,8
        ]
    */
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // For each possibility, check if it consists of one player only.
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}
