import React from "react";
import ThreeDCanvas from "./ThreeDCanvas";
import { MdZoomIn, MdZoomOut } from "react-icons/md";
import { useDispatch } from "react-redux";
import { ZoomIn, ZoomOut } from "@/ReduxConfig/slices/ZoomInOutSlice";
import MesurmentBox from "@/components/MesurmentBox";

const Main = () => {
  const dispatch = useDispatch();

  const handleZoomIn = () => {
    dispatch(ZoomIn());
  };
  const handleZoomOut = () => {
    dispatch(ZoomOut());
  };
  return (
    <div className=" w-3/4 relative bg-gray-100 text-black">
      <div className="absolute  top-5  w-full flex justify-between">
        <h1 className=" font-bold ml-4 text-xl ">3D Wooden Bar</h1>
        <div className="flex gap-4 mr-4">
          <button
            className=" hover:bg-white text-gray-800 font-semibold border border-transparent hover:border py-1 px-1  hover:border-gray-400 hover:rounded hover:shadow"
            onClick={handleZoomIn}
          >
            <MdZoomIn size={25} />
          </button>
          <button
            className="hover:bg-white text-gray-800 font-semibold border border-transparent hover:border py-1 px-1  hover:border-gray-400 hover:rounded hover:shadow"
            onClick={handleZoomOut}
          >
            <MdZoomOut size={25} />
          </button>
        </div>
      </div>
      {/* <MesurmentBox /> */}
      <ThreeDCanvas />
    </div>
  );
};

export default Main;
