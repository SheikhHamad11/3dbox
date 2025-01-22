// import React from "react";
// import { useFormikContext } from "formik";
// const CrateExtrafields = () => {
//   const { values, setFieldValue } = useFormikContext();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFieldValue(name, value);
//   };
//   return (
//     <>
//       <div className="flex justify-between px-10 py-5 text-center flex-wrap">
//         <label htmlFor="allSidesNoBars">No. Side Borders</label>
//         <input
//           id="allSidesNoBars"
//           name="allSidesNoBars"
//           type="number"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.allSidesNoBars}
//           className="w-10 rounded text-black text-center"
//         />
//         {formik.touched.allSidesNoBars && formik.errors.allSidesNoBars ? (
//           <div className="min-w-full">{formik.errors.allSidesNoBars}</div>
//         ) : null}
//       </div>
//       <div className="flex justify-between px-10 py-5 text-center flex-wrap">
//         <label htmlFor="TopBottomNoBars">No. Top/Bottom Bars</label>
//         <input
//           id="TopBottomNoBars"
//           name="TopBottomNoBars"
//           type="number"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.TopBottomNoBars}
//           className="w-10 rounded text-black text-center"
//         />
//         {formik.touched.TopBottomNoBars && formik.errors.TopBottomNoBars ? (
//           <div className="min-w-full">{formik.errors.TopBottomNoBars}</div>
//         ) : null}
//       </div>
//       <div className="flex justify-between px-10 py-5 text-center flex-wrap">
//         <label htmlFor="BarHeight">BarHeight</label>
//         <input
//           id="BarHeight"
//           name="BarHeight"
//           type="number"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.BarHeight}
//           className="w-10 rounded text-black text-center"
//         />
//         {formik.touched.BarHeight && formik.errors.BarHeight ? (
//           <div className="min-w-full">{formik.errors.BarHeight}</div>
//         ) : null}
//       </div>
//       <div className="flex items-center px-10 py-5">
//         <input
//           id="isdaiognalBar"
//           type="checkbox"
//           name="isdaiognalBar"
//           checked={formik.values.isdaiognalBar}
//           onChange={formik.handleChange}
//           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//         />
//         <label
//           htmlFor="isdaiognalBar"
//           className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//         >
//           Add Diagonal Bars
//         </label>
//       </div>
//     </>
//   );
// };

// export default CrateExtrafields;
