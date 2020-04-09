"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CreateUser_1 = __importDefault(require("./services/CreateUser"));
function hello(request, response) {
    var user = CreateUser_1.default({
        name: 'Thiago',
        email: '111###',
        password: 'teste@gmail.com',
        techs: ['React', 'TS', { title: 'VUE', exp: 55 }]
    });
    return response.json({ msg: 'HI' });
}
exports.hello = hello;
