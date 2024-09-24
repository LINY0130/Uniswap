"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeAmountsToString = exports.routeToString = exports.poolToString = exports.routeToPools = exports.routeToTokens = void 0;
const router_sdk_1 = require("@uniswap/router-sdk");
const sdk_core_1 = require("@uniswap/sdk-core");
const v2_sdk_1 = require("@uniswap/v2-sdk");
const v3_sdk_1 = require("@uniswap/v3-sdk");
const v4_sdk_1 = require("@uniswap/v4-sdk");
const lodash_1 = __importDefault(require("lodash"));
const addresses_1 = require("./addresses");
const _1 = require(".");
const routeToTokens = (route) => {
    switch (route.protocol) {
        case router_sdk_1.Protocol.V4:
            return route.currencyPath;
        case router_sdk_1.Protocol.V3:
            return route.tokenPath;
        case router_sdk_1.Protocol.V2:
        case router_sdk_1.Protocol.MIXED:
            return route.path;
        default:
            throw new Error(`Unsupported route ${JSON.stringify(route)}`);
    }
};
exports.routeToTokens = routeToTokens;
const routeToPools = (route) => {
    switch (route.protocol) {
        case router_sdk_1.Protocol.V4:
        case router_sdk_1.Protocol.V3:
        case router_sdk_1.Protocol.MIXED:
            return route.pools;
        case router_sdk_1.Protocol.V2:
            return route.pairs;
        default:
            throw new Error(`Unsupported route ${JSON.stringify(route)}`);
    }
};
exports.routeToPools = routeToPools;
const poolToString = (pool) => {
    if (pool instanceof v4_sdk_1.Pool) {
        return ` -- ${pool.fee / 10000}% [${v4_sdk_1.Pool.getPoolId(pool.token0, pool.token1, pool.fee, 0, router_sdk_1.ADDRESS_ZERO)}]`;
    }
    else if (pool instanceof v3_sdk_1.Pool) {
        return ` -- ${pool.fee / 10000}% [${v3_sdk_1.Pool.getAddress(pool.token0, pool.token1, pool.fee, undefined, addresses_1.V3_CORE_FACTORY_ADDRESSES[pool.chainId])}]`;
    }
    else if (pool instanceof v2_sdk_1.Pair) {
        return ` -- [${v2_sdk_1.Pair.getAddress(pool.token0, pool.token1)}]`;
    }
    else {
        throw new Error(`Unsupported pool ${JSON.stringify(pool)}`);
    }
};
exports.poolToString = poolToString;
const routeToString = (route) => {
    const routeStr = [];
    const tokens = (0, exports.routeToTokens)(route);
    const tokenPath = lodash_1.default.map(tokens, (token) => `${token.symbol}`);
    const pools = (0, exports.routeToPools)(route);
    const poolFeePath = lodash_1.default.map(pools, (pool) => {
        if (pool instanceof v2_sdk_1.Pair) {
            return ` -- [${v2_sdk_1.Pair.getAddress(pool.token0, pool.token1)}]`;
        }
        else if (pool instanceof v3_sdk_1.Pool) {
            return ` -- ${pool.fee / 10000}% [${v3_sdk_1.Pool.getAddress(pool.token0, pool.token1, pool.fee, undefined, addresses_1.V3_CORE_FACTORY_ADDRESSES[pool.chainId])}]`;
        }
        else if (pool instanceof v4_sdk_1.Pool) {
            return ` -- ${pool.fee / 10000}% [${v4_sdk_1.Pool.getPoolId(pool.token0, pool.token1, pool.fee, 0, router_sdk_1.ADDRESS_ZERO)}]`;
        }
        else {
            throw new Error(`Unsupported pool ${JSON.stringify(pool)}`);
        }
        return `${(0, exports.poolToString)(pool)} --> `;
    });
    for (let i = 0; i < tokenPath.length; i++) {
        routeStr.push(tokenPath[i]);
        if (i < poolFeePath.length) {
            routeStr.push(poolFeePath[i]);
        }
    }
    return routeStr.join('');
};
exports.routeToString = routeToString;
const routeAmountsToString = (routeAmounts) => {
    const total = lodash_1.default.reduce(routeAmounts, (total, cur) => {
        return total.add(cur.amount);
    }, _1.CurrencyAmount.fromRawAmount(routeAmounts[0].amount.currency, 0));
    const routeStrings = lodash_1.default.map(routeAmounts, ({ protocol, route, amount }) => {
        const portion = amount.divide(total);
        const percent = new sdk_core_1.Percent(portion.numerator, portion.denominator);
        /// @dev special case for MIXED routes we want to show user friendly V2+V3 instead
        return `[${protocol == router_sdk_1.Protocol.MIXED ? 'V2 + V3' : protocol}] ${percent.toFixed(2)}% = ${(0, exports.routeToString)(route)}`;
    });
    return lodash_1.default.join(routeStrings, ', ');
};
exports.routeAmountsToString = routeAmountsToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWwvcm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUE2RDtBQUM3RCxnREFBc0Q7QUFDdEQsNENBQXVDO0FBQ3ZDLDRDQUFpRDtBQUNqRCw0Q0FBaUQ7QUFDakQsb0RBQXVCO0FBS3ZCLDJDQUF3RDtBQUV4RCx3QkFBbUM7QUFFNUIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxLQUFzQixFQUFjLEVBQUU7SUFDbEUsUUFBUSxLQUFLLENBQUMsUUFBUSxFQUFFO1FBQ3RCLEtBQUsscUJBQVEsQ0FBQyxFQUFFO1lBQ2QsT0FBTyxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQzVCLEtBQUsscUJBQVEsQ0FBQyxFQUFFO1lBQ2QsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3pCLEtBQUsscUJBQVEsQ0FBQyxFQUFFLENBQUM7UUFDakIsS0FBSyxxQkFBUSxDQUFDLEtBQUs7WUFDakIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3BCO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDakU7QUFDSCxDQUFDLENBQUM7QUFaVyxRQUFBLGFBQWEsaUJBWXhCO0FBRUssTUFBTSxZQUFZLEdBQUcsQ0FDMUIsS0FBc0IsRUFDTSxFQUFFO0lBQzlCLFFBQVEsS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUN0QixLQUFLLHFCQUFRLENBQUMsRUFBRSxDQUFDO1FBQ2pCLEtBQUsscUJBQVEsQ0FBQyxFQUFFLENBQUM7UUFDakIsS0FBSyxxQkFBUSxDQUFDLEtBQUs7WUFDakIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3JCLEtBQUsscUJBQVEsQ0FBQyxFQUFFO1lBQ2QsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3JCO1lBQ0UsTUFBTSxJQUFJLEtB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