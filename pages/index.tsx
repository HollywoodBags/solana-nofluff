import axios from 'axios'
import useSWR from 'swr'
import * as React from "react"
import styles from "../styles/Home.module.css";
import { Table, Tr, Thead, Th, Tbody, Td, TableContainer } from '@chakra-ui/react'

export default function Page () {

    const fetcher = url => fetch(url).then(r => r.json())
    let tokeninfo = []

    function solTap() {
        const {data: solscan} = useSWR('https://public-api.solscan.io/account/tokens?account=DqQyyY4QdCsE924uAkNypDbReVUxUHjNzdNCsagjbAWG&limit=10', fetcher)
        tokeninfo = solscan?.map(object => { return {tokenaddress: object.tokenAddress, tokenamount: object.tokenAmount.uiAmount}
    })
    }

    function magicTap() {
        solTap()
        for (let i = 0; i < tokeninfo?.length; i++) {
            let url = 'https://api-mainnet.magiceden.dev/v2/tokens/' + tokeninfo[i]?.tokenaddress
            setTimeout(() => {
                fetch(url)
                    .then(res => res.json())
                    .then(res => {
                        res?.data?.map(r => {
                            console.log(`Name:${r.name} Collection:${r.collection}`);
                        });
                    });
            }, 10000)
            //magic.map(m =>
        }
    }

    magicTap()



    /*for (let i = 0; i < solscan?.length; i++) {
        const fullarray = solscan.map(object => {
            object.tokenAddress, object.tokenAmount.uiAmount, magic.name, magic.collection
        })
        if (i >= solscan.length) {
            console.log(fullarray)
            return fullarray
        }
    }

    //console.log(fullarray)
    /* orEach(object => {
        object.id = i++
    })
    const tokens = solscan?.map(object => {
        return {...object.tokenAddress, ...object.id}
    })

    console.log(tokens?.id)
    //let {data: magic} = {}
    //solscan?.forEach(s => ({data: magic} = useSWR('https://api-mainnet.magiceden.dev/v2/tokens/'+ s.tokenAddress, fetcher)))


    /* let filterTokens(function (e) {
        console.log(e)
        //let {data: magic} = useSWR('https://api-mainnet.magiceden.dev/v2/tokens/'+ element, fetcher);
    }); */

    //solscan?.forEach(function (s) {
    //        console.log(s.tokenAddress)
    //    }
    // )

    // tokens.forEach(filterTokens)
    /* function linkTokens (token) {
        useSWR(() => 'https://api-mainnet.magiceden.dev/v2/tokens/' + token, fetcher)
        return magic
    } */
}

    /* return (
        <div className={styles.tokens}>
            <TableContainer>
                <Table variant='simple'>

                    <Thead>
                        <Tr>
                            <Th textAlign='left' pl='15px' pr='50px'>Token</Th>
                            <Th textAlign='left' pl='15px'>Amount</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {magic?.map((m) => (
                            <Tr><Td pr='15px' key={m.name}>{m.name}</Td><Td pl='15px' textAlign='left'
                                                                            key={m.collection}>{m.collection}</Td></Tr>))}

                        {solscan?.map((d) => (
                            <Tr><Td pr='15px' key={d.tokenAddress}>{d.tokenAddress}</Td><Td pl='15px' textAlign='left'
                                                                                            key={d.tokenAmount.uiAmount}>{d.tokenAmount.uiAmount}</Td></Tr>))}

                        <Tr><Th textAlign='left' pl='15px' pr='50px'>Name</Th><Th textAlign='left'
                                                                                  pl='15px'>Collection</Th></Tr>

                        {magic?.map((m) => (
                            <Tr><Td pr='15px' key={m.name}>{m.name}</Td><Td pl='15px' textAlign='left'
                                                                            key={m.collection}>{m.collection}</Td></Tr>))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}


/*
)
}


//<Box>
   //<p>{data.}</p>
//</Box>
//) */
