import Image from "next/image";
import React from "react";

const RadioboxInput = ({
  id,
  name,
  label = "",
  value,
  formik,
  isImage = false,
  path = "",
  onChange,
  onBlur,
}) => (
  <div className="flex items-center px-3 pb-3 ">
    <input
      id={id}
      type="radio"
      name={name}
      checked={formik.values[name] === value}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`${
        isImage ? "hidden" : "block"
      } w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 outline-none border-none dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
    />
    <label
      htmlFor={id}
      className={`${
        isImage && formik.values[name] === value
          ? "bg-gray-300 outline outline-2 outline-gray-500 rounded"
          : isImage
          ? "bg-gray-50 rounded"
          : ""
      } ms-2 text-sm ${
        isImage && "w-12 h-12"
      } flex items-center font-medium text-gray-900 dark:text-gray-300 `}
    >
      {isImage ? (
        <Image
          src={path}
          width={100}
          height={100}
          alt="base type"
          className=" object-cover"
        />
      ) : (
        label
      )}
    </label>
  </div>
);

export default RadioboxInput;
