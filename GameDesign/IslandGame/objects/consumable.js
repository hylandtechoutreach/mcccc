class Consumable {
  constructor(game, north, east, vertical, onConsume, size = 0.2, color = "yellow", shape = "sphere") {
    this.player = game.player;
    this.scene = game.scene;
    this.consumed = false;
    this.onConsume = onConsume;
    let geometry;

    if (shape === "sphere") {
      geometry = new THREE.SphereGeometry(size, 32, 32);
    } else if (shape === "torus") {
      geometry = new THREE.TorusGeometry(0.4, 0.15, 8, 16);
    } else {
      geometry = new THREE.BoxGeometry(size, size, size);
    }

    this.ThreeObj = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({ color }),
    );
    this.ThreeObj.castShadow = true;
    this.ThreeObj.receiveShadow = true;
    this.ThreeObj.position.set(north, vertical, east);
    this.scene.add(this.ThreeObj);
  }

  update() {
    if (!this.consumed && this.ThreeObj.position.distanceTo(this.player.position) < 2) {
      this.onConsume();
      this.scene.remove(this.ThreeObj);
      this.consumed = true;
    }
  }
}
