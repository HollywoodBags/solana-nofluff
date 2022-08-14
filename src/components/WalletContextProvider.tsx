import { FC, ReactNode, useCallback, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { WalletModalProvider as ReactUIWalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter
} from '@solana/wallet-adapter-wallets';


const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter()
        ],
        [network]
    );

    const onError = useCallback(
        (error: WalletError) => {
            console.error(error);
        },
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect>
                <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;