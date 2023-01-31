"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiSync = void 0;
class OpenAiSync {
    constructor(openai) {
        this.openai = openai;
    }
    // set initializeModel(configuration: Configuration) {
    // 	this.openai = new OpenAIApi(configuration);
    // }
    async listEngines() {
        if (this.openai !== undefined) {
            const response = await this.openai.listEngines();
            return response;
        }
    }
}
exports.OpenAiSync = OpenAiSync;
