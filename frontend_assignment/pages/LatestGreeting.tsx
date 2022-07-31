import {Box} from "@mui/material";
import React from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import {Contract, ethers, providers} from "ethers";
import Greeter from "../artifacts/contracts/Greeters.sol/Greeters.json";


export default function LatestGreeting() {
    const [greeting, setGreeting] = React.useState("")

    async function subscribeToGreetEvent() {
        const provider = (await detectEthereumProvider()) as any

        await provider.request({method: "eth_requestAccounts"})

        const ethersProvider = new providers.Web3Provider(provider)

        const contract = new Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", Greeter.abi, ethersProvider)

        await contract.on("NewGreeting", (greeting, event) => {
            const formattedGreeting = ethers.utils.parseBytes32String(greeting)

            setGreeting(formattedGreeting)

            console.log("Received greeting = ", formattedGreeting)
            console.log("Event = ", event)
        })
    }

    React.useEffect(() => {
        subscribeToGreetEvent()
            .catch(console.log)
    }, [])

    return (
        <Box component="span" sx={{
            display: greeting == "" ? 'none' : 'block',
            p: 1,
            pl: 2,
            pr: 2,
            m: 2,
            bgcolor: 'white',
            color: 'grey.800',
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 2,
            fontSize: '0.875rem',
            fontWeight: '700',
        }}>{greeting}</Box>
    )
}