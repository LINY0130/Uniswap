import { Currency, Token } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';
import { Pool as V3Pool } from '@uniswap/v3-sdk';
import { Pool as V4Pool } from '@uniswap/v4-sdk';
import { MixedRoute, SupportedRoutes, V2Route, V3Route, V4Route } from '../../router';
export declare function computeAllV4Routes(tokenIn: Currency, tokenOut: Currency, pools: V4Pool[], maxHops: number): V4Route[];
export declare function computeAllV3Routes(tokenIn: Token, tokenOut: Token, pools: V3Pool[], maxHops: number): V3Route[];
export declare function computeAllV2Routes(tokenIn: Token, tokenOut: Token, pools: Pair[], maxHops: number): V2Route[];
export declare function computeAllMixedRoutes(tokenIn: Token, tokenOut: Token, parts: (V4Pool | V3Pool | Pair)[], maxHops: number): MixedRoute[];
export declare function computeAllRoutes<TPool extends Pair | V3Pool | V4Pool, TRoute extends SupportedRoutes>(tokenIn: Token, tokenOut: Token, buildRoute: (route: TPool[], tokenIn: Token, tokenOut: Token) => TRoute, pools: TPool[], maxHops: number): TRoute[];
