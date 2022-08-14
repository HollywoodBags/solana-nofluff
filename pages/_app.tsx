// import '../styles/globals.css'
import type { AppProps } from 'next/app'
import WalletContextProvider from '../src/components/WalletContextProvider';
import { FC } from 'react';
import {ChakraProvider} from "@chakra-ui/provider";
import {WalletDisconnectButton, WalletMultiButton} from "@solana/wallet-adapter-react-ui";

require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <WalletContextProvider>
          <ChakraProvider>
          <Component {...pageProps} />
          </ChakraProvider>
      </WalletContextProvider>
  );
};

export default App
