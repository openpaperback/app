import axios from "axios";
import { clientConfig } from "../client.config";

export const api = axios.create({
  baseURL: clientConfig.API_URL,
});
