export function createLSNativeAminoConverters() {
  return {
    "/cosmos.staking.v1beta1.MsgTokenizeShares": {
      aminoType: "cosmos-sdk/MsgTokenizeShares",
      toAmino: ({
        delegatorAddress,
        amount,
        validatorAddress,
        tokenizedShareOwner
      }) => ({
        delegator_address: delegatorAddress,
        validator_address: validatorAddress,
        tokenized_share_owner: tokenizedShareOwner,
        amount: amount
      }),
      fromAmino: ({
        delegator_address,
        amount,
        validator_address,
        tokenized_share_owner
      }) => ({
        delegatorAddress: delegator_address,
        validatorAddress: validator_address,
        tokenizedShareOwner: tokenized_share_owner,
        amount: amount
      })
    },
    "/cosmos.staking.v1beta1.MsgTransferTokenizeShareRecord": {
      aminoType: "cosmos-sdk/MsgTransferTokenizeShareRecord",
      toAmino: ({ tokenizeShareRecordId, sender, newOwner }) => ({
        tokenize_share_record_id: tokenizeShareRecordId.toString(),
        sender: sender,
        new_owner: newOwner
      }),
      fromAmino: ({ tokenize_share_record_id, sender: sender, new_owner }) => ({
        tokenizeShareRecordId: tokenize_share_record_id.toString(),
        sender: sender,
        newOwner: new_owner
      })
    },
    "/cosmos.staking.v1beta1.MsgRedeemTokensForShares": {
      aminoType: "cosmos-sdk/MsgRedeemTokensForShares",
      toAmino: ({ delegatorAddress, amount }) => ({
        delegator_address: delegatorAddress,
        amount: amount
      }),
      fromAmino: ({ delegator_address, amount: amount }) => ({
        delegatorAddress: delegator_address,
        amount: amount
      })
    },
    "/cosmos.distribution.v1beta1.MsgWithdrawTokenizeShareRecordReward": {
      aminoType: "cosmos-sdk/distr/MsgWithdrawTokenizeShareRecordReward",
      toAmino: ({ ownerAddress, recordId }) => ({
        owner_address: ownerAddress,
        record_id: recordId.toString()
      }),
      fromAmino: ({ owner_address, record_id }) => ({
        ownerAddress: owner_address,
        recordId: record_id.toString()
      })
    },
    "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation": {
      aminoType: "cosmos-sdk/MsgCancelUnbondingDelegation",
      toAmino: ({
        delegatorAddress,
        validatorAddress,
        creationHeight,
        amount
      }) => ({
        delegator_address: delegatorAddress,
        validator_address: validatorAddress,
        creation_height: creationHeight.toString(),
        amount: amount
      }),
      fromAmino: ({
        delegator_address,
        validator_address,
        creation_height,
        amount
      }) => ({
        delegatorAddress: delegator_address,
        validatorAddress: validator_address,
        creationHeight: creation_height.toString(),
        amount: amount
      })
    }
  };
}
