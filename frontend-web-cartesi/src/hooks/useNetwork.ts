/**
 * 

import subprocess
import jsonpickle
from werewolf.model import Game


class Network:

    def send_on_chain(self, payload, account_index):
        subprocess.check_output(['yarn', 'start', 'input', 'send',
                                '--payload', "0x" + payload, '--accountIndex', str(account_index)], cwd="../frontend-console")

    def inspect(self):
        report = subprocess.check_output(
            ['yarn', 'start', 'inspect', '--payload', 'xx', ], cwd="../frontend-console").decode().split("\n")[6].split(":", 1)[1]
        return jsonpickle.decode(report, classes=Game)
 */

import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { execSync } from 'child_process';

export const useNetwork = () => {

    const {
        wallet
    } = useSelector((s: any) => s.session);

    const sendOnChain = useCallback(() => {
        // obtain the wallet address

        // execSync(`yarn start input send --payload 0x${payload} --accountIndex ${accountIndex}`, { cwd: '../frontend-console' });
    }, []);

    const inspect = useCallback(() => {

    }, []);

    return useMemo(() => ({

    }), []);
}