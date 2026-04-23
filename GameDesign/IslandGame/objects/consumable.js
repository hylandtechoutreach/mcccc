class Consumable {
  constructor(scene, player, north, east, vertical, onConsume, size = 0.2, color = "yellow", shape = "sphere") {
    this.player = player;
    this.scene = scene;
    this.consumed = false;
    this.onConsume = onConsume;
    this.ThreeObj = new THREE.Mesh(
      new THREE.SphereGeometry(size, 32, 32),
      new THREE.MeshStandardMaterial({ color }),
    );
    this.ThreeObj.position.set(north, vertical, east);
    this.scene.add(this.ThreeObj);
  }

  update() {
    if (!this.consumed && this.ThreeObj.position.distanceTo(this.player.position) < 1.5) {
      this.onConsume();
      this.scene.remove(this.ThreeObj);
      this.consumed = true;
    }
  }
}
