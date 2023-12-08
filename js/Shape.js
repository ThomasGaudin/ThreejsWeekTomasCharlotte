import * as THREE from "three";
export default class Shape {
  constructor(scene) {
    this.scene = scene;
  }
  createCube() {
    const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.castShadow = true;
    this.cube.receiveShadow = true;
    this.scene.add(this.cube);
  }

  createFloor() {
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.receiveShadow = true;
    plane.rotateX(Math.PI / 2);
    this.scene.add(plane);
  }
}
