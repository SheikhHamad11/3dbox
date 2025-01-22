// "use client";
// import { useRef, useEffect, useState } from "react";
// import * as THREE from "three";

// const Canvas3D = () => {
//   const canvasRef = useRef(null);
//   const cubeRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     // Create the scene
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     canvasRef.current.appendChild(renderer.domElement);

//     // Create a 3D cube
//     const geometry = new THREE.BoxGeometry();
//     const materials = [
//       new THREE.MeshBasicMaterial({ color: "red" }),
//       new THREE.MeshBasicMaterial({ color: "green" }),
//       new THREE.MeshBasicMaterial({ color: "blue" }),
//       new THREE.MeshBasicMaterial({ color: "yellow" }),
//       new THREE.MeshBasicMaterial({ color: "purple" }),
//       new THREE.MeshBasicMaterial({ color: "cyan" }),
//     ];
//     const cube = new THREE.Mesh(geometry, materials);
//     scene.add(cube);
//     cubeRef.current = cube;

//     // Set camera position
//     camera.position.z = 5;

//     // Animation loop
//     const animate = function () {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Clean up on component unmount
//     return () => {
//       canvasRef.current.removeChild(renderer.domElement);
//     };
//   }, []);

//   // Function to handle both mouse and touch positions
//   const getPosition = (event) => {
//     if (event.touches) {
//       return { x: event.touches[0].clientX, y: event.touches[0].clientY };
//     } else {
//       return { x: event.clientX, y: event.clientY };
//     }
//   };

//   // Prevent default scrolling and pull-to-refresh
//   const preventDefaultTouch = (event) => {
//     event.preventDefault();
//   };

//   // Start rotation on mouse down or touch start
//   const handleStart = (event) => {
//     preventDefaultTouch(event);
//     setIsDragging(true);
//     const position = getPosition(event);
//     setLastPosition(position);
//   };

//   // Update cube rotation on mouse move or touch move
//   const handleMove = (event) => {
//     preventDefaultTouch(event);
//     if (!isDragging) return;

//     const position = getPosition(event);
//     const deltaX = position.x - lastPosition.x;
//     const deltaY = position.y - lastPosition.y;

//     // Update cube rotation based on movement
//     cubeRef.current.rotation.y += deltaX * 0.01;
//     cubeRef.current.rotation.x += deltaY * 0.01;

//     setLastPosition(position);
//   };

//   // Stop rotation on mouse up or touch end
//   const handleEnd = (event) => {
//     preventDefaultTouch(event);
//     setIsDragging(false);
//   };

//   return (
//     <div
//       ref={canvasRef}
//       style={{ width: "100%", height: "100vh" }}
//       onMouseDown={handleStart}
//       onMouseMove={handleMove}
//       onMouseUp={handleEnd}
//       onMouseLeave={handleEnd}
//       onTouchStart={handleStart}
//       onTouchMove={handleMove}
//       onTouchEnd={handleEnd}
//       onTouchCancel={handleEnd} // for handling cancellation of touch events
//     />
//   );
// };

// export default Canvas3D;
