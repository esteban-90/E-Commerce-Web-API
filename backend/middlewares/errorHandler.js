import debug from "../debug";

export const errorHandler = (error, _, response, next) => {
  error.name ??= "Error";
  error.message ??= "Ha ocurrido un error.";

  debug(error.name);
  debug(error.message);

  const errors = {
    statusCode: 500,
    badRequestErrors: ["CastError", "MulterError", "ValidationError"],
    notFoundErrors: ["DocumentNotFoundError"],
    unauthorizedErrors: ["UnauthorizedError"],
    handleError() {
      let { statusCode, badRequestErrors, notFoundErrors, unauthorizedErrors } = this;
      if (badRequestErrors.includes(error.name)) statusCode = 400;
      if (notFoundErrors.includes(error.name)) statusCode = 404;
      if (unauthorizedErrors.includes(error.name)) statusCode = 401;
      response.status(statusCode).send({ [error.name]: error.message });
    },
  };

  errors.handleError();
  next();
};
