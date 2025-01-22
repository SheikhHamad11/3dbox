import React from "react";

const NumberInput = ({
  id,
  name,
  label,
  formik,
  placeholder,
  onChange,
  onBlur,
}) => (
  <div className="flex flex-col px-3 pb-3 flex-wrap w-1/2">
    <label htmlFor={id} className="text-sm mb-2">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type="number"
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={formik.values[name]}
      className="w-full rounded text-black text-center h-7"
    />
    {formik.touched[name] && formik.errors[name] ? (
      <div className="min-w-full text-red-500 text-xs mt-2">
        {formik.errors[name]}
      </div>
    ) : null}
  </div>
);

export default NumberInput;
