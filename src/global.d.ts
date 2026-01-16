/// <reference types="@solidjs/start/env" />

interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	APP_CONFIG: {
		API_BASE_URL: string;
	};
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "solid-js/web" {
	interface RequestEventLocals {
		apiBaseUrl?: string; // Exposed to client
		openaiApiKey?: string; // SERVER ONLY - Do not expose
	}
}
  const value: any;
  export default value;
}