const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
let isInvincible = false;  // 無敵状態のフラグ
let invincibilityDuration = 2000; // 無敵状態の継続時間（ミリ秒）
let playerPosition = 0;
let gravity = 0.9;

// スペースキーで無敵状態をトグルする
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isInvincible) {
        activateInvincibility();
    }
});

// 無敵状態を有効化
function activateInvincibility() {
    isInvincible = true;
    player.style.backgroundColor = "blue";  // 無敵状態の視覚的変化（青に変更）
    setTimeout(() => {
        isInvincible = false;
        player.style.backgroundColor = "#ff6347";  // 元の色に戻す
    }, invincibilityDuration);  // 指定時間後に無敵を解除
}

// 障害物とプレイヤーの衝突判定
let checkCollision = setInterval(() => {
    let playerRect = player.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    if (!isInvincible &&  // 無敵状態でない場合のみ衝突をチェック
        obstacleRect.left < playerRect.right &&
        obstacleRect.right > playerRect.left &&
        obstacleRect.bottom > playerRect.top) {
        alert("Game Over!");
        clearInterval(checkCollision);
        location.reload();  // ページをリロードして再スタート
    }
}, 10);
