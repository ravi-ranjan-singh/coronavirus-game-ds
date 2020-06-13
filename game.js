function loadImages() {
  enemy_img = new Image();
  enemy_img.src = 'Assets/v1.png';

  gem_img = new Image();
  gem_img.src = 'Assets/gem.png';

  player_img = new Image();
  player_img.src = 'Assets/superhero.png';
}

function init() {
  canvas = document.querySelector('#mycanvas');
  W = 700;
  H = 399;
  canvas.width = W;
  canvas.height = H;
  pen = canvas.getContext('2d');

  e1 = {
    x: 150,
    y: 50,
    h: 60,
    w: 60,
    speed: 20,
  };
  e2 = {
    x: 300,
    y: 150,
    h: 60,
    w: 60,
    speed: 30,
  };
  e3 = {
    x: 450,
    y: 20,
    h: 60,
    w: 60,
    speed: 40,
  };
  enemies = [e1, e2, e3];

  player = {
    x: 20,
    y: H / 2,
    w: 60,
    h: 60,
    speed: 20,
    moving: false,
    health: 100,
  };

  gem = {
    x: W - 100,
    y: H / 2,
    w: 60,
    h: 60,
  };

  gameOver = false;

  canvas.addEventListener('mousedown', function () {
    player.moving = true;
  });
  canvas.addEventListener('mouseup', function () {
    player.moving = false;
  });
  document.querySelector('button').addEventListener('click', function () {
    window.location.href = '/';
  });
}

function isCollision(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  ) {
    return true;
  }
  return false;
}

function draw() {
  pen.clearRect(0, 0, W, H);
  pen.drawImage(player_img, player.x, player.y, player.w, player.h);
  pen.drawImage(gem_img, gem.x, gem.y, gem.w, gem.h);
  enemies.forEach((enemy) => {
    pen.drawImage(enemy_img, enemy.x, enemy.y, enemy.w, enemy.h);
  });

  pen.fillStyle = 'white';
  pen.font = '20px Roboto';
  pen.fillText('Score :' + player.health, 20, 30);
}

function update() {
  if (player.moving) {
    player.x += player.speed;
    player.health += 20;
  }

  if (isCollision(player, gem)) {
    gameOver = true;
  }

  enemies.forEach((enemy) => {
    if (isCollision(player, enemy)) {
      player.health -= 50;
      if (player.health < 0) {
        gameOver = true;
      }
    }
  });

  enemies.forEach((enemy) => {
    enemy.y += enemy.speed;
    if (enemy.y + enemy.h > H || enemy.y < 0) {
      enemy.speed = enemy.speed * -1;
    }
  });
}

function gameloop() {
  draw();
  update();
  if (gameOver) {
    clearInterval(f);
  }
}

loadImages();
init();

let f = setInterval(gameloop, 100);
