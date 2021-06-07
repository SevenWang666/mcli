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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishModules = exports.buildModules = exports.buildAndPublish = void 0;
var inquirer = require("inquirer");
var path = require("path");
var fse = require("fs-extra");
var child_process = require("child_process");
var chalk = require('chalk');
function buildAndPublish(mode) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, appDirectory, modulesPath, FileDirs, questions, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    prompt = inquirer.createPromptModule();
                    appDirectory = getAppDirectory();
                    modulesPath = appDirectory + "/src/modules";
                    if (!fse.existsSync(modulesPath)) return [3 /*break*/, 3];
                    return [4 /*yield*/, getFileDir(modulesPath)];
                case 1:
                    FileDirs = _a.sent();
                    questions = [
                        {
                            type: "checkbox",
                            name: "packages",
                            message: "请选择编译后直接发布子模块?",
                            choices: FileDirs,
                        },
                    ];
                    return [4 /*yield*/, prompt(questions)];
                case 2:
                    result = _a.sent();
                    if (!result.packages.length) {
                        console.log("\u8BF7\u9009\u62E9" + chalk.hex('#2c80c5').bold('至少一个子模块'));
                        console.log("\u8BF7\u6309" + chalk.hex('#2c80c5').bold(' 空格键 ') + "\u6765\u9009\u62E9");
                    }
                    buildAndPublishApplication(result.packages, mode);
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.buildAndPublish = buildAndPublish;
function buildModules(mode) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, appDirectory, modulesPath, FileDirs, questions, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    prompt = inquirer.createPromptModule();
                    appDirectory = getAppDirectory();
                    modulesPath = appDirectory + "/src/modules";
                    if (!fse.existsSync(modulesPath)) return [3 /*break*/, 3];
                    return [4 /*yield*/, getFileDir(modulesPath)];
                case 1:
                    FileDirs = _a.sent();
                    questions = [
                        {
                            type: "checkbox",
                            name: "packages",
                            message: "请选择需要发布的子模块?",
                            choices: FileDirs,
                        },
                    ];
                    return [4 /*yield*/, prompt(questions)];
                case 2:
                    result = _a.sent();
                    if (!result.packages.length) {
                        console.log("\u8BF7\u9009\u62E9" + chalk.hex('#2c80c5').bold('至少一个子模块'));
                        console.log("\u8BF7\u6309" + chalk.hex('#2c80c5').bold(' 空格键 ') + "\u6765\u9009\u62E9");
                    }
                    buildApplication(result.packages, mode);
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.buildModules = buildModules;
//编译子应用
var buildAndPublishApplication = function (packages, mode) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, packages_1, name, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                _i = 0, packages_1 = packages;
                _a.label = 1;
            case 1:
                if (!(_i < packages_1.length)) return [3 /*break*/, 5];
                name = packages_1[_i];
                return [4 /*yield*/, buildPromise(name, mode)];
            case 2:
                _a.sent();
                return [4 /*yield*/, publishPromise(name, mode)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 1];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                console.error(error_3);
                process.exit(1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
function publishModules(mode) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, appDirectory, modulesPath, FileDirs, questions, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    prompt = inquirer.createPromptModule();
                    appDirectory = getAppDirectory();
                    modulesPath = appDirectory + "/src/modules";
                    if (!fse.existsSync(modulesPath)) return [3 /*break*/, 3];
                    return [4 /*yield*/, getFileDir(modulesPath)];
                case 1:
                    FileDirs = _a.sent();
                    questions = [
                        {
                            type: "checkbox",
                            name: "packages",
                            message: "请选择需要发布的子模块?",
                            choices: FileDirs,
                        },
                    ];
                    return [4 /*yield*/, prompt(questions)];
                case 2:
                    result = _a.sent();
                    if (!result.packages.length) {
                        console.log("\u8BF7\u9009\u62E9" + chalk.hex('#2c80c5').bold('至少一个子模块'));
                        console.log("\u8BF7\u6309" + chalk.hex('#2c80c5').bold(' 空格键 ') + "\u6765\u9009\u62E9");
                    }
                    publishApplication(result.packages, mode);
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.publishModules = publishModules;
//发布子应用
var publishApplication = function (packages, mode) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, packages_2, name, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                _i = 0, packages_2 = packages;
                _a.label = 1;
            case 1:
                if (!(_i < packages_2.length)) return [3 /*break*/, 4];
                name = packages_2[_i];
                return [4 /*yield*/, publishPromise(name, mode)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_5 = _a.sent();
                console.error(error_5);
                process.exit(1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
//依次执行编译模块
var buildApplication = function (packages, mode) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, packages_3, name, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                _i = 0, packages_3 = packages;
                _a.label = 1;
            case 1:
                if (!(_i < packages_3.length)) return [3 /*break*/, 4];
                name = packages_3[_i];
                return [4 /*yield*/, buildPromise(name, mode)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_6 = _a.sent();
                console.error(error_6);
                process.exit(1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
//获取path下的目录
var getFileDir = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fse.readdir(path)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
//获取项目根路径
var getAppDirectory = function () { return fse.realpathSync(path.resolve(process.cwd())); };
function buildPromise(name, mode) {
    if (!mode)
        mode = "production";
    return new Promise(function (resolve, reject) {
        var p = child_process.spawn("npx", ["vue-cli-service", "build", "--mode", mode, "--dest", "dist/" + name], {
            env: Object.assign(Object.assign({}, process.env), {
                VUE_APP_MODULE: name,
                VUE_APP_ENV: mode,
                VUE_APP_TARGET: name,
            }),
            cwd: getAppDirectory(),
            detached: false,
            shell: true,
            windowsHide: false,
        });
        p.stderr.pipe(process.stderr);
        p.stdout.pipe(process.stdout);
        p.on("close", function (code) {
            p.kill();
            if (code === 0) {
                resolve(null);
            }
            else {
                reject(code);
            }
        });
    });
}
//部署子应用
function publishPromise(name, mode) {
    console.log(mode);
    if (mode != 'production') {
        mode = 'dev';
    }
    else {
        mode = 'prod';
    }
    return new Promise(function (resolve, reject) {
        var p = child_process.spawn("npx", [
            "vue-cli-service",
            "publish",
            "--key",
            "dist",
            "--dest",
            "dist/" + name,
            "--env",
            mode,
        ], {
            env: Object.assign(Object.assign({}, process.env), {
                VUE_APP_MODULE: name,
            }),
            cwd: getAppDirectory(),
            detached: false,
            shell: true,
            windowsHide: false,
        });
        p.stderr.pipe(process.stderr);
        p.stdout.pipe(process.stdout);
        p.on("close", function (code) {
            p.kill();
            if (code === 0) {
                resolve(null);
            }
            else {
                reject(code);
            }
        });
    });
}
