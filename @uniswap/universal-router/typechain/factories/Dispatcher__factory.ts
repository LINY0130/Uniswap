/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { Dispatcher } from "../Dispatcher";

export class Dispatcher__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Dispatcher {
    return new Contract(address, _abi, signerOrProvider) as Dispatcher;
  }
}

const _abi = [
  {
    inputs: [],
    name: "BalanceTooLow",
    type: "error",
  },
  {
    inputs: [],
    name: "BuyPunkFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "ContractLocked",
    type: "error",
  },
  {
    inputs: [],
    name: "FromAddressIsNotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientETH",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientToken",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidBips",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "commandType",
        type: "uint256",
      },
    ],
    name: "InvalidCommandType",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidOwnerERC1155",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidOwnerERC721",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSpender",
    type: "error",
  },
  {
    inputs: [],
    name: "SliceOutOfBounds",
    type: "error",
  },
  {
    inputs: [],
    name: "UnsafeCast",
    type: "error",
  },
  {
    inputs: [],
    name: "V2InvalidPath",
    type: "error",
  },
  {
    inputs: [],
    name: "V2TooLittleReceived",
    type: "error",
  },
  {
    inputs: [],
    name: "V2TooMuchRequested",
    type: "error",
  },
  {
    inputs: [],
    name: "V3InvalidAmountOut",
    type: "error",
  },
  {
    inputs: [],
    name: "V3InvalidCaller",
    type: "error",
  },
  {
    inputs: [],
    name: "V3InvalidSwap",
    type: "error",
  },
  {
    inputs: [],
    name: "V3TooLittleReceived",
    type: "error",
  },
  {
    inputs: [],
    name: "V3TooMuchRequested",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "commands",
        type: "bytes",
      },
      {
        internalType: "bytes[]",
        name: "inputs",
        type: "bytes[]",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "amount0Delta",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "amount1Delta",
        type: "int256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "uniswapV3SwapCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
