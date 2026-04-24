let game = new Game(document);

function eatRejumpPowerUp() {
  ALLOW_REJUMP = true;
}

game.addConsumable(new Consumable(game, -20, -5, 6, eatRejumpPowerUp, .3, "yellow"));

document.addEventListener("keydown", (e) => (game.keysPressed[e.key.toLowerCase()] = true));
document.addEventListener("keyup", (e) => (game.keysPressed[e.key.toLowerCase()] = false));

function animate() {
  requestAnimationFrame(animate);
  game.update();

  if (game.gameOverHit) {
    if (game.keysPressed["enter"]) {
      window.location.reload();
    }
  }
}

animate();
