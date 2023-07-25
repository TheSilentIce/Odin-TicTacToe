const displayController = (() => {
    let isX = true;
    let gameArray = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"]
    ];
    let container = document.getElementById("container");

    const rowAndColumnCheck = (player,index) => {
        let row = gameArray[index[0]];
        if (row[0] == player && row[1] == player && row[2] == player) {
            return true;
        }
        let column = [gameArray[0][index[1]],gameArray[1][index[1]],gameArray[2][index[1]]];
        column.forEach(element => {
            console.log(element);
        })
        if (column[0] == player && column[1] == player &&  column[2] == player) {
            return true;
        };
        return false;
    };

    const diagonalCheck = (index) => {
        console.log(index[0])
        console.log(index[1]);

        let indexRow = index[0];
        let indexColumn = index[1];
        let same = gameArray[1][1];

        if (index[0] == 1 && index[1] == 1) {
            if (same == gameArray[0][0] && same == gameArray[2][2] || same == gameArray[0][2] && gameArray[2][0]) {
                return true
            }
            return false; 
        }

        console.log("MADE IT TO DIAGONAL CHECK");
        if (indexRow == indexColumn) {
            if (indexRow == 0) {
                return gameArray[indexRow][indexColumn] == same && gameArray[indexRow][indexColumn] == gameArray[2][2];
            } else {
                return gameArray[indexRow][indexColumn] == same && gameArray[indexRow][indexColumn] == gameArray[0][0]
            }
        } else {
            return gameArray[indexRow][indexColumn] == same && gameArray[indexRow][indexColumn] == gameArray[indexColumn][indexRow];
        }
    }

    //Index will be format [0,0];
    const check = (player,index) => {
        console.log("AT CHECK FUNCTION: " + index[0] + index[1]);

        if ([index[0]] !== 1 && [index[1]] == 1  || index[0] == 1 && index[1] !== 1) {
            let idk = rowAndColumnCheck(player,index);
            if (idk) {
                alert("WINNER");
            }
        } else {
            if (rowAndColumnCheck(player,index) || diagonalCheck(index)) {
                alert("WINNER")
            }
        }
    };
        

    const update = (index) => {
        let column = index[1]-1;

        if (gameArray[index[0]][column] == "-") {
            if (isX) {
                gameArray[index[0]][column] = "x";
            } else {
                gameArray[index[0]][column] = "o";
            }
            isX = !isX;
            let square = container.children[index[2]];
            if (gameArray[index[0]][column] == "x") {
                square.classList.add("x-pic");
                check("x",[index[0],column]);
            } else {
                square.classList.add("o-pic");
                check("o",[index[0],column]);
            }
        
        container.children[index] = square;
        } else {
            console.log("Goofy cant you see this is already being used?");
        }

        
    }

    const changeBoard = (index) => {
        const check = index.split("");     
        switch (check[0]) {
            case "A":
                update([0,check[1],check[2]]);
                break;
            case "B":
                update([1,check[1],check[2]]);
                break;
            case "C":
                update([2,check[1],check[2]]);
                break;
            default:
                throw console.error("TF");
        }
    }

    const setup = () => {
        let row = 1;
        let column = 1;
        let alpha = "A";
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    
        for (let i = 0; i < 9; i++) {
            if (column == 4) {
                column = 1;
                row++;
                const x = alpha.charCodeAt(0);
                alpha = String.fromCharCode(x+1);
            }
    
            let square = document.createElement("div");
            square.value = alpha + column + i;
            square.classList.add("square");
            square.style.setProperty("--row-position",row);
            square.style.setProperty("--column-position",column);
    
            square.addEventListener("click", () => {
                changeBoard(square.value);
            })
    
            container.append(square);
            column++;
        }
    }
    return {setup};
})();




displayController.setup();