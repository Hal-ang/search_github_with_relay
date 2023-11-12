/** @type {import('tailwindcss').Config} */
import { range } from 'lodash';

const pxToRem = (px: number, base = 16) => `${px / base}rem`;

const extendedPxr = {
  ...range(1, 300).reduce((acc, px) => {
    acc[`${px}pxr`] = pxToRem(px);
    acc[`${px + 0.5}pxr`] = pxToRem(px + 0.5);
    return acc;
  }, {} as Record<string, string>),
};

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: extendedPxr,
      fontSize: extendedPxr,
      lineHeight: extendedPxr,
      borderRadius: extendedPxr,
      maxWidth: extendedPxr,
      minWidth: extendedPxr,
      minHeight: extendedPxr,
    },
  },
  plugins: [],
};
