// src/components/layout/MenuItem.tsx

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  onClick: () => void;
}

export default function MenuItem({ icon, label, collapsed, onClick }: MenuItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn("w-full justify-start gap-2", collapsed && "px-2")}
      onClick={onClick}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Button>
  );
}
