class Coin extends Consumable {
  constructor(game, north, east, vertical) {
    const onConsume = () => {
      game.player.score += 10;
    };

    super(game, north, east, vertical, onConsume, 0.2, "gold", "torus");
  }

  update() {
    super.update();
    this.ThreeObj.rotation.y += 0.05;
  }
}
