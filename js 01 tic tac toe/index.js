// select all the buttons

let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".rebutton");
let msgbox = document.querySelector(".msg-box")
let msg = document.querySelector("#msg")

let turnO = true; //---->> for player O and X

let winPattern = [    //----->>this is 2d array
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 6],
    [6, 7, 8],
];

// make action on each btn

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        console.log("you click on button");

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();       // 
    });
});

const showWinner = (winner) => {
    msgbox.classList.remove("hide");
    msg.innerText = `Congratulation,winner is ${winner}`;
}


const checkWinner = () => {     // to check each winnning pattern 
    for (let pattern of winPattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;


        if (pos1val !== "" && pos2val !== "" && pos3val !== "")   // to check who is winner x,o
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("winner is :", pos1val);
                showWinner(pos1val);
            }

    }
}


/// retset the game

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const resetgame = () => {
    msgbox.classList.add("hide");
    disableBoxes();
}

resetbtn.addEventListener('click', resetgame)