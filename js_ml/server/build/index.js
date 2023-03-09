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
const openai_1 = require("openai");
const OpenAiSync_1 = require("./model/OpenAiSync");
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
dotenv.config({ path: path_1.default.resolve(__dirname, "../../../.env") });
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(router);
app.use(express_1.default.static('public'));
app.use((0, cors_1.default)());
const configuration = new openai_1.Configuration({
    organization: "org-lDiIEYdILCOI44vMsWyYnOLQ",
    apiKey: process.env.OPENAI_API_KEY
});
const user = OpenAiSync_1.OpenAiSync.buildOpenAiSync(configuration);
const userSync = new OpenAiSync_1.OpenAiSync(user);
let questionVal = 'What is the historical low iron price? Return the answer as a string.';
let resVal = "";
// userSync.createCompletion(questionVal, 0.9).then((response) => {
// 	console.log("Your question is : " + questionVal);
// 	if(response){
// 		const parseJson = response.data.choices[0].text?.trim();
// 		resVal = parseJson!;
// 		console.log("Response is : " + parseJson);
// 	}
// });
app.post('/ask', async (req, res) => {
    // Get the user's input question from the query parameter
    userSync.createCompletion(questionVal, 0.9).then((response) => {
        var _a;
        console.log("Your question is : " + questionVal);
        if (response) {
            const parseJson = (_a = response.data.choices[0].text) === null || _a === void 0 ? void 0 : _a.trim();
            resVal = parseJson;
            console.log("Response is : " + parseJson);
        }
    });
    res.send(resVal);
});
app.get('/ask', (req, res) => {
    res.send(resVal);
});
// interface Engine {
// 	data: any;
// 	id: string;
// 	object: string;
// 	ready: boolean;
// 	owner: string;
// 	permissions: any;
// }
// let engineData: Engine;
// userSync.listEngines().then((response) => {
// 	if(response){
// 		engineData = response.data;
// 		console.log(engineData.data[0] as Engine);
// 	}
// });
// async function listEngines(): Promise<void> {
// 	try {
// 	  const response = await userSync.listEngines();
// 	  if (response) {
// 		console.log(response.data);
// 		const engines = response.data as { object: string, id: string, ready: boolean, owner: string, permissions: any, created: any }[];
// 		engines.forEach(engine => {
// 		  console.log(`Engine object: ${engine.object}, ID: ${engine.id}, ready: ${engine.ready}, owner: ${engine.owner}, permissions: ${engine.permissions}, created: ${engine.created}`);
// 		});
// 	  }
// 	} catch (error) {
// 	  console.error(error);
// 	}
//   }
app.listen(3001, () => {
    console.log('Server started on port 3001');
});
