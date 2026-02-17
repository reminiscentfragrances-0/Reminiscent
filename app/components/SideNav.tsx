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
    <nav className="fixed bottom-6 left-8 right-8 z-50 lg:bottom-auto lg:left-6 lg:right-auto lg:top-1/2 lg:-translate-y-1/2">
      <div className="glass-nav flex flex-row items-center justify-around gap-2 py-3 px-4 rounded-full shadow-lg lg:flex-col lg:items-center lg:gap-8 lg:py-10 lg:px-4 lg:pb-10 max-w-[280px] mx-auto lg:max-w-none lg:mx-0">
        <div className="flex flex-row items-center justify-around gap-4 flex-1 lg:flex-col lg:flex-initial lg:gap-6">
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
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-background-dark px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap lg:left-14 lg:bottom-auto lg:mb-0 lg:translate-x-0">
                {item.label}
              </span>
            </a>
          ))}

          {/* Divider */}
          <div className="w-px h-8 bg-white/10 lg:w-8 lg:h-px" />

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
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-background-dark px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap lg:left-14 lg:bottom-auto lg:mb-0 lg:translate-x-0">
              Cart ({cartCount})
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
