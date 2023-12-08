import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import MovingWord from "./MovingWord";
export default class Text {
  constructor(scene) {
    this.scene = scene;
  }

  loadFont() {
    const loader = new FontLoader();
    return new Promise((resolve, reject) => {
      loader.load("./BR.json", (font) => {
        resolve(font);
      });
    });
  }

  loadFont2() {
    const loader = new FontLoader();
    return new Promise((resolve, reject) => {
      loader.load("./brown.json", (font2) => {
        resolve(font2);
      });
    });
  }

  createText(_text, font, type = "assistant") {
    const geometry = new TextGeometry(_text, {
      font: font,
      size: 2,
      height: 0.5,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: 0.3,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    let material = new THREE.MeshPhysicalMaterial({
      roughness: 0.3,
      metalness: 0,
      color: "#0033FF",
      transmission: 1,
      ior: 1.33,
      emissive: "#252525",
      emissiveIntensity: 0.7,
    });

    if (type == "user") {
      // font = this.font2();
      material = new THREE.MeshPhysicalMaterial({
        roughness: 0.3,
        metalness: 0,
        color: "#E06B19",
        transmission: 1,
        ior: 1.33,
        emissive: "#ffffff",
        emissiveIntensity: 0.7,
      });
    }

    // const text2 = new THREE.Mesh(geometry, material);
    // text.rotateX(-Math.PI / 2);
    // text.castShadow = true;
    // text.receiveShadow = true;

    // const material2 = new THREE.MeshPhysicalMaterial({
    //   roughness: 0.4,
    //   metalness: 0,
    //   color: "#0033FF",
    //   transmission: 1,
    //   ior: 1.33,
    //   emissive: "#252525",
    //   emissiveIntensity: 0.7,
    // });

    const text = new THREE.Mesh(geometry, material);

    // text.rotateX(-Math.PI / 2);
    text.castShadow = true;
    text.receiveShadow = true;
    // this.scene.add(text);

    return new MovingWord(text);
  }
}
