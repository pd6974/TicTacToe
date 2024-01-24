function Display() {
    const game = GameController();
    const messageDiv = document.querySelector('.info');
    const boardDiv = document.querySelector('.container');
    console.log(boardDiv);

    const updateScreen = () => {
        //clear the board
        boardDiv.textContent = "";

        //get the  newest version of the board
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        messageDiv.textContent = `${activePlayer.name}'s turn... `;

        board.forEach((row, index2) => {
            row.forEach((cell, index) => {
                // Anything clickable should be a button
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                // Create a data attribute to identify the location
                // Then it can be placed in the playRound function
                cellButton.dataset.column = index
                cellButton.dataset.row = index2
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })
    }


//Adds event listener to the board
function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow =  e.target.dataset.row;
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedColumn) return;
    
    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();

  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
}

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
    let value = "";

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


        /*  This is where we would check for a winner and handle that logic,
              such as a win message. */

            //Find out if there's a winner
            const result = winCheck();


            if (result == true) {
                console.log("Game over");
            } else if (result == false && counter == 9) {
                console.log("It's a tie");
            } else {
                // Switch player turn
                switchPlayerTurn();
                printNewRound();
            }
            
            

        }
        
        //This function checks for a winner.  Could it return true/false?
        const winCheck = ()  => {
            //Get the current board
            const currentBoard = board.getBoard();

            //Loops first place in each array:
            for (let i = 0; i < currentBoard.length; i++) {
                //This condition properly checks for 3 wins top horizontal, vertical left, and \ diagnol
                //Is there a better way to check for these wins?
                if (i === 0) {
                    const marking = currentBoard[0][i].getValue();
                    if (marking == 'x') {
                        const vertTwo = currentBoard[1][i].getValue();
                        const vertThree = currentBoard[2][i].getValue();
                        const horzTwo = currentBoard[i][1].getValue();
                        const horzThree = currentBoard[i][2].getValue();
                        const diagTwo = currentBoard[1][1].getValue();
                        const diagThree = currentBoard[2][2].getValue();
                        if ((marking == horzTwo && marking == horzThree) || (marking == vertTwo && marking == vertThree) || (marking == diagTwo && marking == diagThree)) {
                            console.log(`${getActivePlayer().name} is the winner!`);
                            return true;
                            break
                        }
                    }
                    else if (marking == 'o') {
                        const vertTwo = currentBoard[1][i].getValue();
                        const vertThree = currentBoard[2][i].getValue();
                        const horzTwo = currentBoard[i][1].getValue();
                        const horzThree = currentBoard[i][2].getValue();
                        const diagTwo = currentBoard[1][1].getValue();
                        const diagThree = currentBoard[2][2].getValue();
                        if ((marking == horzTwo && marking == horzThree) || (marking == vertTwo && marking == vertThree) || (marking == diagTwo && marking == diagThree)) {
                            console.log(`${getActivePlayer().name} is the winner!`);
                            return true;
                            break
                        }
                    }
                    //This conditions checks for center vertical and horizontal wins.
                } else if (i == 1) {
                    const vertMarking = currentBoard[0][i].getValue();
                    const horzMarking = currentBoard[i][0].getValue();
                    if (vertMarking == 'x' || horzMarking == 'x') {
                        const center = currentBoard[i][i].getValue();
                        const vertThree = currentBoard[2][i].getValue();
                        const horzThree = currentBoard[i][2].getValue();
                        if ((vertMarking == center && vertMarking == vertThree) || (horzMarking == center && horzMarking == horzThree)) {
                            console.log(`${getActivePlayer().name} is the winner!`);
                            return true;
                            break
                        }

                    } else if (vertMarking == 'o' || horzMarking == 'o') {
                        const center = currentBoard[i][i].getValue();
                        const vertThree = currentBoard[2][i].getValue();
                        const horzThree = currentBoard[i][2].getValue();
                        if ((vertMarking == center && vertMarking == vertThree) || (horzMarking == center && horzMarking == horzThree)) {
                            console.log(`${getActivePlayer().name} is the winner!`);
                            return true;
                            break
                        }

                    }

                } else if (i == 2) {
                    const marking = currentBoard[i][i].getValue();
                    if (marking == 'x') {
                        const vertTwo = currentBoard[0][i].getValue();
                        const vertThree = currentBoard[1][i].getValue();
                        const horzTwo = currentBoard[i][0].getValue();
                        const horzThree = currentBoard[i][1].getValue();
                        const diagTwo = currentBoard[1][1].getValue();
                        const diagThree = currentBoard[0][0].getValue();
                        if ((marking == horzTwo && marking == horzThree) || (marking == vertTwo && marking == vertThree) || (marking == diagTwo && marking == diagThree)) {
                            console.log(`${getActivePlayer().name} is the winner!`);
                            return true;
                            break
                        }
                    }
                    else if (marking == 'o') {
                        const vertTwo = currentBoard[0][i].getValue();
                        const vertThree = currentBoard[1][i].getValue();
                        const horzTwo = currentBoard[i][0].getValue();
                        const horzThree = currentBoard[i][1].getValue();
                        const diagTwo = currentBoard[1][1].getValue();
                        const diagThree = currentBoard[0][0].getValue();
                        if ((marking == horzTwo && marking == horzThree) || (marking == vertTwo && marking == vertThree) || (marking == diagTwo && marking == diagThree)) {
                            console.log(`${getActivePlayer().name} is the winner!`);
                            return true;
                            break
                        }
                    }
                }
                return false;
                }

        }





        // Initial play game message
        printNewRound();

        // For the console version, we will only use playRound, but we will need
        // getActivePlayer for the UI version, so I'm revealing it now
        return {
            playRound,
            getActivePlayer,
            getBoard: board.getBoard,
            winCheck
        };

    };

    Display();
