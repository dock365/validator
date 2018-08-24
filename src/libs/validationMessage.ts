import validationTypes from "../const/validationTypes";

export default (
  message: string = "",
  values: { field?: string, value?: string, type?: validationTypes, [key: string]: string | undefined },
): string => {
  Object.keys(values).forEach((key) => {
    message = `${message}`.replace(`$${key}`, values[key] || "");
  });
  return message;
};
