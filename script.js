const displayController = (() => {
    let isX = true;
    let gameArray = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"]
    ];
    let container = document.getElementById("container");

    const check = (player) => {

    }

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
            } else {
                square.classList.add("o-pic");
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