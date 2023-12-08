import * as THREE from "three";
export default class Camera {
  constructor(scene) {
    this.scene = scene;
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      120,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 15);
    this.scene.add(this.camera);
  }

  updateState(etat) {
    switch (etat) {
      case 0:
        break;
      case 1:
        // this.transitionCamera(new THREE.Vector3(30, 10, 30), Math.PI / 2, 0.02);
        // this.transitionCameraRotationY(Math.PI / 4, 0.02); // Rotation d'un demi-tour (180 degrés)

        break;
      case 2:
        break;
      case 3:
        break;

      default:
        break;
    }
  }

  transitionCamera(targetPosition, targetRotationY, duration) {
    const initialPosition = this.camera.position.clone();
    const initialRotationY = this.camera.rotation.y;
    let elapsedTime = 0;

    const update = () => {
      elapsedTime += 0.016; // 16 ms frame time for smooth animation

      const t = Math.min(elapsedTime / (duration * 1000), 1.0);

      // Utilisez la fonction lerp pour interpoler entre les positions
      this.camera.position.lerpVectors(initialPosition, targetPosition, t);
      this.camera.rotation.y = THREE.MathUtils.lerp(
        initialRotationY,
        targetRotationY,
        t
      );

      if (t < 1.0) {
        requestAnimationFrame(update);
      }
    };

    update();
  }

  gui(gui) {
    // const folder2 = gui.addFolder("Camera");
    // folder2.add(this.camera.position, "x", -100, 100, 0.01);
    // folder2.add(this.camera.position, "y", -100, 100, 0.01);
    // folder2.add(this.camera.position, "z", -100, 100, 0.01);
    // folder2.add(this.camera.rotation, "x", -Math.PI, Math.PI, 0.0001);
    // folder2.add(this.camera.rotation, "y", -Math.PI, Math.PI, 0.0001);
    // folder2.add(this.camera.rotation, "z", -Math.PI, Math.PI, 0.0001);
    // folder2.add(this.camera, "fov", 20, 180, 1).onChange(() => {
    //   this.camera.updateProjectionMatrix();
    // });
    // folder2.open();
  }
}
