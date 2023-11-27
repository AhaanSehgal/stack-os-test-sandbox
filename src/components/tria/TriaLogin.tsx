//@ts-nocheck
import dynamic from 'next/dynamic'
import "@tria-sdk/authenticate/dist/index.css"
const Application = dynamic(
    () => import("@tria-sdk/authenticate"),
    { ssr: false }
)

const TriaLogin = () => {
    return (
        <Application dappName={"Stack OS"} logo="https://www.stackos.io/stackos-logo.svg" uiType={"yes"} primaryColor="#AAFF00" dappDomain={window?.parent.origin} defaultChain=“FUSE” supportedChains={[“FUSE”, “POLYGON”]} />
    )
}

export default TriaLogin
