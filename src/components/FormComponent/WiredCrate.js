// //---------------------------------------------------------------------------------------------------------------

// function createBoxWithDiagonalBars(
//   boxWidth,
//   boxHeight,
//   boxDepth,
//   barThickness,
//   barColor
// ) {
//   // Create the main box
//   const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
//   const boxMaterial = new THREE.MeshBasicMaterial({
//     color: 0xaaaaaa,
//     wireframe: true,
//   });
//   const box = new THREE.Mesh(boxGeometry, boxMaterial);

//   // Create diagonal bars
//   const bars = [];
//   const barMaterial = new THREE.MeshBasicMaterial({ color: barColor });

//   // Helper function to create and position a diagonal bar
//   function addDiagonalBar(start, end) {
//     const length = start.distanceTo(end);
//     const barGeometry = new THREE.BoxGeometry(
//       length,
//       barThickness,
//       barThickness
//     );
//     const bar = new THREE.Mesh(barGeometry, barMaterial);

//     // Position bar at the midpoint between start and end points
//     const midpoint = new THREE.Vector3()
//       .addVectors(start, end)
//       .multiplyScalar(0.5);
//     bar.position.copy(midpoint);

//     // Calculate the direction and set the rotation
//     const direction = new THREE.Vector3().subVectors(end, start).normalize();
//     const axis = new THREE.Vector3(1, 0, 0); // Default direction for bar geometry
//     bar.quaternion.setFromUnitVectors(axis, direction); // Align bar to direction vector

//     bars.push(bar);
//   }

//   // Define corner points for each face
//   const frontTopLeft = new THREE.Vector3(
//     -boxWidth / 2,
//     boxHeight / 2,
//     boxDepth / 2
//   );
//   const frontBottomRight = new THREE.Vector3(
//     boxWidth / 2,
//     -boxHeight / 2,
//     boxDepth / 2
//   );
//   const frontTopRight = new THREE.Vector3(
//     boxWidth / 2,
//     boxHeight / 2,
//     boxDepth / 2
//   );
//   const frontBottomLeft = new THREE.Vector3(
//     -boxWidth / 2,
//     -boxHeight / 2,
//     boxDepth / 2
//   );

//   const backTopLeft = new THREE.Vector3(
//     -boxWidth / 2,
//     boxHeight / 2,
//     -boxDepth / 2
//   );
//   const backBottomRight = new THREE.Vector3(
//     boxWidth / 2,
//     -boxHeight / 2,
//     -boxDepth / 2
//   );
//   const backTopRight = new THREE.Vector3(
//     boxWidth / 2,
//     boxHeight / 2,
//     -boxDepth / 2
//   );
//   const backBottomLeft = new THREE.Vector3(
//     -boxWidth / 2,
//     -boxHeight / 2,
//     -boxDepth / 2
//   );

//   // Add diagonal bars on the front face
//   addDiagonalBar(frontTopLeft, frontBottomRight);
//   addDiagonalBar(frontTopRight, frontBottomLeft);

//   // Add diagonal bars on the back face
//   addDiagonalBar(backTopLeft, backBottomRight);
//   addDiagonalBar(backTopRight, backBottomLeft);
//   // Add diagonal bars on the top face
//   addDiagonalBar(frontTopLeft, backBottomLeft);
//   addDiagonalBar(backTopLeft, frontBottomLeft);
//   addDiagonalBar(frontTopRight, backBottomRight);
//   addDiagonalBar(backTopRight, frontBottomRight);

//   // Group the box and bars together
//   const group = new THREE.Group();
//   group.add(box);
//   bars.forEach((bar) => group.add(bar));

//   return group;
// }

// //---------------------------------------------------------------------------------------------------------------
