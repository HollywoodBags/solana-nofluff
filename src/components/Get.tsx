import axios from "axios";
import {FC, useEffect, useState} from "react";
import * as React from "react";
import styles from "../../styles/Home.module.css";
import { ListItem, UnorderedList } from "@chakra-ui/react"

export const GetTrans: FC = ({ }) => {

        const [data, setData] = useState<any[]>([])

        async function starscream() {
        const response = await axios.get('https://public-api.solscan.io/account/transactions?account=krqh2uJumnYM6T1rtqLj6KU9HJ6tqHbw1aDwUVt7Ujf&limit=10');
        const data = await response.data
        setData(data)
        }

        useEffect(() => {
            starscream()
        }, [])

        return (
            <div className={styles.transactions}>
                <ul>
                    {
                        data.map(d => (
                            <li key={d.txHash}>Block:{d.blockTime} Transaction:{d.txHash}</li>))

                    }
                </ul>
            </div>
        )

// data.map(d =>
            // <li>{data.txHash}</li>

        /* starscream().then(
            (result) => {
                console.log("ok")
            })

        function optimus () {
            response.data.map((res: any) => {
                return (
                    <li key={res.index}>
                        {res.txHash}
                    </li>)
            })
        }

        optimus()*/

    }

export default GetTrans
