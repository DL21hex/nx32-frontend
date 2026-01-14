import { type Component, type JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  href?: string;
  icon?: Component<JSX.SvgSVGAttributes<SVGSVGElement>>;
};

export default function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, ["label", "icon", "class", "href"]);

  return (
    <Dynamic
      component={local.href ? "a" : "button"}
      href={local.href}
      data-slot="button"
      data-variant="outline"
      data-size="default"
      class={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-white shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input h-9 px-4 py-2 has-[>svg]:px-3 ${local.class || ""}`}
      {...others}
    >
      {local.icon && <local.icon class="h-4 w-4" />}
      {local.label}
    </Dynamic>
  );
}
