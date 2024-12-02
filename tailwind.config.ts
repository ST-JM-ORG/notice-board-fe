import type { Config } from "tailwindcss";

const pxToRem = (value: number) => {
  return Object.fromEntries(
    Array.from(Array(value + 1)).map((_, i) => [`${i}`, `${i / 16}rem`]),
  );
};

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "carousel-prev": "carousel-prev .5s ease-in-out forwards",
        "carousel-next": "carousel-next .5s ease-in-out forwards",
      },
      boxShadow: {
        header: "0 4px 6px -1px rgba(0,0,0,0.1)",
      },
      width: pxToRem(1000),
      height: pxToRem(300),
      minWidth: pxToRem(200),
      maxWidth: pxToRem(500),
      borderRadius: pxToRem(30),
      borderWidth: pxToRem(10),
      colors: {
        "anti-flash-white": "#efeff4",
        gainsboro: "#DEDEDE",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      fontSize: pxToRem(100),
      margin: pxToRem(50),
      padding: pxToRem(100),
      keyframes: {
        "carousel-prev": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(200px)" },
        },
        "carousel-next": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-200px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
