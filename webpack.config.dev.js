const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { outputConfig, copyPluginPatterns, entryConfig, devServer } = require("./env.config");

module.exports = (env, options) => {
    return {
        mode: options.mode,
        entry: entryConfig,
        devServer,
        target: "web",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                    options: {
                        plugins: ["@babel/plugin-syntax-dynamic-import"],
                    },
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                url: false,
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        ["postcss-preset-env", { stage: 1, features: { "is-pseudo-class": false } }],
                                    ],
                                },
                            },
                        },
                        "sass-loader",
                    ],
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                    type: "javascript/auto",
                    loader: "file-loader",
                    options: {
                        publicPath: "../",
                        name: "[path][name].[ext]",
                        context: path.resolve(__dirname, "src/assets"),
                        emitFile: false,
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource",
                    // generator: {
                    //     filename: "fonts/[name][ext]",
                    // },
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            alias: {
                "@/*": path.resolve(__dirname, "./src/"),
                "@/pages": path.resolve(__dirname, "./src/pages"),
                "@/components": path.resolve(__dirname, "./src/components"),
                "@/lib": path.resolve(__dirname, "./src/lib"),
                "@/hooks": path.resolve(__dirname, "./src/hooks"),
                "@/data": path.resolve(__dirname, "./src/data"),
                "@/store": path.resolve(__dirname, "./src/store"),
                "@/router": path.resolve(__dirname, "./src/router"),
                "@/assets": path.resolve(__dirname, "./src/assets"),
            },
        },
        output: {
            filename: "js/[name].bundle.js",
            path: path.resolve(__dirname, outputConfig.destPath),
            publicPath: "http://localhost:5001/",
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                inject: true,
                minify: true,
                templateParameters: {
                    PUBLIC_URI: "http://localhost:5001",
                },
                favicon: "./public/favicon.ico",
                manifest: "./public/manifest.json",
            }),
            new CopyPlugin(copyPluginPatterns),
        ],
    };
};
