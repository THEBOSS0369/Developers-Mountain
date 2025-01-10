"use client";

import {
  AlertCircle,
  Archive,
  ArchiveX,
  ChevronRight,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";

import React, { useState } from "react";
import { Nav } from "../ui/nav";
import { Button } from "../ui/button";

const SideNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      <Button className="rounded-full p-2" variant={"secondary"}>
        <ChevronRight />
      </Button>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Home",
            href: "/",
            label: "972",
            icon: Users2,
            variant: "ghost",
          },
          {
            title: "Updates",
            href: "/",
            label: "342",
            icon: AlertCircle,
            variant: "ghost",
          },
          {
            title: "Forums",
            href: "/",
            label: "128",
            icon: MessagesSquare,
            variant: "ghost",
          },
          {
            title: "Shopping",
            href: "/",
            label: "8",
            icon: ShoppingCart,
            variant: "ghost",
          },
          {
            title: "Promotions",
            href: "/",
            label: "21",
            icon: Archive,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
};

export default SideNavbar;
