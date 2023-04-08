import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";

export async function RpcClient(rpc: string) {
  const tendermintClient = await Tendermint34Client.connect(rpc);
  const queryClient = new QueryClient(tendermintClient);
  return createProtobufRpcClient(queryClient);
}
