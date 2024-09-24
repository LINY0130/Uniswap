/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface RewardsCollectorInterface extends ethers.utils.Interface {
  functions: {
    "collectRewards(bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "collectRewards",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "collectRewards",
    data: BytesLike
  ): Result;

  events: {
    "RewardsSent(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RewardsSent"): EventFragment;
}

export class RewardsCollector extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: RewardsCollectorInterface;

  functions: {
    collectRewards(
      looksRareClaim: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "collectRewards(bytes)"(
      looksRareClaim: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  collectRewards(
    looksRareClaim: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "collectRewards(bytes)"(
    looksRareClaim: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    collectRewards(
      looksRareClaim: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "collectRewards(bytes)"(
      looksRareClaim: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    RewardsSent(amount: null): EventFilter;
  };

  estimateGas: {
    collectRewards(
      looksRareClaim: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "collectRewards(bytes)"(
      looksRareClaim: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    collectRewards(
      looksRareClaim: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "collectRewards(bytes)"(
      looksRareClaim: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}