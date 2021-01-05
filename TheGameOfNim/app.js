let numP1 = 10;
let numP2 = 10;
let isGameOver = false;
let isLoading = false;
const resetButton = document.querySelector("#reset");
const selectStartingNum = document.querySelector("#startingNum");
const selectNumRemove = document.querySelector("#numRemove");
const removeP1Button = document.querySelector("#removeP1");
const removeP2Button = document.querySelector("#removeP2");
const p1Display = document.querySelector("#p1Display");
const p2Display = document.querySelector("#p2Display");
const moves = document.querySelector("#moves");
const goFirst = document.querySelector("#goFirst");
const goSecond = document.querySelector("#goSecond");


removeP1Button.addEventListener("click", function (e) {
    let numRocks = parseInt(selectNumRemove.value);
    makePlayerMove(true, numRocks);
});
removeP2Button.addEventListener("click", function (e) {
    let numRocks = parseInt(selectNumRemove.value);
    makePlayerMove(false, numRocks);
});

function makePlayerMove(isPile1, numRocks) {
    if (isLoading) {
        return;
    }
    isLoading = true;
    if (numRocks < 1 || Number.isNaN(numRocks)) {
        alert("Please pick a number greater than 0");
    } else if ((isPile1 && numRocks > numP1) || (!isPile1 && numRocks > numP2)) {
        alert("Please pick a number of rocks less than the number in the pile");
    } else {
        makeMove(numRocks, isPile1, true);
        setTimeout(function () {
            makeOptimalMove();
            isLoading = false;
        }, (250));
    }
}
resetButton.addEventListener("click", reset);

selectStartingNum.addEventListener("change", reset);
goFirst.addEventListener("click", function (e) {
    reset();
});
goSecond.addEventListener("click", function (e) {
    reset();
    makeOptimalMove();
    goFirst.classList.remove("is-info");
    goSecond.classList.add("is-info");

})
function reset() {
    numP1 = parseInt(selectStartingNum.value);
    numP2 = parseInt(selectStartingNum.value);
    p1Display.textContent = numP1;
    p2Display.textContent = numP2;
    isGameOver = false;
    moves.innerHTML = "";
    goFirst.classList.add("is-info")
    goSecond.classList.remove("is-info");
    document.body.classList.remove("lose", "win");
}

function makeOptimalMove() {
    let numToRemove = 1;
    let isPile1 = true;
    if (numP1 === numP2) {
    } else if (numP1 > numP2) {
        numToRemove = numP1 - numP2;
        isPile1 = true;
    } else {
        numToRemove = numP2 - numP1;
        isPile1 = false;
    }
    makeMove(numToRemove, isPile1, false);
}

function makeMove(numRocks, isPile1, isPlayer) {
    if (isGameOver) {
        return;
    }
    let pile = "Pile 1";
    let player = "Player";
    if (isPile1 === false) {
        pile = "Pile 2";
    }
    if (isPlayer === false) {
        player = "Optimal Opponent";
    }
    let moveString = `${numP1} | ${numP2} The ${player} removed ${numRocks} rocks from ${pile}.`;
    const moveItem = document.createElement("li");
    moveItem.append(moveString);
    moves.prepend(moveItem);

    if (isPile1) {
        numP1 -= numRocks;
    } else {
        numP2 -= numRocks;
    }
    p1Display.textContent = numP1;
    p2Display.textContent = numP2;
    if (numP1 == 0 && numP2 == 0) {
        let endString = "";
        if (isPlayer) {
            endString = "You Won!";
            document.body.classList.add("win");

        } else {
            endString = "You Lost :(";
            document.body.classList.add("lose");

        }
        const move = document.createElement("li");
        move.append(endString);
        moves.prepend(move);
        isGameOver = true;
    }
}

