import * as THREE from "three";
import { CSG } from "three-csg-ts"; // Make sure to install three-csg-ts via npm

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the diagonal bar geometry
const barGeometry = new THREE.BoxGeometry(5, 1, 1); // Length, height, width of the bar
const barMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const barMesh = new THREE.Mesh(barGeometry, barMaterial);

// Create the hole geometry (cylindrical hole)
const holeGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.1, 32); // Radius, Height of the hole
const holeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Temporary color for visualization
const holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);

// Rotate the hole geometry to align with the bar
holeMesh.rotateX(Math.PI / 2); // Rotate around the x-axis for horizontal alignment
holeMesh.position.set(0, 0, 0); // Position the hole in the center

// Subtract the hole from the bar using CSG
const csgBar = CSG.fromMesh(barMesh);
const csgHole = CSG.fromMesh(holeMesh);
const resultCSG = csgBar.subtract(csgHole);

// Create the final mesh from the CSG result
const resultMesh = CSG.toMesh(resultCSG, barMesh.matrix, barMaterial);

// Add the result mesh to the scene
scene.add(resultMesh);

// Position and rotate the bar in diagonal direction
resultMesh.rotation.z = Math.PI / 4; // Rotate 45 degrees to create a diagonal effect

// Set camera position
camera.position.z = 10;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
export default animate;
