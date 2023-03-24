import { useRouter } from "next/router";
import Layout from "../../components/layout/Index"
import TransactionResult from "../../components/Search/TransactionResult"
import AddressResult from "../../components/Search/AddressResult"
import { useEffect, useState } from 'react'
const { getTransactionDetails } = require("../utils")

export default function Search() {
    const router = useRouter();
    const { hash } = router.query;
    const [transactionResult, setTransactionResult] = useState("false");
    const [addressResult, setAddressResult] = useState("false");
    useEffect(() => {
        const fetchData = async () => {
            if (hash.length >= 64) {
                await getTransactionDetails(hash,)
            }
            console.log("args", hash);
        }
        if (hash) {
            fetchData()
        }
    }, [hash])

    return (
        <div className=''>


            <AddressResult color="light" addressResult={{}} />
        </div>
    )
}
// / Settings.layout = Layout;
Search.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}