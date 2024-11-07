import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surfaces: {
          100: "#032834",
          500: "#093940",
        },
        outline: {
          default: "#89938d",
        },
        primary: "#41deb4",
        onSurface: "#fbfcff",
      },
      fontSize: {
        displayLg: "3.5625em",
        displayMd: "2.8125em",
        displaySm: "2.25em",
        headingLg: "2em",
        headingMd: "1.75em",
        headingSm: "1.5em",
        titleLg: "1.375em",
        titleMd: "1.25em",
        titleSm: "1em",
        titleXs: "0.875em",
        labelLg: "0.875em",
        labelMd: "0.75em",
        labelSm: "0.6875em",
        bodyLg: "1em",
        bodyMd: "0.875em",
        bodySm: "0.75em",
        buttonLg: "1em",
        buttonMd: "0.875em",
        buttonSm: "0.75em",
      },
    },
  },
  plugins: [],
};
export default config;
