import { OrderStatus } from "@/types/order.types";
import {
  IoHomeOutline,
  IoLayersOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { TfiPackage } from "react-icons/tfi";

const navLinks = [
  { href: "/main/site/collections", label: "Collections" },
  { href: "/main/site/men", label: "Men" },
  { href: "/main/site/women", label: "Women" },
  { href: "/main/site/about", label: "About" },
  { href: "/main/site/contact", label: "Contact" },
];

export default navLinks;

export const ADMIN_NAV_LINKS = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: IoHomeOutline,
    activeColor: "text-newPrimary",
    linkHover: "hover:text-newPrimary",
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: TfiPackage,
    activeColor: "text-emerald-500",
    linkHover: "hover:text-emerald-500",
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: IoPersonOutline,
    activeColor: "text-red-500",
    linkHover: "hover:text-red-500",
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: IoLayersOutline,
    activeColor: "text-blue-500",
    linkHover: "hover:text-blue-500",
  },
];

interface StatusConfig {
  hoverColor: string;
  color: string;
}

export const orderStatusColorCode: Record<OrderStatus, StatusConfig> = {
  new: { hoverColor: "hover:text-green-500", color: "text-green-500" },
  pending: { hoverColor: "hover:text-amber-500", color: "text-amber-500" },
  accepted: { hoverColor: "hover:text-blue-500", color: "text-blue-500" },
  packed: { hoverColor: "hover:text-gray-500", color: "text-gray-500" },
  sent: { hoverColor: "hover:text-black", color: "text-black" },
  canceled: { hoverColor: "hover:text-red-500", color: "text-red-500" },
};

export const ORDER_STATUS_LIST: OrderStatus[] = [
  "new",
  "accepted",
  "pending",
  "packed",
  "sent",
  "canceled",
];
