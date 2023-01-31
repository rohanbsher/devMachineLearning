"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const basicRoutes_1 = require("./routes/basicRoutes");
const openai_1 = require("openai");
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config({ path: path_1.default.resolve(__dirname, "../../../.env") });
// dotenv.config({ path: `${__dirname}/../../.env`});
// dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(basicRoutes_1.router);
app.use(express_1.default.static('public'));
const configuration = new openai_1.Configuration({
    // organization: "org-lDiIEYdILCOI44vMsWyYnOLQ",
    // apiKey: "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"
    apiKey: process.env.OPENAI_API_KEY
});
// console.log(configuration);
// console.log(configuration.organization);
const openai = new openai_1.OpenAIApi(configuration);
// const openaiSync = new OpenAiSync(openai);
const runPrompt = async () => {
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: 'I am working with ',
        temperature: 0.9,
    });
    console.log(response.data);
};
// axios.get("https://api.openai.com/v1/completions", {
// 	headers: {
// 	},
// })
// console.log(openaiSync.listEngines());
app.listen(3000, () => {
    // console.log(configuration.apiKey);
    console.log(dotenv.config({ path: path_1.default.resolve(__dirname, "../../../.env") }));
    // runPrompt();
    // console.log(configuration.apiKey)
    runPrompt();
    console.log('Server started on port 3000');
});
