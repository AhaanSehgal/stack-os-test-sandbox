//@ts-nocheck
import dynamic from 'next/dynamic'
import "authenticate-test-2/dist/index.css"
const Application = dynamic(
    () => import("authenticate-test-2"),
    { ssr: false }
)

const TriaLogin = () => {
    return (
        <Application
            logo="https://www.stackos.io/stackos-logo.svg"
            dappName="Stack OS"
            dappDomain={window.parent.origin}
            uiType={"yes"}
            primaryColor="#AAFF00"
            defaultChain="FUSE"
            supportedChains={["FUSE", "POLYGON"]}
        />
    )
}

export default TriaLogin
