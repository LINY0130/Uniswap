/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IRewardsCollector } from "../IRewardsCollector";

export class IRewardsCollector__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRewardsCollector {
    return new Contract(address, _abi, signerOrProvider) as IRewardsCollector;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "looksRareClaim",
        type: "bytes",
      },
    ],
    name: "collectRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
