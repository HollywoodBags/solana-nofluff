import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Metaplex } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useState } from "react";

const connection = new Connection(clusterApiUrl("devnet"));
const mx = Metaplex.make(connection);

export default function Home() {
    const [address, setAddress] = useState(
        {wallet.publicKey}
    );
    const [nft, setNft] = useState(null);
    const fetchNft = async () => {
        const nft = await mx.nfts().findByMint(new PublicKey(address));
        setNft(nft);
    };

    return (
        <div>
            <Head>
                <title>Metaplex and Next.js example</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.App}>
                <div className={styles.container}>
                    <h1 className={styles.title}>NFT Mint Address</h1>
                    <div className={styles.nftForm}>
                        <input
                            type="text"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                        <button onClick={fetchNft}>Fetch</button>
                    </div>
                    {nft && (
                        <div className={styles.nftPreview}>
                            <h1>{nft.name}</h1>
                            <img
                                src={nft.metadata.image}
                                alt="The downloaded illustration of the provided NFT address."
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
