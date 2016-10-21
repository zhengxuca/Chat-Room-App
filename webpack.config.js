var webpack = require("webpack");
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
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })

    ]
};