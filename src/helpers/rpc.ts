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
import { GetDelegatedValidatorInfo, ValidatorProps } from "./types";
import {
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";
import { OfflineSigner, StdFee } from "@cosmjs/launchpad";
import { Transaction } from "./transactions";
import { getDecimalize, toDec, toPrettyCoin } from "./coin";
import { defaultChain, persistenceChain } from "./utils";

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
      validators.forEach((validator, index) => {
        const monieker = validator.description!.moniker;
        for (const delegation of delegations) {
          if (
            validator.operatorAddress ===
            delegation!.delegation!.validatorAddress
          ) {
            delegatedValidators.push({
              id: index + 1,
              validatorName: monieker,
              validatorAddress: validator.operatorAddress,
              validatorImage: validator.description!.identity,
              actions: "",
              delegatedAmount: toPrettyCoin(
                delegation.balance!.amount,
                defaultChain.currency.coinDenom,
                persistenceChain!.chainId
              ),
            });
          }
        }
      });
      return delegatedValidators;
    }
    return [];
  } catch (e) {
    return [];
  }
}
export const getStructuredList = (validators: Validator[]) => {
  const newList: ValidatorProps[] = [];
  validators.map((validator, index) => {
    const monieker = validator.description!.moniker;
    const commission = getDecimalize(
      validator.commission!.commissionRates!.rate,
      18
    )
      .mul(toDec(100))
      .truncate()
      .toString();
    const votingPower = Number(validator.tokens) * Math.pow(10, -6);
    newList.push({
      id: index + 1,
      validatorName: monieker,
      validatorAddress: validator.operatorAddress,
      validatorImage: validator.description!.identity,
      validatorDescription: validator.description?.details!,
      validatorLink: validator.description?.website!,
      votingPower,
      commission,
      actions: "",
    });
  });
  return newList;
};
