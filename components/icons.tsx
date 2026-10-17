import type { SVGProps } from 'react';

const paths: Record<string, string[]> = {
  check: ['M5 12.5l4.5 4.5L19 7.5'],
  x: ['M6 6l12 12', 'M18 6L6 18'],
  arrow: ['M5 12h14', 'M13 6l6 6-6 6'],
  back: ['M19 12H5', 'M11 6l-6 6 6 6'],
  spark: ['M11 3c.5 4.6 2.4 6.5 7 7-4.6.5-6.5 2.4-7 7-.5-4.6-2.4-6.5-7-7 4.6-.5 6.5-2.4 7-7z', 'M19 15.5v5', 'M16.5 18h5'],
  bulb: ['M9 18h6', 'M10 21h4', 'M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z'],
  info: ['M12 11v6', 'M12 7.5v.01'],
  clock: ['M12 7v5l3 2', 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z'],
  play: ['M8 5.5v13l11-6.5z'],
  search: ['M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z', 'M20 20l-4-4'],
  chevron: ['M6 9l6 6 6-6'],
  sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M12 2v2', 'M12 20v2', 'M4.9 4.9l1.4 1.4', 'M17.7 17.7l1.4 1.4', 'M2 12h2', 'M20 12h2', 'M4.9 19.1l1.4-1.4', 'M17.7 6.3l1.4-1.4'],
  moon: ['M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  path: ['M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M8 17h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6'],
  book: ['M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z', 'M4 19V5', 'M9 7h6'],
  chat: ['M4 5h16v11H9l-5 4z', 'M8 9.5h8', 'M8 12.5h5'],
  shelf: ['M4 20h16', 'M6 20V6', 'M10 20V9', 'M14 20V4', 'M18 20v-8'],
  grad: ['M2 9l10-5 10 5-10 5z', 'M6 11v5c3 2 9 2 12 0v-5'],
  code: ['M9 8l-4 4 4 4', 'M15 8l4 4-4 4'],
  rocket: ['M14 4c3 0 6 3 6 6l-7 7-6-6z', 'M7 11l-3 1 0 4 4 0 1-3', 'M15 9.5v.01'],
  building: ['M4 21V7l8-4 8 4v14', 'M9 21v-5h6v5', 'M9 10h.01', 'M15 10h.01'],
  mail: ['M3 6h18v12H3z', 'M3 7l9 7 9-7'],
  users: ['M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M2 21c0-4 3-6 7-6s7 2 7 6', 'M16 3.5a4 4 0 0 1 0 7.5', 'M18 15c2.5.5 4 2.5 4 6'],
  phone: ['M7 2h10v20H7z', 'M11 18h2'],
  shield: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', 'M9 12l2 2 4-4'],
};

export type IconName = keyof typeof paths;

export function Icon({ name, ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  const fill = name === 'play' ? 'currentColor' : 'none';
  return (
    <svg viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      {paths[name].map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
