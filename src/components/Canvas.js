"use client";
import React, { useRef, useEffect } from "react";

const Canvas = ({ shapeType }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 4;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "white";
    context.lineWidth = 5;
    contextRef.current = context;

    // Clear canvas before drawing new shapes
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw shape based on shapeType prop
    if (shapeType === "woodenBar") {
      drawWoodenBar(context);
    } else if (shapeType === "packagingBoard") {
      drawPackagingBoard(context);
    }
  }, [shapeType]);

  // Drawing a wooden bar
  const drawWoodenBar = (ctx) => {
    ctx.fillStyle = "saddlebrown";
    ctx.fillRect(50, 50, 300, 50); // Draw a wooden bar
    ctx.strokeStyle = "black";
    ctx.strokeRect(50, 50, 300, 50); // Outline for the bar
  };

  // Drawing a packaging board
  const drawPackagingBoard = (ctx) => {
    ctx.fillStyle = "tan";
    ctx.fillRect(100, 100, 400, 200); // Draw a packaging board
    ctx.strokeStyle = "darkbrown";
    ctx.strokeRect(100, 100, 400, 200); // Outline for the board
  };

  return <canvas ref={canvasRef} />;
};

export default Canvas;
