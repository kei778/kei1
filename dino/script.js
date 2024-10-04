const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
let isJumping = false;
let gravity = 0.9;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isJumping) {
        jump();
    }
});

function jump() {
    let position = 0;
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            // Down
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 5;
                    dino.style.bottom = position + "px";
                }
            }, 20);
        } else {
            // Up
            position += 20;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

// Cactus movement
let cactusPosition = 800;

function moveCactus() {
    cactusPosition -= 10;
    cactus.style.right = cactusPosition + "px";

    if (cactusPosition < -30) {
        cactusPosition = 800;
    }

    if (cactusPosition > 50 && cactusPosition < 100 && parseInt(dino.style.bottom) < 50) {
        alert("Game Over!");
        clearInterval(cactusMovement);
    }
}

let cactusMovement = setInterval(moveCactus, 20);

