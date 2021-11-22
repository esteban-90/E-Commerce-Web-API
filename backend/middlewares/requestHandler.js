import expressJwt from "express-jwt";
import { API_URL, SECRET } from "../config";

export const requestHandler = () => {
  return expressJwt({
    secret: SECRET,
    algorithms: ["HS256"],
    async isRevoked(_, payload, done) {
      if (!payload.isAdmin) done(null, true);
      done();
    },
  }).unless({
    path: [
      { url: new RegExp(`${API_URL}/auth(.*)`), method: "POST" },
      { url: new RegExp(`${API_URL}/categories(.*)`), methods: ["GET", "OPTIONS"] },
      { url: "/favicon.ico", methods: ["GET", "OPTIONS"] },
      { url: new RegExp(`${API_URL}/products(.*)`), methods: ["GET", "OPTIONS"] },
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
    ],
  });
};
