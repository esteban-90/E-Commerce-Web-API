export const DB_NAME = process.env.DEBUG === "dev" ? process.env.DB_NAME_DEV : process.env.DB_NAME_PROD;

export const { API_URL, DB_URI, PORT, SECRET } = process.env;
