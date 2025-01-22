import React from "react";

const BoxTypeSelect = ({ id, name, label, formik, options, onChange, onBlur }) => (
  <div className="flex flex-col min-w-full justify-between px-3 py-4 flex-wrap">
    <label htmlFor={id} className="mb-2">
      {label}
    </label>
    <select
      id={id}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={formik.values[name]}
      className="text-black h-7 rounded"
    >
      <option value="">Select Type</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {formik.touched[name] && formik.errors[name] ? (
      <div className="text-red-500 text-xs min-w-full mt-2">
        {formik.errors[name]}
      </div>
    ) : null}
  </div>
);

export default BoxTypeSelect;
