import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import {LedgerSigner} from "@cosmjs/ledger-amino";
import {makeHdPath} from "./helper";
import * as Sentry from "@sentry/browser";
import {userLogout} from "../store/actions/logout";
import {DefaultChainInfo, ExternalChains} from "../config";

const interactiveTimeout = 120_000;

export async function createTransport() {
    const ledgerTransport = await TransportWebUSB.create(interactiveTimeout, interactiveTimeout);
    return ledgerTransport;
}

export const fetchAddress = async (accountNumber = "0", addressIndex = "0", ledgerApp) => {
    let transport = await createTransport();
    const cosmos = ExternalChains.find(chain => chain.chainName === 'Cosmos');
    const coinType = ledgerApp === cosmos.ledgerAppName ? cosmos.coinType : DefaultChainInfo.coinType;
    const signer = new LedgerSigner(transport, {
        testModeAllowed: true,
        hdPaths: [makeHdPath(accountNumber, addressIndex, coinType)],
        prefix: DefaultChainInfo.prefix,
        ledgerAppName:ledgerApp
    });
    const [firstAccount] = await signer.getAccounts();
    return firstAccount.address;
};

export const ledgerDisconnect = async (dispatch, history) =>{
    try {
        let transport = await createTransport();
        transport.on("disconnect", () => {
            alert("ledger disconnected please login again");
            history.push('/');
            dispatch(userLogout());
            localStorage.clear();
            window.location.reload();

        });
    }catch (error) {
        Sentry.captureException(error.response
            ? error.response.data.message
            : error.message);
        console.log(error, " error result");
    }
};