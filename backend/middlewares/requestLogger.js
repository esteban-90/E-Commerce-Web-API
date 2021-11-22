import morgan, { token } from "morgan";

export const requestLogger = () => {
  if ((process.env.DEBUG = "dev")) {
    token("body", (request) => JSON.stringify(request.body));
    return morgan("\tREQUEST INFO\nMethod: :method\nURL: :url\nStatus: :status\nBody: :body");
  }
};
