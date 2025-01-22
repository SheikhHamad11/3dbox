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
    // const light = new THREE.DirectionalLight(0xffffff, 1);
    // light.position.set(10, 10, 10, 10).normalize();
    // scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    scene.add(ambientLight);

    const material = new THREE.MeshStandardMaterial({ color: "saddlebrown" });

    // Function to create a beam (rectangular box)
    const createBeam = (width, height, depth, x, y, z) => {
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const beam = new THREE.Mesh(geometry, material);
      beam.position.set(x, y, z);
      scene.add(beam);
      return beam;
    };

    // Example structure similar to the one in the image
    // Horizontal Beams
    createBeam(10, 1, 1, 0, 5, 1); // top beam
    createBeam(10, 1, 1, 0, 3, 1); // middle beam
    createBeam(10, 1, 1, 0, 1, 1); // middle beam
    createBeam(10, 1, 1, 0, -1, 1); // middle beam
    createBeam(10, 1, 1, 0, -3, 1); // middle beam
    createBeam(10, 1, 1, 0, -5, 1); // bottom beam

    // Vertical Beams
    createBeam(1, 5, 1, 5, 2.5, 1); // left top vertical
    createBeam(1, 5, 1, -5, 2.5, 1); // right top vertical
    createBeam(1, 5, 1, 5, -2.5, 1); // left bottom vertical
    createBeam(1, 5, 1, -5, -2.5, 1); // right bottom vertical

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
