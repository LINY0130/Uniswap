/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { ReenteringProtocol } from "../ReenteringProtocol";

export class ReenteringProtocol__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<ReenteringProtocol> {
    return super.deploy(overrides || {}) as Promise<ReenteringProtocol>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ReenteringProtocol {
    return super.attach(address) as ReenteringProtocol;
  }
  connect(signer: Signer): ReenteringProtocol__factory {
    return super.connect(signer) as ReenteringProtocol__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ReenteringProtocol {
    return new Contract(address, _abi, signerOrProvider) as ReenteringProtocol;
  }
}

const _abi = [
  {
    inputs: [],
    name: "NotAllowedReenter",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "universalRouter",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "callAndReenter",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60808060405234610016576101c6908161001c8239f35b600080fdfe60808060405260048036101561001457600080fd5b600091823560e01c63260b0b4c1461002b57600080fd5b60407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b55782823573ffffffffffffffffffffffffffffffffffffffff811681036101b1576024359067ffffffffffffffff938483116101ad57366023840112156101ad57828601358581116101a95736602482860101116101a957818186959260248794018337810182815203925af1903d156101a3573d81811161017757604051917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0603f81601f85011601168301908382109082111761014b5760405281528360203d92013e5b15610123575080f35b6040517fb418cb98000000000000000000000000000000000000000000000000000000008152fd5b6024866041877f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b6024856041867f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b5061011a565b8480fd5b8380fd5b5080fd5b8280fdfea164736f6c6343000811000a";
