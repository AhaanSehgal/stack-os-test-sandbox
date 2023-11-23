"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  TriaConnectProvider: () => TriaConnectProvider,
  default: () => src_default,
  useContractRead: () => useContractRead,
  useContractWrite: () => useContractWrite,
  useSendTransaction: () => useSendTransaction,
  useSignMessage: () => useSignMessage,
  useTriaTransaction: () => useTriaTransaction
});
module.exports = __toCommonJS(src_exports);
var import_react6 = require("react");

// src/NavContext.tsx
var import_react = require("react");
var NavContext = (0, import_react.createContext)();
var NavContext_default = NavContext;

// src/connect/utils/constants.ts
var eventTypes = {
  logIn: "Log in",
  triaSignUp: "Tria Sign up",
  socialSignUp: "Social Sign up",
  signMessage: "Sign Message",
  send: "Send",
  disconnect: "Disconnect",
  switchChain: "Switch chain"
};

// src/connect/controllers/iframe.controller.ts
var IframeController = class {
  constructor({ parentUrl, walletUrl }) {
    this.parentUrl = parentUrl;
    this.walletUrl = walletUrl;
  }
  getVault({
    triaName,
    password,
    userId
  }) {
    const encodedParams = btoa(
      JSON.stringify({
        op: "getVault",
        triaName,
        password,
        userId
      })
    );
    const iframeUrl = `${this.walletUrl}/login?params=${encodedParams}`;
    const eventType = eventTypes.logIn;
    return { iframeUrl, eventType };
  }
  createAccount({ triaName, password }) {
    const encodedParams = btoa(
      JSON.stringify({
        op: "createAccount",
        triaName,
        password
      })
    );
    const iframeUrl = `${this.walletUrl}/login?params=${encodedParams}`;
    const eventType = eventTypes.triaSignUp;
    return { iframeUrl, eventType };
  }
  socialogin({
    triaName,
    password,
    platform,
    userId,
    isPasswordLess
  }) {
    const encodedParams = btoa(
      JSON.stringify({
        op: "socialogin",
        triaName,
        password,
        userId,
        platform,
        isPasswordLess
      })
    );
    const iframeUrl = `${this.walletUrl}/login?params=${encodedParams}`;
    const eventType = eventTypes.socialSignUp;
    return { iframeUrl, eventType };
  }
  signMessage(chainName, message, loginType, triaName, socialName, userId, input, appDomain, appLogo) {
    return __async(this, null, function* () {
      const encodedParams = btoa(
        JSON.stringify({
          chainName,
          message,
          loginType,
          triaName,
          socialName,
          userId,
          input,
          appDomain,
          appLogo
        })
      );
      const iframeUrl = `${this.walletUrl}/sign?params=${encodedParams}`;
      const signWindow = window.open(iframeUrl, "_blank", `popup,width=400,height=500`);
      const eventType = eventTypes.signMessage;
      return { iframeUrl, eventType };
    });
  }
  send(chainName, payload) {
    return __async(this, null, function* () {
      const encodedParams = btoa(
        JSON.stringify({
          chainName,
          payload
        })
      );
      const iframeUrl = `${this.walletUrl}/send?params=${encodedParams}`;
      const sendWindow = window.open(iframeUrl, "_blank", `popup,width=400,height=500`);
      const eventType = eventTypes.send;
      return { iframeUrl, eventType };
    });
  }
  approve(triaName, chainName, tokenAddress, amount) {
    const encodedParams = btoa(
      JSON.stringify({
        chainName,
        triaName,
        tokenAddress,
        amount
      })
    );
    const iframeUrl = `${this.walletUrl}/approve?params=${encodedParams}`;
    const approveWindow = window.open(iframeUrl, "_blank", `popup,width=400,height=500`);
    const eventType = "Approve";
    return { iframeUrl, eventType };
  }
};

// src/index.tsx
var import_core = require("@tria-sdk/core");

// src/Components/TriaWalletButton.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var TriaWalletButton = ({ bgColor }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "134", height: "134", viewBox: "0 0 134 134", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { filter: "url(#filter0_d_1316_13027)", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "35", y: "35", width: "64", height: "64", rx: "32", fill: "#101010" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { filter: "url(#filter1_d_1316_13027)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "37.5098", y: "37.5098", width: "58.9804", height: "58.9804", rx: "29.4902", fill: "url(#paint1_linear_1316_13027)", "shape-rendering": "crispEdges" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { "clip-path": "url(#clip0_1316_13027)", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M81 53H53V81H81V53ZM67.8533 61.2654V64.9058L73.8652 62.5352V65.2285C73.8652 65.8062 73.5281 66.3228 73.0206 66.5229L67.8533 68.5606V65.8728C67.8498 65.2986 67.5136 64.7863 67.0087 64.5872L62.686 62.8826C62.1784 62.6824 61.8414 62.1658 61.8414 61.5881V58.8948L67.8533 61.2654ZM67.8533 68.5767V69.2782H67.8618V76.8857H65.3848V71.2581L62.686 70.1938C62.1784 69.9937 61.8414 69.4771 61.8414 68.8993V66.206L67.8533 68.5767Z", fill: "#101010" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "37.7598", y: "37.7598", width: "58.4804", height: "58.4804", rx: "29.2402", stroke: bgColor, "stroke-width": "0.5", "shape-rendering": "crispEdges" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", { id: "filter0_d_1316_13027", x: "0", y: "0", width: "134", height: "134", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feColorMatrix", { in: "SourceAlpha", type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result: "hardAlpha" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feOffset", {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: "17.5" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feComposite", { in2: "hardAlpha", operator: "out" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feColorMatrix", { type: "matrix", values: "0 0 0 0 0.567674 0 0 0 0 0.48 0 0 0 0 1 0 0 0 0.35 0" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feBlend", { mode: "normal", in2: "BackgroundImageFix", result: "effect1_dropShadow_1316_13027" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feBlend", { mode: "normal", in: "SourceGraphic", in2: "effect1_dropShadow_1316_13027", result: "shape" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", { id: "filter1_d_1316_13027", x: "6.50977", y: "6.50977", width: "120.98", height: "120.98", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feColorMatrix", { in: "SourceAlpha", type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result: "hardAlpha" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feOffset", {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: "15.5" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feComposite", { in2: "hardAlpha", operator: "out" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feColorMatrix", { type: "matrix", values: "0 0 0 0 0.567674 0 0 0 0 0.48 0 0 0 0 1 0 0 0 0.68 0" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feBlend", { mode: "normal", in2: "BackgroundImageFix", result: "effect1_dropShadow_1316_13027" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feBlend", { mode: "normal", in: "SourceGraphic", in2: "effect1_dropShadow_1316_13027", result: "shape" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "paint0_linear_1316_13027", x1: "35", y1: "35", x2: "112.218", y2: "65.1631", gradientUnits: "userSpaceOnUse", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { "stop-color": "#101010" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", "stop-color": bgColor })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "paint1_linear_1316_13027", x1: "37.5098", y1: "37.5098", x2: "108.671", y2: "65.3071", gradientUnits: "userSpaceOnUse", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { "stop-color": bgColor }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", "stop-color": bgColor })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: "clip0_1316_13027", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "53", y: "53", width: "28", height: "28", rx: "6", fill: "#101010" }) })
    ] })
  ] }) });
};

// src/Components/WalletCloseButton.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var WalletCloseButton = ({ onClick: han }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("svg", { width: "110", height: "38", viewBox: "0 0 110 38", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M0 35H2.34523C11.1426 35 19.6355 31.7787 26.22 25.9443L30.9961 21.7123C44.8891 9.4021 65.8643 9.67334 79.4343 22.3387L82.6264 25.318C89.2925 31.5397 98.0714 35 107.19 35H110V37.5H0V35Z", fill: "#101010" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M60.9401 22.2125L56.0501 27.1025C55.4726 27.68 54.5276 27.68 53.9501 27.1025L49.0601 22.2125", stroke: "#FAFAFA", strokeOpacity: "0.8", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
};
var WalletCloseButton_default = WalletCloseButton;

// src/index.tsx
var import_connect = require("@tria-sdk/connect");

// src/hooks/useContractWrite.tsx
var import_react2 = require("react");

// src/utils/shared.ts
var createEncodedData = (data) => {
  const encodedParams = btoa(
    JSON.stringify(data)
  );
  return encodedParams;
};
var createIframe = (iframeUrl, hookName) => {
  const iframeContainer = document.createElement("div");
  iframeContainer.id = hookName;
  iframeContainer.className = "bg flex justify-between bg-transparent absolute bottom-4 right-2";
  iframeContainer.style.position = "absolute";
  iframeContainer.style.bottom = "4px";
  iframeContainer.style.right = "2px";
  const innerContainer = document.createElement("div");
  innerContainer.className = "mb-4 mr-2 relative rounded-[20px]";
  const iframeWrapper = document.createElement("div");
  iframeWrapper.className = "h-[586px] w-[312px] rounded-[20px] overflow-hidden";
  const iframe2 = document.createElement("iframe");
  iframe2.width = "312";
  iframe2.height = "586";
  iframe2.src = iframeUrl;
  iframe2.allow = "publickey-credentials-get";
  iframe2.style.border = "none";
  iframeWrapper.appendChild(iframe2);
  innerContainer.appendChild(iframeWrapper);
  iframeContainer.appendChild(innerContainer);
  document.body.appendChild(iframeContainer);
};

// src/hooks/useContractWrite.tsx
var authUrl = "https://auth.tria.so";
var useContractWrite = (calldata) => {
  const [data, setData] = (0, import_react2.useState)("");
  const [isLoading, setIsLoading] = (0, import_react2.useState)(false);
  const [isError, setIsError] = (0, import_react2.useState)(false);
  const write = () => {
    setIsLoading(true);
    const iframeEncodedData = createEncodedData(calldata);
    const signIframeUrl = `${authUrl}/mint/${iframeEncodedData}`;
    createIframe(signIframeUrl, "sdkMint");
    setIsLoading(false);
    return signIframeUrl;
  };
  (0, import_react2.useEffect)(() => {
    const detect = (event) => {
      var _a;
      console.log("event---------------->", event);
      if (event.origin !== authUrl)
        return;
      let eventData;
      try {
        eventData = JSON.parse(event.data);
      } catch (err) {
        eventData = event.data;
      }
      if ((eventData == null ? void 0 : eventData.type) === "closeIframe" && (eventData == null ? void 0 : eventData.callFrom) == "mint") {
        setData(eventData == null ? void 0 : eventData.data);
        setIsLoading(false);
        (_a = document.getElementById("sdkMint")) == null ? void 0 : _a.remove();
      }
    };
    window.addEventListener("message", detect);
    return () => {
      window.removeEventListener("message", detect);
    };
  }, []);
  return { data, isLoading, isError, isSuccess: !!data, write };
};

// src/hooks/useSendTransaction.tsx
var import_react3 = require("react");
var authUrl2 = "https://auth.tria.so";
var useSendTransaction = (calldata) => {
  const [data, setData] = (0, import_react3.useState)("");
  const [isLoading, setIsLoading] = (0, import_react3.useState)(false);
  const [isError, setIsError] = (0, import_react3.useState)(false);
  const sendTransaction = () => {
    setIsLoading(true);
    const iframeEncodedData = createEncodedData(calldata);
    const signIframeUrl = `${authUrl2}/send/${iframeEncodedData}`;
    const iframe2 = createIframe(signIframeUrl, "sdkSend");
    setIsLoading(false);
    return signIframeUrl;
  };
  (0, import_react3.useEffect)(() => {
    const detect = (event) => {
      var _a;
      if (event.origin !== authUrl2)
        return;
      let eventData;
      try {
        eventData = JSON.parse(event.data);
      } catch (err) {
        eventData = event.data;
      }
      if ((eventData == null ? void 0 : eventData.type) === "closeIframe" && (eventData == null ? void 0 : eventData.callFrom) == "send") {
        setData(eventData == null ? void 0 : eventData.data);
        setIsLoading(false);
        (_a = document.getElementById("sdkSend")) == null ? void 0 : _a.remove();
      }
    };
    window.addEventListener("message", detect);
    return () => {
      window.removeEventListener("message", detect);
    };
  }, []);
  return { data, isLoading, isError, isSuccess: !!data, sendTransaction };
};

// src/hooks/useSignMessage.tsx
var import_react4 = require("react");
var authUrl3 = "https://auth.tria.so";
var useSignMessage = (calldata) => {
  const [data, setData] = (0, import_react4.useState)("");
  const [isLoading, setIsLoading] = (0, import_react4.useState)(false);
  const [isError, setIsError] = (0, import_react4.useState)(false);
  const signMessage = () => {
    setIsLoading(true);
    const iframeEncodedData = createEncodedData(calldata);
    const signIframeUrl = `${authUrl3}/signMessage/${iframeEncodedData}`;
    createIframe(signIframeUrl, "sdkSign");
    setIsLoading(false);
    return signIframeUrl;
  };
  (0, import_react4.useEffect)(() => {
    const detect = (event) => {
      var _a;
      if (event.origin !== authUrl3)
        return;
      let eventData;
      try {
        eventData = JSON.parse(event.data);
      } catch (err) {
        eventData = event.data;
      }
      if ((eventData == null ? void 0 : eventData.type) === "closeIframe" && (eventData == null ? void 0 : eventData.callFrom) == "sign") {
        console.log("event", eventData);
        setData(eventData == null ? void 0 : eventData.data);
        setIsLoading(false);
        (_a = document.getElementById("sdkSign")) == null ? void 0 : _a.remove();
      }
    };
    window.addEventListener("message", detect);
    return () => {
      window.removeEventListener("message", detect);
    };
  }, []);
  return { data, isLoading, isError, isSuccess: !!data, signMessage };
};

// src/hooks/useContractRead.tsx
var import_react5 = require("react");
var import_ethers = require("ethers");
var import_web = require("@tria-sdk/web");
var useContractRead = (params) => {
  const [data, setData] = (0, import_react5.useState)("");
  const [isLoading, setIsLoading] = (0, import_react5.useState)(false);
  const [isError, setIsError] = (0, import_react5.useState)(false);
  const read = () => __async(void 0, null, function* () {
    try {
      setIsLoading(true);
      const { contractDetails, baseUrl = "https://prod.tria.so" } = params;
      const walletType = { embedded: true };
      const wallet = new import_web.WalletController({
        baseUrl,
        walletType
      });
      const res = yield wallet == null ? void 0 : wallet.readContract(contractDetails);
      const value = import_ethers.ethers.utils.formatEther(res.data);
      console.log("getItemsNativePrice", res.data.toString(), "->", value);
      setData(value);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
    }
  });
  return { data, isLoading, isError, isSuccess: !!data, read };
};

// src/index.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
window.Buffer = window.Buffer || require("buffer").Buffer;
var iframe = new IframeController(
  "https://opensea.com",
  "https://wallet.tria.so"
);
console.log("iframe", iframe);
var authUrl4 = "https://auth.tria.so";
var authController = new import_core.AuthController("https://staging.tria.so");
var createEncodedData2 = (data) => {
  const encodedParams = btoa(
    JSON.stringify(data)
  );
  return encodedParams;
};
var useTriaTransaction = () => {
  const createIframe2 = (iframeUrl) => {
    const iframeContainer = document.createElement("div");
    iframeContainer.id = "triaWallet";
    iframeContainer.className = "bg flex justify-between bg-transparent absolute bottom-4 right-2";
    iframeContainer.style.position = "absolute";
    iframeContainer.style.bottom = "4px";
    iframeContainer.style.right = "2px";
    const innerContainer = document.createElement("div");
    innerContainer.className = "mb-4 mr-2 relative rounded-[20px]";
    const iframeWrapper = document.createElement("div");
    iframeWrapper.className = "h-[586px] w-[312px] rounded-[20px] overflow-hidden";
    const iframe2 = document.createElement("iframe");
    iframe2.width = "312";
    iframe2.height = "586";
    iframe2.src = iframeUrl;
    iframe2.allow = "publickey-credentials-get";
    iframe2.style.border = "none";
    iframeWrapper.appendChild(iframe2);
    innerContainer.appendChild(iframeWrapper);
    iframeContainer.appendChild(innerContainer);
    document.body.appendChild(iframeContainer);
  };
  const sendTransaction = (sendDataFromDapp) => __async(void 0, null, function* () {
    const iframeEncodedData = createEncodedData2(sendDataFromDapp);
    const sendIframeUrl = `${authUrl4}/send/${iframeEncodedData}`;
    const iframe2 = createIframe2(sendIframeUrl);
    return sendIframeUrl;
  });
  const signMessage = (message) => __async(void 0, null, function* () {
    const iframeEncodedData = createEncodedData2(message);
    const signIframeUrl = `${authUrl4}/signMessage/${iframeEncodedData}`;
    const iframe2 = createIframe2(signIframeUrl);
    return signIframeUrl;
  });
  const callContract = (data) => __async(void 0, null, function* () {
    const iframeEncodedData = createEncodedData2(data);
    const signIframeUrl = `${authUrl4}/mint/${iframeEncodedData}`;
    const iframe2 = createIframe2(signIframeUrl);
    return signIframeUrl;
  });
  return {
    sendTransaction,
    signMessage,
    callContract
  };
};
var TriaConnectProvider = () => {
  const [renderAuthIframe, setRenderAuthIframe] = (0, import_react6.useState)(false);
  (0, import_react6.useEffect)(() => {
    const getQueryParam = (param) => {
      return new URLSearchParams(window.location.search).get(param);
    };
    const isVerified = getQueryParam("verified") === "true";
    setRenderAuthIframe(isVerified);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: renderAuthIframe && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "iframe",
    {
      src: "https://auth.tria.so/verified",
      title: "Auth Verification",
      style: { display: "none" }
    }
  ) });
};
var Application = ({ dappName, dappDomain, uiType, logo, primaryColor }) => {
  const [view, setView] = (0, import_react6.useState)("Home");
  const [triaName, setTriaName] = (0, import_react6.useState)(null);
  const [userAddress, setUserAddress] = (0, import_react6.useState)(null);
  const [email, setEmail] = (0, import_react6.useState)("");
  const [showWallet, setShowWallet] = (0, import_react6.useState)(false);
  const [isDarkMode, setIsDarkMode] = (0, import_react6.useState)(true);
  const [showOnboarding, setShowOnboarding] = (0, import_react6.useState)(false);
  const [appDomain, setAppDomain] = (0, import_react6.useState)();
  const [iframeURL, setIframeURL] = (0, import_react6.useState)();
  const WALLET_BASE_URL = "https://wallet.tria.so/";
  const [accessToken, setAccessToken] = (0, import_react6.useState)();
  const darkMode = true;
  const [authIFrameUrl, setAuthIFrameUrl] = (0, import_react6.useState)("");
  const { account } = (0, import_connect.useAccount)();
  (0, import_react6.useEffect)(() => {
    if (!account && triaName) {
      console.log("Account is null, reloading the page");
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, [account, triaName]);
  (0, import_react6.useEffect)(() => {
    setInterval(() => {
      var _a, _b, _c;
      if (localStorage.getItem("tria.wallet.store") !== null) {
        setShowOnboarding(false);
        setTriaName((_a = JSON.parse(localStorage.getItem("tria.wallet.store"))) == null ? void 0 : _a.triaName);
        setUserAddress((_c = (_b = JSON.parse(localStorage.getItem("tria.wallet.store"))) == null ? void 0 : _b.evm) == null ? void 0 : _c.address);
      } else if (localStorage.getItem("wagmi.connected") === true) {
        setShowOnboarding(false);
        const wallet = localStorage.getItem("wagmi.connected");
        console.log(wallet);
      } else {
        setShowOnboarding(true);
      }
    }, 500);
  }, []);
  (0, import_react6.useEffect)(() => {
    setInterval(() => {
      setShowOnboarding(true);
    }, 1e3);
  }, []);
  (0, import_react6.useEffect)(() => {
    const item = localStorage.getItem("access_token");
    setAccessToken(item);
    setAppDomain(window.parent.origin);
  }, [triaName]);
  const fromDapp = true;
  (0, import_react6.useEffect)(() => {
    const encodedParams = btoa(JSON.stringify({ triaName, userAddress, appDomain, darkMode, logo, accessToken, primaryColor, fromDapp }));
    console.log(encodedParams, triaName, accessToken, logo, appDomain, darkMode, primaryColor, fromDapp);
    setIframeURL(`https://wallet.tria.so/${encodedParams}`);
  }, [triaName]);
  (0, import_react6.useEffect)(() => {
    console.log("WALLET URL ---->", iframeURL);
  }, [iframeURL]);
  const nav_context_object = {
    view,
    setView,
    triaName,
    setTriaName,
    dappName,
    logo,
    authController,
    setShowWallet,
    setShowOnboarding,
    showOnboarding,
    email,
    setEmail
  };
  (0, import_react6.useEffect)(() => {
    console.log("log from sdk ----->", dappName, logo);
    if ((dappName == null ? void 0 : dappName.length) > 0 && (logo == null ? void 0 : logo.length) > 0) {
      setAuthIFrameUrl(`https://auth.tria.so/?dappName=${dappName}&dappLogo=${logo}&stackui=${uiType}&dappDomain=${dappDomain}`);
    }
  }, [dappName, logo]);
  (0, import_react6.useEffect)(() => {
    const handleClickOutside = (event) => {
      const iframeElement = document.getElementById("triaWallet");
      if (iframeElement && !iframeElement.contains(event.target)) {
        setShowWallet(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(NavContext_default.Provider, { value: nav_context_object, children: [
    !triaName && showOnboarding && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "rounded-[20px] overflow-hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("iframe", { width: "314", height: "586", src: authIFrameUrl, allow: "publickey-credentials-get" }) }),
    showWallet && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { id: "triaWallet", className: "bg flex  justify-between bg-transparent absolute bottom-4 right-2  ", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mb-4 mr-2 relative rounded-[20px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "absolute w-[312px] h-[40px] rounded-[20px] top-[-38px] flex items-end justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "cursor-pointer", onClick: () => {
        setShowWallet(false);
      }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(WalletCloseButton_default, {}) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "h-[586px] w-[312px] rounded-[20px] overflow-hidden bg-[#101010]", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "iframe",
        {
          width: "312",
          height: "586",
          src: iframeURL,
          allow: "clipboard-read; clipboard-write; publickey-credentials-get",
          style: { backgroundColor: "#101010" }
        }
      ) })
    ] }) }),
    triaName && !showWallet && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "div",
      {
        className: "wallet_icon absolute w-[80px] bottom-4 right-8 cursor-pointer",
        onClick: () => {
          setShowWallet(!showWallet);
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TriaWalletButton, { bgColor: primaryColor })
      }
    )
  ] }) });
};
var src_default = Application;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TriaConnectProvider,
  useContractRead,
  useContractWrite,
  useSendTransaction,
  useSignMessage,
  useTriaTransaction
});
//# sourceMappingURL=index.js.map