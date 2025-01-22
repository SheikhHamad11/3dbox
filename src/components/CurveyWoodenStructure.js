"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // Import OrbitControls

const WoodenStructure = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Add lighting to the scene
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10).normalize();
    scene.add(light);

    const material = new THREE.MeshStandardMaterial({ color: "saddlebrown" });
    const borderMaterial = new THREE.MeshBasicMaterial({ color: "black" }); // Border color

    // Function to create a curved beam with border
    const createBeam = (radiusTop, radiusBottom, height, x, y, z) => {
      // Main beam
      const geometry = new THREE.CylinderGeometry(
        radiusTop,
        radiusBottom,
        height,
        32
      ); // 32 segments for smoothness
      geometry.rotateX(Math.PI / 2); // Rotate to make the cylinder stand upright
      const beam = new THREE.Mesh(geometry, material);
      beam.position.set(x, y, z);
      scene.add(beam);

      // Border beam
      const borderGeometry = new THREE.CylinderGeometry(
        radiusTop * 1.05,
        radiusBottom * 1.05,
        height * 1.05,
        32
      ); // Slightly larger
      borderGeometry.rotateX(Math.PI / 2);
      const border = new THREE.Mesh(borderGeometry, borderMaterial);
      border.position.set(x, y, z);
      scene.add(border);

      return beam;
    };

    // Example structure similar to the one in the image
    // Horizontal Curved Beams with Border
    createBeam(0.5, 0.5, 10, 0, 5, 0); // top beam
    createBeam(0.5, 0.5, 10, 0, 0, 0); // middle beam
    createBeam(0.5, 0.5, 10, 0, -5, 0); // bottom beam

    // Vertical Curved Beams with Border
    createBeam(0.5, 0.5, 5, -5, 2.5, 0); // left top vertical
    createBeam(0.5, 0.5, 5, 5, 2.5, 0); // right top vertical
    createBeam(0.5, 0.5, 5, -5, -2.5, 0); // left bottom vertical
    createBeam(0.5, 0.5, 5, 5, -2.5, 0); // right bottom vertical

    // Set camera position
    camera.position.z = 15;

    // Add OrbitControls for manual rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth damping (inertia)
    controls.dampingFactor = 0.05;
    controls.enableZoom = true; // Allow zoom in/out
    controls.enablePan = true; // Allow panning

    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the entire scene
      scene.rotation.y += 0.01; // Rotate around the Y-axis

      controls.update(); // Update controls
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={canvasRef}></div>;
};

export default WoodenStructure;
