/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Contract, utils } from "ethers";
const _abi = [
    {
        type: "constructor",
        inputs: [
            {
                name: "_poolManager",
                type: "address",
                internalType: "contract IPoolManager",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "_quoteExactInput",
        inputs: [
            {
                name: "params",
                type: "tuple",
                internalType: "struct IQuoter.QuoteExactParams",
                components: [
                    {
                        name: "exactCurrency",
                        type: "address",
                        internalType: "Currency",
                    },
                    {
                        name: "path",
                        type: "tuple[]",
                        internalType: "struct PathKey[]",
                        components: [
                            {
                                name: "intermediateCurrency",
                                type: "address",
                                internalType: "Currency",
                            },
                            {
                                name: "fee",
                                type: "uint24",
                                internalType: "uint24",
                            },
                            {
                                name: "tickSpacing",
                                type: "int24",
                                internalType: "int24",
                            },
                            {
                                name: "hooks",
                                type: "address",
                                internalType: "contract IHooks",
                            },
                            {
                                name: "hookData",
                                type: "bytes",
                                internalType: "bytes",
                            },
                        ],
                    },
                    {
                        name: "exactAmount",
                        type: "uint128",
                        internalType: "uint128",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "_quoteExactInputSingle",
        inputs: [
            {
                name: "params",
                type: "tuple",
                internalType: "struct IQuoter.QuoteExactSingleParams",
                components: [
                    {
                        name: "poolKey",
                        type: "tuple",
                        internalType: "struct PoolKey",
                        components: [
                            {
                                name: "currency0",
                                type: "address",
                                internalType: "Currency",
                            },
                            {
                                name: "currency1",
                                type: "address",
                                internalType: "Currency",
                            },
                            {
                                name: "fee",
                                type: "uint24",
                                internalType: "uint24",
                            },
                            {
                                name: "tickSpacing",
                                type: "int24",
                                internalType: "int24",
                            },
                            {
                                name: "hooks",
                                type: "address",
                                internalType: "contract IHooks",
                            },
                        ],
                    },
                    {
                        name: "zeroForOne",
                        type: "bool",
                        internalType: "bool",
                    },
                    {
                        name: "exactAmount",
                        type: "uint128",
                        internalType: "uint128",
                    },
                    {
                        name: "sqrtPriceLimitX96",
                        type: "uint160",
                        internalType: "uint160",
                    },
                    {
                        name: "hookData",
                        type: "bytes",
                        internalType: "bytes",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "_quoteExactOutput",
        inputs: [
            {
                name: "params",
                type: "tuple",
                internalType: "struct IQuoter.QuoteExactParams",
                components: [
                    {
                        name: "exactCurrency",
                        type: "address",
                        internalType: "Currency",
                    },
                    {
                        name: "path",
                        type: "tuple[]",
                        internalType: "struct PathKey[]",
                        components: [
                            {
                                name: "intermediateCurrency",
                                type: "address",
                                internalType: "Currency",
                            },
                            {
                                name: "fee",
                                type: "uint24",
                                internalType: "uint24",
                            },
                            {
                                name: "tickSpacing",
                                type: "int24",
                                internalType: "int24",
                            },
                            {
                                name: "hooks",
                                type: "address",
                                internalType: "contract IHooks",
                            },
                            {
                                name: "hookData",
                                type: "bytes",
                                internalType: "bytes",
                            },
                        ],
                    },
                    {
                        name: "exactAmount",
                        type: "uint128",
                        internalType: "uint128",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "_quoteExactOutputSingle",
        inputs: [
            {
                name: "params",
                type: "tuple",
                internalType: "struct IQuoter.QuoteExactSingleParams",
                components: [
                    {
                        name: "poolKey",
                        type: "tuple",
                        internalType: "struct PoolKey",
                        components: [
                            {
                                name: "currency0",
                                type: "address",
                                internalType: "Currency",
                            },
                            {
                                name: "currency1",
                                type: "address",
                                internalType: "Currency",
                            },
                            {
                                name: "fee",
                                type: "uint24",
                                internalType: "uint24",
                            },
                            {
                                name: "tickSpacing",
                                type: "int24",
                                internalType: "int24",
                            },
                            {
                                name: "hooks",
                                type: "address",
                                internalType: "contract IHooks",
                            },
                        ],
                    },
                    {
                        name: "zeroForOne",
                        type: "bool",
                        internalType: "bool",
                    },
                    {
                        name: "exactAmount",
                        type: "uint128",
                        internalType: "uint128",
                    },
                    {
                        name: "sqrtPriceLimitX96",
                        type: "uint160",
                        internalType: "uint160",
                    },
                    {
                        name: "hookData",
                        type: "bytes",
                        internalType: "bytes",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "poolManager",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "address",
                internalType: "contract IPoolManager",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "quoteExactInput",
        inputs: [
            {
                name: "params",
                type: "tuple",
                internalType: "struct IQuoter.QuoteExactParams",
                components: [
                    {
                        name: "exactCurrency",
                        type: "address",
                        internalType: "Currency",
                    },
                    {
                        name: "path",
                        type: "tuple[]",
                        internalType: "struct PathKey[]",
                        components: [
                            {
                                name: "intermediateCurrency",
                                type: "address",
                                internalType: "Currency",
                            },
                            {
                                name: "fee",
                                type: "uint24",
                                internalType: "uint24",
                            },
                            {
                                name: "tickSpacing",
                                type: "int24",
                                internalType: "int24",
                            },
                            {
                                name: "hooks",
                                type: "address",
                                internalType: "contract IHooks",
                            },
                            {
                                name: "hookData",
                                type: "bytes",
                                internalType: "bytes",
                            },
                        ],
                    },
                    {
                        name: "exactAmount",
                        type: "uint128",
                        internalType: "uint128",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "deltaAmounts",
                type: "int128[]",
                internalType: "int128[]",
            },
            {
                name: "sqrtPriceX96AfterList",
                type: "uint160[]",
                internalType: "uint160[]",
            },
            {
                name: "initializedTicksLoadedList",
                type: "uint32[]",
                internalType: "uint32[]",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "quoteExactInputSingle",
        inputs: [
            {
                name: "params",
                type: "tuple",
                internalType: "struct IQuoter.QuoteExactSingleParams",
                components: [
                    {
                        name: "poolKey",
                        type: "tuple",
                        internalType: "struct PoolKey",
                        components: [
                            {
                                name: "currency0",
                                type: "address",
                                internalType: "Currency",
                            },
                            {
                                name: "currency1",
                                type: "address",
                                internalType: "Currency",
                            },
                            {
                                name: "fee",
                                type: "uint24",
                                internalType: "uint24",
                            },
                            {
                                name: "tickSpacing",
                                type: "int24",
                                internalType: "int24",
                            },
                            {
                                name: "hooks",
                                type: "address",
                                internalType: "contract IHooks",
                            },
                        ],
                    },
                    {
                        name: "zeroForOne",
                        type: "bool",
                        internalType: "bool",
                    },
                    {
                        name: "exactAmount",
                        type: "uint128",
                        internalType: "uint128",
                    },
                    {
                        name: "sqrtPriceLimitX96",
                        type: "uint160",
                        internalType: "uint160",
                    },
                    {
                        name: "hookData",
                        type: "bytes",
                        internalType: "bytes",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "deltaAmounts",
                type: "int128[]",
                internalType: "int128[]",
            },
            {
                name: "sqrtPriceX96After",
                type: "uint160",
                internalType: "uint160",
            },
            {
                name: "initializedTicksLoaded",
                type: "uint32",
                internalType: "uint32",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "quoteExactOutput",
        inputs: [
            {
                name: "params",
                type: "tuple",
                internalType: "struct IQuoter.QuoteExactParams",
                components: [
                    {
                        name: "exactCurrency",
                        type: "address",
                        internalType: "Currency",
                    },
                    {
                        name: "path",
                        type: "tuple[]",
                        internalType: "struct PathKey[]",
                        components: [
                            {
                                name: "intermediateCurrency",
                                type: "address",
                                internalType: "Currency",
                            },
                            {
                                name: "fee",
                                type: "uint24",
                                internalType: "uint24",
                            },
                            {
                                name: "tickSpacing",
                                type: "int24",
                                internalType: "int24",
                            },
                            {
                                name: "hooks",
                                type: "address",
                                internalType: "contract IHooks",
                            },
                            {
                                name: "hookData",
                                type: "bytes",
                                internalType: "bytes",
                            },
                        ],
                    },
                    {
                        name: "exactAmount",
                        type: "uint128",
                        internalType: "uint128",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "deltaAmounts",
                type: "int128[]",
                internalType: "int128[]",
            },
            {
                name: "sqrtPriceX96AfterList",
                type: "uint160[]",
                internalType: "uint160[]",
            },
            {
                name: "initializedTicksLoadedList",
                type: "uint32[]",
                internalType: "uint32[]",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "quoteExactOutputSingle",
        inputs: [
            {
                name: "params",
                type: "tuple",
                internalType: "struct IQuoter.QuoteExactSingleParams",
                components: [
                    {
                        name: "poolKey",
                        type: "tuple",
                        internalType: "struct PoolKey",
                        components: [
                            {
                                name: "currency0",
                                type: "address",
                                internalType: "Currency",
                            },
                            {
                                name: "currency1",
                                type: "address",
                                internalType: "Currency",
                            },
                            {
                                name: "fee",
                                type: "uint24",
                                internalType: "uint24",
                            },
                            {
                                name: "tickSpacing",
                                type: "int24",
                                internalType: "int24",
                            },
                            {
                                name: "hooks",
                                type: "address",
                                internalType: "contract IHooks",
                            },
                        ],
                    },
                    {
                        name: "zeroForOne",
                        type: "bool",
                        internalType: "bool",
                    },
                    {
                        name: "exactAmount",
                        type: "uint128",
                        internalType: "uint128",
                    },
                    {
                        name: "sqrtPriceLimitX96",
                        type: "uint160",
                        internalType: "uint160",
                    },
                    {
                        name: "hookData",
                        type: "bytes",
                        internalType: "bytes",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "deltaAmounts",
                type: "int128[]",
                internalType: "int128[]",
            },
            {
                name: "sqrtPriceX96After",
                type: "uint160",
                internalType: "uint160",
            },
            {
                name: "initializedTicksLoaded",
                type: "uint32",
                internalType: "uint32",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "unlockCallback",
        inputs: [
            {
                name: "data",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        outputs: [
            {
                name: "",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "error",
        name: "InsufficientAmountOut",
        inputs: [],
    },
    {
        type: "error",
        name: "InvalidLockCaller",
        inputs: [],
    },
    {
        type: "error",
        name: "InvalidQuoteBatchParams",
        inputs: [],
    },
    {
        type: "error",
        name: "LockFailure",
        inputs: [],
    },
    {
        type: "error",
        name: "NotPoolManager",
        inputs: [],
    },
    {
        type: "error",
        name: "NotSelf",
        inputs: [],
    },
    {
        type: "error",
        name: "UnexpectedRevertBytes",
        inputs: [
            {
                name: "revertData",
                type: "bytes",
                internalType: "bytes",
            },
        ],
    },
];
export class V4Quoter__factory {
    static createInterface() {
        return new utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    }
}
V4Quoter__factory.abi = _abi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVjRRdW90ZXJfX2ZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdHlwZXMvb3RoZXIvZmFjdG9yaWVzL1Y0UXVvdGVyX19mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtDQUErQztBQUMvQyxvQkFBb0I7QUFDcEIsb0JBQW9CO0FBR3BCLE9BQU8sRUFBRSxRQUFRLEVBQVUsS0FBSyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBR2pELE1BQU0sSUFBSSxHQUFHO0lBQ1g7UUFDRSxJQUFJLEVBQUUsYUFBYTtRQUNuQixNQUFNLEVBQUU7WUFDTjtnQkFDRSxJQUFJLEVBQUUsY0FBYztnQkFDcEIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsWUFBWSxFQUFFLHVCQUF1QjthQUN0QztTQUNGO1FBQ0QsZUFBZSxFQUFFLFlBQVk7S0FDOUI7SUFDRDtRQUNFLElBQUksRUFBRSxVQUFVO1FBQ2hCLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsTUFBTSxFQUFFO1lBQ047Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsWUFBWSxFQUFFLGlDQUFpQztnQkFDL0MsVUFBVSxFQUFFO29CQUNWO3dCQUNFLElBQUksRUFBRSxlQUFlO3dCQUNyQixJQUFJLEVBQUUsU0FBUzt3QkFDZixZQUFZLEVBQUUsVUFBVTtxQkFDekI7b0JBQ0Q7d0JBQ0UsSUFBSSxFQUFFLE1BQU07d0JBQ1osSUFBSSxFQUFFLFNBQVM7d0JBQ2YsWUFBWSxFQUFFLGtCQUFrQjt3QkFDaEMsVUFBVSxFQUFFOzRCQUNWO2dDQUNFLElBQUksRUFBRSxzQkFBc0I7Z0NBQzVCLElBQUksRUFBRSxTQUFTO2dDQUNmLFlBQVksRUFBRSxVQUFVOzZCQUN6Qjs0QkFDRDtnQ0FDRSxJQUFJLEVBQUUsS0FBSztnQ0FDWCxJQUFJLEVBQUUsUUFBUTtnQ0FDZCxZQUFZLEVBQUUsUUFBUTs2QkFDdkI7NEJBQ0Q7Z0NBQ0Us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