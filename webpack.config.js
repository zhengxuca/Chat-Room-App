var webpack = require("webpack");

var isProd = process.env.NODE_ENV === 'production';
console.log("isProd: "+ isProd);
var plugins = [new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
})];

if (isProd) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }));
}
module.exports = {
    entry: "./public/javascripts/chatScripts.js",
    output: {
        path: __dirname,
        filename: "/public/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: plugins
};