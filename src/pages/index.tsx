import type { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDisconnect } from 'wagmi';
import LoginComponent from '@/components/login/LoginComponent';
import { Button, LoadingSpinner, Modal } from '@/components/common';
import dynamic from 'next/dynamic'
import { useTriaConnector, useSignMessage, useSendTransaction, useContractWrite, signMessage } from "@tria-sdk/connect";
import TriaLogin from "@/components/tria/TriaLogin"
import "authenticate-test-2/dist/index.css"
// import { useSignMessage } from "@tria-sdk/authenticate";

// const useSignMessage = await import("@tria-sdk/authenticate").default

// async function loadCustomHook() {
//     const useSignMessage = await import('@tria-sdk/authenticate');

//     return useSignMessage;
// }


// const useSignMessage = dynamic(
//     () => import("@tria-sdk/authenticate"),
//     { ssr: false }
// )


const Login: NextPage = () => {
    const { t } = useTranslation();
    //@ts-ignore
    const { globalData } = useTriaConnector({ authUrl: "https://auth-tria.vercel.app", walletUrl: "https://staging-tria-wallet.vercel.app" });
    const { disconnect } = useDisconnect();
    const [loginUnlinkedModalOpen, setLoginUnlinkedModalOpen] = useState(false);
    const [loginUnlinkedLoading, setLoginUnlinkedLoading] = useState(false);

    const [useCustomHook, setUseCustomHook] = useState(() => () => { });

    const [amount, setAmount] = useState(0.00001);
    const [senderAddress, setSenderAddress] = useState("");
    const [recepientAddress, setrecepientAddress] = useState("");
    const [contractDetails, setContractDetails] = useState();
    const [chainName, setChainName] = useState("POLYGON");
    const [tokenAddress, setTokenAddress] = useState("");
    const [showWallet, setShowWallet] = useState(false);
    const [message, setMessage] = useState("");
    const baseUrl="https://auth-tria.vercel.app"
;

    console.log("contractDetails--------------->",contractDetails);
    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         const { data: sign, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    //             message: "lalit this side ",
    //             chainName: "POLYGON"
    //         });
    //     }
    // }, [])

    // const {
    //     data: signature,
    //     isError,
    //     isLoading,
    //     isSuccess,
    //     signMessage,
    //   } = useSignMessage({
    //     message,
    //     chainName,
    //   });


    const contractPlaceholder={
      chainName,
      payToken: { tokenAddress, amount },
      contractDetails: contractDetails || {
        contractAddress: "0xd1fD14e3Cf4f96E63A1561681dc8765DF8f7Cf91",
        abi: [
          {
            inputs: [
              { internalType: "uint256", name: "_tokenID", type: "uint256" },
              { internalType: "address", name: "_claimer", type: "address" },
            ],
            name: "claimCoupon",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        functionName: "claimCoupon",
        args: [1, "0x5B0C3aD51E0C52A0F072Ba278f957E3Ac422513f"],
        // value: 1,
      },
    };
    
      const { data, sendTransaction } = useSendTransaction({
        amount,
        recepientAddress,
        chainName,
        tokenAddress,
      },baseUrl);
    
      const { data: contractwrite, write } = useContractWrite(contractDetails,baseUrl);
    
    //   const { data: contractread } = useContractRead({
    //     chainName,
    //     baseUrl: "https://staging.tria.so",
    //     contractDetails: {
    //       contractAddress: "0x5927Aa58fb36691A4be262c63955b47b67c6e641",
    //       abi: [
    //         {
    //           inputs: [
    //             { internalType: "uint256", name: "id", type: "uint256" },
    //             { internalType: "uint256", name: "amount", type: "uint256" },
    //           ],
    //           name: "getItemsNativePrice",
    //           outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    //           stateMutability: "view",
    //           type: "function",
    //         },
    //       ],
    //       functionName: "getItemsNativePrice",
    //       args: [1, 1],
    //       // value: 0,
    //     },
    //   });


    // {
    //   chainName,
    //   payToken: { tokenAddress, amount },
    //   contractDetails: contractDetails || {
    //     contractAddress: "0xd1fD14e3Cf4f96E63A1561681dc8765DF8f7Cf91",
    //     abi: [
    //       {
    //         inputs: [
    //           { internalType: "uint256", name: "_tokenID", type: "uint256" },
    //           { internalType: "address", name: "_claimer", type: "address" },
    //         ],
    //         name: "claimCoupon",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //     ],
    //     functionName: "claimCoupon",
    //     args: [1, "0x5B0C3aD51E0C52A0F072Ba278f957E3Ac422513f"],
    //     // value: 1,
    //   },
    // }

    const callSign = async () =>{
        const data = await signMessage({message: message, chainName: chainName},baseUrl);
        console.log('awaited data', data)    
    }
    

    // useEffect(() => {
    //     loadCustomHook().then(useSignMessage => setUseCustomHook(useSignMessage({
    //         message: "lalit this side ",
    //         chainName: "POLYGON"
    //     })));
    // }, []);

    
    // useEffect(() => {

    //    useCustomHook({})

    // }, [])



    // const [TriaConnectProvider2, setTriaConnectProvider2] = useState()
    // useEffect(() => {
    //     const importApplication = async () => {
    //         console.log("typeof Window --->", window)
    //         if (typeof window !== 'undefined') {
    //             try {
    //                 const { default: TriaConnectProvider } = await import('@tria-sdk/authenticate');
    //                 //@ts-ignore
    //                 setTriaConnectProvider2(<TriaConnectProvider />)
    //                 console.log(TriaConnectProvider2)
    //                 // Now you can use Application and TriaConnectProvider here
    //                 // Example:
    //                 console.log(Application);
    //                 console.log(TriaConnectProvider);
    //             } catch (error) {
    //                 console.error('Error importing @tria-sdk/authenticate:', error);
    //             }
    //         } else { console.log("window is not defined") }
    //     };

    //     importApplication();
    // }, []);

    return (
      <div>
        <Head>
          <title>Login - StackOS</title>
          <meta name="description" content="StackOS Login" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex h-screen w-screen flex-col items-center overflow-hidden overflow-y-auto bg-stk-blue-400 bg-cover bg-center bg-no-repeat duration-500 md:bg-[url('/assets/login/neon.png')]">
          <div className="max-w-[28rem] justify-center ">
            <h1 className="mt-2 text-center text-[2.5rem] font-black text-stk-green duration-500 md:block">
              {t("LOGIN_TITLE")}
            </h1>

            <div>
              {/* <div className="rounded-lg bg-stk-blue-400 px-2 pt-[3rem] duration-500 md:py-[1.75rem]">
                            <LoginComponent />
                        </div>           */}

              <div
                data-cy="login-without-wallet-button"
                onClick={() => setLoginUnlinkedModalOpen(true)}
                className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-md bg-stk-blue-400 py-2 text-sm font-medium text-stk-green duration-500"
              >
                {t("LOGIN_WITHOUT_WALLET_BUTTON")}
              </div>
              <div>
                <TriaLogin />
              </div>

              {/* <button className="text-white bg-blue-500  px-4 py-2 rounded-md absolute left-10" onClick={() => signMessage()}>Sign Message</button>
                        <button className="text-white bg-green-500  px-4 py-2 rounded-md absolute left-10 top-52" onClick={() => sendTransaction()}>send Transaction</button>
                        <button className="text-white bg-pink-500  px-4 py-2 rounded-md absolute left-10 top-80" onClick={() => write()}>call contract</button> */}

              <div className="flex flex-col w-[20%] absolute left-0">
                {/* Common for all buttons */}
                <input
                  type="text"
                  placeholder="Enter chain name"
                  value={chainName}
                  onChange={(e) => setChainName(e.target.value)}
                  className="border rounded-md px-2 py-1 mr-2"
                />
                <input
                  type="text"
                  placeholder="Enter token address"
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                  className=" mb-16 border rounded-md px-2 py-1 mr-2"
                />
                <input
                  type="text"
                  placeholder="Enter message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border rounded-md px-2 py-1 mr-2"
                />
                <button
                  className=" mb-16 text-white bg-blue-500  px-4 py-2 rounded-md mr-2"
                  onClick={() => callSign()}
                >
                  Sign Message
                </button>

                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  //@ts-ignore
                  onChange={(e) => setAmount(e.target.value)}
                  className="border rounded-md px-2 py-1 mr-2"
                />
                <input
                  type="text"
                  placeholder="Enter recipient address"
                  value={recepientAddress}
                  onChange={(e) => setrecepientAddress(e.target.value)}
                  className="border rounded-md px-2 py-1 mr-2"
                />
                <button
                  className=" mb-16 text-white bg-green-500  px-4 py-2 rounded-md"
                  onClick={() => sendTransaction()}
                >
                  send Transaction
                </button>

                <textarea
                  //@ts-ignore
                  type="text"
                  placeholder={JSON.stringify(contractPlaceholder, null, 2)}
                  value={JSON.stringify(contractDetails, null, 2)}
                  onChange={(e) => {
                    let parsed;
                    try {
                      parsed = JSON.parse(e.target.value);
                    } catch (err) {}
                    setContractDetails(parsed);
                  }}
                  className="border rounded-md px-2 py-1 mr-2 h-[200px] w-[300px]"
                />
                <button
                  className="text-white bg-pink-500  px-4 py-2 rounded-md"
                  onClick={() => {
                    if (contractDetails==undefined) {
                      alert("json is not valid");
                    } else {
                      write();
                    }
                  }}
                >
                  call contract
                </button>
              </div>

              {/* <Modal
                            showModal={loginUnlinkedModalOpen}
                            onCloseModal={() => setLoginUnlinkedModalOpen(false)}
                            closeButton
                        >
                            <div
                                data-cy="login-without-wallet-modal"
                                className="mx-auto flex w-[29.3rem] flex-col items-center justify-center text-center text-white duration-500"
                            >
                                {!loginUnlinkedLoading ? (
                                    <>
                                        <h2 className="text-xl font-semibold text-[#F9FAFB]">
                                            {t('LOGIN_WITHOUT_WALLET_MODAL_TITLE')}
                                        </h2>

                                        <p className="mt-[1.6rem] w-[19rem] font-normal text-stk-grey-200">
                                            {t('LOGIN_WITHOUT_WALLET_MODAL_DESCRIPTION')}
                                        </p>
                                        <Link href="/deploy">
                                            <a
                                                data-cy="login-without-wallet-confirm-button"
                                                className="mt-6 outline-none"
                                                onClick={() => {
                                                    setLoginUnlinkedLoading(true);
                                                    disconnect();
                                                }}
                                            >
                                                <Button className="w-full">
                                                    <span className="font-medium">
                                                        {t('LOGIN_WITHOUT_WALLET_MODAL_BUTTON')}
                                                    </span>
                                                </Button>
                                            </a>
                                        </Link>
                                    </>
                                ) : (
                                    <div className="my-[2.25rem]">
                                        <LoadingSpinner />
                                    </div>
                                )}
                            </div>
                        </Modal> */}
              {/* <Application /> */}
            </div>
          </div>
        </div>
      </div>
    );
};

export async function getStaticProps({ locale }: { locale: any }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default Login;
