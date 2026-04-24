class Game {
  constructor(htmlDoc) {
    this.document = htmlDoc;
    this.cameraHeight = 3.2;
    this.yaw = 0;
    this.scene = new THREE.Scene();
    this.hudMessage = "";
    this.keysPressed = {};
    this.frameCount = 0;
    this.startTime = Date.now();
    this.consumables = [];
    this.enemies = [];
    this.gameOverHit = false;

    this.world = new World(this.scene, SKY_COLOR, SUN_COLOR, SUN_BRIGHTNESS);

    this.camera = new THREE.PerspectiveCamera(
      85,
      innerWidth / innerHeight,
      0.1,
      2000,
    );

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.document.body.appendChild(this.renderer.domElement);

    this.player = new Player(this.scene, PLAYER_COLOR);
    
    this.addCoins();
    this.addEnemies();
  }

  addCoins() {
    for (let i = 0; i < COIN_LOCATIONS.length; i++) {
      const coin = new Coin(this, COIN_LOCATIONS[i].north, COIN_LOCATIONS[i].east, COIN_LOCATIONS[i].vertical);
      this.consumables.push(coin);
    }
  }

  addEnemies() {
    for (let i = 0; i < ENEMY_LOCATIONS.length; i++) {
      const enemy = new Enemy(this, ENEMY_LOCATIONS[i].north, ENEMY_LOCATIONS[i].east, ENEMY_LOCATIONS[i].vertical);
      this.enemies.push(enemy);
    }
  }

  addConsumable(consumable) {
    this.consumables.push(consumable);
  }

  gameOver() {
    this.gameOverHit = true;
  }

  update() {
    this.document.querySelector("#gameover").style.display = this.gameOverHit ? "flex" : "none";

    if (this.gameOverHit) {
      return;
    }

    this.frameCount++;
    const preUpdatePlayerY = this.player.position.y;
    
    this.player.update(this);

     // CAMERA CONTROLS (arrow keys)
    if (this.keysPressed["arrowleft"]) this.yaw += 0.05;
    if (this.keysPressed["arrowright"]) this.yaw -= 0.05;
    if (this.keysPressed["arrowup"]) this.cameraHeight -= 0.1;
    if (this.keysPressed["arrowdown"]) this.cameraHeight += 0.1;
    this.cameraHeight = Math.max(1, Math.min(5, this.cameraHeight));

    const forward = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));

    const camOffset = forward
      .clone()
      .multiplyScalar(-5)
      .add(new THREE.Vector3(0, this.cameraHeight, 0));
    this.camera.position.copy(this.player.playerObj.position).add(camOffset);
    this.camera.lookAt(this.player.playerObj.position);

    if (this.player.playerObj.position.x-2 < -GROUND_SIZE / 2) this.player.playerObj.position.x = -GROUND_SIZE / 2 + 2;
    if (this.player.playerObj.position.x+2 > GROUND_SIZE / 2) this.player.playerObj.position.x = GROUND_SIZE / 2 - 2;
    if (this.player.playerObj.position.z-2 < -GROUND_SIZE / 2) this.player.playerObj.position.z = -GROUND_SIZE / 2 + 2;
    if (this.player.playerObj.position.z+2 > GROUND_SIZE / 2) this.player.playerObj.position.z = GROUND_SIZE / 2 - 2;

    for (let i = 0; i < this.world.platforms.length; i++) {
      const platform = this.world.platforms[i];

      if (this.player.velY < 0 && platform.intersectsTop(this.player.playerObj, preUpdatePlayerY)) {
        this.player.position.y = platform.yTop;
        this.player.velY = 0;
        this.player.onGround = true;
      }
    }

    this.consumables.forEach((p, i) => {
      p.update();
    });

    this.enemies.forEach((e) => {
      e.update();
    });

    if (this.player.health <= 0) {
      this.gameOver();
    }

    this.renderer.render(this.scene, this.camera);
    this.document.getElementById("score").innerHTML = this.player.score;
    this.document.getElementById("health").innerHTML = this.player.health;
    this.document.getElementById("time").innerHTML = Math.floor(
      (Date.now() - this.startTime) / 100,
    );

    this.document.getElementById("msg").innerHTML = this.hudMessage;
  }
}
