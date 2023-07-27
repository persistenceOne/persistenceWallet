/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  Params,
  Validator,
  Delegation,
  UnbondingDelegation,
  Redelegation,
  TokenizeShareRecord,
} from "../cosmos/staking/v1beta1/staking";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "cosmos.staking.v1beta1";

/** GenesisState defines the staking module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters of related to deposit. */
  params?: Params;
  /**
   * last_total_power tracks the total amounts of bonded tokens recorded during
   * the previous end block.
   */
  lastTotalPower: Uint8Array;
  /**
   * last_validator_powers is a special index that provides a historical list
   * of the last-block's bonded validators.
   */
  lastValidatorPowers: LastValidatorPower[];
  /** delegations defines the validator set at genesis. */
  validators: Validator[];
  /** delegations defines the delegations active at genesis. */
  delegations: Delegation[];
  /** unbonding_delegations defines the unbonding delegations active at genesis. */
  unbondingDelegations: UnbondingDelegation[];
  /** redelegations defines the redelegations active at genesis. */
  redelegations: Redelegation[];
  exported: boolean;
  /**
   * store tokenize share records to provide reward to record owners.
   *
   * Since: cosmos-sdk 0.47-lsm
   */
  tokenizeShareRecords: TokenizeShareRecord[];
  /**
   * last tokenize share record id, used for next share record id calculation.
   *
   * Since: cosmos-sdk 0.47-lsm
   */
  lastTokenizeShareRecordId: Long;
  /**
   * total number of liquid staked tokens at genesis.
   *
   * Since: cosmos-sdk 0.47-lsm
   */
  totalLiquidStakedTokens: Uint8Array;
  /**
   * tokenize shares locks at genesis.
   *
   * Since: cosmos-sdk 0.47-lsm
   */
  tokenizeShareLocks: TokenizeShareLock[];
}

/**
 * TokenizeSharesLock required for specifying account locks at genesis.
 *
 * Since: cosmos-sdk 0.47-lsm
 */
export interface TokenizeShareLock {
  /** Address of the account that is locked. */
  address: string;
  /** Status of the lock (LOCKED or LOCK_EXPIRING) */
  status: string;
  /** Completion time if the lock is expiring. */
  completionTime?: Date;
}

/** LastValidatorPower required for validator set update logic. */
export interface LastValidatorPower {
  /** address is the address of the validator. */
  address: string;
  /** power defines the power of the validator. */
  power: Long;
}

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    lastTotalPower: new Uint8Array(),
    lastValidatorPowers: [],
    validators: [],
    delegations: [],
    unbondingDelegations: [],
    redelegations: [],
    exported: false,
    tokenizeShareRecords: [],
    lastTokenizeShareRecordId: Long.UZERO,
    totalLiquidStakedTokens: new Uint8Array(),
    tokenizeShareLocks: [],
  };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.lastTotalPower.length !== 0) {
      writer.uint32(18).bytes(message.lastTotalPower);
    }
    for (const v of message.lastValidatorPowers) {
      LastValidatorPower.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.delegations) {
      Delegation.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.unbondingDelegations) {
      UnbondingDelegation.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.redelegations) {
      Redelegation.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.exported === true) {
      writer.uint32(64).bool(message.exported);
    }
    for (const v of message.tokenizeShareRecords) {
      TokenizeShareRecord.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (!message.lastTokenizeShareRecordId.isZero()) {
      writer.uint32(80).uint64(message.lastTokenizeShareRecordId);
    }
    if (message.totalLiquidStakedTokens.length !== 0) {
      writer.uint32(90).bytes(message.totalLiquidStakedTokens);
    }
    for (const v of message.tokenizeShareLocks) {
      TokenizeShareLock.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.lastTotalPower = reader.bytes();
          break;
        case 3:
          message.lastValidatorPowers.push(
            LastValidatorPower.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.validators.push(Validator.decode(reader, reader.uint32()));
          break;
        case 5:
          message.delegations.push(Delegation.decode(reader, reader.uint32()));
          break;
        case 6:
          message.unbondingDelegations.push(
            UnbondingDelegation.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.redelegations.push(
            Redelegation.decode(reader, reader.uint32())
          );
          break;
        case 8:
          message.exported = reader.bool();
          break;
        case 9:
          message.tokenizeShareRecords.push(
            TokenizeShareRecord.decode(reader, reader.uint32())
          );
          break;
        case 10:
          message.lastTokenizeShareRecordId = reader.uint64() as Long;
          break;
        case 11:
          message.totalLiquidStakedTokens = reader.bytes();
          break;
        case 12:
          message.tokenizeShareLocks.push(
            TokenizeShareLock.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      lastTotalPower: isSet(object.lastTotalPower)
        ? bytesFromBase64(object.lastTotalPower)
        : new Uint8Array(),
      lastValidatorPowers: Array.isArray(object?.lastValidatorPowers)
        ? object.lastValidatorPowers.map((e: any) =>
            LastValidatorPower.fromJSON(e)
          )
        : [],
      validators: Array.isArray(object?.validators)
        ? object.validators.map((e: any) => Validator.fromJSON(e))
        : [],
      delegations: Array.isArray(object?.delegations)
        ? object.delegations.map((e: any) => Delegation.fromJSON(e))
        : [],
      unbondingDelegations: Array.isArray(object?.unbondingDelegations)
        ? object.unbondingDelegations.map((e: any) =>
            UnbondingDelegation.fromJSON(e)
          )
        : [],
      redelegations: Array.isArray(object?.redelegations)
        ? object.redelegations.map((e: any) => Redelegation.fromJSON(e))
        : [],
      exported: isSet(object.exported) ? Boolean(object.exported) : false,
      tokenizeShareRecords: Array.isArray(object?.tokenizeShareRecords)
        ? object.tokenizeShareRecords.map((e: any) =>
            TokenizeShareRecord.fromJSON(e)
          )
        : [],
      lastTokenizeShareRecordId: isSet(object.lastTokenizeShareRecordId)
        ? Long.fromValue(object.lastTokenizeShareRecordId)
        : Long.UZERO,
      totalLiquidStakedTokens: isSet(object.totalLiquidStakedTokens)
        ? bytesFromBase64(object.totalLiquidStakedTokens)
        : new Uint8Array(),
      tokenizeShareLocks: Array.isArray(object?.tokenizeShareLocks)
        ? object.tokenizeShareLocks.map((e: any) =>
            TokenizeShareLock.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.lastTotalPower !== undefined &&
      (obj.lastTotalPower = base64FromBytes(
        message.lastTotalPower !== undefined
          ? message.lastTotalPower
          : new Uint8Array()
      ));
    if (message.lastValidatorPowers) {
      obj.lastValidatorPowers = message.lastValidatorPowers.map((e) =>
        e ? LastValidatorPower.toJSON(e) : undefined
      );
    } else {
      obj.lastValidatorPowers = [];
    }
    if (message.validators) {
      obj.validators = message.validators.map((e) =>
        e ? Validator.toJSON(e) : undefined
      );
    } else {
      obj.validators = [];
    }
    if (message.delegations) {
      obj.delegations = message.delegations.map((e) =>
        e ? Delegation.toJSON(e) : undefined
      );
    } else {
      obj.delegations = [];
    }
    if (message.unbondingDelegations) {
      obj.unbondingDelegations = message.unbondingDelegations.map((e) =>
        e ? UnbondingDelegation.toJSON(e) : undefined
      );
    } else {
      obj.unbondingDelegations = [];
    }
    if (message.redelegations) {
      obj.redelegations = message.redelegations.map((e) =>
        e ? Redelegation.toJSON(e) : undefined
      );
    } else {
      obj.redelegations = [];
    }
    message.exported !== undefined && (obj.exported = message.exported);
    if (message.tokenizeShareRecords) {
      obj.tokenizeShareRecords = message.tokenizeShareRecords.map((e) =>
        e ? TokenizeShareRecord.toJSON(e) : undefined
      );
    } else {
      obj.tokenizeShareRecords = [];
    }
    message.lastTokenizeShareRecordId !== undefined &&
      (obj.lastTokenizeShareRecordId = (
        message.lastTokenizeShareRecordId || Long.UZERO
      ).toString());
    message.totalLiquidStakedTokens !== undefined &&
      (obj.totalLiquidStakedTokens = base64FromBytes(
        message.totalLiquidStakedTokens !== undefined
          ? message.totalLiquidStakedTokens
          : new Uint8Array()
      ));
    if (message.tokenizeShareLocks) {
      obj.tokenizeShareLocks = message.tokenizeShareLocks.map((e) =>
        e ? TokenizeShareLock.toJSON(e) : undefined
      );
    } else {
      obj.tokenizeShareLocks = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I
  ): GenesisState {
    const message = createBaseGenesisState();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    message.lastTotalPower = object.lastTotalPower ?? new Uint8Array();
    message.lastValidatorPowers =
      object.lastValidatorPowers?.map((e) =>
        LastValidatorPower.fromPartial(e)
      ) || [];
    message.validators =
      object.validators?.map((e) => Validator.fromPartial(e)) || [];
    message.delegations =
      object.delegations?.map((e) => Delegation.fromPartial(e)) || [];
    message.unbondingDelegations =
      object.unbondingDelegations?.map((e) =>
        UnbondingDelegation.fromPartial(e)
      ) || [];
    message.redelegations =
      object.redelegations?.map((e) => Redelegation.fromPartial(e)) || [];
    message.exported = object.exported ?? false;
    message.tokenizeShareRecords =
      object.tokenizeShareRecords?.map((e) =>
        TokenizeShareRecord.fromPartial(e)
      ) || [];
    message.lastTokenizeShareRecordId =
      object.lastTokenizeShareRecordId !== undefined &&
      object.lastTokenizeShareRecordId !== null
        ? Long.fromValue(object.lastTokenizeShareRecordId)
        : Long.UZERO;
    message.totalLiquidStakedTokens =
      object.totalLiquidStakedTokens ?? new Uint8Array();
    message.tokenizeShareLocks =
      object.tokenizeShareLocks?.map((e) => TokenizeShareLock.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseTokenizeShareLock(): TokenizeShareLock {
  return { address: "", status: "", completionTime: undefined };
}

export const TokenizeShareLock = {
  encode(
    message: TokenizeShareLock,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    if (message.completionTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.completionTime),
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TokenizeShareLock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenizeShareLock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.status = reader.string();
          break;
        case 3:
          message.completionTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TokenizeShareLock {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      status: isSet(object.status) ? String(object.status) : "",
      completionTime: isSet(object.completionTime)
        ? fromJsonTimestamp(object.completionTime)
        : undefined,
    };
  },

  toJSON(message: TokenizeShareLock): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.status !== undefined && (obj.status = message.status);
    message.completionTime !== undefined &&
      (obj.completionTime = message.completionTime.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TokenizeShareLock>, I>>(
    object: I
  ): TokenizeShareLock {
    const message = createBaseTokenizeShareLock();
    message.address = object.address ?? "";
    message.status = object.status ?? "";
    message.completionTime = object.completionTime ?? undefined;
    return message;
  },
};

function createBaseLastValidatorPower(): LastValidatorPower {
  return { address: "", power: Long.ZERO };
}

export const LastValidatorPower = {
  encode(
    message: LastValidatorPower,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (!message.power.isZero()) {
      writer.uint32(16).int64(message.power);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LastValidatorPower {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLastValidatorPower();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.power = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LastValidatorPower {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      power: isSet(object.power) ? Long.fromValue(object.power) : Long.ZERO,
    };
  },

  toJSON(message: LastValidatorPower): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.power !== undefined &&
      (obj.power = (message.power || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LastValidatorPower>, I>>(
    object: I
  ): LastValidatorPower {
    const message = createBaseLastValidatorPower();
    message.address = object.address ?? "";
    message.power =
      object.power !== undefined && object.power !== null
        ? Long.fromValue(object.power)
        : Long.ZERO;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(String.fromCharCode(byte));
  });
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
