import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
  createProtobufRpcClient,
  GasPrice,
  QueryClient,
  SigningStargateClient,
} from "@cosmjs/stargate";
import {
  DelegationResponse,
  Validator,
} from "cosmjs-types/cosmos/staking/v1beta1/staking";
import { GetDelegatedValidatorInfo } from "./types";
import {
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";
import { OfflineSigner, StdFee } from "@cosmjs/launchpad";
import { Transaction } from "./transactions";

export async function RpcClient(rpc: string) {
  const tendermintClient = await Tendermint34Client.connect(rpc);
  const queryClient = new QueryClient(tendermintClient);
  return createProtobufRpcClient(queryClient);
}

export const transaction = async ({
  signerAddress,
  msgs,
  rpc,
  memo,
  signer,
  fee,
}: Transaction) => {
  const client = await SigningStargateClient.connectWithSigner(rpc, signer);
  console.log(client, "client");
  return await client.signAndBroadcast(signerAddress, msgs, fee, memo);
};

export async function getDelegatedValidatorsInfo(
  validators: Validator[],
  delegations: DelegationResponse[]
): Promise<GetDelegatedValidatorInfo[]> {
  try {
    let delegatedValidators: GetDelegatedValidatorInfo[] = [];
    if (delegations.length > 0) {
      validators.forEach((item) => {
        if (item.description?.moniker === "PrithviDevs") {
          console.log(item, "jailed");
        }
        for (const delegation of delegations) {
          if (
            item.operatorAddress === delegation!.delegation!.validatorAddress
          ) {
            delegatedValidators.push({
              validator: item,
              delegatedAmount: delegation.balance!.amount,
            });
          }
        }
      });
      return delegatedValidators.sort(function (a, b) {
        return Number(b.delegatedAmount) - Number(a.delegatedAmount);
      });
    }
    return [];
  } catch (e) {
    return [];
  }
}
