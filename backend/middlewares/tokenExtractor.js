export const tokenExtractor = (request, _, next) => {
  const auth = request.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    request.body.token = auth.substring(7);
  }
  next();
};
