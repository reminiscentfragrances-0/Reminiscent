"use client";

import { useCart } from "../context/CartContext";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

export interface NavItem {
  icon: string;
  label: string;
  href: string;
  isActive?: boolean;
}

interface SideNavProps {
  items?: NavItem[];
  cartCount?: number;
}

const defaultNavItems: NavItem[] = [
  { icon: "history", label: "Archive", href: "#" },
  { icon: "opacity", label: "Essences", href: "/collection" },
  { icon: "menu_book", label: "Journals", href: "/journal" },
];

const iconMap: Record<string, React.ElementType> = {
  history: HistoryOutlinedIcon,
  opacity: OpacityOutlinedIcon,
  menu_book: MenuBookOutlinedIcon,
};

export default function SideNav({
  items = defaultNavItems,
  cartCount,
}: SideNavProps) {
  const { openCart, itemCount } = useCart();
  const count = cartCount ?? itemCount;

  return (
    <nav className="fixed bottom-6 left-8 right-8 z-50 lg:bottom-auto lg:left-6 lg:right-auto lg:top-1/2 lg:-translate-y-1/2">
      <div className="glass-nav flex flex-row items-center justify-around gap-2 py-3 px-4 rounded-full shadow-lg lg:flex-col lg:items-center lg:gap-8 lg:py-10 lg:px-4 lg:pb-10 max-w-[280px] mx-auto lg:max-w-none lg:mx-0">
        <div className="flex flex-row items-center justify-around gap-4 flex-1 lg:flex-col lg:flex-initial lg:gap-6">
          {items.map((item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <a
                key={item.icon}
                className="group relative flex items-center justify-center"
                href={item.href}
              >
                {IconComponent && (
                  <IconComponent
                    sx={{
                      fontSize: 24,
                      color: item.isActive
                        ? "var(--parchment)"
                        : "rgba(244, 241, 234, 0.6)",
                      "&:hover": { color: "var(--primary)" },
                      transition: "color 0.2s",
                      cursor: "pointer",
                    }}
                  />
                )}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-obsidian px-3 py-1 rounded text-xs text-parchment opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap lg:left-14 lg:bottom-auto lg:mb-0 lg:translate-x-0">
                  {item.label}
                </span>
              </a>
            );
          })}

          {/* Divider */}
          <div className="w-px h-8 bg-parchment/15 lg:w-8 lg:h-px" />

          {/* Cart */}
          <button
            type="button"
            onClick={openCart}
            className="group relative flex items-center justify-center"
            aria-label={`Open cart`}
          >
            <ShoppingBagOutlinedIcon
              sx={{
                fontSize: 24,
                color: "rgba(244, 241, 234, 0.6)",
                "&:hover": { color: "var(--primary)" },
                transition: "color 0.2s",
                cursor: "pointer",
              }}
            />
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-obsidian px-3 py-1 rounded text-xs text-parchment opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap lg:left-14 lg:bottom-auto lg:mb-0 lg:translate-x-0">
              Cart ({count})
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
