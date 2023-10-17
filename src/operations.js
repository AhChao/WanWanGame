var leftPressed = false;
var rightPressed = false;
var downPressed = false;
function addOperationListeners() {//desktop with key
    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case "ArrowLeft":
                moveTheHolding("left");
                break;
            case "ArrowRight":
                moveTheHolding("right");
                break;
            case "ArrowDown":
                dropTheHolding();
                break;
        }
    });
    //desktop with btn
    document.getElementById("btnLeft").addEventListener("mousedown", async () => {
        leftPressed = true;
        while (leftPressed) {
            moveTheHolding("left");
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    });
    document.getElementById("btnDown").addEventListener("mousedown", async () => {
        downPressed = true;
        while (downPressed) {
            dropTheHolding();
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    });
    document.getElementById("btnRight").addEventListener("mousedown", async () => {
        rightPressed = true;
        while (rightPressed) {
            moveTheHolding("right");
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    });
    document.getElementById("btnLeft").addEventListener("mouseup", () => { leftPressed = false });
    document.getElementById("btnDown").addEventListener("mouseup", () => { downPressed = false });
    document.getElementById("btnRight").addEventListener("mouseup", () => { rightPressed = false });

    //mobile with btn
    document.getElementById("btnLeft").addEventListener("touchstart", async () => {
        leftPressed = true;
        while (leftPressed) {
            moveTheHolding("left");
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    });
    document.getElementById("btnDown").addEventListener("touchstart", async () => {
        downPressed = true;
        while (downPressed) {
            dropTheHolding();
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    });
    document.getElementById("btnRight").addEventListener("touchstart", async () => {
        rightPressed = true;
        while (rightPressed) {
            moveTheHolding("right");
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    });
    document.getElementById("btnLeft").addEventListener("touchend", () => { leftPressed = false });
    document.getElementById("btnDown").addEventListener("touchend", () => { downPressed = false });
    document.getElementById("btnRight").addEventListener("touchend", () => { rightPressed = false });
}