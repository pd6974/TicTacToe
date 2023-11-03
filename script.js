/*
This code works: 

const gameboard = ['X', 'O', 'X', 'X', 'O', 'N', 'N', 'X', 'O'];


function displayBoard() {
        const divs = document.querySelectorAll(".grid");
        console.log(gameboard.length)

        for (i = 0; i < gameboard.length; i++) {
            divs[i].textContent = gameboard[i];
        }
        
    }

displayBoard();

*/


const board = (function () {
    const gameboard = ['X', 'O', 'X', 'X', 'O', 'N', 'N', 'X', 'O'];

    return function displayBoard() {
        const divs = document.querySelectorAll(".grid");
        for (i = 0; i < gameboard.length; i++) {
            return divs[i].textContent = gameboard[i];
        }
}});


board.displayBoard();


// I want to create a player and assign them X or O -- how can I do that efficiently in this factory?
function createPlayer (name) {
    const playerName = name;
    return { playerName };
}

