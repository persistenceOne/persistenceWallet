export function createLSNativeAminoConverters() {
  return {
    "/lsnative.staking.v1beta1.MsgTokenizeShares": {
      aminoType: "cosmos/MsgTokenizeShares",
      toAmino: ({
        delegatorAddress,
        amount,
        validatorAddress,
        tokenizedShareOwner
      }) => ({
        delegator_address: delegatorAddress,
        amount: amount,
        validator_address:validatorAddress,
        tokenized_share_owner: tokenizedShareOwner
      }),
      fromAmino: ({
        delegator_address,
        amount,
        validator_address,
        tokenized_share_owner
      }) => ({
        delegatorAddress: delegator_address,
        amount: amount,
        validatorAddress: validator_address,
        tokenizedShareOwner: tokenized_share_owner
      })
    }
  }
}
