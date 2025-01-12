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
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: pxToRem(1000),
      height: pxToRem(300),
      minWidth: pxToRem(500),
      maxWidth: pxToRem(500),
      animation: {
        "carousel-prev": "carousel-prev .5s ease-in-out forwards",
        "carousel-next": "carousel-next .5s ease-in-out forwards",
        "fade-in": "fade-in .5s ease-in-out",
        "fade-out": "fade-out .25s ease-in-out",
        "modal-background-up": "modal-background-up .3s ease-in-out forwards",
        "modal-background-down":
          "modal-background-down .3s ease-in-out forwards",
        "modal-slide-up": "modal-slide-up .3s ease-in-out forwards",
        "modal-slide-down": "modal-slide-down .3s ease-in-out forwards",
        "progress-in": "progress-in 2.0s linear forwards",
        "slide-top-right-in": "slide-top-right-in .3s ease-in-out forwards",
        "slide-top-right-out": "slide-top-right-out .3s ease-in-out forwards",
      },
      borderRadius: {
        ...pxToRem(100),
        "1/2": "50%",
      },
      borderWidth: pxToRem(10),
      boxShadow: {
        google: "0 2px 8px 0 rgba(60, 64, 67, 0.25)",
        header: "0 4px 6px -1px rgba(0,0,0,0.1)",
      },
      colors: {
        cultured: "#f9f6f2",
        "anti-flash-white": "#efeff4",
        gainsboro: "#dedede",
        platinum: "#e2e2e2",
        "american-silver": "#d1d1d1",
        "silver-sand": "#c6c6c6",
        "sonic-silver": "#707579",
        "light-salmon-pink": "#fca5a5",
        "pastel-red": "#ff6868",
        red: "#ff0000",
        "maximum-yellow-red": "#fcbf49",
        "bright-yellow": "#ffb22c",
        coral: "#ff8559",
        dandelion: "#fcde70",
        sunny: "#f6fb7a",
        celadon: "#bdecb6",
        "light-green": "#90ee90",
        "pastel-green": "#77dd77",
        green: "#00ff00",
        "dark-pastel-green": "#11b823",
        salem: "#118b50",
        "sky-blue": "#64c7e7",
        "brandeis-blue": "#006bff",
        "vivid-cerulean": "#03a9f4",
        "baby-blue-eyes": "#9bc7ec",
        "dark-sky-blue": "#95b8d1",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      fontSize: pxToRem(100),
      keyframes: {
        "fade-in": {
          "0%": { transform: "translateX(300px)", opacity: "0" },
          "70%": { transform: "translateX(-30px)", opacity: "1" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-out": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(300px)", opacity: "0" },
        },
        "modal-background-up": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "modal-background-down": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "modal-slide-up": {
          "0%": {
            transform: "scale(0)",
            transformOrigin: "center",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            transformOrigin: "center",
            opacity: "1",
          },
        },
        "modal-slide-down": {
          "0%": {
            transform: "scale(1)",
            transformOrigin: "center",
            opacity: "1",
          },
          "100%": {
            transform: "scale(0)",
            transformOrigin: "center",
            opacity: "0",
          },
        },
        "progress-in": {
          "0%": {
            transform: "scaleX(0)",
            transformOrigin: "left",
          },
          "100%": {
            transform: "scaleX(1)",
            transformOrigin: "left",
          },
        },
        "slide-top-right-in": {
          "0%": {
            transform: "scale(0)",
            transformOrigin: "top right",
            opacity: "1",
          },
          "70%": {
            transform: "scale(1.05)",
            transformOrigin: "top right",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1)",
            transformOrigin: "top right",
            opacity: "1",
          },
        },
        "slide-top-right-out": {
          "0%": {
            transform: "scale(1)",
            transformOrigin: "top right",
            opacity: "1",
          },
          "100%": {
            transform: "scale(0)",
            transformOrigin: "top right",
            opacity: "1",
          },
        },
      },
      inset: pxToRem(100),
      margin: pxToRem(50),
      padding: pxToRem(100),
      screens: {
        // => @media (min-width: 000px) { ... }
        mobile: "480px",
        tablet: "768px",
        laptop: "1280px",
      },
      transitionProperty: {
        width: "width",
      },
      transitionTimingFunction: {
        "in-out-quart": "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
      },
      translate: {
        "20p": "20%",
      },
    },
  },
  plugins: [],
} satisfies Config;
