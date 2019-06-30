const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require('customize-cra');
const path = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@font-family': `'Montserrat', sans-serif`,
      '@layout-sider-background': '#2c3345',
      '@layout-header-background': '#2c3345',
      '@primary-color': '#FA5471',
    },
  }),
  addWebpackAlias({
    '~': path.resolve(__dirname, 'src'),
  })
);
