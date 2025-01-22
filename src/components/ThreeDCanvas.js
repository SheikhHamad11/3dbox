"use client";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
import { calculateMargin } from "../helpers/Calculations";
import { CSG } from "three-csg-ts";
import { setZoomValue } from "@/ReduxConfig/slices/ZoomInOutSlice";

const createScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  return scene;
};

const createCamera = (zoomValue, viewAngle = { x: 60, y: 60 }) => {
  const camera = new THREE.PerspectiveCamera(
    45, // Field of view
    ((window.innerWidth / 4) * 3) / window.innerHeight, // Aspect ratio
    0.5, // Near clipping plane
    1000 // Far clipping plane
  );

  // Set the camera's default position
  camera.position.set(
    zoomValue * Math.sin(THREE.MathUtils.degToRad(viewAngle.x)),
    zoomValue * Math.sin(THREE.MathUtils.degToRad(viewAngle.y)),
    zoomValue + 10 // Maintain the zoom value
  );

  // Ensure the camera is looking at the center of the scene (assuming the box is at (0, 0, 0))
  camera.lookAt(0, 0, 0);

  return camera;
};

const createRenderer = (mountRef) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize((window.innerWidth / 4) * 3, window.innerHeight);
  mountRef.current.appendChild(renderer.domElement);
  return renderer;
};

const addLights = (scene) => {
  const lights = [
    { x: 1, y: 1, z: 1 },
    { x: -1, y: -1, z: -1 },
    { x: -1, y: 1, z: 1 },
    { x: 1, y: -1, z: -1 },
  ];

  lights.forEach(({ x, y, z }) => {
    const light = new THREE.DirectionalLight(0xd2a27f, 3);
    light.position.set(x, y, z).normalize();
    scene.add(light);
  });
};

const loadTexture = (url) => {
  const textureLoader = new THREE.TextureLoader();
  return textureLoader.load(url);
};

const createWoodenPlyWoodBox = (scene, material, Measurment) => {
  const {
    length,
    width,
    height,
    BarWidth,
    isHandle,
    toplid,
    handleWidth,
    handleHeight,
    Base,
    parallelDirection,
  } = Measurment;

  const BarHeight = height * 0.1;

  const squre_margin = calculateMargin(20, BarHeight, width, BarHeight);
  const baseBoard = new THREE.BoxGeometry(length, BarWidth, width);
  const bottomVerticalBar3 = new THREE.BoxGeometry(BarWidth, BarHeight, width);
  const bottomHorizontalBar3 = new THREE.BoxGeometry(
    length,
    BarHeight,
    BarWidth
  );
  const baseVerticalBars2 = new THREE.BoxGeometry(BarHeight, BarHeight, width);
  const baseHorizontalBoarder2 = new THREE.BoxGeometry(
    length,
    BarHeight,
    BarHeight
  );
  const BottomSquare = new THREE.BoxGeometry(BarHeight, BarHeight, BarHeight);
  const sideBoard = new THREE.BoxGeometry(
    BarWidth,
    height - 2 * BarWidth,
    width - 2 * BarWidth
  );
  const frontBoard = new THREE.BoxGeometry(
    length,
    height - 2 * BarWidth,
    BarWidth
  );

  const bottomrightBar = new THREE.Mesh(baseBoard, material);
  const topBoard = new THREE.Mesh(baseBoard, material);
  const leftBoardMesh = new THREE.Mesh(sideBoard, material);
  const frontBoardMesh = new THREE.Mesh(frontBoard, material);
  const backBoardMesh = new THREE.Mesh(frontBoard, material);
  const rightBoardMesh = new THREE.Mesh(sideBoard, material);
  const bottomrightBar2 = new THREE.Mesh(baseVerticalBars2, material);
  const bottomCenterBar2 = new THREE.Mesh(baseVerticalBars2, material);
  const bottomleftBar2 = new THREE.Mesh(baseVerticalBars2, material);
  const bottomfrontBar2 = new THREE.Mesh(baseHorizontalBoarder2, material);
  const bottomMiddleBar2 = new THREE.Mesh(baseHorizontalBoarder2, material);
  const bottomBackBar2 = new THREE.Mesh(baseHorizontalBoarder2, material);
  const bottomLeftVerticalBarMesh3 = new THREE.Mesh(
    bottomVerticalBar3,
    material
  );
  const bottomCenterVerticalBarMesh3 = new THREE.Mesh(
    bottomVerticalBar3,
    material
  );
  const bottomRightVerticalBarMesh3 = new THREE.Mesh(
    bottomVerticalBar3,
    material
  );
  const bottomFrontHorizontalBarMesh3 = new THREE.Mesh(
    bottomHorizontalBar3,
    material
  );
  const bottomMiddleHorizontalBarMesh3 = new THREE.Mesh(
    bottomHorizontalBar3,
    material
  );
  const bottomBackHorizontalBarMesh3 = new THREE.Mesh(
    bottomHorizontalBar3,
    material
  );
  const holeGeometry = new THREE.CylinderGeometry(
    9 / 2,
    9 / 2,
    BarHeight / 2,
    46
  );
  const holeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const holeFrontMesh = new THREE.Mesh(holeGeometry, holeMaterial);
  const holeBackMesh = new THREE.Mesh(holeGeometry, holeMaterial);
  const holeFrontMesh1 = new THREE.Mesh(holeGeometry, holeMaterial);
  const holeBackMesh1 = new THREE.Mesh(holeGeometry, holeMaterial);

  holeFrontMesh.position.set(0, -BarHeight / 4, 13.5);
  holeBackMesh.position.set(0, -BarHeight / 4, -13.5);
  holeFrontMesh1.position.set(13.5, -BarHeight / 4, 0);
  holeBackMesh1.position.set(-13.5, -BarHeight / 4, 0);
  holeFrontMesh.updateMatrix();
  holeBackMesh.updateMatrix();
  holeFrontMesh1.updateMatrix();
  holeBackMesh1.updateMatrix();
  bottomLeftVerticalBarMesh3.updateMatrix();
  bottomCenterVerticalBarMesh3.updateMatrix();
  bottomRightVerticalBarMesh3.updateMatrix();
  bottomFrontHorizontalBarMesh3.updateMatrix();
  bottomMiddleHorizontalBarMesh3.updateMatrix();
  bottomBackHorizontalBarMesh3.updateMatrix();
  const csgBar = CSG.fromMesh(bottomLeftVerticalBarMesh3);
  const csgRightBar = CSG.fromMesh(bottomCenterVerticalBarMesh3);
  const csgLeftBar = CSG.fromMesh(bottomRightVerticalBarMesh3);
  const csgFrontBar = CSG.fromMesh(bottomFrontHorizontalBarMesh3);
  const csgMiddleBar = CSG.fromMesh(bottomMiddleHorizontalBarMesh3);
  const csgBackBar = CSG.fromMesh(bottomBackHorizontalBarMesh3);

  const csgFrontHole = CSG.fromMesh(holeFrontMesh);
  const csgBackHole = CSG.fromMesh(holeBackMesh);
  const csgFrontHole1 = CSG.fromMesh(holeFrontMesh1);
  const csgBackHole1 = CSG.fromMesh(holeBackMesh1);
  const resultCSG = csgBar.subtract(csgFrontHole).subtract(csgBackHole);

  const resultRightCSG = csgRightBar
    .subtract(csgFrontHole)
    .subtract(csgBackHole);
  const resultLeftCSG = csgLeftBar.subtract(csgFrontHole).subtract(csgBackHole);
  const resultFrontCSG = csgFrontBar
    .subtract(csgFrontHole1)
    .subtract(csgBackHole1);

  const resultMiddleCSG = csgMiddleBar
    .subtract(csgFrontHole1)
    .subtract(csgBackHole1);
  const resultBackCSG = csgBackBar
    .subtract(csgFrontHole1)
    .subtract(csgBackHole1);

  const resultStringerMesh = CSG.toMesh(
    resultCSG,
    bottomLeftVerticalBarMesh3.matrix,
    material
  );
  const resultRightStringerMesh = CSG.toMesh(
    resultRightCSG,
    bottomCenterVerticalBarMesh3.matrix,
    material
  );
  const resultLeftMesh = CSG.toMesh(
    resultLeftCSG,
    bottomRightVerticalBarMesh3.matrix,
    material
  );
  const resultFrontMesh = CSG.toMesh(
    resultFrontCSG,
    bottomFrontHorizontalBarMesh3.matrix,
    material
  );
  const resultMiddleMesh = CSG.toMesh(
    resultMiddleCSG,
    bottomMiddleHorizontalBarMesh3.matrix,
    material
  );
  const resultBackMesh = CSG.toMesh(
    resultBackCSG,
    bottomBackHorizontalBarMesh3.matrix,
    material
  );
  bottomrightBar2.position.set(
    length / 2 - BarHeight / 2,
    -height / 2 - BarWidth / 2,
    0
  );
  let resultMesh, resultRightMesh;
  if (isHandle) {
    const holeGeometry = new THREE.CylinderGeometry(
      handleWidth / 2,
      handleWidth / 2,
      handleHeight,
      60
    );
    const holeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);

    // console.log("handleHeight :>> ", handleHeight);
    holeMesh.position.set(0, height / 2 - BarWidth - handleHeight, 0);

    holeMesh.updateMatrix();
    leftBoardMesh.updateMatrix();
    const csgBar = CSG.fromMesh(leftBoardMesh);
    const csgRightBar = CSG.fromMesh(rightBoardMesh);

    const csgFrontHole = CSG.fromMesh(holeMesh);
    const resultCSG = csgBar.subtract(csgFrontHole);
    const resultRightCSG = csgRightBar.subtract(csgFrontHole);

    resultMesh = CSG.toMesh(resultCSG, leftBoardMesh.matrix, material);
    resultRightMesh = CSG.toMesh(
      resultRightCSG,
      rightBoardMesh.matrix,
      material
    );
  }
  const half_width = width / 2;
  const half_height = height / 2;
  const half_length = length / 2;
  let temp_half_width = half_width;
  let x_axis;
  const squares = Array.from({ length: 9 }, () => 0).map((i, index) => {
    let y_axis = -half_height - BarWidth / 2;
    const square = new THREE.Mesh(BottomSquare, material);

    if (index === 0) {
      x_axis = half_length - BarHeight / 2;
    } else if (index === 3) {
      x_axis = 0;
    } else if (index === 6) {
      x_axis = -half_length + BarHeight / 2;
    }

    if (index === 0 || index === 3 || index === 6) {
      temp_half_width = half_width - BarHeight / 2;
    } else {
      temp_half_width = temp_half_width - BarHeight - squre_margin;
    }
    square.position.set(x_axis, y_axis, temp_half_width);
    return square;
  });
  bottomrightBar.position.set(0, -height / 2 + BarWidth, 0);
  topBoard.position.set(0, height / 2 - BarWidth, 0);
  bottomrightBar2.position.set(
    length / 2 - BarHeight / 2,
    -height / 2 - BarWidth / 2,
    0
  );
  bottomCenterBar2.position.set(0, -height / 2 - BarWidth / 2, 0);
  bottomleftBar2.position.set(
    -length / 2 + BarHeight / 2,
    -height / 2 - BarWidth / 2,
    0
  );
  resultStringerMesh.position.set(
    length / 2 - BarWidth / 2,
    -height / 2 - BarWidth / 2,
    0
  );
  resultLeftMesh.position.set(0, -height / 2 - BarWidth / 2, 0);
  resultRightStringerMesh.position.set(
    -length / 2 + BarWidth / 2,
    -height / 2 - BarWidth / 2,
    0
  );
  bottomLeftVerticalBarMesh3.position.set(
    length / 2 - BarWidth / 2,
    -height / 2 - BarWidth / 2,
    0
  );
  bottomCenterVerticalBarMesh3.position.set(0, -height / 2 - BarWidth / 2, 0);
  bottomRightVerticalBarMesh3.position.set(
    -length / 2 + BarWidth / 2,
    -height / 2 - BarWidth / 2,
    0
  );
  bottomFrontHorizontalBarMesh3.position.set(
    0,
    -height / 2 - BarWidth / 2,
    width / 2 - BarWidth / 2
  );
  bottomMiddleHorizontalBarMesh3.position.set(0, -height / 2 - BarWidth / 2, 0);
  bottomBackHorizontalBarMesh3.position.set(
    0,
    -height / 2 - BarWidth / 2,
    -width / 2 + BarWidth / 2
  );
  resultFrontMesh.position.set(
    0,
    -height / 2 - BarWidth / 2,
    width / 2 - BarWidth / 2
  );
  resultMiddleMesh.position.set(0, -height / 2 - BarWidth / 2, 0);
  resultBackMesh.position.set(
    0,
    -height / 2 - BarWidth / 2,
    -width / 2 + BarWidth / 2
  );
  bottomfrontBar2.position.set(
    0,
    -height / 2 - BarWidth / 2,
    half_width - BarHeight / 2
  );
  bottomMiddleBar2.position.set(0, -height / 2 - BarWidth / 2, 0);
  bottomBackBar2.position.set(
    0,
    -height / 2 - BarWidth / 2,
    -half_width + BarHeight / 2
  );
  const woodenCrate = new THREE.Group();
  if (Base === "blocks") squares.forEach((square) => woodenCrate.add(square));
  else if (Base === "stingers") {
    if (parallelDirection === "PtoL")
      if (length < 43) {
        woodenCrate.add(
          bottomFrontHorizontalBarMesh3,
          bottomMiddleHorizontalBarMesh3,
          bottomBackHorizontalBarMesh3
        );
      } else {
        woodenCrate.add(resultFrontMesh, resultMiddleMesh, resultBackMesh);
      }
    else if (parallelDirection === "PtoW") {
      if (width < 43) {
        woodenCrate.add(
          bottomLeftVerticalBarMesh3,
          bottomCenterVerticalBarMesh3,
          bottomRightVerticalBarMesh3
        );
      } else {
        woodenCrate.add(
          resultStringerMesh,
          resultRightStringerMesh,
          resultLeftMesh
        );
      }
    }
  } else if (Base === "bars")
    if (parallelDirection === "PtoL") {
      woodenCrate.add(bottomfrontBar2, bottomBackBar2, bottomMiddleBar2);
    } else if (parallelDirection === "PtoW") {
      woodenCrate.add(bottomrightBar2, bottomleftBar2, bottomCenterBar2);
    }
  //------------------------------------For Side Handles--------------------------------
  if (isHandle) {
    resultMesh.position.set(length / 2 - BarWidth / 2, 0, 0);
    resultRightMesh.position.set(-length / 2 + BarWidth / 2, 0, 0);
  } else {
    leftBoardMesh.position.set(length / 2 - BarWidth / 2, 0, 0);
    rightBoardMesh.position.set(-length / 2 + BarWidth / 2, 0, 0);
  }

  frontBoardMesh.position.set(0, 0, width / 2 - BarWidth / 2);
  backBoardMesh.position.set(0, 0, -width / 2 + BarWidth / 2);

  woodenCrate.add(
    bottomrightBar,
    // bottomrightBar2,
    isHandle ? resultMesh : leftBoardMesh,
    isHandle ? resultRightMesh : rightBoardMesh,
    toplid && topBoard,

    frontBoardMesh,
    backBoardMesh
  );
  scene.add(woodenCrate);

  return woodenCrate;
};
const createWoodenCrate = (scene, material, Measurment) => {
  const {
    length,
    width,
    height,
    allSidesNoBars,
    NoTopBars,
    NoBottomBars,
    BarHeight,
    BarWidth,
    toplid,
    Base,
    parallelDirection,
  } = Measurment;
  const height_margin = calculateMargin(
    allSidesNoBars,
    BarHeight,
    height,
    BarWidth
  );
  const BottomWidthMargin = calculateMargin(
    NoBottomBars,
    BarHeight,
    width - 4 * BarWidth,
    BarWidth
  );
  const TopWidthMargin = calculateMargin(
    NoTopBars,
    BarHeight,
    width - 4 * BarWidth,
    BarWidth
  );
  const squre_margin = calculateMargin(3, BarHeight, width, BarHeight);
  const bars = [];
  const baseVerticalBars = new THREE.BoxGeometry(
    BarHeight,
    BarWidth,
    width - 2 * BarHeight
  );
  const baseVerticalBars2 = new THREE.BoxGeometry(BarHeight, BarHeight, width);
  const baseHorizontalBoarder = new THREE.BoxGeometry(
    length,
    BarWidth,
    BarHeight
  );
  const baseHorizontalBoarder2 = new THREE.BoxGeometry(
    length,
    BarHeight,
    BarHeight
  );
  const baseHorizontalBackBoarder = new THREE.BoxGeometry(
    length - 4 * BarWidth,
    BarWidth,
    BarHeight
  );
  const sideHorizontalBar = new THREE.BoxGeometry(
    BarWidth,
    BarHeight,
    width - 2 * BarWidth
  );
  const sideHorizontalBackBar = new THREE.BoxGeometry(
    BarWidth,
    BarHeight,
    width - 4 * BarWidth
  );
  const sideVerticalBar = new THREE.BoxGeometry(
    BarWidth,
    height - 2 * BarHeight,
    BarHeight
  );
  const bottomVerticalBar3 = new THREE.BoxGeometry(BarWidth, BarHeight, width);
  const bottomHorizontalBar3 = new THREE.BoxGeometry(
    length,
    BarHeight,
    BarWidth
  );
  const frontHorizontalBar = new THREE.BoxGeometry(length, BarHeight, BarWidth);
  const frontHorizontalBackBar = new THREE.BoxGeometry(
    length - 2 * BarWidth,
    BarHeight,
    BarWidth
  );
  const frontVerticalBar = new THREE.BoxGeometry(
    BarHeight,
    height - 2 * BarHeight,
    BarWidth
  );
  const BottomSquare = new THREE.BoxGeometry(BarHeight, BarHeight, BarHeight);

  const half_height = height / 2;
  const half_length = length / 2;
  const half_width = width / 2;
  let temp_half_height = half_height;
  let temp_half_width = half_width;

  const BottomBars = Array.from({ length: NoBottomBars }, () => 0).map(
    (i, index) => {
      let y_axis = -half_height + BarWidth / 2;
      const bottomBar = new THREE.Mesh(baseHorizontalBackBoarder, material);

      if (index === 0) {
        temp_half_width = temp_half_width - BarHeight / 2 - 2 * BarWidth;
      } else {
        temp_half_width = temp_half_width - BarHeight - BottomWidthMargin;
      }
      bottomBar.position.set(0, y_axis, temp_half_width);

      return bottomBar;
    }
  );
  temp_half_width = half_width;
  const TopBars = Array.from({ length: NoTopBars }, () => 0).map((i, index) => {
    let y_axis = half_height - BarWidth * 1.5;
    const TopBar = new THREE.Mesh(baseHorizontalBackBoarder, material);
    if (index === 0) {
      temp_half_width = temp_half_width - BarHeight / 2 - 2 * BarWidth;
    } else {
      temp_half_width = temp_half_width - BarHeight - TopWidthMargin;
    }
    TopBar.position.set(0, y_axis, temp_half_width);
    return TopBar;
  });
  temp_half_width = half_width;
  let x_axis;
  const squares = Array.from({ length: 9 }, () => 0).map((i, index) => {
    let y_axis = -half_height - BarHeight / 2 - BarWidth;
    const square = new THREE.Mesh(BottomSquare, material);

    if (index === 0) {
      x_axis = half_length - BarHeight / 2;
    } else if (index === 3) {
      x_axis = 0;
    } else if (index === 6) {
      x_axis = -half_length + BarHeight / 2;
    }

    if (index === 0 || index === 3 || index === 6) {
      temp_half_width = half_width - BarHeight / 2;
    } else {
      temp_half_width = temp_half_width - BarHeight - squre_margin;
    }
    square.position.set(x_axis, y_axis, temp_half_width);
    return square;
  });
  const leftBars = Array.from({ length: allSidesNoBars }, () => 0).map(
    (i, index) => {
      let x_axis = half_length - BarWidth * 1.5;
      const leftSideBar = new THREE.Mesh(sideHorizontalBackBar, material);
      if (index === 0) {
        temp_half_height = temp_half_height - BarHeight / 2;
      } else {
        temp_half_height = temp_half_height - BarHeight - height_margin;
      }
      leftSideBar.position.set(x_axis, temp_half_height, 0);
      return leftSideBar;
    }
  );
  temp_half_height = half_height;
  const rightBars = Array.from({ length: allSidesNoBars }, () => 0).map(
    (i, index) => {
      let x_axis = -half_length + BarWidth * 1.5;
      const rightSideBar = new THREE.Mesh(sideHorizontalBackBar, material);
      if (index === 0) {
        temp_half_height = temp_half_height - BarHeight / 2;
      } else {
        temp_half_height = temp_half_height - BarHeight - height_margin;
      }
      rightSideBar.position.set(x_axis, temp_half_height, 0);
      return rightSideBar;
    }
  );
  temp_half_height = half_height;
  const frontBars = Array.from({ length: allSidesNoBars }, () => 0).map(
    (i, index) => {
      const frontbar = new THREE.Mesh(frontHorizontalBackBar, material);
      if (index === 0) {
        temp_half_height = temp_half_height - BarHeight / 2;
      } else {
        temp_half_height = temp_half_height - BarHeight - height_margin;
      }
      frontbar.position.set(0, temp_half_height, width / 2 - BarWidth * 1.5);
      return frontbar;
    }
  );
  temp_half_height = half_height;
  const backBars = Array.from({ length: allSidesNoBars }, () => 0).map(
    (i, index) => {
      const backBar = new THREE.Mesh(frontHorizontalBackBar, material);
      if (index === 0) {
        temp_half_height = temp_half_height - BarHeight / 2;
      } else {
        temp_half_height = temp_half_height - BarHeight - height_margin;
      }
      backBar.position.set(0, temp_half_height, -width / 2 + BarWidth * 1.5);
      return backBar;
    }
  );

  const bottomrightBar = new THREE.Mesh(baseVerticalBars, material);
  const bottomrightBar2 = new THREE.Mesh(baseVerticalBars2, material);
  const bottomCenterBar = new THREE.Mesh(baseVerticalBars, material);
  const bottomCenterBar2 = new THREE.Mesh(baseVerticalBars2, material);
  const bottomleftBar = new THREE.Mesh(baseVerticalBars, material);
  const bottomleftBar2 = new THREE.Mesh(baseVerticalBars2, material);
  const bottomfrontBar = new THREE.Mesh(baseHorizontalBoarder, material);
  const bottomfrontBar2 = new THREE.Mesh(baseHorizontalBoarder2, material);
  const bottomMiddleBar2 = new THREE.Mesh(baseHorizontalBoarder2, material);
  const bottomBackBar = new THREE.Mesh(baseHorizontalBoarder, material);
  const bottomBackBar2 = new THREE.Mesh(baseHorizontalBoarder2, material);
  const toprightBar = new THREE.Mesh(baseVerticalBars, material);
  const topleftBar = new THREE.Mesh(baseVerticalBars, material);
  const topCenterBar = new THREE.Mesh(baseVerticalBars, material);
  const topfrontBar = new THREE.Mesh(baseHorizontalBoarder, material);
  const topBackBar = new THREE.Mesh(baseHorizontalBoarder, material);
  const leftSideFrontBarMesh = new THREE.Mesh(sideVerticalBar, material);
  const leftSideBackBarMesh = new THREE.Mesh(sideVerticalBar, material);
  const leftSideTopBar = new THREE.Mesh(sideHorizontalBar, material);
  const leftSidebottomBar = new THREE.Mesh(sideHorizontalBar, material);
  const rightSideFrontBarMesh = new THREE.Mesh(sideVerticalBar, material);
  const rightSideBackBarMesh = new THREE.Mesh(sideVerticalBar, material);
  const rightSideTopBar = new THREE.Mesh(sideHorizontalBar, material);
  const rightSidebottomBar = new THREE.Mesh(sideHorizontalBar, material);
  const frontLeftVerticalbarMesh = new THREE.Mesh(frontVerticalBar, material);
  const frontRightVerticalbarMesh = new THREE.Mesh(frontVerticalBar, material);
  const frontTopHorizontalbarMesh = new THREE.Mesh(
    frontHorizontalBar,
    material
  );
  const frontBottomHorizontalbarMesh = new THREE.Mesh(
    frontHorizontalBar,
    material
  );

  const BackLeftVerticalbarMesh = new THREE.Mesh(frontVerticalBar, material);
  const BackRightVerticalbarMesh = new THREE.Mesh(frontVerticalBar, material);
  const BackTopHorizontalbarMesh = new THREE.Mesh(frontHorizontalBar, material);
  const BackBottomHorizontalbarMesh = new THREE.Mesh(
    frontHorizontalBar,
    material
  );
  const bottomLeftVerticalBarMesh3 = new THREE.Mesh(
    bottomVerticalBar3,
    material
  );
  const bottomCenterVerticalBarMesh3 = new THREE.Mesh(
    bottomVerticalBar3,
    material
  );
  const bottomRightVerticalBarMesh3 = new THREE.Mesh(
    bottomVerticalBar3,
    material
  );
  const bottomFrontHorizontalBarMesh3 = new THREE.Mesh(
    bottomHorizontalBar3,
    material
  );
  const bottomMiddleHorizontalBarMesh3 = new THREE.Mesh(
    bottomHorizontalBar3,
    material
  );
  const bottomBackHorizontalBarMesh3 = new THREE.Mesh(
    bottomHorizontalBar3,
    material
  );
  const holeGeometry = new THREE.CylinderGeometry(
    9 / 2,
    9 / 2,
    BarHeight / 2,
    46
  );
  const holeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const holeFrontMesh = new THREE.Mesh(holeGeometry, holeMaterial);
  const holeBackMesh = new THREE.Mesh(holeGeometry, holeMaterial);
  const holeFrontMesh1 = new THREE.Mesh(holeGeometry, holeMaterial);
  const holeBackMesh1 = new THREE.Mesh(holeGeometry, holeMaterial);

  holeFrontMesh.position.set(0, -BarHeight / 4, 13.5);
  holeBackMesh.position.set(0, -BarHeight / 4, -13.5);
  holeFrontMesh1.position.set(13.5, -BarHeight / 4, 0);
  holeBackMesh1.position.set(-13.5, -BarHeight / 4, 0);
  holeFrontMesh.updateMatrix();
  holeBackMesh.updateMatrix();
  holeFrontMesh1.updateMatrix();
  holeBackMesh1.updateMatrix();
  bottomLeftVerticalBarMesh3.updateMatrix();
  bottomCenterVerticalBarMesh3.updateMatrix();
  bottomRightVerticalBarMesh3.updateMatrix();
  bottomFrontHorizontalBarMesh3.updateMatrix();
  bottomMiddleHorizontalBarMesh3.updateMatrix();
  bottomBackHorizontalBarMesh3.updateMatrix();
  const csgBar = CSG.fromMesh(bottomLeftVerticalBarMesh3);
  const csgRightBar = CSG.fromMesh(bottomCenterVerticalBarMesh3);
  const csgLeftBar = CSG.fromMesh(bottomRightVerticalBarMesh3);
  const csgFrontBar = CSG.fromMesh(bottomFrontHorizontalBarMesh3);
  const csgMiddleBar = CSG.fromMesh(bottomMiddleHorizontalBarMesh3);
  const csgBackBar = CSG.fromMesh(bottomBackHorizontalBarMesh3);

  const csgFrontHole = CSG.fromMesh(holeFrontMesh);
  const csgBackHole = CSG.fromMesh(holeBackMesh);
  const csgFrontHole1 = CSG.fromMesh(holeFrontMesh1);
  const csgBackHole1 = CSG.fromMesh(holeBackMesh1);
  const resultCSG = csgBar.subtract(csgFrontHole).subtract(csgBackHole);

  const resultRightCSG = csgRightBar
    .subtract(csgFrontHole)
    .subtract(csgBackHole);
  const resultLeftCSG = csgLeftBar.subtract(csgFrontHole).subtract(csgBackHole);
  const resultFrontCSG = csgFrontBar
    .subtract(csgFrontHole1)
    .subtract(csgBackHole1);

  const resultMiddleCSG = csgMiddleBar
    .subtract(csgFrontHole1)
    .subtract(csgBackHole1);
  const resultBackCSG = csgBackBar
    .subtract(csgFrontHole1)
    .subtract(csgBackHole1);

  const resultMesh = CSG.toMesh(
    resultCSG,
    bottomLeftVerticalBarMesh3.matrix,
    material
  );
  const resultRightMesh = CSG.toMesh(
    resultRightCSG,
    bottomCenterVerticalBarMesh3.matrix,
    material
  );
  const resultLeftMesh = CSG.toMesh(
    resultLeftCSG,
    bottomRightVerticalBarMesh3.matrix,
    material
  );
  const resultFrontMesh = CSG.toMesh(
    resultFrontCSG,
    bottomFrontHorizontalBarMesh3.matrix,
    material
  );
  const resultMiddleMesh = CSG.toMesh(
    resultMiddleCSG,
    bottomMiddleHorizontalBarMesh3.matrix,
    material
  );
  const resultBackMesh = CSG.toMesh(
    resultBackCSG,
    bottomBackHorizontalBarMesh3.matrix,
    material
  );

  bottomrightBar.position.set(
    length / 2 - BarHeight / 2,
    -height / 2 - BarWidth / 2,
    0
  );
  bottomrightBar2.position.set(
    length / 2 - BarHeight / 2,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    0
  );
  bottomCenterBar.position.set(0, -height / 2 - BarWidth / 2, 0);
  bottomCenterBar2.position.set(
    0,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    0
  );
  bottomleftBar.position.set(
    -length / 2 + BarHeight / 2,
    -height / 2 - BarWidth / 2,
    0
  );
  bottomleftBar2.position.set(
    -length / 2 + BarHeight / 2,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    0
  );
  resultMesh.position.set(
    length / 2 - BarWidth / 2,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    0
  );
  resultLeftMesh.position.set(0, -height / 2 - BarWidth / 2 - BarHeight / 2, 0);
  resultRightMesh.position.set(
    -length / 2 + BarWidth / 2,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    0
  );
  bottomLeftVerticalBarMesh3.position.set(
    length / 2 - BarWidth / 2,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    0
  );
  bottomCenterVerticalBarMesh3.position.set(
    0,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    0
  );
  bottomRightVerticalBarMesh3.position.set(
    -length / 2 + BarWidth / 2,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    0
  );
  bottomFrontHorizontalBarMesh3.position.set(
    0,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    width / 2 - BarWidth / 2
  );
  bottomMiddleHorizontalBarMesh3.position.set(
    0,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    0
  );
  bottomBackHorizontalBarMesh3.position.set(
    0,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    -width / 2 + BarWidth / 2
  );
  resultFrontMesh.position.set(
    0,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    width / 2 - BarWidth / 2
  );
  resultMiddleMesh.position.set(
    0,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    0
  );
  resultBackMesh.position.set(
    0,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    -width / 2 + BarWidth / 2
  );
  bottomfrontBar.position.set(
    0,
    -height / 2 - BarWidth / 2,
    half_width - BarHeight / 2
  );
  bottomfrontBar2.position.set(
    0,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    half_width - BarHeight / 2
  );
  bottomMiddleBar2.position.set(
    0,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    0
  );
  bottomBackBar.position.set(
    0,
    -height / 2 - BarWidth / 2,
    -half_width + BarHeight / 2
  );
  bottomBackBar2.position.set(
    0,
    -height / 2 - BarWidth / 2 - BarHeight / 2,
    -half_width + BarHeight / 2
  );
  toprightBar.position.set(
    length / 2 - BarHeight / 2,
    height / 2 - BarWidth / 2,
    0
  );
  topleftBar.position.set(
    -length / 2 + BarHeight / 2,
    height / 2 - BarWidth / 2,
    0
  );
  topCenterBar.position.set(0, height / 2 - BarWidth / 2, 0);
  topfrontBar.position.set(
    0,
    height / 2 - BarWidth / 2,
    half_width - BarHeight / 2
  );
  topBackBar.position.set(
    0,
    height / 2 - BarWidth / 2,
    -half_width + BarHeight / 2
  );
  leftSideFrontBarMesh.position.set(
    length / 2 - BarWidth / 2,
    0,
    width / 2 - BarHeight / 2 - BarWidth
  );
  leftSideBackBarMesh.position.set(
    length / 2 - BarWidth / 2,
    0,
    -width / 2 + BarHeight / 2 + BarWidth
  );

  leftSideTopBar.position.set(
    half_length - BarWidth / 2,
    half_height - BarHeight / 2,
    0
  );
  leftSidebottomBar.position.set(
    half_length - BarWidth / 2,
    -height / 2 + BarHeight / 2,
    0
  );
  rightSideFrontBarMesh.position.set(
    -length / 2 + BarWidth / 2,
    0,
    width / 2 - BarHeight / 2 - BarWidth
  );
  rightSideBackBarMesh.position.set(
    -length / 2 + BarWidth / 2,
    0,
    -width / 2 + BarHeight / 2 + BarWidth
  );
  rightSideTopBar.position.set(
    -half_length + BarWidth / 2,
    half_height - BarHeight / 2,
    0
  );
  rightSidebottomBar.position.set(
    -half_length + BarWidth / 2,
    -height / 2 + BarHeight / 2,
    0
  );
  frontLeftVerticalbarMesh.position.set(
    -length / 2 + BarHeight / 2,
    0,
    width / 2 - BarWidth / 2
  );
  frontRightVerticalbarMesh.position.set(
    length / 2 - BarHeight / 2,
    0,
    width / 2 - BarWidth / 2
  );
  frontTopHorizontalbarMesh.position.set(
    0,
    height / 2 - BarHeight / 2,
    width / 2 - BarWidth / 2
  );
  frontBottomHorizontalbarMesh.position.set(
    0,
    -height / 2 + BarHeight / 2,
    width / 2 - BarWidth / 2
  );

  BackLeftVerticalbarMesh.position.set(
    -length / 2 + BarHeight / 2,
    0,
    -width / 2 + BarWidth / 2
  );
  BackRightVerticalbarMesh.position.set(
    length / 2 - BarHeight / 2,
    0,
    -width / 2 + BarWidth / 2
  );
  BackTopHorizontalbarMesh.position.set(
    0,
    height / 2 - BarHeight / 2,
    -width / 2 + BarWidth / 2
  );
  BackBottomHorizontalbarMesh.position.set(
    0,
    -height / 2 + BarHeight / 2,
    -width / 2 + BarWidth / 2
  );
  const woodenCrate = new THREE.Group();
  woodenCrate.add(
    bottomrightBar,
    bottomleftBar,
    bottomCenterBar,
    bottomfrontBar,
    bottomBackBar,
    // leftdiagonalBar,
    // rightdiagonalBar,
    // // bottomrightBar2,
    // // topBoard,
    leftSideFrontBarMesh,
    leftSideBackBarMesh,
    leftSideTopBar,
    leftSidebottomBar,
    rightSideFrontBarMesh,
    rightSideBackBarMesh,
    rightSideTopBar,
    rightSidebottomBar,
    frontLeftVerticalbarMesh,
    frontRightVerticalbarMesh,
    frontTopHorizontalbarMesh,
    frontBottomHorizontalbarMesh,

    // // frontdiagonalbar,
    BackLeftVerticalbarMesh,
    BackRightVerticalbarMesh,
    BackTopHorizontalbarMesh,
    BackBottomHorizontalbarMesh
    // rightBoardMesh,
    // frontBoardMesh,
    // backBoardMesh
  );
  // woodenCrate.add(bottomBar1, bottomBar2, bottomBar3);
  if (Base === "blocks") squares.forEach((square) => woodenCrate.add(square));
  else if (Base === "stingers") {
    if (parallelDirection === "PtoL")
      if (length < 43) {
        woodenCrate.add(
          bottomFrontHorizontalBarMesh3,
          bottomMiddleHorizontalBarMesh3,
          bottomBackHorizontalBarMesh3
        );
      } else {
        woodenCrate.add(resultFrontMesh, resultMiddleMesh, resultBackMesh);
      }
    else if (parallelDirection === "PtoW") {
      if (width < 43) {
        woodenCrate.add(
          bottomLeftVerticalBarMesh3,
          bottomCenterVerticalBarMesh3,
          bottomRightVerticalBarMesh3
        );
      } else {
        woodenCrate.add(resultMesh, resultRightMesh, resultLeftMesh);
      }
    }
  } else if (Base === "bars")
    if (parallelDirection === "PtoL") {
      woodenCrate.add(bottomfrontBar2, bottomBackBar2, bottomMiddleBar2);
    } else if (parallelDirection === "PtoW") {
      woodenCrate.add(bottomrightBar2, bottomleftBar2, bottomCenterBar2);
    }
  if (toplid) {
    woodenCrate.add(
      toprightBar,
      topleftBar,
      topCenterBar,
      topfrontBar,
      topBackBar
    );
    TopBars.forEach((square) => woodenCrate.add(square));
  }
  BottomBars.forEach((square) => woodenCrate.add(square));
  leftBars.forEach((square) => woodenCrate.add(square));
  rightBars.forEach((square) => woodenCrate.add(square));
  frontBars.forEach((square) => woodenCrate.add(square));
  backBars.forEach((square) => woodenCrate.add(square));
  bars.forEach((bar) => woodenCrate.add(bar));

  scene.add(woodenCrate);

  return woodenCrate;
};
const handleMouseControls = (woodenCrate, mountRef) => {
  let isDragging = false;
  let previousMousePosition = {
    x: 0,
    y: 0,
  };
  let rotationX = woodenCrate.rotation.y;
  let rotationY = woodenCrate.rotation.x;

  const onMouseDown = (event) => {
    isDragging = true;

    previousMousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const onMouseUp = () => {
    isDragging = false;
  };

  const onMouseMove = (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    rotationX += deltaX * 0.005;
    rotationY += deltaY * 0.005;

    previousMousePosition = {
      x: event.clientX,
      y: event.clientY,
    };

    woodenCrate.rotation.x = rotationY;
    woodenCrate.rotation.y = rotationX;
  };

  mountRef.current.addEventListener("mousedown", onMouseDown);
  mountRef.current.addEventListener("mouseup", onMouseUp);
  mountRef.current.addEventListener("mousemove", onMouseMove);

  return () => {
    mountRef.current.removeEventListener("mousedown", onMouseDown);
    mountRef.current.removeEventListener("mouseup", onMouseUp);
    mountRef.current.removeEventListener("mousemove", onMouseMove);
  };
};
const createSide3DBarWithBorders = (
  x,
  y,
  z,
  allSidesNoBars,
  width,
  height,
  BarHeight,
  depth,
  color,
  material,
  borderColor,
  scene
) => {
  const height_margin = calculateMargin(
    allSidesNoBars,
    BarHeight,
    height,
    depth
  );
  const frontHorizontalBar = new THREE.BoxGeometry(depth, BarHeight, width);
  const frontHorizontalBackBar = new THREE.BoxGeometry(
    depth,
    BarHeight,
    width - 2 * depth
  );
  const frontVerticalBar = new THREE.BoxGeometry(
    depth,
    height - 2 * BarHeight,
    BarHeight
  );
  let temp_half_height = height / 2;
  const frontBars = Array.from({ length: allSidesNoBars }, () => 0).map(
    (i, index) => {
      const frontbar = new THREE.Mesh(frontHorizontalBackBar, material);
      if (index === 0) {
        temp_half_height = temp_half_height - BarHeight / 2 - y;
      } else {
        temp_half_height = temp_half_height - BarHeight - height_margin;
      }
      frontbar.position.set(
        0 - x,
        temp_half_height,
        height / 2 - depth * 1.5 - z
      );
      return frontbar;
    }
  );
  // Create the box geometry for the bar
  // const boxGeometry = new THREE.BoxGeometry(width, height, depth);

  // Create the material for the bar
  // const material = new THREE.MeshBasicMaterial({ color });

  // Create the mesh (geometry + material)
  const HorizontalTop = new THREE.Mesh(frontHorizontalBar, material);
  const HorizontalBottom = new THREE.Mesh(frontHorizontalBar, material);
  const VerticalLeft = new THREE.Mesh(frontVerticalBar, material);
  const VerticalRight = new THREE.Mesh(frontVerticalBar, material);
  const HorizontalBack = new THREE.Mesh(frontHorizontalBackBar, material);

  // VerticalLeft.position.set(-length / 2 + BarHeight / 2, 0, z - depth / 2);
  // VerticalRight.position.set(length / 2 - BarHeight / 2, 0, z - depth / 2);
  // HorizontalTop.position.set(0, y - BarHeight / 2, z - depth / 2);
  // HorizontalBottom.position.set(0, height - BarHeight / 2, z - depth / 2);
  VerticalLeft.position.set(
    -width / 2 + BarHeight / 2 - x,
    0 - y,
    height / 2 - depth / 2 - z
  );
  VerticalRight.position.set(
    width / 2 - BarHeight / 2 - x,
    0 - y,
    height / 2 - depth / 2 - z
  );
  HorizontalTop.position.set(
    0 - x,
    height / 2 - BarHeight / 2 - y,
    height / 2 - depth / 2 - z
  );
  HorizontalBottom.position.set(
    0 - x,
    -height / 2 + BarHeight / 2 - y,
    height / 2 - depth / 2 - z
  );

  // Set the position of the bar
  // bar.position.set(x + width / 2, y - height / 2, z + depth / 2);

  // Add the bar to the scene
  const woodenCrate = new THREE.Group();
  woodenCrate.add(
    VerticalLeft,
    VerticalRight,
    HorizontalTop,
    HorizontalBottom,
    ...frontBars
  );
  if (scene) {
    scene.add(woodenCrate);
  }

  // Create edges for the border
  // const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
  // const edgesMaterial = new THREE.LineBasicMaterial({ color: borderColor });
  // const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

  // // Position the edges to match the bar
  // edges.position.copy(bar.position);

  // // Add the edges to the scene
  // if (scene) {
  //   scene.add(edges);
  // }

  return woodenCrate;
};
const create3DBarWithBorders = (
  x,
  y,
  z,
  allSidesNoBars,
  width,
  height,
  BarHeight,
  depth,
  color,
  material,
  borderColor,
  scene
) => {
  const height_margin = calculateMargin(
    allSidesNoBars,
    BarHeight,
    height,
    depth
  );
  const frontHorizontalBar = new THREE.BoxGeometry(width, BarHeight, depth);
  const frontHorizontalBackBar = new THREE.BoxGeometry(
    width - 2 * depth,
    BarHeight,
    depth
  );
  const frontVerticalBar = new THREE.BoxGeometry(
    BarHeight,
    height - 2 * BarHeight,
    depth
  );
  let temp_half_height = height / 2;
  const frontBars = Array.from({ length: allSidesNoBars }, () => 0).map(
    (i, index) => {
      const frontbar = new THREE.Mesh(frontHorizontalBackBar, material);
      if (index === 0) {
        temp_half_height = temp_half_height - BarHeight / 2 - y;
      } else {
        temp_half_height = temp_half_height - BarHeight - height_margin;
      }
      frontbar.position.set(
        0 - x,
        temp_half_height,
        height / 2 - depth * 1.5 - z
      );
      return frontbar;
    }
  );
  // Create the box geometry for the bar
  // const boxGeometry = new THREE.BoxGeometry(width, height, depth);

  // Create the material for the bar
  // const material = new THREE.MeshBasicMaterial({ color });

  // Create the mesh (geometry + material)
  const HorizontalTop = new THREE.Mesh(frontHorizontalBar, material);
  const HorizontalBottom = new THREE.Mesh(frontHorizontalBar, material);
  const VerticalLeft = new THREE.Mesh(frontVerticalBar, material);
  const VerticalRight = new THREE.Mesh(frontVerticalBar, material);
  const HorizontalBack = new THREE.Mesh(frontHorizontalBackBar, material);

  // VerticalLeft.position.set(-length / 2 + BarHeight / 2, 0, z - depth / 2);
  // VerticalRight.position.set(length / 2 - BarHeight / 2, 0, z - depth / 2);
  // HorizontalTop.position.set(0, y - BarHeight / 2, z - depth / 2);
  // HorizontalBottom.position.set(0, height - BarHeight / 2, z - depth / 2);
  VerticalLeft.position.set(
    -width / 2 + BarHeight / 2 - x,
    0 - y,
    height / 2 - depth / 2 - z
  );
  VerticalRight.position.set(
    width / 2 - BarHeight / 2 - x,
    0 - y,
    height / 2 - depth / 2 - z
  );
  HorizontalTop.position.set(
    0 - x,
    height / 2 - BarHeight / 2 - y,
    height / 2 - depth / 2 - z
  );
  HorizontalBottom.position.set(
    0 - x,
    -height / 2 + BarHeight / 2 - y,
    height / 2 - depth / 2 - z
  );

  // Set the position of the bar
  // bar.position.set(x + width / 2, y - height / 2, z + depth / 2);

  // Add the bar to the scene
  const woodenCrate = new THREE.Group();
  woodenCrate.add(
    VerticalLeft,
    VerticalRight,
    HorizontalTop,
    HorizontalBottom,
    ...frontBars
  );
  if (scene) {
    scene.add(woodenCrate);
  }

  // Create edges for the border
  // const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
  // const edgesMaterial = new THREE.LineBasicMaterial({ color: borderColor });
  // const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

  // // Position the edges to match the bar
  // edges.position.copy(bar.position);

  // // Add the edges to the scene
  // if (scene) {
  //   scene.add(edges);
  // }

  return woodenCrate;
};

const ThreeDCanvas = () => {
  const { Measurment, ZoomValue } = useSelector((state) => {
    return { Measurment: state?.Measurment, ZoomValue: state?.ZoomValue };
  });
  const dispatch = useDispatch();
  const mountRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const { length, width, height, boxType } = Measurment || {};

    if (
      !length ||
      !width ||
      !height ||
      length <= 0 ||
      width <= 0 ||
      height <= 0
    ) {
      return;
    }

    dispatch(setZoomValue(Math.max(length, width, height) + 35));
    cameraRef.current = createCamera(
      Math.max(length, width, height) + 25 || ZoomValue?.zoomValue
    );
    const scene = createScene();
    const renderer = createRenderer(mountRef);
    addLights(scene);

    const woodTexture = loadTexture("/images/wood_texture.jpg");
    const material = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.8,
    });

    let woodenCrate;
    if (boxType === "Plywood") {
      woodenCrate = createWoodenPlyWoodBox(scene, material, Measurment);
    } else {
      woodenCrate = createWoodenCrate(scene, material, Measurment);
      // woodenCrate = create3DBarWithBorders(
      //   35,
      //   -5,
      //   10,
      //   Measurment.allSidesNoBars,
      //   Measurment.width,
      //   Measurment.height,
      //   Measurment.BarHeight,
      //   Measurment.BarWidth,
      //   "lightblue",
      //   material,
      //   "black",
      //   scene
      // );
    }

    // x, y, z, width, height, depth, color, borderColor, scene
    // x, y, z, width, height, depth, color, scen
    // scene.add(woodenCrate2);
    // const { bar, edges } = woodenCrate;

    // bar.rotation.x = 0.51;
    // bar.rotation.y = -0.51;
    // edges.rotation.x = 0.51;
    // edges.rotation.y = -0.51;

    const cleanupMouseControls = handleMouseControls(woodenCrate, mountRef);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, cameraRef.current);
    };
    animate();

    return () => {
      cleanupMouseControls();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [Measurment]);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = ZoomValue.zoomValue;
    }
  }, [ZoomValue]);

  return <div ref={mountRef} />;
};

export default ThreeDCanvas;
