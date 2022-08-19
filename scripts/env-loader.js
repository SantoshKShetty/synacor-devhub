const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { DEFAULT_ENV, FOLDER_NAME, PROD_ENV } = require("./constants/env");

function loadEnvConfig() {
    const env = process.env.NODE_ENV || DEFAULT_ENV;
    const envFilePath = path.resolve(__dirname, '..', FOLDER_NAME, env);

    const dotEnvConfig = {
        path: envFilePath,
        debug: env !== PROD_ENV,
    };

    if (fs.existsSync(envFilePath)) {
        const result = dotenv.config(dotEnvConfig);
        if (result.error) throw result.error;
    }
}

module.exports = loadEnvConfig;