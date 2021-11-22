export const unknownEndpoint = () => (_, response) => {
  return response.status(404).send({ name: "Error", message: "Página no encontrada." });
};
