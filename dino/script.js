const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dino = { x: 50, y: 300, width: 40, height: 40 };
let cacti = [];
let score = 0;
let gameOver = false;

// 障害物を生成する関数
function createCactus() {
    const cactus = { x: canvas.width, y: 300, width: 20, height: 40 };
    cacti.push(cactus);
}

// ゲームを更新する関数
function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green'; // 恐竜の色
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    // 障害物を描画
    cacti.forEach((cactus, index) => {
        cactus.x -= 5; // 障害物の移動
        ctx.fillStyle = 'brown'; // サボテンの色
        ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);

        // 衝突判定
        if (
            dino.x < cactus.x + cactus.width &&
            dino.x + dino.width > cactus.x &&
            dino.y < cactus.y + cactus.height &&
            dino.y + dino.height > cactus.y
        ) {
            gameOver = true;
            alert("ゲームオーバー！スコア: " + score);
        }

        // スコアの更新
        if (cactus.x < 0) {
            cacti.splice(index, 1);
            score++;
        }
    });

    requestAnimationFrame(update);
}

// キー操作の処理
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !gameOver) {
        dino.y -= 80; // ジャンプ
        setTimeout(() => {
            dino.y += 80; // 降下
        }, 300);
    }
});

// 定期的に障害物を生成
setInterval(createCactus, 1500);
update();
