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
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];

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
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
            }
        );

    }

    jumpTo(step) {
        this.setState(
            {
                stepNumber: step,
                xIsNext: (step % 2) === 0,
            }
        );
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            );
        });

        const winner = calculateWinner(current.squares);
        if (winner) {
            console.log('Winner: ' + winner);
        } else {
            console.log('Next player: ' + (this.state.xIsNext ? 'X' : 'O'));
        }

        return (
            <div className="game">
                <Board 
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
                <ol>{moves}</ol>
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
