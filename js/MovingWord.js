import * as THREE from "three";
export default class MovingWord {
  constructor(text) {
    this.text = text;
    this.targetPosition = new THREE.Vector3(0, 0, 0);
    this.amount = 0;
    this.canLerp = false;
    this.canLerpY = false;
    this.text.position.x = 0;
    this.text.position.y = 0;
    this.text.position.z = -10;
  }
  update() {
    // if (this.canLerpY) {
    //   if (Math.abs(this.text.position.y - this.targetPosition.y) <= 0.05) {
    //     this.canLerpY = false;
    //   }
    // }
    this.text.position.lerp(
      new THREE.Vector3(
        this.targetPosition.x,
        this.targetPosition.y,
        this.targetPosition.z
      ),
      this.amount
    );
    // console.log(this.text.position);
  }

  lerp(v0, v1, t) {
    return v0 * (1 - t) + v1 * t;
  }
}
