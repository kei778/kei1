const dinosaur = document.getElementById('dinosaur');
const cactus = document.getElementById('cactus');
const gameArea = document.getElementById('game');

let isJumping = false;
let gameOver = false;

// 障害物を動かす関数
function moveCactus() {
    let cactusPosition = 600; // 画面の右端からスタート
    const cactusSpeed = 5; // 障害物の速度

    const cactusInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(cactusInterval);
            return;
        }

        cactusPosition -= cactusSpeed; // 障害物を左に移動
        cactus.style.right = cactusPosition + 'px';

        // 障害物が画面外に出たらリセット
        if (cactusPosition < -20) {
            cactusPosition = 600; // 画面外から再スタート
        }

        // 衝突判定
        if (isCollision()) {
            clearInterval(cactusInterval);
            alert("ゲームオーバー！");
            gameOver = true;
        }
    }, 20);
}

// ジャンプの処理
function jump() {
    if (isJumping || gameOver) return; // ジャンプ中またはゲームオーバーの場合は何もしない

    isJumping = true;

    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpInterval);
            fall(); // 最高到達点に達したら落下処理を開始
        } else {
            jumpHeight += 10;
            dinosaur.style.bottom = (20 + jumpHeight) + 'px'; // ジャンプ
        }
    }, 20);
}

// 落ちる処理
function fall() {
    let fallHeight = 100;
    const fallInterval = setInterval(() => {
        if (fallHeight <= 0) {
            clearInterval(fallInterval);
            isJumping = false;
            dinosaur.style.bottom = '20px'; // 初期位置に戻す
        } else {
            fallHeight -= 10;
            dinosaur.style.bottom = (20 + fallHeight) + 'px'; // 落ちる
        }
    }, 20);
}

// 衝突判定
function isCollision() {
    const dinosaurRect = dinosaur.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    return !(
        dinosaurRect.top > cactusRect.bottom ||
        dinosaurRect.bottom < cactusRect.top ||
        dinosaurRect.right < cactusRect.left ||
        dinosaurRect.left > cactusRect.right
    );
}

// スペースキーでジャンプ
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

// ゲーム開始
moveCactus();
