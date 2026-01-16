import { getRequestEvent } from "solid-js/web";

export const getApiBaseUrl = (serverEvent?: any) => {
	// 1. Client-side
	if (typeof window !== "undefined") {
		return (window as any).APP_CONFIG?.API_BASE_URL ?? "http://localhost:8787";
	}

	// 2. Server-side
	const event = serverEvent || getRequestEvent();
	if (event) {
		// If we already resolved it in middleware/locals
		if (event.locals?.apiBaseUrl) {
			return event.locals.apiBaseUrl;
		}

		// Fallback to Env if available directly (rare in some contexts, but let's try)
		// Or assume default for dev
		return import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8787";
	}

	return "http://localhost:8787";
};

export interface TenantConfig {
	apiBaseUrl: string;
	openaiApiKey?: string;
}

export const resolveTenantConfig = async (request: Request, env: any): Promise<TenantConfig> => {
	const url = new URL(request.url);
	const hostname = url.hostname;
	const defaultApi = env.VITE_API_BASE_URL ?? "http://localhost:8787";

	// Check KV
	if (env.TENANTS) {
		const rawConfig = await env.TENANTS.get(hostname);
		if (rawConfig) {
			// Try to parse JSON for extended config
			try {
				const config = JSON.parse(rawConfig);
				return {
					apiBaseUrl: config.apiBaseUrl || config.api_url || defaultApi,
					openaiApiKey: config.openaiApiKey || config.openai_key,
				};
			} catch (e) {
				// Fallback: raw string is just the API URL (legacy)
				return {
					apiBaseUrl: rawConfig,
				};
			}
		}
	}

	// Fallback to Env var or default
	return {
		apiBaseUrl: defaultApi
	};
};
