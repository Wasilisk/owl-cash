import * as yup from "yup";
import i18n from "../i18n"

const passwordSchema = yup.object({
    password: yup.string().min(6, i18n.t("password_length", {ns: "errors"})).required(),
}).required();

export default passwordSchema;