"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const PORT = (process.env.PORT || 3000);
const server = server_1.default.init(PORT);
server.start(() => {
    console.log(`Server running on port ${PORT}`);
});
