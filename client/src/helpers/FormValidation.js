import Joi from "joi";

const RegisterSchema = Joi.object().keys({
  fullName: Joi.string()
    .min(3)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Insert your full name";
            break;
          case "string.min":
            err.message = `Value should have at least ${err.local.limit} characters`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Insert your email address";
            break;
          case "string.email":
            err.message = "Email address is not valid";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  password: Joi.string()
    .min(8)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Insert your password";
            break;
          case "string.min":
            err.message = `Value should have at least ${err.local.limit} characters`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  institution: Joi.string()
    .max(256)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Insert your institution (eg: University)";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  usagePurpose: Joi.string()
    .min(30)
    .max(256)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Write your intention to use our platform";
            break;
          case "string.min":
            err.message = `Please write your intention at least ${err.local.limit} characters`;
            break;
          case "string.max":
            err.message = `Please write your intention at most ${err.local.limit} characters`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

const LoginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Insert your email address";
            break;
          case "string.email":
            err.message = "Email address is not valid";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  password: Joi.string()
    .min(8)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Insert your password";
            break;
          case "string.min":
            err.message = `Value should have at least ${err.local.limit} characters`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

const WrfgenRequestFormSchema = Joi.object().keys({
  variables: Joi.array()
    .has(Joi.string())
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "array.hasUnknown":
            err.message = "Select minimum one variable.";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  output: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.required":
            err.message = "Choose the output format.";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  resolution: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.required":
            err.message = "Choose the data resolution.";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  startDate: Joi.date()
    .iso()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "date.base":
            err.message = "Choose start date.";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  endDate: Joi.date()
    .iso()
    .greater(Joi.ref("startDate"))
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "date.base":
            err.message = "Choose end date.";
            break;
          case "date.greater":
            err.message = "The end date must be greater than start date.";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  startHours: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.required":
            err.message = "Choose start hours.";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  endHours: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.required":
            err.message = "Choose end hours.";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  purpose: Joi.string()
    .min(30)
    .max(140)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = `Please write your purpose at least 30 characters`;
            break;
          case "string.min":
            err.message = `Please write your purpose at least ${err.local.limit} characters`;
            break;
          case "string.max":
            err.message = `Please write your purpose maximum ${err.local.limit} characters`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

export { RegisterSchema, LoginSchema, WrfgenRequestFormSchema };
