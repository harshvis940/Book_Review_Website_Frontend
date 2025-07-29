// jest.config.cjs
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  // 👇 Tells Jest to NOT ignore these ESM modules
  transformIgnorePatterns: ["/node_modules/(?!swiper|ssr-window|dom7).+\\.js$"],
  moduleNameMapper: {
    // Optional: mock CSS
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
};
