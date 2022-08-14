import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC } from 'react';

export const TopRightButton: FC = props => {
    return (
        <div>
                    <WalletMultiButton />
        </div>
    );
};

export default TopRightButton