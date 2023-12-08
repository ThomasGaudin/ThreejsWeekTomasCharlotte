import * as THREE from "three";

export function repartitionSpherique(N, rayon) {
  const objets = [];
  for (let i = 0; i < N; i++) {
    const phi = Math.acos(1 - (2 * i) / (N - 1));
    const theta = (2 * Math.PI * i) / (1 + Math.sqrt(5));
    const x = rayon * Math.cos(theta) * Math.sin(phi);
    const y = rayon * Math.sin(theta) * Math.sin(phi);
    const z = rayon * Math.cos(phi);
    objets.push(new THREE.Vector3(x, y, z));
  }

  return objets;
}
