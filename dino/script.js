const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
let isJumping = false;
let playerPosition = 0;
let gravity = 0.9;

// ジャンプ操作
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isJumping) {
        jump();
    }
});

function jump() {
    let jumpHeight = 150;
    isJumping = true;

    let upInterval = setInterval(() => {
        if (playerPosition >= jumpHeight) {
            clearInterval(upInterval);

            // 降下
            let downInterval = setInterval(() => {
                if (playerPosition <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    playerPosition -= 5;
                    player.style.bottom = playerPosition + "px";
                }
            }, 20);
        } else {
            // 上昇
            playerPosition += 20;
            player.style.bottom = playerPosition + "px";
        }
    }, 20);
}

// 障害物とプレイヤーの衝突判定
if (
    obstacleRect.left < playerRect.right - 10 &&  // 調整する例
    obstacleRect.right > playerRect.left + 10 &&
    obstacleRect.bottom > playerRect.top + 10
) {
    alert("Game Over!");
    clearInterval(checkCollision);
    location.reload();
}

