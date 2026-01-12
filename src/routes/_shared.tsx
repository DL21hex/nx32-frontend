import { createSignal, For, Suspense } from "solid-js";
import CTA from "~/components/CTA";
import Card from "~/components/Card";

interface ComponentItem {
  component: string;
  props: Record<string, any>;
}

const componentMap: Record<string, any> = {
  CTA: CTA,
  Card: Card,
};

async function fetchPageData(page: string): Promise<ComponentItem[]> {
  const response = await fetch(`/api/${page}`);
  if (!response.ok) throw new Error(`Error ${response.status}`);
  return response.json();
}

export default function Page(props: { page: string }) {
  const [items, setItems] = createSignal<ComponentItem[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  (async () => {
    try {
      console.log(`Fetching /api/${props.page}`);
      const data = await fetchPageData(props.page);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  })();

  return (
    <Suspense fallback={<div class="text-muted-foreground">Cargando...</div>}>
      {loading() && <div class="text-muted-foreground">Cargando...</div>}
      {error() && <div class="text-destructive">Error: {error()}</div>}
      {!loading() && !error() && (
        <div class="flex flex-col gap-6">
          <For each={items()}>
            {(item) => {
              const Component = componentMap[item.component];
              return Component ? <Component {...item.props} /> : null;
            }}
          </For>
        </div>
      )}
    </Suspense>
  );
}
