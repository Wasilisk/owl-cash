import * as yup from "yup";
import i18n from '../i18n';

const amountSchema = yup.object({
    amount: yup.number().typeError(i18n.t("is_nan", {ns: "errors"})).required().test(
        'Is positive?',
        i18n.t("is_negative", {ns: "errors"}),
        (value) => value > 0
    )
}).required();

export default amountSchema;