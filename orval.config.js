module.exports = {
    "swagger-provider": {
        output: {
            mode: "split",
            target: "src/store/api/swagger-provider-api.ts",
            schemas: "src/model",
        },
        input: {
            target: "./openapi.json",
        },
    },
};
