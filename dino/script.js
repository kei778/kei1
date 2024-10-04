const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameContainer = document.querySelector(".game-container");
let isInvincible = false;  // 無敵状態のフラグ
let invincibilityDuration = 2000; // 無敵状態の継続時間（ミリ秒）
let playerPosition = 0;
let gameStarted = false;  // ゲーム開始フラグ
let gravity = 0.9;
let checkCollisionInterval;

// ページが読み込まれたらゲームを開始する
window.onload = function() {
    startGame();  // ゲームを開始する
};

// スペースキーで無敵状態をトグルする（ゲーム開始後のみ）
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isInvincible && gameStarted) {
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

// ゲーム開始時に実行される関数
function startGame() {
    console.log("ゲームが開始されました");  // ゲームが開始されたことを確認
    gameStarted = true;  // ゲーム開始フラグをtrueに設定
    gameContainer.style.display = "block";  // ゲーム画面を表示する

    // 障害物とプレイヤーの衝突判定を開始
    checkCollisionInterval = setInterval(() => {
        let playerRect = player.getBoundingClientRect();
        let obstacleRect = obstacle.getBoundingClientRect();

        if (!isInvincible &&  // 無敵状態でない場合のみ衝突をチェック
            obstacleRect.left < playerRect.right &&
            obstacleRect.right > playerRect.left &&
            obstacleRect.bottom > playerRect.top) {
            alert("Game Over!");
            clearInterval(checkCollisionInterval);
            location.reload();  // ページをリロードして再スタート
        }
    }, 10);
}
