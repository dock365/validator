import { validationTypes } from "../const/validationTypes";

const validationMessage = (
  message: string = "",
  values: { field?: string, value?: string, type?: validationTypes, [key: string]: string | undefined },
): string => {
  let processedMessage: string = "";
  Object.keys(values)
    .forEach((key) => {
      processedMessage = `${message}`.replace(`$${key}`, values[key] || "");
    });

  return processedMessage;
};

export default validationMessage;
