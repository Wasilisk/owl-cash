/* node-modules */
import * as i18n from "i18next";
import {initReactI18next} from "react-i18next";
import detector from "i18next-browser-languagedetector";

/* buttons */
import buttons_en from "./translations/en/buttons.json"
import buttons_ru from "./translations/ru/buttons.json"
import buttons_ua from "./translations/ua/buttons.json"

/* labels */
import labels_en from "./translations/en/labels.json"
import labels_ru from "./translations/ru/labels.json"
import labels_ua from "./translations/ua/labels.json"

/* notifications */
import notifications_en from "./translations/en/notifications.json"
import notifications_ru from "./translations/ru/notifications.json"
import notifications_ua from "./translations/ua/notifications.json"

/* texts */
import texts_en from "./translations/en/texts.json"
import texts_ru from "./translations/ru/texts.json"
import texts_ua from "./translations/ua/texts.json"

/* errors */
import errors_en from "./translations/en/errors.json"
import errors_ru from "./translations/ru/errors.json"
import errors_ua from "./translations/ua/errors.json"

i18n
    .use(detector)
    .use(initReactI18next)
    .init({
        detection: {
            order: ["localStorage"],
            lookupLocalStorage: "language",
            caches: ["localStorage"],
        },
        fallbackLng: "en",
        resources: {
            ua: {
                buttons: buttons_ua,
                labels: labels_ua,
                notifications: notifications_ua,
                errors: errors_ua,
                texts: texts_ua
            },
            ru: {
                buttons: buttons_ru,
                labels: labels_ru,
                notifications: notifications_ru,
                errors: errors_ru,
                texts: texts_ru
            },
            en: {
                buttons: buttons_en,
                labels: labels_en,
                notifications: notifications_en,
                errors: errors_en,
                texts: texts_en
            },
        },
        keySeparator: ".",
        interpolation: {
            escapeValue: false
        },
        react: { useSuspense: false }
    });

export default i18n;