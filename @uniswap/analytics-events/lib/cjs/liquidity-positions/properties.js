"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeePoolSelectAction = exports.LiquiditySource = void 0;
var LiquiditySource;
(function (LiquiditySource) {
    LiquiditySource["SUSHISWAP"] = "Sushiswap";
    LiquiditySource["V2"] = "V2";
    LiquiditySource["V3"] = "V3";
})(LiquiditySource = exports.LiquiditySource || (exports.LiquiditySource = {}));
var FeePoolSelectAction;
(function (FeePoolSelectAction) {
    FeePoolSelectAction["MANUAL"] = "Manual";
    FeePoolSelectAction["RECOMMENDED"] = "Recommended";
})(FeePoolSelectAction = exports.FeePoolSelectAction || (exports.FeePoolSelectAction = {}));
