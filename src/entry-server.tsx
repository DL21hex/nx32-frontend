import { createHandler, StartServer } from "@solidjs/start/server";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => {
	const event = getRequestEvent();
	const apiBaseUrl = event?.locals.apiBaseUrl || "http://localhost:8787";

	return (
		<StartServer
			document={({ assets, children, scripts }) => (
			<html lang="es" class="--font-inter h-full">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.png" />
					{assets}
					<script innerHTML={`window.APP_CONFIG = { API_BASE_URL: "${apiBaseUrl}" };`} />
				</head>
				<body class="font-sans antialiased h-full overflow-hidden">
					{children}
				{scripts}
				</body>
			</html>
			)}
		/>
	);
});