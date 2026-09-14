import type { SVGProps } from "react";

export type IconName =
  | "grid"
  | "bag"
  | "tag"
  | "receipt"
  | "user"
  | "search"
  | "bell"
  | "chevron"
  | "arrow"
  | "plus"
  | "minus"
  | "cart"
  | "heart"
  | "spark"
  | "shield"
  | "truck"
  | "clock"
  | "check"
  | "close"
  | "menu"
  | "filter"
  | "sort"
  | "building"
  | "wallet"
  | "file"
  | "logout"
  | "eye"
  | "lock"
  | "mail"
  | "mapPin"
  | "edit"
  | "refresh"
  | "download"
  | "more"
  | "calendar"
  | "info"
  | "help"
  | "arrowUpRight"
  | "package"
  | "layers"
  | "percent"
  | "star"
  | "warning";

type IconProps = Omit<SVGProps<SVGSVGElement>, "stroke"> & {
  name: IconName;
  size?: number;
  stroke?: number;
};

export function Icon({ name, size = 18, stroke = 1.8, className, ...props }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
    ...props,
  };

  switch (name) {
    case "grid":
      return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>;
    case "bag":
      return <svg {...common}><path d="M5 8.5h14l1 12H4l1-12Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>;
    case "tag":
      return <svg {...common}><path d="m3 12 9-9h7a2 2 0 0 1 2 2v7l-9 9L3 12Z" /><circle cx="16" cy="7" r="1" /></svg>;
    case "receipt":
      return <svg {...common}><path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Z" /><path d="M8 8h8M8 12h8M8 16h4" /></svg>;
    case "user":
      return <svg {...common}><circle cx="12" cy="8" r="3.5" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /></svg>;
    case "search":
      return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
    case "bell":
      return <svg {...common}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 22h4" /></svg>;
    case "chevron":
      return <svg {...common}><path d="m9 5 7 7-7 7" /></svg>;
    case "arrow":
      return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "plus":
      return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
    case "minus":
      return <svg {...common}><path d="M5 12h14" /></svg>;
    case "cart":
      return <svg {...common}><path d="M3 4h2l2.2 11h10.6L21 7H6" /><circle cx="9" cy="19" r="1.2" /><circle cx="18" cy="19" r="1.2" /></svg>;
    case "heart":
      return <svg {...common}><path d="M20.8 8.7c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" /></svg>;
    case "spark":
      return <svg {...common}><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3 20 6v5c0 5-3.3 8.5-8 10-4.7-1.5-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.3 2.3 4.8-5" /></svg>;
    case "truck":
      return <svg {...common}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "check":
      return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
    case "close":
      return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>;
    case "menu":
      return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case "filter":
      return <svg {...common}><path d="M4 6h16M7 12h10M10 18h4" /></svg>;
    case "sort":
      return <svg {...common}><path d="M8 6h12M8 12h8M8 18h4M4 5v14M2 7l2-2 2 2" /></svg>;
    case "building":
      return <svg {...common}><path d="M4 21V5l8-3 8 3v16M2 21h20M8 9h1M15 9h1M8 13h1M15 13h1M8 17h1M15 17h1" /></svg>;
    case "wallet":
      return <svg {...common}><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v16H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" /><path d="M4 7h16M15 13h5M16.5 13a.5.5 0 1 0 0 .01" /></svg>;
    case "file":
      return <svg {...common}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>;
    case "logout":
      return <svg {...common}><path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M15 16l4-4-4-4M19 12H9" /></svg>;
    case "eye":
      return <svg {...common}><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></svg>;
    case "lock":
      return <svg {...common}><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
    case "mail":
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
    case "mapPin":
      return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "edit":
      return <svg {...common}><path d="m4 16-.8 4.8L8 20l11-11-4-4L4 16Z" /><path d="m13.5 6.5 4 4" /></svg>;
    case "refresh":
      return <svg {...common}><path d="M20 11a8 8 0 0 0-14.8-4L3 10M4 5v5h5M4 13a8 8 0 0 0 14.8 4L21 14m-1 5v-5h-5" /></svg>;
    case "download":
      return <svg {...common}><path d="M12 4v11M8 11l4 4 4-4M5 20h14" /></svg>;
    case "more":
      return <svg {...common}><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></svg>;
    case "calendar":
      return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>;
    case "info":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>;
    case "help":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M9.7 9a2.4 2.4 0 1 1 3.7 2c-1 .7-1.4 1.1-1.4 2.2M12 16.5h.01" /></svg>;
    case "arrowUpRight":
      return <svg {...common}><path d="M7 17 17 7M8 7h9v9" /></svg>;
    case "package":
      return <svg {...common}><path d="m21 8-9-5-9 5 9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8M12 13v8" /></svg>;
    case "layers":
      return <svg {...common}><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></svg>;
    case "percent":
      return <svg {...common}><path d="M19 5 5 19M7 7h.01M17 17h.01" /></svg>;
    case "star":
      return <svg {...common}><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" /></svg>;
    case "warning":
      return <svg {...common}><path d="m12 3 9 17H3L12 3Z" /><path d="M12 9v4M12 16h.01" /></svg>;
    default:
      return null;
  }
}
