const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              // '@margin-xs': '30px' 
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};