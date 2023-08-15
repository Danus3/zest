/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
      keyframes: {
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 }
        },
        slideIn: {
          from: {
            transform: "translateX(calc(100% + var(--viewport-padding, 0px)))"
          },
          to: { transform: "translateX(0)" }
        },
        swipeOut: {
          from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          to: { transform: "translateX(calc(100% + var(--viewport-padding)))" }
        },
        rotate: {
          from: { rotate: "0deg" },
          to: { rotate: "360deg" }
        }
      },
      animation: {
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out",
        rotate: "rotate 1s linear infinite"
      }
    }
  },
  plugins: []
};
