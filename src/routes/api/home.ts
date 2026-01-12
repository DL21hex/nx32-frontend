import homeData from "~/data/home.json";

export async function GET() {
  return new Response(JSON.stringify(homeData), {
    headers: { "Content-Type": "application/json" },
  });
}

