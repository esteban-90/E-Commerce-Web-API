import isAlpha from "validator/lib/isAlpha";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import isEmail from "validator/lib/isEmail";
import isHexColor from "validator/lib/isHexColor";
import isMobilePhone from "validator/lib/isMobilePhone";
import isStrongPassword from "validator/lib/isStrongPassword";

export default {
  alpha(param = "") {
    return isAlpha(param, "es-ES", { ignore: " " });
  },
  alphaNumeric(param = "") {
    return isAlphanumeric(param, "es-ES", { ignore: " .-/" });
  },
  email(param = "") {
    return isEmail(param, { allow_utf8_local_part: false, ignore_max_length: true });
  },
  hexColor(param = "") {
    return isHexColor(param);
  },
  mobilePhone(param = "") {
    return isMobilePhone(param, "es-PY", { strictMode: true });
  },
  strongPassword(param = "") {
    return isStrongPassword(param, { minLength: 5 });
  },
};
