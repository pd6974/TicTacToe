const gameboard = (function () {
    const board = ['E', 'E', 'X', 'E', 'E', 'E', 'E', 'X', 'O'];

    const displayBoard = () => {
        const divs = document.querySelectorAll(".grid");
        for (i = 0; i < board.length; i++) {
             divs[i].textContent = board[i];
             divs[i].setAttribute('data-tile', i);
        }
    };
  
    return {
    board,
    displayBoard
  };
})();

gameboard.displayBoard();
console.log(gameboard);



const Player = (name) => {
    const symbol = ['X', 'O'];
    let playerOne;
    let playerTwo;
    const giveName = () => {
        if (playerOne == undefined) {
            this.symbol = symbol[0];
            console.log(`Player one, ${symbol[0]}, is ${name}`)
        }
        else {
            this.symbol = symbol[1];
             console.log(`Player two, ${symbol[1]}, is ${name}`)
        }
        
    }
    return { giveName }
}


const jim = Player('Jim');
jim.giveName();

const flow = (function () {
    const divs = document.querySelectorAll(".grid");
    divs.forEach(divs => divs.addEventListener('click', () => 
    {executeMove(divs);}));

        const executeMove = (x) => {
            console.log(x)
            if(x.textContent == 'E') {
                board[x.dataset.tile] = Player.symbol;
                x.textContent = Player.symbol;
                console.log(board);
            } else {
                console.log('Invalid Move');
            }
        }
    
        return { executeMove }
    }

)();

flow.executeMove();
