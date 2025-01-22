import React from "react";

const CheckboxInput = ({ id, name, label, formik, onChange,onBlur }) => (
  <div className="flex items-center px-3 pb-3 min-w-full">
    <input
      id={id}
      type="checkbox"
      name={name}
      checked={formik.values[name]}
      onChange={onChange}
      onBlur={onBlur}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
    <label
      htmlFor={id}
      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      {label}
    </label>
  </div>
);

export default CheckboxInput;
