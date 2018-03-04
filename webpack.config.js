/*eslint-env node*/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BabelPluginTransformReactJsx = require("@babel/plugin-transform-react-jsx");
const BabelPluginProposalClassProperties = require("@babel/plugin-proposal-class-properties");
const BabelPluginSyntaxDynamicImport = require("@babel/plugin-syntax-dynamic-import");

module.exports = {
  output: {
    path: path.resolve(__dirname, "docs")
  },
  resolve: {
    modules: ["node_modules", "react-modules"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules|react-modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            plugins: [
              BabelPluginTransformReactJsx,
              BabelPluginProposalClassProperties,
              BabelPluginSyntaxDynamicImport
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React Suspense Demo"
    })
  ]
};
