/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { UniswapV2Library } from "../UniswapV2Library";

export class UniswapV2Library__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<UniswapV2Library> {
    return super.deploy(overrides || {}) as Promise<UniswapV2Library>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): UniswapV2Library {
    return super.attach(address) as UniswapV2Library;
  }
  connect(signer: Signer): UniswapV2Library__factory {
    return super.connect(signer) as UniswapV2Library__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniswapV2Library {
    return new Contract(address, _abi, signerOrProvider) as UniswapV2Library;
  }
}

const _abi = [
  {
    inputs: [],
    name: "InvalidPath",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidReserves",
    type: "error",
  },
];

const _bytecode =
  "0x6080806040523460175760119081601d823930815050f35b600080fdfe600080fdfea164736f6c6343000811000a";
