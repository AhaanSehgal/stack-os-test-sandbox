//@ts-nocheck
import dynamic from 'next/dynamic'

const Application = dynamic(
    () => import("@tria-sdk/authenticate"),
    { ssr: false }
)

const TriaLogin = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                
            }}

        >
            <Application
                logo="https://www.stackos.io/stackos-logo.svg"
                dappName="Stack OS"
                dappDomain="https://www.stackos.io"
                uiType={'yes'}
                triaStaging={true}
                primaryColor="#AAFF00"
                defaultChain="FUSE"
                supportedChains={['FUSE', 'POLYGON', 'MUMBAI']}
                buttonPosition={{ x: 200, y: 200 }}
                darkMode={true}
                clientId="7db16867-55c4-4abf-90d9-0f523e29b7c3"
            />
        </div>
    )
}

export default TriaLogin
