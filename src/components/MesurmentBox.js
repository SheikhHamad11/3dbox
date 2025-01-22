import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Text } from "troika-three-text";

const AccurateMeasurementBox = () => {
  const containerRef = useRef();

  useEffect(() => {
    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Box dimensions
    const boxWidth = 8; // Width
    const boxHeight = 6; // Height
    const boxLength = 12; // Length

    // Create the box
    const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxLength);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);

    // Position the box on the scene
    box.position.set(0, boxHeight / 2, 0);

    // Utility function for measurement arrows
    const addMeasurement = (
      start,
      end,
      label,
      labelPosition,
      color = 0xff0000
    ) => {
      // Add line
      const material = new THREE.LineBasicMaterial({ color });
      const points = [start, end];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      scene.add(line);

      // Add arrowheads
      const arrow1 = new THREE.ArrowHelper(
        new THREE.Vector3().subVectors(end, start).normalize(),
        start,
        start.distanceTo(end) - 0.2,
        color,
        0.2,
        0.1
      );
      const arrow2 = new THREE.ArrowHelper(
        new THREE.Vector3().subVectors(start, end).normalize(),
        end,
        start.distanceTo(end) - 0.2,
        color,
        0.2,
        0.1
      );
      scene.add(arrow1);
      scene.add(arrow2);

      // Add label
      const text = new Text();
      text.text = label;
      text.fontSize = 0.4;
      text.color = 0x000000;
      text.position.set(labelPosition.x, labelPosition.y, labelPosition.z);
      text.anchorX = "center";
      text.anchorY = "middle";
      scene.add(text);
    };

    // Add measurements as per the image
    // Width (Front face)
    addMeasurement(
      new THREE.Vector3(-boxWidth / 2, boxHeight / 2, boxLength / 2),
      new THREE.Vector3(boxWidth / 2, boxHeight / 2, boxLength / 2),
      `Width: ${boxWidth}`,
      new THREE.Vector3(0, boxHeight / 2 + 0.5, boxLength / 2)
    );

    // Height (Side face)
    addMeasurement(
      new THREE.Vector3(-boxWidth / 2, 0, boxLength / 2),
      new THREE.Vector3(-boxWidth / 2, boxHeight, boxLength / 2),
      `Height: ${boxHeight}`,
      new THREE.Vector3(-boxWidth / 2 - 0.8, boxHeight / 2, boxLength / 2)
    );

    // Length (Top face)
    addMeasurement(
      new THREE.Vector3(-boxWidth / 2, boxHeight + 0.5, -boxLength / 2),
      new THREE.Vector3(-boxWidth / 2, boxHeight + 0.5, boxLength / 2),
      `Length: ${boxLength}`,
      new THREE.Vector3(-boxWidth / 2 - 0.5, boxHeight + 0.8, 0)
    );

    // Diagonal
    addMeasurement(
      new THREE.Vector3(-boxWidth / 2, 0, -boxLength / 2),
      new THREE.Vector3(boxWidth / 2, boxHeight, boxLength / 2),
      `Diagonal`,
      new THREE.Vector3(boxWidth / 4, boxHeight / 2, boxLength / 4),
      0x00ff00 // Green color for diagonal
    );

    // Position the camera
    camera.position.set(15, 10, 15);
    camera.lookAt(0, boxHeight / 2, 0);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      containerRef.current.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} />;
};

export default AccurateMeasurementBox;
