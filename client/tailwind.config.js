module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    customForms: (theme) => ({
      default: {
        checkbox: {
          "&:focus": {
            outline: "none",
            boxShadow: "none",
            borderColor: "none",
          },
        },
      },
    }),
    extend: {},
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
