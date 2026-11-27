/** One consistent line-icon set for the home page (24px grid, 1.6 stroke). */

const PATHS = {
  briefcase:
    "M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3.5 9A2 2 0 0 1 5.5 7h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V9ZM3.5 12.5h17M10.5 12.5v2h3v-2",
  team: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20a6.5 6.5 0 0 1 13 0M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.2a6.5 6.5 0 0 1 3.5 5.8",
  building:
    "M4 20.5h16M6 20.5V6.5L12 3.5l6 3v14M9.5 9h1M13.5 9h1M9.5 12.5h1M13.5 12.5h1M10.5 20.5v-4h3v4",
  layers:
    "m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5ZM3.5 12l8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5",
  scales:
    "M12 3.5v17M7.5 20.5h9M5 7h14M5 7l-2.5 6a2.5 2.5 0 0 0 5 0L5 7Zm14 0-2.5 6a2.5 2.5 0 0 0 5 0L19 7ZM12 3.5a1.2 1.2 0 1 0 0 0",
  compass:
    "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17ZM15.5 8.5l-2 5-5 2 2-5 5-2Z",
  search: "M10.5 17.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM15.5 15.5l5 5",
  gavel:
    "m13.5 4.5 6 6M11 7l6 6M12.2 5.8l-4.4 4.4M18.2 11.8l-4.4 4.4M10 12l-6.5 6.5M3.5 20.5h9",
  columns:
    "M3.5 9 12 4l8.5 5M5 9.5h14M6.5 10v7M10 10v7M14 10v7M17.5 10v7M4 17.5h16M3 20.5h18",
  book: "M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13ZM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5v-13Z",
  target:
    "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z",
  ruler: "M3.5 16.5 16.5 3.5l4 4-13 13-4-4ZM7 13l2 2M10 10l2 2M13 7l2 2",
  document:
    "M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3.5ZM14 3.5V8h4.5M9 12.5h6M9 16h4",
  shield:
    "M12 3.5 19.5 6v5.5c0 4.5-3.2 8-7.5 9-4.3-1-7.5-4.5-7.5-9V6L12 3.5ZM8.5 12l2.5 2.5 4.5-4.5",
  chart: "M4 20h16M7 16v-4M11.5 16V8M16 16v-6M5 9l5-4 4 3 5-4",
  chat: "M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-5 4V5.5ZM8 9h8M8 12h5",
  check: "m5 12.5 4.5 4.5L19 7.5",
  phone:
    "M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z",
  mail: "M3.5 6.5A1.5 1.5 0 0 1 5 5h14a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5v-11ZM4 7l8 6 8-6",
  clock: "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17ZM12 7.5V12l3 2",
  close: "M7.5 7.5l9 9M16.5 7.5l-9 9",
  play: "M8.5 5.8v12.4a.8.8 0 0 0 1.2.7l10-6.2a.8.8 0 0 0 0-1.4l-10-6.2a.8.8 0 0 0-1.2.7Z",
  calendar:
    "M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-11ZM4 10.5h16M8 4v4M16 4v4",
  monitor:
    "M3.5 5.5A1.5 1.5 0 0 1 5 4h14a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 16H5a1.5 1.5 0 0 1-1.5-1.5v-9ZM9 20h6M12 16v4",
  quote:
    "M9.5 7.5C6.8 8.3 5 10.4 5 13.2V17h4.5v-4.5H7.2c.1-1.6 1.1-2.8 2.8-3.4l-.5-1.6ZM18.5 7.5c-2.7.8-4.5 2.9-4.5 5.7V17h4.5v-4.5h-2.3c.1-1.6 1.1-2.8 2.8-3.4l-.5-1.6Z",
} as const;

export type LineIconName = keyof typeof PATHS;

const LineIcon = ({
  name,
  className = "size-5",
}: {
  name: LineIconName;
  className?: string;
}) => (
  <svg aria-hidden viewBox="0 0 24 24" className={className}>
    <path
      d={PATHS[name]}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LineIcon;

/** Brand ring motif used as section decor. */
export const Rings = ({
  className,
  color = "#5188ff",
}: {
  className?: string;
  color?: string;
}) => (
  <svg aria-hidden viewBox="0 0 600 600" className={className}>
    {[290, 230, 170, 110].map((r, i) => (
      <circle
        key={r}
        cx="300"
        cy="300"
        r={r}
        fill="none"
        stroke={color}
        strokeOpacity={0.1 + i * 0.045}
        strokeDasharray={i === 0 ? "2 7" : undefined}
      />
    ))}
  </svg>
);
