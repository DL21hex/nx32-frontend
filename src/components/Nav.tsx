import { For, createSignal, createEffect, type Component, type JSX } from "solid-js";
import IconHome from '~icons/hugeicons/home-01';
import IconUsers from '~icons/hugeicons/user-group';
import IconShield from '~icons/hugeicons/shield-01';
import IconFactory from '~icons/hugeicons/factory-02';
import IconCpu from '~icons/hugeicons/cpu';
import IconLock from '~icons/hugeicons/lock-key';
import IconSettings from '~icons/hugeicons/settings-01';

export const [activeMenuItem, setActiveMenuItem] = createSignal<string | null>(null);

const iconMap: Record<string, Component<JSX.SvgSVGAttributes<SVGSVGElement>>> = {
  home: IconHome,
  users: IconUsers,
  shield: IconShield,
  factory: IconFactory,
  cpu: IconCpu,
  lock: IconLock,
  settings: IconSettings,
};

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  is_active?: boolean;
}

interface NavProps {
  items?: MenuItem[];
  set_active?: string;
}

export default function Nav(props: NavProps) {
  createEffect(() => {
    if (props.set_active) {
      setActiveMenuItem(props.set_active);
    }
  });

  if (!props.items) {
    return null;
  }

  return (
    <>
      <div class="px-3 mb-2">
        <span class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider px-3">
          Menú principal
        </span>
      </div>
      <nav class="space-y-0.5 px-3">
        <For each={props.items}>
          {(item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div>
                <a
                  href={item.href}
                  class={`flex items-center w-full rounded-md text-[13px] font-medium transition-all duration-150 justify-between px-3 py-2 ${
                    (activeMenuItem() ? item.id === activeMenuItem() : item.is_active)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`}
                  data-state="closed"
                  data-slot="tooltip-trigger"
                >
                  <div class="flex items-center gap-3">
                    {IconComponent && (
                      <IconComponent
                        class={`lucide h-[18px] w-[18px] shrink-0 ${
                          (activeMenuItem() ? item.id === activeMenuItem() : item.is_active)
                            ? "text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/60"
                        }`}
                      />
                    )}
                    <span>{item.label}</span>
                  </div>
                </a>
              </div>
            );
          }}
        </For>
      </nav>
    </>
  );
}
