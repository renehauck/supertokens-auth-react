"use strict";
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * Imports.
 */
var authRecipe_1 = __importDefault(require("../authRecipe"));
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
var normalisedURLPath_1 = __importDefault(require("supertokens-web-js/utils/normalisedURLPath"));
var constants_1 = require("../../constants");
var signInAndUp_1 = __importDefault(require("./components/features/signInAndUp"));
var recipe_1 = __importDefault(require("../passwordless/recipe"));
var recipe_2 = __importDefault(require("../thirdparty/recipe"));
var recipeImplementation_1 = __importDefault(require("./recipeImplementation"));
var passwordlessImplementation_1 = __importDefault(require("./recipeImplementation/passwordlessImplementation"));
var thirdPartyImplementation_1 = __importDefault(require("./recipeImplementation/thirdPartyImplementation"));
var authWidgetWrapper_1 = __importDefault(require("../authRecipe/authWidgetWrapper"));
var supertokens_js_override_1 = __importDefault(require("supertokens-js-override"));
var userContextWrapper_1 = __importDefault(require("../../usercontext/userContextWrapper"));
var ThirdPartyPasswordless = /** @class */ (function (_super) {
    __extends(ThirdPartyPasswordless, _super);
    function ThirdPartyPasswordless(config, recipes) {
        var _this = _super.call(this, (0, utils_2.normaliseThirdPartyPasswordlessConfig)(config)) || this;
        _this.getFeatures = function () {
            var _a, _b;
            var features = {};
            if (_this.passwordlessRecipe !== undefined) {
                features = __assign(__assign({}, features), _this.passwordlessRecipe.getFeatures());
            }
            if (_this.thirdPartyRecipe !== undefined) {
                features = __assign(__assign({}, features), _this.thirdPartyRecipe.getFeatures());
            }
            if (
                (_this.config.passwordlessUserInput !== undefined &&
                    ((_a = _this.config.passwordlessUserInput.signInUpFeature) === null || _a === void 0
                        ? void 0
                        : _a.disableDefaultUI) !== true) ||
                (_this.config.thirdpartyUserInput !== undefined &&
                    ((_b = _this.config.thirdpartyUserInput.signInAndUpFeature) === null || _b === void 0
                        ? void 0
                        : _b.disableDefaultUI) !== true)
            ) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: (0, utils_1.matchRecipeIdUsingQueryParams)(_this.config.recipeId),
                    component: function (prop) {
                        return _this.getFeatureComponent("signInUp", prop);
                    },
                };
            }
            return __assign({}, features);
        };
        _this.getDefaultRedirectionURL = function (context) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        _this.getFeatureComponent = function (componentName, props) {
            if (componentName === "signInUp") {
                if (props.redirectOnSessionExists !== false) {
                    return (0, jsx_runtime_1.jsx)(
                        userContextWrapper_1.default,
                        __assign(
                            { userContext: props.userContext },
                            {
                                children: (0, jsx_runtime_1.jsx)(
                                    authWidgetWrapper_1.default,
                                    __assign(
                                        { authRecipe: _this, history: props.history },
                                        {
                                            children: (0, jsx_runtime_1.jsx)(
                                                signInAndUp_1.default,
                                                __assign({ recipe: _this }, props)
                                            ),
                                        }
                                    )
                                ),
                            }
                        )
                    );
                } else {
                    return (0, jsx_runtime_1.jsx)(
                        userContextWrapper_1.default,
                        __assign(
                            { userContext: props.userContext },
                            {
                                children: (0, jsx_runtime_1.jsx)(
                                    signInAndUp_1.default,
                                    __assign({ recipe: _this }, props)
                                ),
                            }
                        )
                    );
                }
            } else if (componentName === "linkClickedScreen") {
                if (_this.passwordlessRecipe === undefined) {
                    throw new Error(
                        "Embedding this component requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return _this.passwordlessRecipe.getFeatureComponent(componentName, props);
            } else if (componentName === "signinupcallback") {
                if (_this.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInUpFeature.providers in the configuration."
                    );
                }
                return _this.thirdPartyRecipe.getFeatureComponent(componentName, props);
            } else {
                throw new Error("Should never come here.");
            }
        };
        {
            var builder = new supertokens_js_override_1.default(
                (0, recipeImplementation_1.default)({
                    appInfo: _this.config.appInfo,
                    recipeId: _this.config.recipeId,
                    onHandleEvent: _this.config.onHandleEvent,
                    preAPIHook: _this.config.preAPIHook,
                    postAPIHook: _this.config.postAPIHook,
                })
            );
            _this.recipeImpl = builder.override(_this.config.override.functions).build();
        }
        _this.passwordlessRecipe =
            recipes.passwordlessInstance !== undefined
                ? recipes.passwordlessInstance
                : _this.config.passwordlessUserInput === undefined
                ? undefined
                : new recipe_1.default(
                      __assign(__assign({}, _this.config.passwordlessUserInput), {
                          appInfo: _this.config.appInfo,
                          recipeId: _this.config.recipeId,
                          override: __assign(__assign({}, _this.config.passwordlessUserInput.override), {
                              functions: function () {
                                  return (0, passwordlessImplementation_1.default)(_this.recipeImpl);
                              },
                          }),
                      })
                  );
        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        _this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : _this.config.thirdpartyUserInput === undefined
                ? undefined
                : new recipe_2.default(
                      __assign(__assign({}, _this.config.thirdpartyUserInput), {
                          appInfo: _this.config.appInfo,
                          recipeId: _this.config.recipeId,
                          override: __assign(__assign({}, _this.config.thirdpartyUserInput.override), {
                              functions: function () {
                                  return (0, thirdPartyImplementation_1.default)(_this.recipeImpl);
                              },
                          }),
                      })
                  );
        return _this;
    }
    /*
     * Static methods.
     */
    ThirdPartyPasswordless.init = function (config) {
        return function (appInfo) {
            ThirdPartyPasswordless.instance = new ThirdPartyPasswordless(
                __assign(__assign({}, config), { appInfo: appInfo, recipeId: ThirdPartyPasswordless.RECIPE_ID }),
                {
                    passwordlessInstance: undefined,
                    thirdPartyInstance: undefined,
                }
            );
            return ThirdPartyPasswordless.instance;
        };
    };
    ThirdPartyPasswordless.getInstanceOrThrow = function () {
        if (ThirdPartyPasswordless.instance === undefined) {
            var error =
                "No instance of ThirdPartyPasswordless found. Make sure to call the ThirdPartyPasswordless.init method." +
                "See https://supertokens.io/docs/thirdpartypasswordless/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + constants_1.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdPartyPasswordless.instance;
    };
    /*
     * Tests methods.
     */
    ThirdPartyPasswordless.reset = function () {
        if (!(0, utils_1.isTest)()) {
            return;
        }
        ThirdPartyPasswordless.instance = undefined;
        return;
    };
    ThirdPartyPasswordless.RECIPE_ID = "thirdpartypasswordless";
    return ThirdPartyPasswordless;
})(authRecipe_1.default);
exports.default = ThirdPartyPasswordless;
