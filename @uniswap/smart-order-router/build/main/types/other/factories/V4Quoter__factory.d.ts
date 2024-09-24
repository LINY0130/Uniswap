import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import type { V4Quoter, V4QuoterInterface } from "../V4Quoter";
export declare class V4Quoter__factory {
    static readonly abi: ({
        type: string;
        inputs: {
            name: string;
            type: string;
            internalType: string;
        }[];
        stateMutability: string;
        name?: undefined;
        outputs?: undefined;
    } | {
        type: string;
        name: string;
        inputs: {
            name: string;
            type: string;
            internalType: string;
            components: ({
                name: string;
                type: string;
                internalType: string;
                components?: undefined;
            } | {
                name: string;
                type: string;
                internalType: string;
                components: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
            })[];
        }[];
        outputs: {
            name: string;
            type: string;
            internalType: string;
        }[];
        stateMutability: string;
    } | {
        type: string;
        name: string;
        inputs: {
            name: string;
            type: string;
            internalType: string;
        }[];
        outputs: {
            name: string;
            type: string;
            internalType: string;
        }[];
        stateMutability: string;
    } | {
        type: string;
        name: string;
        inputs: {
            name: string;
            type: string;
            internalType: string;
        }[];
        stateMutability?: undefined;
        outputs?: undefined;
    })[];
    static createInterface(): V4QuoterInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): V4Quoter;
}
