import * as yup from "yup";
import i18n from '../i18n';

export const authSchema = yup.object({
    email: yup.string().email(i18n.t("email_not_correct", {ns: "errors"})).required(),
    password: yup.string().min(6, i18n.t("password_length", {ns: "errors"})).required(),
}).required();
