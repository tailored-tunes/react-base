const devServerConfig = {
  devServer: {
    port: 3000,
    hot: true,
    inline: true,
    historyApiFallback: true, //will only work for development, we can use BrowserRouter insted of HashRouter
    overlay: {
      errors: true,
      warnings: true,
    }
  }
};

export default devServerConfig;
