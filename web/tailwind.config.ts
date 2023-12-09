import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "btn-primary": "#FF9337",
        "d-txt-main": "#FFF",
        "d-txt-sec": "#ABABAB",
        "d-side-bg": "#2C303C",
        "d-sec-bg": "#4B4F5D",
        "d-active-chat": "#333743",
        "d-side-actions": "#3F424A",
        "d-inp-placeholder": "#858B9D",
        "d-main-bg": "#40424C",
        "d-bot-chat": "#283042",
        "d-bot-chat-hr": "#555867",
        "d-bot-chat-ref": "#1D263A",
        "d-emote-con": "#333D53",
        "d-emote-inactive-bdr": "#4B556B",
        "d-emote-active-bdr": "#B4B16E",
        "d-emote-inactive-bg": "#FFF84F",
      },
      borderRadius: {
        "sm": "5px",
      },
    },
  },
  plugins: [],
};
export default config;
