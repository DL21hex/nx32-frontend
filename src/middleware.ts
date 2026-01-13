import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
	onRequest: [
		async (event) => {
			const url = new URL(event.request.url);

			if (url.pathname.startsWith("/_build") || url.pathname.startsWith("/assets") || url.pathname.includes(".png") || url.pathname.endsWith("/login") || (url.pathname.startsWith("/_server") && event.request.headers.get("Referer")?.includes("/login")))
			{
				return;
			}

			const cookieHeader = event.request.headers.get("Cookie");

			try
			{
				const response = await fetch("http://localhost/xcctechpeople/tools/sandbox/validate_session_public", {
					method: "GET",
					headers: {
						Cookie: cookieHeader || "",
						"Content-Type": "application/json",
					},
				});

				if (!response.ok)
				{
					return redirectToLogin();
				}
			}
			catch (error)
			{
				return redirectToLogin();
			}

			return;
		},
	],
});

function redirectToLogin()
{
    return new Response(null, {
        status: 302,
        headers: {
            Location: "/login",
            "Cache-Control": "no-store",
        },
    });
}