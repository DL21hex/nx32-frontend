import { createSignal, For, Suspense, createEffect, Show } from "solid-js";
import { cache, redirect } from "@solidjs/router";
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

const fetchContent = cache(async () => {
  const response = await fetch("http://localhost:80/xcctechpeople/tools/sandbox/home_public");
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  return response.json() as Promise<ComponentItem[]>;
}, "home-content");

export default function Home() {
  const [items, setItems] = createSignal<ComponentItem[]>([]);
  const [error, setError] = createSignal<string | null>(null);

  createEffect(async () => {
    try {
      const data = await fetchContent();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  });

  return (
    <Suspense fallback={<div class="text-muted-foreground">Cargando...</div>}>
      {error() && <div class="text-destructive">Error: {error()}</div>}
      <Show when={items().length > 0}>
        <div class="flex flex-col gap-6">
          <For each={items()}>
            {(item) => {
              const Component = componentMap[item.component];
              return Component ? <Component {...item.props} /> : null;
            }}
          </For>
        </div>
      </Show>
    </Suspense>
  );
}