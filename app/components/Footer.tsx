import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  brandName?: string;
  description?: string;
  columns?: FooterColumn[];
  socialLinks?: { icon: string; component: React.ElementType; href: string }[];
  legalLinks?: FooterLink[];
  copyrightYear?: number;
}

const defaultColumns: FooterColumn[] = [
  {
    title: "The House",
    links: [
      { label: "Our Story", href: "#" },
      { label: "The Archive", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Journal", href: "#" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Stockists", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: "share", component: ShareOutlinedIcon, href: "#" },
  { icon: "camera_alt", component: InstagramIcon, href: "#" },
];

const defaultLegalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export default function Footer({
  brandName = "Reminiscent",
  description = "We create olfactory artifacts. Fragrances that exist at the intersection of memory and art.",
  columns = defaultColumns,
  socialLinks = defaultSocialLinks,
  legalLinks = defaultLegalLinks,
  copyrightYear = new Date().getFullYear(),
}: FooterProps) {
  return (
    <footer className="bg-background-dark border-t border-travertine/20 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-40">
        {/* Main Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 bg-parchment/5 rounded-full flex items-center justify-center border border-travertine/30">
                <DiamondOutlinedIcon
                  sx={{
                    fontSize: 16,
                    color: "var(--parchment)",
                  }}
                />
              </div>
              <span className="text-parchment text-base font-bold tracking-widest uppercase">
                {brandName}
              </span>
            </div>
            <p className="text-parchment/60 max-w-xs text-sm leading-relaxed mb-8">
              {description}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  className="h-10 w-10 rounded-full bg-parchment/5 flex items-center justify-center text-parchment hover:bg-primary hover:text-obsidian transition-colors"
                  href={social.href}
                  aria-label={social.icon}
                >
                  <social.component sx={{ fontSize: 16 }} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h6 className="text-parchment font-bold text-xs uppercase tracking-widest mb-6">
                {column.title}
              </h6>
              <ul className="space-y-4 text-sm text-parchment/60">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="hover:text-parchment transition-colors"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-travertine/20 pt-10 text-[10px] text-parchment/50 uppercase tracking-[0.2em]">
          <p>
            © {copyrightYear} {brandName} Fragrances. All rights reserved.
          </p>
          <div className="flex gap-8 mt-4 md:mt-0">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                className="hover:text-parchment"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
