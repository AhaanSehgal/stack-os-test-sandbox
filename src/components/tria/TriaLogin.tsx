//@ts-nocheck
import dynamic from 'next/dynamic'

const Application = dynamic(
    () => import("authenticate-test-2"),
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
            />
        </div>
    )
}

export default TriaLogin
