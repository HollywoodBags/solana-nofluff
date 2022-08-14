import axios from 'axios'
import useSWR from 'swr'
import {FC, useEffect, useState} from "react";
import * as React from "react";
import styles from "../styles/Home.module.css";
import {Th,Tr,Td,Thead,Tbody,TableContainer,Table,Progress} from "@chakra-ui/react";

export default function Inventory() {
    const fetcher = (url: any) => axios.get(url).then(res => res.data)

    const {
        data: solscan,
        error: solscanerror
    } = useSWR('https://public-api.solscan.io/account/tokens?account=DqQyyY4QdCsE924uAkNypDbReVUxUHjNzdNCsagjbAWG&limit=10', fetcher)
    const {
        data: magic,
        error: magicerror
    } = useSWR(() => 'https://api-mainnet.magiceden.dev/v2/tokens/' + solscan.tokenAddress, fetcher)

    if (solscanerror) return <div>Failed to load Solscan Data</div>
    if (solscanerror) return <div>Failed to load Magic Data</div>
    if (!solscan || !solscanerror) return <Progress/>
    if (!magic || !magicerror) return <Progress/>


    return (

        <div className='Profile'>
            <p>{solscan}</p>
        </div>
    )
}
        /* <div className={styles.tokens}>
        <TableContainer>
        <Table variant='simple'>
        <Tr>
        <Thead>
        <Th textAlign='left' pl='15px'>Token</Th>
        <Th textAlign='left' pl='15px'>Amount</Th>
        </Thead>
        <Tbody>
        <Td>{solscan.tokenAddress}</Td><Td>{solscan.tokenAmount.uiTokenAmount}</Td>
        </Tbody>
        </Tr>
        </Table>
        </TableContainer>
        </div> /*

   )

}


/* const fetcher = url => axios.get(url).then(res => res.data)

    export function querySolscan() {
        const solscan = await axios.get('https://public-api.solscan.io/account/tokens?account=DqQyyY4QdCsE924uAkNypDbReVUxUHjNzdNCsagjbAWG&limit=10')
        return {
            solscan
        }
    }

    export function queryMagicEden() {
        const {token, amount} = querySolscan()
        const magiceden = await axios.get('https://api-mainnet.magiceden.dev/v2/tokens/' + solscan.data[i].tokenAddress)





        for (var i = 0, l = solscan.data.length; i < l; i++) {
            results.token = await solscan.data[i].tokenAddress
            results.amount = await solscan.data[i].tokenAmount.uiAmountString
            //let jj = solscan.data.tokenAddress.toString();
            .catch(
                function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                }
            )
            console.log(results)
            results.name = await magiceden.data.name
            results.collection = await magiceden.data.collection
            await wait(200)
            loadingBarStatus(i,l)
        }
    }

    function loadingBarStatus(current: any, max: any) {
        return (<div className={styles.transactions}><Progress hasStripe value={current} max={max} /></div>)
    }

    useEffect(() => {
        getToken()
    }, [])

    return (

        <div className={styles.tokens}>

            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th textAlign='left'>Collection</Th>
                            <Th textAlign='left' pl='15px'>Name</Th>
                            <Th textAlign='left' pl='15px'>Amount</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            results.map(r => (
                                <Tr><Td>{r.collection}</Td><Td>{r.name}</Td><Td>{(Number(r.amount)).toFixed(2)}</Td></Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )

}*/
