import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { QueryClientImpl } from "../protos/lsnative/staking/v1beta1/query";
import transactions from "./transactions";

export const fetchTokenizeShares = async (address) => {
  try {
    const tendermintClient = await Tendermint34Client.connect(
      "https://rpc.testnet.persistence.one"
    );
    const queryClient = new QueryClient(tendermintClient);
    const rpcClient = createProtobufRpcClient(queryClient);
    const queryService = new QueryClientImpl(rpcClient);
    const response = await queryService.TokenizeShareRecordsOwned({
      owner: address
    });
    console.log(response, "response");
  } catch (e) {
    console.log(e, "error in fetch");
  }
};

export const queryTokenizeSharesRecordId = async () => {
  try {
    const rpcClient = await transactions.RpcClient();
    const queryService = new QueryClientImpl(rpcClient);
    const response = await queryService.LastTokenizeShareRecordId({});
    console.log(response, "response id");
    return response.toString();
  } catch (e) {
    console.log(e, "error in fetch");
    return null;
  }
};
