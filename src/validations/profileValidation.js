import * as yup from "yup";

export const profileSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
}).required();
