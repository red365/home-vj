import DatabaseConnector from "./utils/DatabaseConnector";
import path from "path";

export function getProdEnvConfigPathObj() {
  return { path: 'config/production.env' };
}

export const staticFilesPath = path.resolve("./dist/static");


