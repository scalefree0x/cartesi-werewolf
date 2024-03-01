import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { InputBox__factory } from "@cartesi/rollups";
import { toast } from "react-toastify";

// OBS: change Echo DApp address as appropriate
const DAPP_ADDRESS = "0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C";

// Standard configuration for local development environment
const INPUTBOX_ADDRESS = "0x59b22D57D4f067708AB0c00552767405926dc768";
const HARDHAT_DEFAULT_MNEMONIC = "test test test test test test test test test test test junk";
const HARDHAT_LOCALHOST_RPC_URL = "http://localhost:8545";

// temporary, we may want to extract from user_input
const accountIndex = 0;

const options = {
    autoClose: 6000,
    type: "INFO",
    hideProgressBar: false,
    position: "top-left",
    pauseOnHover: true,
    progress: 0.2
    // and so on ...
};

export const post = async (user_input: string) => {
    // Start a connection
    const provider = new JsonRpcProvider(HARDHAT_LOCALHOST_RPC_URL);
    const signer = ethers.Wallet.fromMnemonic(
        HARDHAT_DEFAULT_MNEMONIC,
        `m/44'/60'/0'/0/${accountIndex}`
    ).connect(provider);

    // Instantiate the InputBox contract
    const inputBox = InputBox__factory.connect(
        INPUTBOX_ADDRESS,
        signer
    );

    // Encode the input
    const inputBytes = ethers.utils.isBytesLike(user_input)
        ? user_input
        : ethers.utils.toUtf8Bytes(user_input);

    // Send the transaction
    const tx = await inputBox.addInput(DAPP_ADDRESS, inputBytes);
    console.log(tx);
    // update these to Toast notifications
    toast("Transaction Sent: waiting for confirmation");

    // Wait for confirmation
    console.log("waiting for confirmation...");
    const receipt = await tx.wait(1);

    // Search for the InputAdded event
    const event = receipt.events?.find((e) => e.event === "InputAdded");

    // update these to toast notifications
    toast(`Transaction Confirmed: Input added => index: ${event?.args?.inputIndex}`,);
    console.log(`Input added => index: ${event?.args?.inputIndex} `);
    return event;
}