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
      borderRadius: pxToRem(100),
      borderWidth: pxToRem(10),
      boxShadow: {
        header: "0 4px 6px -1px rgba(0,0,0,0.1)",
      },
      colors: {
        "american-silver": "#d1d1d1",
        "anti-flash-white": "#efeff4",
        "baby-blue-eyes": "#9bc7ec",
        celadon: "#bdecb6",
        coral: "#ee7f50",
        cultured: "#f9f6f2",
        "dark-sky-blue": "#95b8d1",
        gainsboro: "#dedede",
        "pastel-green": "#77dd77",
        platinum: "#e2e2e2",
        red: "#ff0000",
        "silver-sand": "#c6c6c6",
        "sonic-silver": "#707579",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      fontSize: pxToRem(100),
      width: pxToRem(1000),
      height: pxToRem(300),
      minWidth: pxToRem(500),
      maxWidth: pxToRem(500),
      margin: pxToRem(50),
      padding: pxToRem(100),
      translate: {
        "20p": "20%",
      },
    },
  },
  plugins: [],
} satisfies Config;
