"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Leader Board",
    href: "/ranking",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "GitHub",
    href: "/ranking/github",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Leetcode",
    href: "ranking/leetcode",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
];

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="p-2">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="text-2xl">Home</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Ranking</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] custom-translucent-bg  gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[400px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-700 hover:text-white rounded-lg m-1",
            "text-lg font-bold text-stone-200",
            className
          )}
          {...props}
        >
          <div className="text-sm  font-medium leading-none text-stone-200">
            {title}
          </div>
          <p className="line-clamp-2  text-sm leading-snug text-stone-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
