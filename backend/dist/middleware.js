"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = AuthMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "SJDSJDWIWEU2923923AQ";
function AuthMiddleware(req, res, next) {
    const header = req.headers['authorization'];
    try {
        const response = jsonwebtoken_1.default.verify(header, JWT_SECRET);
        req.userId = response.id;
        next();
    }
    catch (e) {
        res.status(403).json({ message: "You are not logged In" });
    }
}
