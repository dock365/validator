import validationTypes from "../const/validationTypes";
declare const _default: (message: string | undefined, values: {
    [key: string]: string | undefined;
    field?: string | undefined;
    value?: string | undefined;
    type?: validationTypes | undefined;
}) => string;
export default _default;
