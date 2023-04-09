import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { HdPath, pathToString, stringToPath } from "@cosmjs/crypto";
import crypto from "crypto";
const passwordHashAlgorithm = "sha512";
const bip39 = require("bip39");
const prefix = "persistence";

export const makeHdPath = (
  accountNumber = "0",
  addressIndex = "0",
  coinType = 118
): HdPath => {
  return stringToPath(
    "m/44'/" + coinType + "'/" + accountNumber + "'/0/" + addressIndex
  );
};

export const MnemonicWalletWithPassphrase = async (
  mnemonic: string,
  hdPath = makeHdPath(),
  password = "",
  prefix: string
) => {
  const wallet: DirectSecp256k1HdWallet =
    await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: prefix,
      bip39Password: password,
      hdPaths: [hdPath],
    });
  const [firstAccount] = await wallet.getAccounts();
  return { wallet, address: firstAccount.address };
};

export const createKeyStore = (mnemonic: string, password: any) => {
  try {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
    let encrypted = cipher.update(mnemonic);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    let obj = {
      hashpwd: crypto
        .createHash(passwordHashAlgorithm)
        .update(password)
        .digest("hex"),
      iv: iv.toString("hex"),
      salt: key.toString("hex"),
      crypted: encrypted.toString("hex"),
    };
    return {
      Response: obj,
    };
  } catch (exception: any) {
    return {
      success: false,
      error: exception.message,
    };
  }
};

export const decryptKeyStore = (fileData: any, password: any) => {
  let hashpwd = fileData.hashpwd;
  let iv = fileData.iv;
  let salt = fileData.salt;
  let crypted = fileData.crypted;

  if (
    hashpwd ===
    crypto.createHash(passwordHashAlgorithm).update(password).digest("hex")
  ) {
    let ivText = Buffer.from(iv, "hex");
    let encryptedText = Buffer.from(crypted, "hex");

    let decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(salt, "hex"),
      ivText
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return {
      mnemonic: decrypted.toString(),
    };
  } else {
    return {
      error: "Incorrect password.",
    };
  }
};

export const getWallet = async (
  mnemonic: string,
  walletPath = makeHdPath(),
  bip39Passphrase = ""
) => {
  try {
    const response: any = await MnemonicWalletWithPassphrase(
      mnemonic,
      walletPath,
      bip39Passphrase,
      prefix
    );
    return {
      success: true,
      address: response.address,
      mnemonic: response.wallet.mnemonic!,
      walletPath: pathToString(walletPath),
    };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
    };
  }
};

export const createRandomWallet = async (
  walletPath = makeHdPath(),
  bip39Passphrase = ""
) => {
  return await getWallet(
    bip39.generateMnemonic(256),
    walletPath,
    bip39Passphrase
  );
};

export const createWallet = async (
  mnemonic: string,
  walletPath = makeHdPath(),
  bip39Passphrase = ""
) => {
  let mnemonicList = mnemonic.replace(/\s/g, " ").split(/\s/g);
  let mnemonicWords: any = [];
  for (let word of mnemonicList) {
    if (word === "") {
      console.log();
    } else {
      let trimmedWord = word.replace(/\s/g, "");
      mnemonicWords.push(trimmedWord);
    }
  }
  mnemonicWords = mnemonicWords.join(" ");
  let validateMnemonic = bip39.validateMnemonic(mnemonicWords);
  if (validateMnemonic) {
    return await getWallet(mnemonicWords, walletPath, bip39Passphrase);
  } else {
    return new Error("Invalid mnemonic.");
  }
};
