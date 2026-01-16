// Deprecated: Use getApiBaseUrl() from utils/config or import the function here to maintain compatibility if you prefer.
// But we will switch to using a function.
import { getApiBaseUrl as getUrl } from "~/utils/config";

export const getApiBaseUrl = getUrl;
// export const API_BASE_URL = "http://localhost:8787";
// export const API_BASE_URL = "http://localhost/xcctechpeople/xcc";