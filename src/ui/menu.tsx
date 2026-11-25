import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn";

const popupClass = "bg-surface-default shadow-border";

const itemClass =
  "type-body-md text-content-primary data-highlighted:bg-fill-strong flex h-9 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 text-start outline-none data-disabled:opacity-60";

function mergeMenuClass<State>(
  baseClass: string,
  className: string | ((state: State) => string | undefined) | undefined,
): string | ((state: State) => string) {
  if (typeof className === "function") {
    return (state: State) => cn(baseClass, className(state));
  }
  return cn(baseClass, className);
}

function Root({
  modal = false,
  ...props
}: ComponentProps<typeof BaseMenu.Root>) {
  return <BaseMenu.Root modal={modal} {...props} />;
}

function Popup({
  className,
  children,
  side = "bottom",
  align = "end",
  sideOffset = 8,
}: {
  className?: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        className="z-50"
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BaseMenu.Popup className={cn(popupClass, className)}>
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

function Item({
  className,
  ...props
}: ComponentProps<typeof BaseMenu.Item>) {
  return (
    <BaseMenu.Item
      className={mergeMenuClass(itemClass, className)}
      {...props}
    />
  );
}

function LinkItem({
  className,
  ...props
}: ComponentProps<typeof BaseMenu.LinkItem>) {
  return (
    <BaseMenu.LinkItem
      className={mergeMenuClass(itemClass, className)}
      {...props}
    />
  );
}

function CheckboxItem({
  className,
  ...props
}: ComponentProps<typeof BaseMenu.CheckboxItem>) {
  return (
    <BaseMenu.CheckboxItem
      className={mergeMenuClass(itemClass, className)}
      {...props}
    />
  );
}

function Separator({
  className,
  ...props
}: ComponentProps<typeof BaseMenu.Separator>) {
  return (
    <BaseMenu.Separator
      className={mergeMenuClass(
        "border-line-default mx-2 my-1 border-t",
        className,
      )}
      {...props}
    />
  );
}

export const Menu = {
  Root,
  Trigger: BaseMenu.Trigger,
  Popup,
  Item,
  LinkItem,
  CheckboxItem,
  CheckboxItemIndicator: BaseMenu.CheckboxItemIndicator,
  Separator,
};
