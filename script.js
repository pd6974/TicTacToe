function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create a 2d array that will represent the state of the game board
    // For this 2d array, row 0 will represent the top row and
    // column 0 will represent the left-most column.
    // This nested-loop technique is a simple and common way to create a 2d array.
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    // This will be the method of getting the entire board that our
    // UI will eventually need to render it.
    const getBoard = () => board;

    // This method will place a mark on the board, 
    // but we'll need to check that it is empty first
    const placeMark = (row, column, player) => {
        const location = board[row][column].getValue();
        if (location == 0) {
            board[row][column].addToken(player.token);
        } else {
            console.log("Please choose another location.  This place is taken.")
        }
    };

    // This method will be used to print our board to the console.
    // It is helpful to see what the board looks like after each turn as we play,
    // but we won't need it after we build our UI
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    // Here, we provide an interface for the rest of our
    // application to interact with the board
    return { getBoard, placeMark, printBoard };
}

/*
** A Cell represents one "square" on the board and can have one of
** 0: no token is in the square,
** x: Player One's mark,
** o: Player 2's mark
*/

function Cell() {
    let value = 0;

    // Accept a player's token to change the value of the cell
    const addToken = (player) => {
        value = player;
    };

    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

/* 
** The GameController will be responsible for controlling the 
** flow and state of the game's turns, as well as whether
** anybody has won the game
*/
function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 'x'
        },
        {
            name: playerTwoName,
            token: 'o'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    let counter = 0;

    const playRound = (row, column) => {
        // Place mark for the current player
        console.log(
            `Placing ${getActivePlayer().name}'s mark on the board...`
        );

        board.placeMark(row, column, activePlayer);
        counter++;
        console.log(counter);


        /*  This is where we would check for a winner and handle that logic,
              such as a win message. */

        if (counter >= 5) {
            const xLocales = [];
            const oLocales = [];
            const currentBoard = board.getBoard();

            //Loops first place in each array:
            for (let i = 0; i < currentBoard.length; i++) {
                const marking = currentBoard[i][0].getValue();
                console.log(marking);
                if (marking == 'x') {
                    const markingTwo = currentBoard[i][1].getValue();
                    const markingThree = currentBoard[i][2].getValue();
                    console.log(markingThree);
                    if (marking == markingTwo && marking == markingThree) {
                        console.log("Winner")
                    } else {

                    }

                } else if (marking == 'o') {
                    const markingTwo = currentBoard[i][1].getValue();
                    const markingThree = currentBoard[i][2].getValue();
                    if (marking == markingTwo && marking == markingThree) {
                        console.log("Winner")
                    } else {

                    }

                } else {

                }




            }


        }
        // Switch player turn
        switchPlayerTurn();
        printNewRound();

    }





    // Initial play game message
    printNewRound();

    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return {
        playRound,
        getActivePlayer
    };

};

const play = GameController();
play.playRound(0, 0);
play.playRound(2, 2);
play.playRound(1, 0);
play.playRound(2, 1);
play.playRound(2, 0);


