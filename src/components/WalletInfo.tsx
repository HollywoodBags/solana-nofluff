import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { FC, useEffect, useState } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import {Stat, StatLabel, StatHelpText} from "@chakra-ui/stat";


export const WalletInfo: FC = ({ }) => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState(0);

    const getUserSOLBalance = async (publicKey: PublicKey, connection: Connection) => {
        let balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL)
    }

    useEffect(() => {
        if (wallet.publicKey) {
            getUserSOLBalance(wallet.publicKey, connection)
        }
    }, [wallet.publicKey, connection, getUserSOLBalance])

    return (
                    <Stat>
                        <StatLabel>Solana Wallet Info</StatLabel>
                        <StatHelpText>KEY: {wallet.publicKey?.toBase58()}</StatHelpText>
                        <StatHelpText>SOL: {(balance).toLocaleString()}</StatHelpText>
                    </Stat>
    );
};

export default WalletInfo