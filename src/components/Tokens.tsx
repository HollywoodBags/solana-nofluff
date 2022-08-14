import axios from "axios";
import {FC, useEffect, useState} from "react";
import * as React from "react";
import styles from "../../styles/Home.module.css";
import { Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Progress} from "@chakra-ui/react";

export const GetTokens: FC = ({ }) => {

    const [results, setMagic] = useState<any[]>([])
    const wait = (ms:any) => new Promise(resolve => setTimeout(resolve, ms))

    async function getToken() {
        const solscan = await axios.get('https://public-api.solscan.io/account/tokens?account=DqQyyY4QdCsE924uAkNypDbReVUxUHjNzdNCsagjbAWG&limit=10').catch(
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
        );
        for (var i = 0, l = solscan.data.length; i < l; i++) {
            results.token = await solscan.data[i].tokenAddress
            results.amount = await solscan.data[i].tokenAmount.uiAmountString
            //let jj = solscan.data.tokenAddress.toString();
            const magiceden = await axios.get('https://api-mainnet.magiceden.dev/v2/tokens/' + solscan.data[i].tokenAddress).catch(
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

        setMagic(results)
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

}

export default GetTokens
