/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { RewardsCollector } from "../RewardsCollector";

export class RewardsCollector__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RewardsCollector {
    return new Contract(address, _abi, signerOrProvider) as RewardsCollector;
  }
}

const _abi = [
  {
    inputs: [],
    name: "UnableToClaim",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsSent",
    type: "event",
  },
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
