import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Receipt,
  ShieldCheck,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  admin?: boolean;
}

export const appNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/accounts", label: "Accounts", icon: Wallet },
  { href: "/transfer", label: "Transfer", icon: ArrowLeftRight },
  { href: "/transactions", label: "Transactions", icon: Receipt },
  { href: "/kyc", label: "Verification", icon: ShieldCheck },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/admin", label: "Admin", icon: Users, admin: true },
];

export function navFor(isAdmin: boolean): NavItem[] {
  return appNav.filter((item) => !item.admin || isAdmin);
}
