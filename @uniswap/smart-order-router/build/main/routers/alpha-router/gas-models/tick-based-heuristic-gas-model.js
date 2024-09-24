"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickBasedHeuristicGasModelFactory = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const sdk_core_1 = require("@uniswap/sdk-core");
const util_1 = require("../../../util");
const gas_factory_helpers_1 = require("../../../util/gas-factory-helpers");
const gas_costs_1 = require("./gas-costs");
const gas_model_1 = require("./gas-model");
class TickBasedHeuristicGasModelFactory extends gas_model_1.IOnChainGasModelFactory {
    constructor(provider) {
        super();
        this.provider = provider;
    }
    async buildGasModelInternal({ chainId, gasPriceWei, pools, amountToken, quoteToken, l2GasDataProvider, providerConfig, }) {
        const l2GasData = l2GasDataProvider
            ? await l2GasDataProvider.getGasData(providerConfig)
            : undefined;
        const usdPool = pools.usdPool;
        const calculateL1GasFees = async (route) => {
            return await (0, gas_factory_helpers_1.calculateL1GasFeesHelper)(route, chainId, usdPool, quoteToken, pools.nativeAndQuoteTokenV3Pool, this.provider, l2GasData);
        };
        const nativeCurrency = util_1.WRAPPED_NATIVE_CURRENCY[chainId];
        let nativeAmountPool = null;
        if (!amountToken.equals(nativeCurrency)) {
            nativeAmountPool = pools.nativeAndAmountTokenV3Pool;
        }
        const usdToken = usdPool.token0.equals(nativeCurrency)
            ? usdPool.token1
            : usdPool.token0;
        const estimateGasCost = (routeWithValidQuote) => {
            var _a;
            const { totalGasCostNativeCurrency, baseGasUse } = this.estimateGas(routeWithValidQuote, gasPriceWei, chainId, providerConfig);
            /** ------ MARK: USD logic  -------- */
            // We only need to go through V2 and V3 USD pools for now,
            // because v4 pools don't have deep liquidity yet.
            // If one day, we see v3 usd pools have much deeper liquidity than v2/v3 usd pools, then we will add v4 pools for gas cost
            const gasCostInTermsOfUSD = (0, gas_model_1.getQuoteThroughNativePool)(chainId, totalGasCostNativeCurrency, usdPool);
            /** ------ MARK: Conditional logic run if gasToken is specified  -------- */
            const nativeAndSpecifiedGasTokenPool = pools.nativeAndSpecifiedGasTokenV3Pool;
            let gasCostInTermsOfGasToken = undefined;
            // we don't want to fetch the gasToken pool if the gasToken is the native currency
            if (nativeAndSpecifiedGasTokenPool) {
                // We only need to go through V2 and V3 USD pools for now,
                // because v4 pools don't have deep liquidity yet.
                // If one day, we see v3 usd pools have much deeper liquidity than v2/v3 usd pools, then we will add v4 pools for gas cost
                gasCostInTermsOfGasToken = (0, gas_model_1.getQuoteThroughNativePool)(chainId, totalGasCostNativeCurrency, nativeAndSpecifiedGasTokenPool);
            }
            // if the gasToken is the native currency, we can just use the totalGasCostNativeCurrency
            else if ((_a = providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.gasToken) === null || _a === void 0 ? void 0 : _a.equals(nativeCurrency)) {
                gasCostInTermsOfGasToken = totalGasCostNativeCurrency;
            }
            /** ------ MARK: return early if quoteToken is wrapped native currency ------- */
            if (quoteToken.equals(nativeCurrency)) {
                return {
                    gasEstimate: baseGasUse,
                    gasCostInToken: totalGasCostNativeCurrency,
                    gasCostInUSD: gasCostInTermsOfUSD,
                    gasCostInGasToken: gasCostInTermsOfGasToken,
                };
            }
            /** ------ MARK: Main gas logic in terms of quote token -------- */
            // Since the quote token is not in the native currency, we convert the gas cost to be in terms of the quote token.
            // We do this by getting the highest liquidity <quoteToken>/<nativeCurrency> pool. eg. <quoteToken>/ETH pool.
            const nativeAndQuoteTokenPool = pools.nativeAndQuoteTokenV3Pool;
            let gasCostInTermsOfQuoteToken = null;
            if (nativeAndQuoteTokenPool) {
                // We only need to go through V2 and V3 USD pools for now,
                // because v4 pools don't have deep liquidity yet.
                // If one day, we see v3 usd pools have much deeper liquidity than v2/v3 usd pools, then we will add v4 pools for gas cost
                gasCostInTermsOfQuoteToken = (0, gas_model_1.getQuoteThroughNativePool)(chainId, totalGasCostNativeCurrency, nativeAndQuoteTokenPool);
            }
            // We may have a nativeAmountPool, but not a nativePool
            else {
                util_1.log.info(`Unable to find ${nativeCurrency.symbol} pool with the quote token, ${quoteToken.symbol} to produce gas adjusted costs. Using amountToken to calculate gas costs.`);
            }
            /** ------ MARK: (V3 and V4 ONLY) Logic for calculating synthetic gas cost in terms of amount token -------- */
            // TODO: evaluate effectiveness and potentially refactor
            // Highest liquidity pool for the non quote token / ETH
            // A pool with the non quote token / ETH should not be required and errors should be handled separately
            if (nativeAmountPool) {
                // get current execution price (amountToken / quoteToken)
                const executionPrice = new sdk_core_1.Price(routeWithValidQuote.amount.currency, routeWithValidQuote.quote.currency, routeWithValidQuote.amount.quotient, routeWithValidQuote.quote.quotient);
                const inputIsToken0 = nativeAmountPool.token0.address == nativeCurrency.address;
                // ratio of input / native
                const nativeAndAmountTokenPrice = inputIsToken0
                    ? nativeAmountPool.token0Price
                    : nativeAmountPool.token1Price;
                const gasCostInTermsOfAmountToken = nativeAndAmountTokenPrice.quote(totalGasCostNativeCurrency);
                // Convert gasCostInTermsOfAmountToken to quote token using execution price
                const syntheticGasCostInTermsOfQuoteToken = executionPrice.quote(gasCostInTermsOfAmountToken);
                // Note that the syntheticGasCost being lessThan the original quoted value is not always strictly better
                // e.g. the scenario where the amountToken/ETH pool is very illiquid as well and returns an extremely small number
                // however, it is better to have the gasEstimation be almost 0 than almost infinity, as the user will still receive a quote
                if (gasCostInTermsOfQuoteToken === null ||
                    syntheticGasCostInTermsOfQuoteToken.lessThan(gasCostInTermsOfQuoteToken.asFraction)) {
                    util_1.log.info({
                        nativeAndAmountTokenPrice: nativeAndAmountTokenPrice.toSignificant(6),
                        gasCostInTermsOfQuoteToken: gasCostInTermsOfQuoteToken
                            ? gasCostInTermsOfQuoteToken.toExact()
                            : 0,
                        gasCostInTermsOfAmountToken: gasCostInTermsOfAmountToken.toExact(),
                        executionPrice: executionPrice.toSignificant(6),
                        syntheticGasCostInTermsOfQuoteToken: syntheticGasCostInTermsOfQuoteToken.toSignificant(6),
                    }, 'New gasCostInTermsOfQuoteToken calculated with synthetic quote token price is less than original');
                    gasCostInTermsOfQuoteToken = syntheticGasCostInTermsOfQuoteToken;
                }
            }
            // If gasCostInTermsOfQuoteToken is null, both attempts to calculate gasCostInTermsOfQuoteToken failed (nativePool and amountNativePool)
            if (gasCostInTermsOfQuoteToken === null) {
                util_1.log.info(`Unable to find ${nativeCurrency.symbol} pool with the quote token, ${quoteToken.symbol}, or amount Token, ${amountToken.symbol} to produce gas adjusted costs. Route will not account for gas.`);
                return {
                    gasEstimate: baseGasUse,
                    gasCostInToken: util_1.CurrencyAmount.fromRawAmount(quoteToken, 0),
                    gasCostInUSD: util_1.CurrencyAmount.fromRawAmount(usdToken, 0),
                };
            }
            return {
                gasEstimate: baseGasUse,
                gasCostInToken: gasCostInTermsOfQuoteToken,
                gasCostInUSD: gasCostInTermsOfUSD,
                gasCostInGasToken: gasCostInTermsOfGasToken,
            };
        };
        return {
            estimateGasCost: estimateGasCost.bind(this),
            calculateL1GasFees,
        };
    }
    estimateGas(routeWithValidQuote, gasPriceWei, chainId, providerConfig) {
        var _a;
        const totalInitializedTicksCrossed = this.totalInitializedTicksCrossed(routeWithValidQuote.initializedTicksCrossedList);
        const totalHops = bignumber_1.BigNumber.from(routeWithValidQuote.route.pools.length);
        let hopsGasUse = (0, gas_costs_1.COST_PER_HOP)(chainId).mul(totalHops);
        // We have observed that this algorithm tends to underestimate single hop swaps.
        // We add a buffer in the case of a single hop swap.
        if (totalHops.eq(1)) {
            hopsGasUse = hopsGasUse.add((0, gas_costs_1.SINGLE_HOP_OVERHEAD)(chainId));
        }
        // Some tokens have extremely expensive transferFrom functions, which causes
        // us to underestimate them by a large amount. For known tokens, we apply an
        // adjustment.
        const tokenOverhead = (0, gas_costs_1.TOKEN_OVERHEAD)(chainId, routeWithValidQuote.route);
        const tickGasUse = (0, gas_costs_1.COST_PER_INIT_TICK)(chainId).mul(totalInitializedTicksCrossed);
        const uninitializedTickGasUse = gas_costs_1.COST_PER_UNINIT_TICK.mul(0);
        /*
        // Eventually we can just use the quoter gas estimate for the base gas use
        // It will be more accurate than doing the offchain gas estimate like below
        // It will become more critical when we are going to support v4 hookful routing,
        // where we have no idea how much gas the hook(s) will cost.
        // const baseGasUse = routeWithValidQuote.quoterGasEstimate
        */
        // base estimate gas used based on chainId estimates for hops and ticks gas useage
        const baseGasUse = (0, gas_costs_1.BASE_SWAP_COST)(chainId)
            .add(hopsGasUse)
            .add(tokenOverhead)
            .add(tickGasUse)
            .add(uninitializedTickGasUse)
            .add((_a = providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.additionalGasOverhead) !== null && _a !== void 0 ? _a : bignumber_1.BigNumber.from(0));
        const baseGasCostWei = gasPriceWei.mul(baseGasUse);
        const wrappedCurrency = util_1.WRAPPED_NATIVE_CURRENCY[chainId];
        const totalGasCostNativeCurrency = util_1.CurrencyAmount.fromRawAmount(wrappedCurrency, baseGasCostWei.toString());
        return {
            totalGasCostNativeCurrency,
            totalInitializedTicksCrossed,
            baseGasUse,
        };
    }
}
exports.TickBasedHeuristicGasModelFactory = TickBasedHeuristicGasModelFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGljay1iYXNlZC1oZXVyaXN0aWMtZ2FzLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3JvdXRlcnMvYWxwaGEtcm91dGVyL2dhcy1tb2RlbHMvdGljay1iYXNlZC1oZXVyaXN0aWMtZ2FzLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFxRDtBQUVyRCxnREFBbUQ7QUFFbkQsd0NBQTZFO0FBQzdFLDJFQUE2RTtBQUU3RSwyQ0FPcUI7QUFDckIsMkNBTXFCO0FBRXJCLE1BQXNCLGlDQUVwQixTQUFRLG1DQUE2QztJQUdyRCxZQUFzQixRQUFzQjtRQUMxQyxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFUyxLQUFLLENBQUMscUJBQXFCLENBQUMsRUFDcEMsT0FBTyxFQUNQLFdBQVcsRUFDWCxLQUFLLEVBQ0wsV0FBVyxFQUNYLFVBQVUsRUFDVixpQkFBaUIsRUFDakIsY0FBYyxHQUNrQjtRQUdoQyxNQUFNLFNBQVMsR0FBRyxpQkFBaUI7WUFDakMsQ0FBQyxDQUFDLE1BQU0saUJBQWlCLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQztZQUNwRCxDQUFDLENBQUMsU0FBUyxDQUFDO1FBRWQsTUFBTSxPQUFPLEdBQVMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUVwQyxNQUFNLGtCQUFrQixHQUFHLEtBQUssRUFDOUIsS0FBNkIsRUFNNUIsRUFBRTtZQUNILE9BQU8sTUFBTSxJQUFBLDhDQUF3QixFQUNuQyxLQUFLLEVBQ0wsT0FBTyxFQUNQLE9BQU8sRUFDUCxVQUFVLEVBQ1YsS0FBSyxDQUFDLHlCQUF5QixFQUMvQixJQUFJLENBQUMsUUFBUSxFQUNiLFNBQVMsQ0FDVixDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBRUYsTUFBTSxjQUFjLEdBQUcsOEJBQXVCLENBQUMsT0FBTyxDQUFFLENBQUM7UUFDekQsSUFBSSxn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