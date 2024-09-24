import { BigNumber } from '@ethersproject/bignumber';
import { Price } from '@uniswap/sdk-core';
import { CurrencyAmount, log, WRAPPED_NATIVE_CURRENCY } from '../../../util';
import { calculateL1GasFeesHelper } from '../../../util/gas-factory-helpers';
import { BASE_SWAP_COST, COST_PER_HOP, COST_PER_INIT_TICK, COST_PER_UNINIT_TICK, SINGLE_HOP_OVERHEAD, TOKEN_OVERHEAD, } from './gas-costs';
import { getQuoteThroughNativePool, IOnChainGasModelFactory, } from './gas-model';
export class TickBasedHeuristicGasModelFactory extends IOnChainGasModelFactory {
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
            return await calculateL1GasFeesHelper(route, chainId, usdPool, quoteToken, pools.nativeAndQuoteTokenV3Pool, this.provider, l2GasData);
        };
        const nativeCurrency = WRAPPED_NATIVE_CURRENCY[chainId];
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
            const gasCostInTermsOfUSD = getQuoteThroughNativePool(chainId, totalGasCostNativeCurrency, usdPool);
            /** ------ MARK: Conditional logic run if gasToken is specified  -------- */
            const nativeAndSpecifiedGasTokenPool = pools.nativeAndSpecifiedGasTokenV3Pool;
            let gasCostInTermsOfGasToken = undefined;
            // we don't want to fetch the gasToken pool if the gasToken is the native currency
            if (nativeAndSpecifiedGasTokenPool) {
                // We only need to go through V2 and V3 USD pools for now,
                // because v4 pools don't have deep liquidity yet.
                // If one day, we see v3 usd pools have much deeper liquidity than v2/v3 usd pools, then we will add v4 pools for gas cost
                gasCostInTermsOfGasToken = getQuoteThroughNativePool(chainId, totalGasCostNativeCurrency, nativeAndSpecifiedGasTokenPool);
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
                gasCostInTermsOfQuoteToken = getQuoteThroughNativePool(chainId, totalGasCostNativeCurrency, nativeAndQuoteTokenPool);
            }
            // We may have a nativeAmountPool, but not a nativePool
            else {
                log.info(`Unable to find ${nativeCurrency.symbol} pool with the quote token, ${quoteToken.symbol} to produce gas adjusted costs. Using amountToken to calculate gas costs.`);
            }
            /** ------ MARK: (V3 and V4 ONLY) Logic for calculating synthetic gas cost in terms of amount token -------- */
            // TODO: evaluate effectiveness and potentially refactor
            // Highest liquidity pool for the non quote token / ETH
            // A pool with the non quote token / ETH should not be required and errors should be handled separately
            if (nativeAmountPool) {
                // get current execution price (amountToken / quoteToken)
                const executionPrice = new Price(routeWithValidQuote.amount.currency, routeWithValidQuote.quote.currency, routeWithValidQuote.amount.quotient, routeWithValidQuote.quote.quotient);
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
                    log.info({
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
                log.info(`Unable to find ${nativeCurrency.symbol} pool with the quote token, ${quoteToken.symbol}, or amount Token, ${amountToken.symbol} to produce gas adjusted costs. Route will not account for gas.`);
                return {
                    gasEstimate: baseGasUse,
                    gasCostInToken: CurrencyAmount.fromRawAmount(quoteToken, 0),
                    gasCostInUSD: CurrencyAmount.fromRawAmount(usdToken, 0),
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
        const totalHops = BigNumber.from(routeWithValidQuote.route.pools.length);
        let hopsGasUse = COST_PER_HOP(chainId).mul(totalHops);
        // We have observed that this algorithm tends to underestimate single hop swaps.
        // We add a buffer in the case of a single hop swap.
        if (totalHops.eq(1)) {
            hopsGasUse = hopsGasUse.add(SINGLE_HOP_OVERHEAD(chainId));
        }
        // Some tokens have extremely expensive transferFrom functions, which causes
        // us to underestimate them by a large amount. For known tokens, we apply an
        // adjustment.
        const tokenOverhead = TOKEN_OVERHEAD(chainId, routeWithValidQuote.route);
        const tickGasUse = COST_PER_INIT_TICK(chainId).mul(totalInitializedTicksCrossed);
        const uninitializedTickGasUse = COST_PER_UNINIT_TICK.mul(0);
        /*
        // Eventually we can just use the quoter gas estimate for the base gas use
        // It will be more accurate than doing the offchain gas estimate like below
        // It will become more critical when we are going to support v4 hookful routing,
        // where we have no idea how much gas the hook(s) will cost.
        // const baseGasUse = routeWithValidQuote.quoterGasEstimate
        */
        // base estimate gas used based on chainId estimates for hops and ticks gas useage
        const baseGasUse = BASE_SWAP_COST(chainId)
            .add(hopsGasUse)
            .add(tokenOverhead)
            .add(tickGasUse)
            .add(uninitializedTickGasUse)
            .add((_a = providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.additionalGasOverhead) !== null && _a !== void 0 ? _a : BigNumber.from(0));
        const baseGasCostWei = gasPriceWei.mul(baseGasUse);
        const wrappedCurrency = WRAPPED_NATIVE_CURRENCY[chainId];
        const totalGasCostNativeCurrency = CurrencyAmount.fromRawAmount(wrappedCurrency, baseGasCostWei.toString());
        return {
            totalGasCostNativeCurrency,
            totalInitializedTicksCrossed,
            baseGasUse,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGljay1iYXNlZC1oZXVyaXN0aWMtZ2FzLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3JvdXRlcnMvYWxwaGEtcm91dGVyL2dhcy1tb2RlbHMvdGljay1iYXNlZC1oZXVyaXN0aWMtZ2FzLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVyRCxPQUFPLEVBQVcsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFN0UsT0FBTyxFQUNMLGNBQWMsRUFDZCxZQUFZLEVBQ1osa0JBQWtCLEVBQ2xCLG9CQUFvQixFQUNwQixtQkFBbUIsRUFDbkIsY0FBYyxHQUNmLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFHTCx5QkFBeUIsRUFFekIsdUJBQXVCLEdBQ3hCLE1BQU0sYUFBYSxDQUFDO0FBRXJCLE1BQU0sT0FBZ0IsaUNBRXBCLFNBQVEsdUJBQTZDO0lBR3JELFlBQXNCLFFBQXNCO1FBQzFDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVTLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxFQUNwQyxPQUFPLEVBQ1AsV0FBVyxFQUNYLEtBQUssRUFDTCxXQUFXLEVBQ1gsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixjQUFjLEdBQ2tCO1FBR2hDLE1BQU0sU0FBUyxHQUFHLGlCQUFpQjtZQUNqQyxDQUFDLENBQUMsTUFBTSxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO1lBQ3BELENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFZCxNQUFNLE9BQU8sR0FBUyxL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