// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the license at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWallet } from "../../services";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";

import configFile from "../../config.json";

const config: any = configFile;

export const Network: FC = () => {
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
    const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
    const dispatch = useDispatch();

    return (
        <div>
            {!wallet && <button className="btn btn-primary btn-outline rounded-lg w-48"
                onClick={async () => {
                    const wallet_res = await connect();
                    // console.log('wallet_res', wallet_res);
                    // capture and use the first account
                    const accounts = wallet_res[0]?.accounts;
                    if (accounts) {
                        setWallet({
                            address: accounts[0].address,
                            balance: accounts[0].balance,
                        });
                    } else {
                        alert('Failed to connect to wallet and retrieve accounts');
                    }
                }}
            >
                {connecting ? "connecting" : "connect"}
            </button>}
            {wallet && (
                <div>
                    {/* <label className="badge">Switch Chain</label> */}
                    {settingChain ? (
                        <span>Switching chain...</span>
                    ) : (
                        <select
                            className="select select-ghost select-sm"
                            onChange={({ target: { value } }) => {
                                if (config[value] !== undefined) {
                                    setChain({ chainId: value })
                                } else {
                                    alert("No deploy on this chain")
                                }
                            }
                            }
                            value={connectedChain?.id}
                        >
                            {chains.map(({ id, label }) => {
                                return (
                                    <option key={id} value={id}>
                                        {label}
                                    </option>
                                );
                            })}
                        </select>
                    )}
                    <button className="btn btn-primary btn-outline rounded-lg w-48" onClick={() => disconnect(wallet)}>
                        Disconnect Wallet
                    </button>
                </div>
            )}
        </div>
    );
};
