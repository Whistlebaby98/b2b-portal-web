import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10233f",
        slate: {
          DEFAULT: "#66758a",
          300: "#b4c0cf",
          400: "#8e9bad",
          500: "#73839a",
        },
        fog: "#f5f8fc",
        line: "#e6edf5",
        cyan: "#16b8b1",
        coral: "#f27161",
      },
      boxShadow: {
        card: "0 14px 40px rgba(24, 55, 93, 0.07)",
        soft: "0 8px 24px rgba(24, 55, 93, 0.08)",
      },
      fontFamily: {
        sans: ["Inter", "PingFang SC", "Microsoft YaHei", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
