"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const types_1 = require("./types");
const models_1 = require("./db/models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./db/config");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
const JWT_SECRET = 'shdjshdwuieiwoeiow';
//AUTH ROUTES
app.post('/SignUp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data } = types_1.SignUpSchema.safeParse(req.body);
    if (!success) {
        res.status(403).json({ message: 'Incorrect Request' });
        return;
    }
    try {
        const existing_user = yield models_1.UserModel.findOne({
            email: data.email
        });
        if (existing_user) {
            return res.status(403).json({ message: 'User already exists' });
        }
        const user = yield models_1.UserModel.create({
            name: data.name,
            email: data.email,
            password: data.password
        });
        res.status(200).json({ message: 'User Signed Up succesfully' });
    }
    catch (e) {
        res.status(403).json({ message: 'Something went wrong' });
        console.error(e);
    }
}));
app.post('/SignIn', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data } = types_1.SignInSchema.safeParse(req.body);
    if (!success) {
        res.status(403).json({ messge: 'Incorrect request' });
        return;
    }
    try {
        const user = yield models_1.UserModel.findOne({
            email: data.email,
            password: data.password
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET);
            res.status(200).json({ id: user.id, token });
        }
        else {
            res.status(404).json({
                message: 'Incorrect Credentials'
            });
        }
    }
    catch (e) {
        res.status(403).json({ message: 'Something went wrong' });
        console.error(e);
    }
}));
app.listen(PORT, () => {
    (0, config_1.connectDB)();
    console.log('MONGO DB Connected');
    console.log(`the server is running on ${PORT}`);
});
