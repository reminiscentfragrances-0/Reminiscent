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
  { icon: "opacity", label: "Essences", href: "#" },
  { icon: "menu_book", label: "Journals", href: "#" },
];

export default function SideNav({
  items = defaultNavItems,
  cartCount = 2,
}: SideNavProps) {
  return (
    <nav className="fixed left-4 lg:left-6 top-1/2 -translate-y-1/2 z-50">
      <div className="glass flex flex-col items-center gap-8 py-10 px-4 rounded-full">
        <div className="flex flex-col items-center gap-6">
          {items.map((item) => (
            <a
              key={item.icon}
              className="group relative flex items-center justify-center"
              href={item.href}
            >
              <span
                className={`material-symbols-outlined ${
                  item.isActive ? "text-white" : "text-white/50"
                } group-hover:text-primary transition-colors cursor-pointer`}
                style={{ fontSize: 24 }}
              >
                {item.icon}
              </span>
              <span className="absolute left-14 bg-background-dark px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.label}
              </span>
            </a>
          ))}

          {/* Divider */}
          <div className="w-8 h-px bg-white/10" />

          {/* Cart */}
          <a
            className="group relative flex items-center justify-center"
            href="#"
          >
            <span
              className="material-symbols-outlined text-white group-hover:text-primary transition-colors cursor-pointer"
              style={{ fontSize: 24 }}
            >
              shopping_bag
            </span>
            <span className="absolute left-14 bg-background-dark px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Cart ({cartCount})
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
