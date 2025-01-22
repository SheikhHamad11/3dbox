export const calculateMargin = (noOfBars, BarHeight, height) => {
  // console.log("height :>> ", height);
  const totalBarheight = noOfBars * BarHeight;
  // console.log("totalBarheight :>> ", totalBarheight);
  const avalableSpace = height - totalBarheight;
  // console.log("avalableSpace :>> ", avalableSpace);
  if (avalableSpace > 0) {
    return avalableSpace / (noOfBars - 1);
  }
  return 0;
};
//---------------------------------------------------------------------Scale function-------------------------------------------------------------------------------------
export function scaleDimensions(dimensions, minSize, maxSize) {
  const { width, height, length, BarHeight } = dimensions;
  const maxDimension = Math.max(width, height, length, BarHeight);
  let scaleFactor;
  if (maxDimension < minSize) {
    scaleFactor = minSize / maxDimension;
  } else if (maxDimension > maxSize) {
    scaleFactor = maxSize / maxDimension;
  } else {
    scaleFactor = 1;
  }
  // console.log("scaleFactor :>> ", scaleFactor);
  const scaledWidth = width * scaleFactor;
  const scaledHeight = height * scaleFactor;
  const scaledLength = length * scaleFactor;
  const scaledBarHeight = BarHeight * scaleFactor;
  const notchLength = (9 / height) * 9;
  return {
    width: scaledWidth,
    height: scaledHeight,
    length: scaledLength,
    barHeight: scaledBarHeight,
    notchLength,
  };
}
//----------------------------------------------------------------------check for diagonal Bars---------------------------------------------------------------------------
