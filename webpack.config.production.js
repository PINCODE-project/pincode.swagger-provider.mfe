const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { NativeFederationTypeScriptRemote } = require("@module-federation/native-federation-typescript/webpack");
const { outputConfig, copyPluginPatterns, entryConfig, devServer } = require("./env.config");

const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies;

const federationConfig = {
    name: "ui",
    filename: "remoteEntry.js",
    exposes: {
        "./Global": "./src/styles/globals.scss",
        "./Accordion": "./src/components/ui/accordion",
        "./Alert": "./src/components/ui/alert",
        "./AlertDialog": "./src/components/ui/alert-dialog",
        "./AspectRatio": "./src/components/ui/aspect-ratio",
        "./Avatar": "./src/components/ui/avatar",
        "./Badge": "./src/components/ui/badge",
        "./Breadcrumb": "./src/components/ui/breadcrumb",
        "./Button": "./src/components/ui/button",
        "./Calendar": "./src/components/ui/calendar",
        "./Card": "./src/components/ui/card",
        "./Carousel": "./src/components/ui/carousel",
        "./Chart": "./src/components/ui/chart",
        "./Checkbox": "./src/components/ui/checkbox",
        "./Collapsible": "./src/components/ui/collapsible",
        "./Command": "./src/components/ui/command",
        "./ContextMenu": "./src/components/ui/context-menu",
        "./Dialog": "./src/components/ui/dialog",
        "./Drawer": "./src/components/ui/drawer",
        "./DropdownMenu": "./src/components/ui/dropdown-menu",
        "./Form": "./src/components/ui/form",
        "./HoverCard": "./src/components/ui/hover-card",
        "./Input": "./src/components/ui/input",
        "./InputOtp": "./src/components/ui/input-otp",
        "./Label": "./src/components/ui/label",
        "./Menubar": "./src/components/ui/menubar",
        "./NavigationMenu": "./src/components/ui/navigation-menu",
        "./Pagination": "./src/components/ui/pagination",
        "./Popover": "./src/components/ui/popover",
        "./Progress": "./src/components/ui/progress",
        "./RadioGroup": "./src/components/ui/radio-group",
        "./Resizable": "./src/components/ui/resizable",
        "./ScrollArea": "./src/components/ui/scroll-area",
        "./Select": "./src/components/ui/select",
        "./Separator": "./src/components/ui/separator",
        "./Sheet": "./src/components/ui/sheet",
        "./Sidebar": "./src/components/ui/sidebar",
        "./Skeleton": "./src/components/ui/skeleton",
        "./Slider": "./src/components/ui/slider",
        "./Sonner": "./src/components/ui/sonner",
        "./Switch": "./src/components/ui/switch",
        "./Table": "./src/components/ui/table",
        "./Tabs": "./src/components/ui/tabs",
        "./Textarea": "./src/components/ui/textarea",
        "./Toast": "./src/components/ui/toast",
        "./Toaster": "./src/components/ui/toaster",
        "./Toggle": "./src/components/ui/toggle",
        "./ToggleGroup": "./src/components/ui/toggle-group",
        "./Tooltip": "./src/components/ui/tooltip",
        "./Marquee": "./src/components/ui/marquee",
        "./Article": "./src/components/ui/article/Article",
        "./Article/Heading": "./src/components/ui/article/Heading",
        "./Article/Tabs": "./src/components/ui/article/Tabs",
        "./SignVideo": "./src/components/ui/sign-video",
        "./ThemeToggle": "./src/components/ui/theme-toggle",
        "./SignRecognitionBlock": "./src/components/ui/sign-recognition-block",
    },
    shared: {
        react: { requiredVersion: deps.react, singleton: true },
        "react-dom": { requiredVersion: deps["react-dom"], singleton: true },
    },
    remotes: {},
};

module.exports = (env, options) => {
    return {
        mode: options.mode,
        entry: entryConfig,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
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
                                    plugins: [["postcss-preset-env"]],
                                },
                            },
                        },
                        "sass-loader",
                    ],
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
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: "javascript/auto",
                    exclude: /images/,
                    loader: "file-loader",
                    options: {
                        publicPath: "../",
                        context: path.resolve(__dirname, "src/assets"),
                        name: "[path][name].[ext]",
                        emitFile: false,
                    },
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
            publicPath: "https://pincode-ui.netlify.app/",
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                inject: true,
                minify: false,
            }),
            new ModuleFederationPlugin(federationConfig),
            new CopyPlugin(copyPluginPatterns),
        ],
    };
};
