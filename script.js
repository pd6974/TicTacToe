function Display() {

    const messageDiv = document.querySelector('.prompt');
    const boardDiv = document.querySelector('.container');
    const players = []

    function processForm(e) {
        e.preventDefault();
        const form = document.querySelector('form');
        const data = Object.fromEntries(new FormData(form).entries());
        players.push(data.player_one, data.player_two);
        updateScreen(players);
    }

    const submit = document.querySelector('.submit');
    submit.addEventListener('click', processForm);

    

    

    const updateScreen = (opponents) => {
        //clear the board
        boardDiv.textContent = "";

        if (!opponents) {
            messageDiv.textContent = "Please fill out your names"
        } else {
        game = GameController(opponents[0], opponents[1]);


        }

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
        });

    }

    


    //Adds event listener to the board
    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;
        const activePlayer = game.getActivePlayer();
        // Make sure I've clicked a column and not the gaps in between
        if (!selectedColumn) return;

        // Play the selected row and column in the game functions
        const move = game.playRound(selectedRow, selectedColumn);
        const win = game.winCheck();

        // If the move is invalid, it will prompt the user to a new selection:
        if (move == false) {
            return messageDiv.textContent = `${activePlayer.name}, That location is taken.  Please choose another.`

        }

        // If the win check is true, dislpay winner:
        if (win == true) {
            console.log("She's a winner baby")
            updateScreen();
            return messageDiv.textContent = `Congratulations ${activePlayer.name}! You have won!`
        }

        // If the last move creates a tie, display a tie:
        if (move == -1) {
            return messageDiv.textContent = `Sorry you tied, guess you're both losers :/`
        }

        // Updates the board 
        updateScreen();
        console.log(players);
    }
    boardDiv.addEventListener("click", clickHandlerBoard);

    // Initial render
    // updateScreen();

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
        if (location == "") {
            board[row][column].addToken(player.token);
            console.log(player.token);
            return true;
        } else {
            console.log("Please choose another location.  This place is taken.");
            return false;
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
function GameController(playerOneName, playerTwoName) {
    const board = Gameboard();
    
    if (!playerOneName) {
        playerOneName = "Player One"
    }
    if (!playerTwoName) {
        playerTwoName = "Player Two"
    }

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

    console.log(players);

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
        counter++
        // Place mark for the current player
        console.log(
            `Placing ${getActivePlayer().name}'s mark on the board...`
        );

        // Finds out if the move is valid
        const move = board.placeMark(row, column, activePlayer);

        // move will be true if valid and the game can continue
        if (move == true) {
            const result = winCheck();
            if (result == true) {
                console.log("Game over");
            } else if (result == false && counter == 9) {
                console.log("It's a tie");
                return -1;
            } else {
                // Switch player turn
                switchPlayerTurn();
                printNewRound();
            }
            // if the move isn't valid, it will just print a new round
        } else if (move == false) {
            printNewRound();
            return false
        }


        /*  This is where we would check for a winner and handle that logic,
              such as a win message. */

        //Find out if there's a winner




    }

    //This function checks for a winner.  It returns true/false?
    function winCheck() {
        //Get the current board
        const currentBoard = board.getBoard();

        //Loops first place in each array:
        for (let i = 0; i < currentBoard.length; i++) {
            //This condition properly checks for 3 wins top horizontal, vertical left, and \ diagnol
            //Is there a better way to check for these wins?
            const marking = currentBoard[0][0].getValue();
            const centerThree = currentBoard[1][0].getValue();
            const centerTwo = currentBoard[0][1].getValue();
            const topRight = currentBoard[0][2].getValue();
            const bottomLeft = currentBoard[2][0].getValue();
            //This condition checks for top horizontal, left vertical and \ diagnol
            if (marking !== '') {
                const diagTwo = currentBoard[1][1].getValue();
                const diagThree = currentBoard[2][2].getValue();
                if ((marking === centerTwo && marking === topRight) ||
                    (marking === centerThree && marking === bottomLeft) ||
                    (marking === diagTwo && marking === diagThree)) {
                    console.log("Winner");
                    return true;
                }
            }
            //This conditions checks for center vertical,  horizontal wins and / diagnol
            const center = currentBoard[1][1].getValue();
            if (center !== '') {
                const vertThree = currentBoard[2][1].getValue();
                const horzThree = currentBoard[1][2].getValue();
                if ((vertThree === center && centerTwo === vertThree) ||
                    (horzThree === center && centerThree === horzThree) ||
                    (center === topRight && center === bottomLeft)) {
                    console.log("winner");
                    console.log(currentBoard);
                    return true;
                }

            }
            //This condition checks for bottom horizontal, right vertical 
            const bottomRight = currentBoard[2][2].getValue();
            if (bottomRight !== '') {
                const vertThree = currentBoard[1][2].getValue();
                const centerTwo = currentBoard[2][0].getValue();
                const horzThree = currentBoard[2][1].getValue();
                if ((bottomRight == centerTwo && bottomRight == horzThree) ||
                    (bottomRight === vertThree && bottomRight == topRight)) {
                    console.log("Winner");
                    return true;

                }
            }
        }
        return false;
    }





    //Initial play game message
    // printNewRound();

    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
        winCheck,
        counter
    };

};

Display();
