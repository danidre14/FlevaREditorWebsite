module.exports = {
  // mode: "jit",
  purge: [
    "./views/**/*.ejs",
    "./views/*.ejs",
    "./views/*",
    "./src/**/*.js",
  ],
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {
      backgroundImage: theme => ({
       "default-hero-image": "url('../images/hero-images/home-hero-image.jpg')",
      }),
      colors: {
        royal: {
          "50": "#f9f5ef",
          "100": "#eee2cf",
          "200": "#e2ceaf",
          "300": "#d6ba8f",
          "400": "#cba76f",
          "500": "#C59D5F",
          "600": "#9e7e4c",
          "700": "#634f30",
          "800": "#3b2f1c",
          "900": "#141009",
        },
        flevar: {
          "p1": "#E5E5E5",
          "p2": "#6F737F",
          "p3": "#3B4050",
          "p4": "#252935",
          "p5": "#181C25",
          "s1": "#F0F2F3",
          "s2": "#E54D26",
          "s3": "#AA391C"
        }
      },
      fontFamily: {
        custom: '"Custom Sans", "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif',
      }
    },
    // container: {
    //   center: true,
    // },
  },
  variants: {
    extend: {
      borderWidth: ["first", "last"],
      backgroundColor: ["active", "disabled"],
      textColor: ["disabled"],
    },
  },
  corePlugins: {
    // container: false
  },
  plugins: [
    // function ({ addComponents }) {
    //   addComponents({
    //     ".container": {
    //       "@apply p-4 mx-auto": {},
    //       width: "100%",
    //       "@screen sm": { // >640
    //         maxWidth: "600px",
    //       },
    //       "@screen md": { // >768
    //         maxWidth: "720px",
    //       },
    //       "@screen lg": { // >1024
    //         maxWidth: "960px",
    //       },
    //       "@screen xl": { // >1280
    //         maxWidth: "1140px",
    //       },
    //       "@screen 2xl": { // >1536
    //         maxWidth: "1380px",
    //       },
    //     }
    //   })
    // }
  ]
}
