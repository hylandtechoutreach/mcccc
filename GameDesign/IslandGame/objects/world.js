class World {
  constructor(scene, skyColor, sunColor, sunBrightness) {
    this.scene = scene;
    this.skyObj = this.makeSky(skyColor);
    this.sunObj = this.makeSun(sunColor, sunBrightness);
    this.ground = this.makeGround();
    this.water = this.makeOcean();
    this.platforms = this.makePlatforms();
  }

  makeSun(sunColor, sunBrightness) {
    const sun = new THREE.DirectionalLight(sunColor, sunBrightness);
    sun.position.set(30, 30, 10);
    sun.target.position.set(20, 0, 0);
    sun.shadow.camera.left = -100;
    sun.shadow.camera.right = 100;
    sun.shadow.camera.top = 100;
    sun.shadow.camera.bottom = -100;
    sun.castShadow = true;

    this.scene.add(sun);
    this.scene.add(new THREE.AmbientLight(sunColor, 0.2 * sunBrightness));
    return sun;
  }
  
  makeSky(skyColor) {
    const skyGeo = new THREE.SphereGeometry(500, 32, 32);
    const skyMat = new THREE.MeshBasicMaterial({
      color: skyColor,
      side: THREE.BackSide,
    });

    const skyObj = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(skyObj);
    return skyObj;
  }

  makeGround() {
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
    this.scene.add(ground);
    return ground;
  }

  makeOcean() {
    // OCEAN
    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(GROUND_SIZE * 2, GROUND_SIZE * 2),
      new THREE.MeshStandardMaterial({
        color: 0x1e90ff,
        transparent: true,
        opacity: 0.7,
      }),
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = -1;
    this.scene.add(water);
    return water;
  }

  makePlatforms() {
    const platforms = [];
    for (let i = 0; i < PLATFORM_LOCATIONS.length; i++) {
      const p = PLATFORM_LOCATIONS[i];
      platforms.push(new Platform(this.scene, p.east, p.vertical, p.north, p.width, 1, p.length));
    }

    return platforms;
  }
}
