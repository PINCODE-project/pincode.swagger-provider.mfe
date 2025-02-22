module.exports = {
    plugins: {
        "tailwindcss/nesting": {},
        tailwindcss: {},
        autoprefixer: {},
        "postcss-preset-env": {
            stage: 1,
            features: {
                "is-pseudo-class": false,
            },
        },
    },
};
