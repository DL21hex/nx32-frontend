import { createSignal, Show } from "solid-js";
import IconAlert from '~icons/lucide/alert-triangle';
import IconInfo from '~icons/lucide/info';
import IconSuccess from '~icons/lucide/check-circle-2';
import IconArrowRight from '~icons/lucide/arrow-right';
import IconClose from '~icons/lucide/x';

const typeColorMap: Record<string, { border: string; bg: string; badge: string; icon: string; button: string }> = {
  warning: {
    border: "border-l-amber-500",
    bg: "bg-gradient-to-r from-amber-50 to-white",
    badge: "bg-amber-100 text-amber-700",
    icon: "text-amber-500 bg-amber-100",
    button: "bg-amber-600 hover:bg-amber-700",
  },
  info: {
    border: "border-l-blue-500",
    bg: "bg-gradient-to-r from-blue-50 to-white",
    badge: "bg-blue-100 text-blue-700",
    icon: "text-blue-500 bg-blue-100",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  success: {
    border: "border-l-green-500",
    bg: "bg-gradient-to-r from-green-50 to-white",
    badge: "bg-green-100 text-green-700",
    icon: "text-green-500 bg-green-100",
    button: "bg-green-600 hover:bg-green-700",
  },
};

const typeIconMap: Record<string, typeof IconAlert> = {
  warning: IconAlert,
  info: IconInfo,
  success: IconSuccess,
};

interface CTAProps {
  type: "warning" | "info" | "success";
  badge: string;
  title: string;
  description: string;
  button_name: string;
  button_href: string;
}

export default function CTA(props: CTAProps) {
  const [isDismissed, setIsDismissed] = createSignal(false);
  const colors = typeColorMap[props.type] || typeColorMap.warning;
  const IconComponent = typeIconMap[props.type] || IconAlert;

  return (
    <Show when={!isDismissed()}>
      <div
        data-slot="card"
        class={`text-card-foreground flex flex-col gap-6 rounded-xl border py-6 border-l-4 overflow-hidden transition-all duration-300 hover:shadow-md shadow-sm ${colors.border} ${colors.bg}`}
      >
        <div data-slot="card-content" class="p-4 sm:p-5">
        <div class="flex items-start gap-4">
          <div class={`p-2.5 rounded-xl ${colors.icon} shrink-0`}>
            <IconComponent class="lucide h-5 w-5" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span
                data-slot="badge"
                class={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 w-fit whitespace-nowrap shrink-0 text-xs font-medium ${colors.badge}`}
              >
                {props.badge}
              </span>
            </div>
            <h3 class="font-semibold text-slate-900 mb-1">{props.title}</h3>
            <p class="text-sm text-muted-foreground line-clamp-2">
              {props.description}
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <a href={props.button_href}>
              <button
                data-slot="button"
                class={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 h-8 rounded-md gap-1.5 px-3 text-white ${colors.button}`}
              >
                {props.button_name}
                <IconArrowRight class="lucide h-4 w-4 ml-1.5" />
              </button>
            </a>
            <button
              data-slot="button"
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-accent size-9 h-8 w-8 text-muted-foreground hover:text-slate-700"
              onClick={() => setIsDismissed(true)}
            >
              <IconClose class="lucide h-4 w-4" />
              <span class="sr-only">Descartar</span>
            </button>
          </div>
        </div>
        </div>
      </div>
    </Show>
  );
}
