import { For, type Component, type JSX } from "solid-js";
import Button from "./Button";
import IconReport from '~icons/lucide/file-text';
import IconMaster from '~icons/lucide/database';
import IconDownload from '~icons/lucide/download';
import IconUserPlus from '~icons/lucide/user-plus';

const iconMap: Record<string, Component<JSX.SvgSVGAttributes<SVGSVGElement>>> = {
  report: IconReport,
  master: IconMaster,
  download: IconDownload,
  "user-plus": IconUserPlus,
};

interface ToolbarButton {
  href: string;
  icon: string;
  name: string;
}

interface ToolbarProps {
  title: string;
  subtitle?: string;
  buttons?: ToolbarButton[];
}

export default function Toolbar(props: ToolbarProps) {
  return (
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold text-foreground">{props.title}</h1>
        {props.subtitle && (
          <p class="text-sm text-muted-foreground">{props.subtitle}</p>
        )}
      </div>
      <div class="flex items-center gap-2">
        <For each={props.buttons}>
          {(button) => {
            const Icon = iconMap[button.icon];
            return (
              <Button href={button.href} label={button.name} icon={Icon} />
            );
          }}
        </For>
      </div>
    </div>
  );
}
