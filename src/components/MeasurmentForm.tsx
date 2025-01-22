import React from "react";
import { useFormik } from "formik";
import { z } from "zod";
import zodToFormikErrors from "../helpers/zodToFormikErrors"; // Import the helper function
import { useDispatch } from "react-redux";
import { setValue } from "@/ReduxConfig/slices/MeasurmentSlice";
import NumberInput from "@/components/FormComponent/NumberInput";
import CheckboxInput from "@/components/FormComponent/CheckboxInput";
import BoxTypeSelect from "@/components/FormComponent/BoxTypeSelect";
import RadioboxInput from "@/components/FormComponent/RadioboxInput";
interface initialValues {
  length: number; //l
  width?: number; //w
  height?: number; //h
  allSidesNoBars?: number; //sb
  NoBottomBars?: number; //bb
  NoTopBars?: number; //tb
  BarHeight?: number; //bh
  BarWidth?: number; //bw
  boxType?: string; //dropdown
  Base?: string; // base strongness
  parallelDirection?: string;
  isdaiognalBar?: boolean;
  isHandle?: boolean; //radiobutton
  toplid?: boolean;
  handleWidth?: number;
  handleHeight?: number;
}
// Zod schema for form validation
const initialValues: initialValues = {
  length: 31,
  width: 41,
  height: 44,
  allSidesNoBars: 6,
  NoBottomBars: 4,
  NoTopBars: 4,
  BarHeight: 6,
  BarWidth: 1,
  boxType: "Crate",
  Base: "",
  parallelDirection: "PtoW",
  isdaiognalBar: false,
  isHandle: false,
  toplid: false,
  handleWidth: 0,
  handleHeight: 0,
};
const MearsurmentSchema = z
  .object({
    length: z.number().min(0.1, "length must be greater than 0"),
    width: z.number().min(0.1, "width must be grater than 0"),
    height: z.number().min(0.1, "height must be greater than 0"),
    BarWidth: z.number().min(0.0001, "Bar width must be greater than"),
    allSidesNoBars: z.number().optional(),
    NoBottomBars: z.number().optional(), // Make optional by default
    NoTopBars: z.number().optional(), // Make optional by default
    BarHeight: z.number().optional(), // Make optional by default
    handleWidth: z.number().optional(), // Make optional by default
    handleHeight: z.number().optional(), // Make optional by default
    isHandle: z.boolean().optional(), // Make optional by default
    boxType: z
      .string()
      .min(1, "Box Type is required Please select any one type."),
  })
  .superRefine((data, ctx) => {
    if (data.boxType === "Crate") {
      if (data.allSidesNoBars === undefined || data.allSidesNoBars < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["allSidesNoBars"],
          message: "allSidesNoBars must be greater than 0",
        });
      } else if (
        data.allSidesNoBars * (data.BarHeight ?? 0) >
        data.height - 2 * data.BarWidth
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["allSidesNoBars", "BarHeight"],
          message:
            "product of allSidesNoBars * BarHeight must be between or equal to height - twice BarWidth",
        });
      }

      if (data.NoTopBars === undefined || data.NoTopBars < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["NoTopBars"],
          message: "NoTopBars must be greater than 0",
        });
      } else if (
        data.NoTopBars * (data.BarHeight ?? 0) >
        data.width - 2 * data.BarWidth
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["NoTopBars", "BarHeight"],
          message:
            "product of NoTopBars * BarHeight must be between or equal to length - twice BarWidth",
        });
      }
      if (data.NoBottomBars === undefined || data.NoBottomBars < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["NoBottomBars"],
          message: "NoBottomBars must be greater than 0",
        });
      } else if (
        data.NoBottomBars * (data.BarHeight ?? 0) >
        data.width - 2 * data.BarWidth
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["NoBottomBars", "BarHeight"],
          message:
            "product of NoBottomBars * BarHeight must be between or equal to length - twice BarWidth",
        });
      }

      if (data.BarHeight === undefined || data.BarHeight <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["BarHeight"],
          message: "BarHeight must be greater than 0",
        });
      }
    }
    if (data.boxType === "Plywood") {
      if (data.isHandle) {
        if (data.handleHeight === undefined || data.handleHeight <= 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["handleHeight"],
            message: "handleHeight must be greater than 0",
          });
        }
        if (data.handleWidth === undefined || data.handleWidth <= 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["handleWidth"],
            message: "handleWidth must be greater than 0",
          });
        }
      }
    }
  });

const boxType = ["Crate", "Plywood"];

const SignUpForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      // console.log("values :>> ", values);
      try {
        // Validate using Zod
        MearsurmentSchema.parse(values);
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Convert Zod errors to Formik errors
          // console.log("error :>> ", error);
          return zodToFormikErrors(error);
        }
      }
    },
    validateOnChange: true,
    onSubmit: (values) => {
      // console.log("Form Submitted", values);
      // You can also call an API here

      dispatch(setValue(values));
    },
  });
  const handleBoxTypeChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    const fieldValue = type === "checkbox" ? checked : value;

    // Update Formik field value

    // Convert value to number if it's numeric
    const numericValue = !isNaN(Number(fieldValue))
      ? Number(fieldValue)
      : fieldValue;

    await formik.setFieldValue(name, numericValue); // Avoid immediate validation here
    await formik.setFieldTouched(name, true, true);
    await formik.validateField(name);
    dispatch(
      setValue({
        ...formik.values, // Maintain existing values
        [name]: fieldValue, // Update the specific field
      })
    );

    // Handle specific logic for box type
    if (name === "boxType") {
      let standardMeasurements = initialValues;

      if (fieldValue === "Crate") {
        standardMeasurements = {
          length: 40,
          width: 50,
          height: 45,
          allSidesNoBars: 6,
          NoBottomBars: 4,
          NoTopBars: 4,
          BarHeight: 6,
          BarWidth: 2,
        };
      } else if (fieldValue === "Plywood") {
        standardMeasurements = {
          length: 30,
          width: 40,
          height: 35,
          BarWidth: 1.5,
        };
      }

      // Update fields for the selected box type
      Object.keys(standardMeasurements).forEach((key) => {
        formik.setFieldValue(
          key as keyof initialValues,
          standardMeasurements[key as keyof initialValues]
        );
      });

      // Dispatch updated standard measurements to Redux
      dispatch(
        setValue({
          ...formik.values,
          ...standardMeasurements,
          boxType: fieldValue,
        })
      );
    }
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert value to number if it's numeric
    const numericValue = !isNaN(Number(value)) ? Number(value) : value;

    // Set the numeric value in Formik
    // formik.setFieldValue(name, numericValue);
    // e.target.value = numericValue
    // Trigger Formik's default blur handling
    formik.handleBlur({ ...e, target: { ...e.target, value: numericValue } });
    formik.setFieldTouched(name, true, true);
    formik.validateField(name);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex justify-between align-middle flex-wrap"
    >
      <BoxTypeSelect
        id="type"
        name="boxType"
        label="Select Box Type:"
        formik={formik}
        options={boxType}
        onChange={handleBoxTypeChange}
        onBlur={handleBlur}
      />
      {formik.values.boxType && (
        <>
          <NumberInput
            onChange={handleBoxTypeChange}
            onBlur={handleBlur}
            placeholder=""
            id="length"
            name="length"
            label="Length"
            formik={formik}
          />
          <NumberInput
            onChange={handleBoxTypeChange}
            onBlur={handleBlur}
            placeholder="0"
            id="width"
            name="width"
            label="Width"
            formik={formik}
          />
          <NumberInput
            onChange={handleBoxTypeChange}
            onBlur={handleBlur}
            placeholder="0"
            id="height"
            name="height"
            label="Height"
            formik={formik}
          />
          <NumberInput
            onChange={handleBoxTypeChange}
            onBlur={handleBlur}
            placeholder={0}
            id={"barWidth"}
            name="BarWidth"
            label={"Bar Width"}
            formik={formik}
          />
          {formik.values.boxType === "Plywood" && (
            <CheckboxInput
              onChange={handleBoxTypeChange}
              onBlur={handleBlur}
              id="isHandle"
              name="isHandle"
              label="Handles for grip"
              formik={formik}
            />
          )}
          {formik.values.isHandle && (
            <>
              <NumberInput
                onChange={handleBoxTypeChange}
                onBlur={handleBlur}
                placeholder="0"
                id="handleWidth"
                name="handleWidth"
                label="Handle Width"
                formik={formik}
              />
              <NumberInput
                onChange={handleBoxTypeChange}
                onBlur={handleBlur}
                placeholder="0"
                id="handleHeight"
                name="handleHeight"
                label="Handle Length"
                formik={formik}
              />
            </>
          )}
          {formik.values.boxType === "Crate" && (
            <>
              <NumberInput
                onChange={handleBoxTypeChange}
                onBlur={handleBlur}
                placeholder="0"
                id="allSidesNoBars"
                name="allSidesNoBars"
                label="No. Side Borders"
                formik={formik}
              />
              <NumberInput
                onChange={handleBoxTypeChange}
                onBlur={handleBlur}
                placeholder="0"
                id="NoTopBars"
                name="NoTopBars"
                label="No. Top Bars"
                formik={formik}
              />
              <NumberInput
                onChange={handleBoxTypeChange}
                onBlur={handleBlur}
                placeholder="0"
                id="NoBottomBars"
                name="NoBottomBars"
                label="No. Bottom Bars"
                formik={formik}
              />
              <NumberInput
                onChange={handleBoxTypeChange}
                onBlur={handleBlur}
                placeholder="0"
                id="BarHeight"
                name="BarHeight"
                label="Bar Height"
                formik={formik}
              />
              <CheckboxInput
                onChange={handleBoxTypeChange}
                onBlur={handleBlur}
                id="isdaiognalBar"
                name="isdaiognalBar"
                label="Add Diagonal Bars"
                formik={formik}
              />
            </>
          )}
          <div className="flex min-w-full flex-wrap justify-between">
            <RadioboxInput
              onChange={handleBoxTypeChange}
              onBlur={handleBlur}
              id="bars"
              name="Base"
              value="bars"
              // label="Top Bord"
              formik={formik}
              isImage={true}
              path="/images/Bottom_Bar.png"
            />
            <RadioboxInput
              onChange={handleBoxTypeChange}
              onBlur={handleBlur}
              id="blocks"
              name="Base"
              value="blocks"
              label="Top Bord"
              formik={formik}
              isImage={true}
              path="/images/Square.png"
            />
            <RadioboxInput
              onChange={handleBoxTypeChange}
              onBlur={handleBlur}
              id="stringers"
              name="Base"
              value="stingers"
              label="Top Bord"
              formik={formik}
              isImage={true}
              path="/images/Stringer.png"
            />
          </div>
          {(formik?.values?.Base === "stingers" ||
            formik?.values?.Base === "bars") && (
            <>
              <RadioboxInput
                onChange={handleBoxTypeChange}
                onBlur={handleBlur}
                id="parallelToL"
                name="parallelDirection"
                value="PtoL"
                label="Parallel To L"
                formik={formik}
              />
              <RadioboxInput
                onChange={handleBoxTypeChange}
                onBlur={handleBlur}
                id="paralleltoW"
                name="parallelDirection"
                value="PtoW"
                label="Parallel To W"
                formik={formik}
              />
            </>
          )}
          <CheckboxInput
            onChange={handleBoxTypeChange}
            onBlur={handleBlur}
            id="toplid"
            name="toplid"
            label="Top Bar"
            formik={formik}
          />

          {/* <button
            type="submit"
            className="w-full rounded bg-black h-9 mx-5 text-white dark:bg-white dark:text-black"
          >
            Submit
          </button> */}
        </>
      )}
    </form>
  );
};

export default SignUpForm;
