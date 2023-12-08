import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
export default class Light {
  constructor(scene) {
    this.scene = scene;
  }

  createHdr() {
    const hdrTextureLoader = new RGBELoader();
    const hdrTextureURL = "./background3.hdr";
    hdrTextureLoader.load(hdrTextureURL, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.background = texture;
    });
  }

  createLight() {
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // this.scene.add(ambientLight);
    //emisphereLight

    // this.hemisphereLight = new THREE.HemisphereLight("red", "blue", 800);
    // this.scene.add(this.hemisphereLight);

    //spotlight1
    this.spotLight5 = new THREE.SpotLight("#0000FF", 2000, 3); // Couleur, Intensité
    this.spotLight5.position.set(0, -30, 0); // Position de la lumière

    // Angle, Pénétration, Distance
    this.spotLight5.angle = Math.PI / 2;
    this.spotLight5.penumbra = 0.3;
    this.spotLight5.distance = 500;

    // Gérer les ombres
    this.spotLight5.castShadow = true;
    this.spotLight5.shadow.mapSize.width = 4096;
    this.spotLight5.shadow.mapSize.height = 4096;

    // Cibler le centre de la scène
    this.spotLight5.target.position.set(-30, 0, 0);
    this.scene.add(this.spotLight5);

    // this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight5);
    // this.scene.add(this.spotLightHelper);

    //spotLigth6
    this.spotLight6 = new THREE.SpotLight("#0000FF", 2000, 3); // Couleur, Intensité
    this.spotLight6.position.set(30, 0, 0); // Position de la lumière

    // Angle, Pénétration, Distance
    this.spotLight6.angle = Math.PI / 2;
    this.spotLight6.penumbra = 0.3;
    this.spotLight6.distance = 500;

    this.spotLight6.lookAt(new THREE.Vector3(-30, 0, 0));

    // Gérer les ombres
    this.spotLight6.castShadow = true;
    this.spotLight6.shadow.mapSize.width = 4096;
    this.spotLight6.shadow.mapSize.height = 4096;

    // Cibler le centre de la scène
    this.spotLight6.target.position.set(0, 0, 0);
    this.scene.add(this.spotLight6);

    // this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight6);
    // this.scene.add(this.spotLightHelper);

    //spotlight7
    this.spotLight7 = new THREE.SpotLight("#0000FF", 1000, 3); // Couleur, Intensité
    this.spotLight7.position.set(0, -60, 0); // Position de la lumière

    // Angle, Pénétration, Distance
    this.spotLight7.angle = Math.PI / 2;
    this.spotLight7.penumbra = 0.3;
    this.spotLight7.distance = 500;

    // Gérer les ombres
    this.spotLight7.castShadow = true;
    this.spotLight7.shadow.mapSize.width = 4096;
    this.spotLight7.shadow.mapSize.height = 4096;

    // Cibler le centre de la scène
    this.spotLight7.target.position.set(0, -30, 0);
    this.scene.add(this.spotLight7);

    // this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight7);
    // this.scene.add(this.spotLightHelper);

    // 1 une spotlight
    this.spotLight = new THREE.SpotLight("#0033FF", 10000, 0, Math.PI / 3, 3);
    this.spotLight.position, "x", -30, -27, -0.39;
    this.spotLight.position, "y", -27, -30, -0.39;
    this.spotLight.lookAt(new THREE.Vector3(0, 0, 0));
    // // gérer les ombres
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 4096;
    this.spotLight.shadow.mapSize.height = 4096;
    this.scene.add(this.spotLight);
    //helper
    //this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
    //this.scene.add(this.spotLightHelper);

    // 1 une spotlight
    this.spotLight4 = new THREE.SpotLight("#0033FF", 10000, 0, Math.PI / 3, 3);
    this.spotLight4.position.set(-30, 0, 0);
    this.spotLight4.lookAt(new THREE.Vector3(10, 0, 0));
    // // gérer les ombres
    this.spotLight4.castShadow = true;
    this.spotLight4.shadow.mapSize.width = 4096;
    this.spotLight4.shadow.mapSize.height = 4096;
    this.scene.add(this.spotLight4);
    //helper
    //this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight4);
    //this.cene.add(this.spotLightHelper10);

    this.spotLight10 = new THREE.SpotLight("#0033FF", 10000, 0, Math.PI / 3, 3);
    this.spotLight10.position.set(0, 0, 0);
    this.spotLight10.lookAt(new THREE.Vector3(15, 0, 0));
    // // gérer les ombres
    this.spotLight10.castShadow = true;
    this.spotLight10.shadow.mapSize.width = 4096;
    this.spotLight10.shadow.mapSize.height = 4096;
    this.scene.add(this.spotLight10);
    //helper
    this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight10);
    this.scene.add(this.spotLightHelper10);

    //8
    this.spotLight8 = new THREE.SpotLight("#FFFFFF", 5000, 0, Math.PI / 3, 3);
    this.spotLight8.position.set(0, 0, -30);
    this.spotLight8.lookAt(new THREE.Vector3(0, 0, 0));
    // // gérer les ombres
    this.spotLight8.castShadow = true;
    this.spotLight8.shadow.mapSize.width = 4096;
    this.spotLight8.shadow.mapSize.height = 4096;
    this.scene.add(this.spotLight8);

    //9
    this.spotLight9 = new THREE.SpotLight("#0002FF", 10000, 0, Math.PI / 3, 3);
    this.spotLight9.position.set(0, 0, 20);
    this.spotLight9.lookAt(new THREE.Vector3(0, 10, 0));
    // // gérer les ombres
    this.spotLight9.castShadow = true;
    this.spotLight9.shadow.mapSize.width = 4096;
    this.spotLight9.shadow.mapSize.height = 4096;
    this.scene.add(this.spotLight9);
    //helper
    this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight9);
    //this.scene.add(this.spotLightHelper);
  }

  createUpdateLight() {
    this.spotLight2 = new THREE.SpotLight(0xffffff, 3000, 3);
    this.spotLight2.position.set(0, 0, 0);

    // gérer les ombres
    this.spotLight2.castShadow = true;
    this.spotLight2.shadow.mapSize.width = 4096;
    this.spotLight2.shadow.mapSize.height = 4096;
    this.scene.add(this.spotLight2);
    //helper
    // this.spotLightHelper2 = new THREE.SpotLightHelper(this.spotLight2);
    // this.scene.add(this.spotLightHelper2);
  }

  updatingLight(positionX, positionY, positionZ) {
    this.spotLight2.position.x = positionX;
    this.spotLight2.position.y = positionY;
    this.spotLight2.position.z = positionZ;
  }

  update() {
    this.spotLightHelper.update();
  }

  gui(gui) {
    // const folder1 = gui.addFolder("Light");
    // folder1.add(this.spotLight8, "intensity", 0, 300, 0.01);
    // // controle de l'angle du spotlight
    // folder1.add(this.spotLight8, "angle", 0, Math.PI / 3, 0.01);
    // // controle des positions
    // folder1.add(this.spotLight8.position, "x", -30, 30, 0.01);
    // folder1.add(this.spotLight8.position, "y", -30, 30, 0.01);
    // folder1.add(this.spotLight8.position, "z", -30, 30, 0.01);
    // // controle de la pénombre
    // folder1.add(this.spotLight8, "penumbra", 0, 1, 0.01);
    // //control de la distance
    // // folder.add(this.spotLight, "distance", 0, 100, 0.01);
    // folder1.open();
  }
}
