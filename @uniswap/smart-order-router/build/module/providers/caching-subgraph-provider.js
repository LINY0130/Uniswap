import { ChainId } from '@uniswap/sdk-core';
import { WRAPPED_NATIVE_CURRENCY } from '../util';
import { ARB_ARBITRUM, BTC_BNB, BUSD_BNB, CELO, CEUR_CELO, CUSD_CELO, DAI_ARBITRUM, DAI_AVAX, DAI_BNB, DAI_CELO, DAI_MAINNET, DAI_MOONBEAM, DAI_OPTIMISM, ETH_BNB, OP_OPTIMISM, USDB_BLAST, USDCE_ZKSYNC, USDC_ARBITRUM, USDC_AVAX, USDC_BASE, USDC_BNB, USDC_MAINNET, USDC_MOONBEAM, USDC_NATIVE_ARBITRUM, USDC_OPTIMISM, USDC_POLYGON, USDC_ZKSYNC, USDT_ARBITRUM, USDT_BNB, USDT_MAINNET, USDT_OPTIMISM, WBTC_ARBITRUM, WBTC_MAINNET, WBTC_MOONBEAM, WBTC_OPTIMISM, WETH_POLYGON, WMATIC_POLYGON, WSTETH_MAINNET, } from './token-provider';
export const BASES_TO_CHECK_TRADES_AGAINST = {
    [ChainId.MAINNET]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.MAINNET],
        DAI_MAINNET,
        USDC_MAINNET,
        USDT_MAINNET,
        WBTC_MAINNET,
        WSTETH_MAINNET,
    ],
    [ChainId.GOERLI]: [WRAPPED_NATIVE_CURRENCY[ChainId.GOERLI]],
    [ChainId.SEPOLIA]: [WRAPPED_NATIVE_CURRENCY[ChainId.SEPOLIA]],
    //v2 not deployed on [arbitrum, polygon, celo, gnosis, moonbeam, bnb, avalanche] and their testnets
    [ChainId.OPTIMISM]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.OPTIMISM],
        USDC_OPTIMISM,
        DAI_OPTIMISM,
        USDT_OPTIMISM,
        WBTC_OPTIMISM,
        OP_OPTIMISM,
    ],
    [ChainId.ARBITRUM_ONE]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.ARBITRUM_ONE],
        WBTC_ARBITRUM,
        DAI_ARBITRUM,
        USDC_ARBITRUM,
        USDC_NATIVE_ARBITRUM,
        USDT_ARBITRUM,
        ARB_ARBITRUM,
    ],
    [ChainId.ARBITRUM_GOERLI]: [],
    [ChainId.ARBITRUM_SEPOLIA]: [],
    [ChainId.OPTIMISM_GOERLI]: [],
    [ChainId.OPTIMISM_SEPOLIA]: [],
    [ChainId.POLYGON]: [USDC_POLYGON, WETH_POLYGON, WMATIC_POLYGON],
    [ChainId.POLYGON_MUMBAI]: [],
    [ChainId.CELO]: [CELO, CUSD_CELO, CEUR_CELO, DAI_CELO],
    [ChainId.CELO_ALFAJORES]: [],
    [ChainId.GNOSIS]: [],
    [ChainId.MOONBEAM]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.MOONBEAM],
        DAI_MOONBEAM,
        USDC_MOONBEAM,
        WBTC_MOONBEAM,
    ],
    [ChainId.BNB]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.BNB],
        BUSD_BNB,
        DAI_BNB,
        USDC_BNB,
        USDT_BNB,
        BTC_BNB,
        ETH_BNB,
    ],
    [ChainId.AVALANCHE]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.AVALANCHE],
        USDC_AVAX,
        DAI_AVAX,
    ],
    [ChainId.BASE_GOERLI]: [],
    [ChainId.BASE]: [WRAPPED_NATIVE_CURRENCY[ChainId.BASE], USDC_BASE],
    [ChainId.ZORA]: [WRAPPED_NATIVE_CURRENCY[ChainId.ZORA]],
    [ChainId.ZORA_SEPOLIA]: [WRAPPED_NATIVE_CURRENCY[ChainId.ZORA_SEPOLIA]],
    [ChainId.ROOTSTOCK]: [WRAPPED_NATIVE_CURRENCY[ChainId.ROOTSTOCK]],
    [ChainId.BLAST]: [WRAPPED_NATIVE_CURRENCY[ChainId.BLAST], USDB_BLAST],
    [ChainId.ZKSYNC]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.ZKSYNC],
        USDCE_ZKSYNC,
        USDC_ZKSYNC,
    ],
};
export class CachingSubgraphProvider {
    /**
     * Creates an instance of CachingV3SubgraphProvider.
     * @param chainId The chain id to use.
     * @param subgraphProvider The provider to use to get the subgraph pools when not in the cache.
     * @param cache Cache instance to hold cached pools.
     * @param protocol Subgraph protocol version
     */
    constructor(chainId, subgraphProvider, cache, protocol) {
        this.chainId = chainId;
        this.subgraphProvider = subgraphProvider;
        this.cache = cache;
        this.protocol = protocol;
        this.SUBGRAPH_KEY = (chainId) => `subgraph-pools-${this.protocol}-${chainId}`;
    }
    async getPools() {
        const cachedPools = await this.cache.get(this.SUBGRAPH_KEY(this.chainId));
        if (cachedPools) {
            return cachedPools;
        }
        const pools = await this.subgraphProvider.getPools();
        await this.cache.set(this.SUBGRAPH_KEY(this.chainId), pools);
        return pools;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGluZy1zdWJncmFwaC1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm92aWRlcnMvY2FjaGluZy1zdWJncmFwaC1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsT0FBTyxFQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFHbkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBSWxELE9BQU8sRUFDTCxZQUFZLEVBQ1osT0FBTyxFQUNQLFFBQVEsRUFDUixJQUFJLEVBQ0osU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBQ1osUUFBUSxFQUNSLE9BQU8sRUFDUCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFlBQVksRUFDWixZQUFZLEVBQ1osT0FBTyxFQUNQLFdBQVcsRUFDWCxVQUFVLEVBQ1YsWUFBWSxFQUNaLGFBQWEsRUFDYixTQUFTLEVBQ1QsU0FBUyxFQUNULFFBQVEsRUFDUixZQUFZLEVBQ1osYUFBYSxFQUNiLG9CQUFvQixFQUNwQixhQUFhLEVBQ2IsWUFBWSxFQUNaLFdBQVcsRUFDWCxhQUFhLEVBQ2IsUUFBUSxFQUNSLFlBQVksRUFDWixhQUFhLEVBQ2IsYUFBYSxFQUNiLFlBQVksRUFDWixhQUFhLEVBQ2IsYUFBYSxFQUNiLFlBQVksRUFDWixjQUFjLEVBQ2QsY0FBYyxHQUNmLE1BQU0sa0JBQWtCLENBQUM7QUFPMUIsTUFBTSxDQUFDLE1BQU0sNkJBQTZCLEdBQW1CO0lBQzNELENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2pCLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUU7UUFDekMsV0FBVztRQUNYLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLGNBQWM7S0FDZjtJQUNELENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBRSxDQUFDO0lB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