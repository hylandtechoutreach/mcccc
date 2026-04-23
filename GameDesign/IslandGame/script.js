let hudMessage = "";

const scene = new THREE.Scene();

// SKY
const skyGeo = new THREE.SphereGeometry(500, 32, 32);
const skyMat = new THREE.MeshBasicMaterial({
  color: SKY_COLOR,
  side: THREE.BackSide,
});

scene.add(new THREE.Mesh(skyGeo, skyMat));

// CAMERA
const camera = new THREE.PerspectiveCamera(
  85,
  innerWidth / innerHeight,
  0.1,
  2000,
);

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// LIGHT
const sun = new THREE.DirectionalLight(SUN_COLOR, SUN_BRIGHTNESS);
sun.position.set(30, 30, 10);
sun.target.position.set(20, 0, 0);
sun.shadow.camera.left = -100;
sun.shadow.camera.right = 100;
sun.shadow.camera.top = 100;
sun.shadow.camera.bottom = -100;
sun.castShadow = true;

scene.add(sun);
scene.add(new THREE.AmbientLight(SUN_COLOR, 0.2 * SUN_BRIGHTNESS));

// PLAYER
const player = new THREE.Group();
const playerBody = new THREE.Mesh(
  new THREE.BoxGeometry(0.8, 0.8, 0.5),
  new THREE.MeshStandardMaterial({ color: PLAYER_COLOR }),
);
playerBody.position.y = 1.4;
playerBody.castShadow = true;
player.add(playerBody);

const playerHead = new THREE.Mesh(
  new THREE.SphereGeometry(0.35),
  new THREE.MeshStandardMaterial({ color: PLAYER_COLOR }),
);
playerHead.position.y = 2.2;
playerHead.castShadow = true;
player.add(playerHead);

const playerLeg1 = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 0.8, 0.3),
  new THREE.MeshStandardMaterial({ color: PLAYER_COLOR }),
);
playerLeg1.position.set(-0.25, .5, 0);
playerLeg1.castShadow = true;
player.add(playerLeg1);

const playerLeg2 = playerLeg1.clone();
playerLeg2.position.x = 0.25;
player.add(playerLeg2);

const playerArm1 = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 0.7, 0.2),
  new THREE.MeshStandardMaterial({ color: PLAYER_COLOR }),
);
playerArm1.position.set(-0.5, 1.5, 0);
playerArm1.castShadow = true;
player.add(playerArm1);

const playerArm2 = playerArm1.clone();
playerArm2.position.x = 0.5;
player.add(playerArm2);

player.castShadow = true;
scene.add(player);

// PHYSICS
let vel = new THREE.Vector3();
let velY = 0;
let onGround = true;
let health = 100;
let score = 0;
let startTime = Date.now();

// TEXTURED GROUND
const canvas = document.createElement("canvas");
canvas.width = canvas.height = 256;
const ctx = canvas.getContext("2d");
ctx.fillStyle = GROUND_BASE_COLOR;
ctx.fillRect(0, 0, 256, 256);
for (let i = 0; i < 5000; i++) {
  let x = Math.random() * 256,
    y = Math.random() * 256;
  const R = GROUND_SPOT_R_START + Math.random() * GROUND_SPOT_R_VARIANCE;
  const G = GROUND_SPOT_G_START + Math.random() * GROUND_SPOT_G_VARIANCE;
  const B = GROUND_SPOT_B_START + Math.random() * GROUND_SPOT_B_VARIANCE;
  ctx.fillStyle = `rgb(${R},${G},${B})`;
  ctx.fillRect(x, y, 2, 2);
}

const texture = new THREE.CanvasTexture(canvas);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(50, 50);

const size = GROUND_SIZE;
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(size, size),
  new THREE.MeshStandardMaterial({ map: texture }),
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;

const platforms = [];
for (let i = 0; i < PLATFORM_LOCATIONS.length; i++) {
  const p = PLATFORM_LOCATIONS[i];
  platforms.push(new Platform(scene, p.east, p.vertical, p.north, p.width, 1, p.length));
}

scene.add(ground);

// OCEAN
const water = new THREE.Mesh(
  new THREE.PlaneGeometry(size * 2, size * 2),
  new THREE.MeshStandardMaterial({
    color: 0x1e90ff,
    transparent: true,
    opacity: 0.7,
  }),
);
water.rotation.x = -Math.PI / 2;
water.position.y = -1;
scene.add(water);

const consumables = [];

// function eatRejumpPowerUp() {
//   ALLOW_REJUMP = true;
// }

// consumables.push(new Consumable(scene, player, -20, -5, 6, eatRejumpPowerUp, .3, "yellow"));

// COINS
const coins = [];
for (let i = 0; i < COIN_LOCATIONS.length; i++) {
  const c = new THREE.Mesh(
    new THREE.TorusGeometry(0.4, 0.15, 8, 16),
    new THREE.MeshStandardMaterial({ color: 0xffd7ee }),
  );
  c.castShadow = true;
  const coinPos = COIN_LOCATIONS[i];
  c.position.set(coinPos.east, coinPos.vertical, coinPos.north);
  c.castShadow = true;
  scene.add(c);
  coins.push(c);
}

// ENEMIES (monster style)
const enemies = [];
for (let i = 0; i < NUM_ENEMIES; i++) {
  const e = new THREE.Group();
  const b = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1.5, 0.6),
    new THREE.MeshStandardMaterial({ color: ENEMY_COLOR }),
  );
  b.castShadow = true;
  
  const h = new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    new THREE.MeshStandardMaterial({ color: ENEMY_COLOR }),
  );

  h.castShadow = true;
  h.position.y = 1.5;
  e.add(b, h);
  e.position.set((Math.random() - 0.5) * GROUND_SIZE, 0.5, (Math.random() - 0.5) * GROUND_SIZE);
  scene.add(e);
  enemies.push(e);
}

// CONTROLS
const keys = {};
let yaw = 0;
let cameraHeight = 3.2;

addEventListener("keydown", (e) => (keys[e.key.toLowerCase()] = true));
addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

function gameOver() {
  //hudMessage = "Game Over! Refresh to play again.";
}

let frameCount = 0;

function animate() {
  requestAnimationFrame(animate);
  frameCount++;

  // CAMERA CONTROLS (arrow keys)
  if (keys["arrowleft"]) yaw += 0.05;
  if (keys["arrowright"]) yaw -= 0.05;
  if (keys["arrowup"]) cameraHeight -= 0.1;
  if (keys["arrowdown"]) cameraHeight += 0.1;
  cameraHeight = Math.max(1, Math.min(5, cameraHeight));

  // player faces yaw direction
  player.rotation.y = yaw;

  if (player.position.x-2 < -GROUND_SIZE / 2) player.position.x = -GROUND_SIZE / 2 + 2;
  if (player.position.x+2 > GROUND_SIZE / 2) player.position.x = GROUND_SIZE / 2 - 2;
  if (player.position.z-2 < -GROUND_SIZE / 2) player.position.z = -GROUND_SIZE / 2 + 2;
  if (player.position.z+2 > GROUND_SIZE / 2) player.position.z = GROUND_SIZE / 2 - 2;

  const forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));

  // Try to move forward
    // W ONLY moves forward (camera-relative, no velocity drift)
  let speed = PLAYER_SPEED;
  let prevPos = player.position.clone();
  if (keys["w"]) {
    const nextPos = player.position.clone().add(forward.clone().multiplyScalar(speed));
    player.position.copy(nextPos);
    if (onGround) {
      playerLeg1.rotation.x = Math.sin(Date.now() * 0.01) * 0.5;
      playerLeg2.rotation.x = Math.sin(Date.now() * 0.01 + Math.PI) * 0.5;
      playerArm1.rotation.x = Math.sin(Date.now() * 0.01 + Math.PI);
      playerArm2.rotation.x = Math.sin(Date.now() * 0.01);
    }
  } else if (keys["s"]) {
    const nextPos = player.position.clone().sub(forward.clone().multiplyScalar(speed));
    player.position.copy(nextPos);
    if (onGround) {
      playerLeg1.rotation.x = Math.sin(Date.now() * 0.01) * 0.5;
      playerLeg2.rotation.x = Math.sin(Date.now() * 0.01 + Math.PI) * 0.5;
      playerArm1.rotation.x = Math.sin(Date.now() * 0.01) * 0.5;
      playerArm2.rotation.x = Math.sin(Date.now() * 0.01 + Math.PI) * 0.5;
    }
  } else {
    playerLeg1.rotation.x = playerLeg2.rotation.x = 0;
    playerArm1.rotation.x = playerArm2.rotation.x = 0;
  }

  // A/D DO NOTHING (intentionally)

  // keep slight damping so system stays stable
  vel.multiplyScalar(0.9);
  player.position.add(vel);

  // jump
  if (keys[" "] && (ALLOW_REJUMP || onGround)) {
    velY = JUMP_SPEED;
    onGround = false;
  }

  velY -= GRAVITY;
  const prevY = player.position.y;
  player.position.y += velY;

  if (player.position.y <= 0) {
    player.position.y = 0;
    velY = 0;
    onGround = true;
  }

  for (let i = 0; i < platforms.length; i++) {
    const platform = platforms[i];

    if (velY < 0 && platform.intersectsTop(player, prevY)) {
      player.position.y = platform.yTop;
      velY = 0;
      onGround = true;
    } /*else if (platform.intersects(player)) {
      // Simple collision response: move player back to previous position
      player.position.copy(prevPos);
    }*/
  }

  // CAMERA FOLLOW (no skew, no pitch rotation)
  const camOffset = forward
    .clone()
    .multiplyScalar(-5)
    .add(new THREE.Vector3(0, cameraHeight, 0));
  camera.position.copy(player.position).add(camOffset);
  camera.lookAt(player.position);

  // coins
  coins.forEach((c, i) => {
    if (c.position.distanceTo(player.position) < 1.5) {
      scene.remove(c);
      coins.splice(i, 1);
      score += 10;
    }
  });

  consumables.forEach((p, i) => {
    p.update();
  });

  // enemies
  enemies.forEach((e) => {
    e.target = player.position.clone();
    const dir = e.position
      .clone()
      .sub(e.target)
      .normalize()
      .multiplyScalar(-ENEMY_SPEED);
    e.position.add(dir);
    if (e.position.distanceTo(player.position) < 1) {
      health -= 0.5;
    }
  });

  if (health <= 0) {
    gameOver();
  }

  document.getElementById("score").innerText = score;
  document.getElementById("health").innerText = health;
  document.getElementById("time").innerText = Math.floor(
    (Date.now() - startTime) / 100,
  );

  hudMessage = `playerposition: ${player.position.x.toFixed(2)}, ${player.position.y.toFixed(2)}, ${player.position.z.toFixed(2)}<br>`;
  hudMessage += `playerrotation: ${player.rotation.x.toFixed(2)}, ${player.rotation.y.toFixed(2)}, ${player.rotation.z.toFixed(2)}<br>`;
  hudMessage += `onGround: ${onGround}<br>`;
  hudMessage += `velocity: ${vel.x.toFixed(2)}, ${velY.toFixed(2)}, ${vel.z.toFixed(2)}<br>`;
  document.getElementById("msg").innerHTML = hudMessage;

  renderer.render(scene, camera);
}
animate();

onresize = () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
};
