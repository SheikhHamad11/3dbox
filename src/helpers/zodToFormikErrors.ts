import { ZodError } from "zod";

// Helper to convert Zod error to Formik error format
const zodToFormikErrors = (zodError: ZodError) => {
  const formikErrors: { [key: string]: string } = {};
  zodError.errors.forEach((error) => {
    if (error.path.length) {
      formikErrors[error.path[0]] = error.message;
    }
  });
  return formikErrors;
};
export default zodToFormikErrors;
