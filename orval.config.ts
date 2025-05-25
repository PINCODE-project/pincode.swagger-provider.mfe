module.exports = {
    "swagger-provider": {
        output: {
            mode: "split",
            target: "src/store/api/swagger-provider-api.ts",
            schemas: "src/model",
            override: {
                mutator: {
                    path: "src/store/api/axios.ts",
                    name: "customInstance",
                },
            },
        },
        input: {
            target: "./openapi.json",
        },
    },
};
