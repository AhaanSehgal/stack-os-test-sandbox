import { BN } from 'bn.js';

export const PAYPAL_KEY =
    'ARalCz_STE44-0TQZLuwoz_TX1ZaM53A5AstLGeUpq_mWSkxCdBqGitA0JRBkez_51NkmKafJCo1HHei';

export const errorResponse = 'Unauthorized';

export const supportedRegisteries = [
    { name: 'Select Registry', server: '' },
    { name: 'Docker', server: 'https://index.docker.io/v1/' },
];

export const XCT_SIZE = '100000000000000000';

export const CONVERTOR = 1e18;

export const invalidLoginPopupObj = {
    toastShow: true,
    toastState: 'Error',
    toastMessage: 'Invalid Session. Please login again to continue to use StackOS.',
};

export const errorDefaultObj = {
    toastShow: false,
    toastState: 'Error',
    toastMessage: '',
};

export const allowedNetworkIds = [56, 137, 31337, 4002, 80001];

export const tornadoCashEnv = (address: any) => [
    {
        name: 'NET_ID',
        value: '"1"',
    },
    {
        name: 'HTTP_RPC_URL',
        value: 'https://mainnet.infura.io/v3/673e38aa7f0743cd96a6860d78ec2393',
    },
    {
        name: 'WS_RPC_URL',
        value: 'wss://mainnet.infura.io/ws/v3/673e38aa7f0743cd96a6860d78ec2393',
    },
    {
        name: 'ORACLE_RPC_URL',
        value: 'https://mainnet.infura.io/v3/673e38aa7f0743cd96a6860d78ec2393',
    },
    {
        name: 'PRIVATE_KEY',
        value: 'Private_Key',
    },
    { name: 'REWARD_ACCOUNT', value: address },
    {
        name: 'REDIS_URL',
        value: `"redis://torredis-${address}/0"`,
    },
    {
        name: 'APP_PORT',
        value: '"8000"',
    },
    { name: 'REGULAR_TORNADO_WITHDRAW_FEE', value: '"0.05"' },
    { name: 'MINING_SERVICE_FEE', value: '"0.05"' },
    { name: 'CONFIRMATIONS', value: '"4"' },
    { name: 'BASE_FEE_RESERVE_PERCENTAGE', value: '"25"' },
    { name: 'MAX_GAS_PRICE', value: '"1000"' },
    { name: 'AGGREGATOR', value: '0x8cb1436F64a3c33aD17bb42F94e255c4c0E871b2' },
];

export const commonTornadoEnv = (address: any) => [
    {
        name: 'NET_ID',
        value: '"1"',
    },
    {
        name: 'HTTP_RPC_URL',
        value: 'https://mainnet.infura.io/v3/673e38aa7f0743cd96a6860d78ec2393',
    },
    {
        name: 'WS_RPC_URL',
        value: 'wss://mainnet.infura.io/ws/v3/673e38aa7f0743cd96a6860d78ec2393',
    },
    {
        name: 'ORACLE_RPC_URL',
        value: 'https://mainnet.infura.io/v3/673e38aa7f0743cd96a6860d78ec2393',
    },
    { name: 'REWARD_ACCOUNT', value: address },
    {
        name: 'REDIS_URL',
        value: `"redis://torredis-${address}/0"`,
    },
    {
        name: 'APP_PORT',
        value: '"8000"',
    },
    { name: 'REGULAR_TORNADO_WITHDRAW_FEE', value: '"0.05"' },
    { name: 'MINING_SERVICE_FEE', value: '"0.05"' },
    { name: 'CONFIRMATIONS', value: '"4"' },
    { name: 'BASE_FEE_RESERVE_PERCENTAGE', value: '"25"' },
    { name: 'MAX_GAS_PRICE', value: '"1000"' },
    { name: 'AGGREGATOR', value: '0x8cb1436F64a3c33aD17bb42F94e255c4c0E871b2' },
];

export const ROLE = {
    READ: '0x917ec7ea41e5f357223d15148fe9b320af36ca576055af433ea3445b39221799',
    CONTRACT_BASED_DEPLOYER: '0x503cf060389b91af8851125bd70ce66d16d12330718b103fc7674ef6d27e70c9',
    ACCESS_MANAGER: '0x73d57861095ed1ff7b0e5c00e25f9fc922cf9164e617149ee7073f371364c954',
    BILLING_MANAGER: '0xfc4d5b8dc48f53079d1753f1e53aabb674d1bdef461b3803bef96591e9ef3969',
};

export const CPU = {
    CPU_STANDARD: 100,
    CPU_INTENSIVE: 200,
    GPU_STANDARD: 200,
};
export const MEMMORY = {
    CPU_STANDARD: 100,
    CPU_INTENSIVE: 200,
    GPU_STANDARD: 100,
};

export const BLANK_ADDRESS = '0x0000000000000000000000000000000000000000';

export const STEP_UP_FACTOR = new BN(10 ** 12);

export const STORAGE = 100;
export const BANDWIDTH = 100;

export const MIN_RES_TYPE_LENGTH = 3;

export const KFRAG_SHARES = 9;
export const DECRYPTION_THRESHOLD = 5;

export const OWNER_THRESHOLD_API_URL = 'api/v1/re-encryption';
export const ROLE_THRESHOLD_API_URL = 'api/v1/re-encryption/role';

export const URSULA_PK_LIST = [
    process.env.NEXT_PUBLIC_URSULA_PK_1,
    process.env.NEXT_PUBLIC_URSULA_PK_2,
    process.env.NEXT_PUBLIC_URSULA_PK_3,
    process.env.NEXT_PUBLIC_URSULA_PK_4,
    process.env.NEXT_PUBLIC_URSULA_PK_5,
    process.env.NEXT_PUBLIC_URSULA_PK_6,
    process.env.NEXT_PUBLIC_URSULA_PK_7,
    process.env.NEXT_PUBLIC_URSULA_PK_8,
    process.env.NEXT_PUBLIC_URSULA_PK_9,
];

export const URSULA_URL_LIST = [
    process.env.NEXT_PUBLIC_URSULA_1,
    process.env.NEXT_PUBLIC_URSULA_2,
    process.env.NEXT_PUBLIC_URSULA_3,
    process.env.NEXT_PUBLIC_URSULA_4,
    process.env.NEXT_PUBLIC_URSULA_5,
    process.env.NEXT_PUBLIC_URSULA_6,
    process.env.NEXT_PUBLIC_URSULA_7,
    process.env.NEXT_PUBLIC_URSULA_8,
    process.env.NEXT_PUBLIC_URSULA_9,
];

// export const ENCRYPT_ARGS = {
//     kfragCount: KFRAG_SHARES,
//     kfragThreshold: DECRYPTION_THRESHOLD,
//     ursulaNFTOwnerAPI: OWNER_THRESHOLD_API_URL,
//     ursulaRoleAPI: ROLE_THRESHOLD_API_URL,
//     ursulaPKList: URSULA_PK_LIST,
//     ursulaURLList: URSULA_URL_LIST,
// };
export const URSULA_PARAMS = {
    kfragCount: 9,
    kfragThreshold: 5,
    ursulaNFTOwnerAPI: 'api/v1/re-encryption',
    ursulaRoleAPI: 'api/v1/re-encryption/role',
    ursulaClusterAPI: 'api/v1/re-encryption',
    ursulaPKList: [
        'RPsASVg5I1V5b8MuUHgyi/G4VUrzOK60khpJcGTJP0E=',
        'W/wO/HdKZmdZkr6yVGNLHRgrK3UeAQcqV/47YXf9JXY=',
        'b1f40hVJWz275hMouTkH3gXCaNlm5TCCyd4lwP1YfSI=',
        'zTSiDwdKrs0rd3kD43pyYKZ6RQnKx6UoriUQ21NuZ3M=', // zTSiDwdKrs0rd3kD43pyYKZ6RQnKx6UoriUQ21NuZ3M=
        'ps9s1IqHdenPwWnk/nUw/CJG/fcW3v2++FR4zm9dmFo=',
        'k66TZVHYIyZOSMGQsxFTNKAYRK1hBpoSM/5ksy/xtnU=',
        'hnMENeBpsyeygD7WyQ0u8kaIHZum2kFKqT84zDO4jws=',
        'RPsASVg5I1V5b8MuUHgyi/G4VUrzOK60khpJcGTJP0E=',
        'gPB9gCOIDxfMzx/C1P52KCjBgp2fjpDdTOmaOPOmshc=',
    ],
    ursulaURLList: [
        'http://127.0.0.1:5009',
        'http://127.0.0.1:5001',
        'http://127.0.0.1:5002',
        'http://127.0.0.1:5003',
        'http://127.0.0.1:5004',
        'http://127.0.0.1:5005',
        'http://127.0.0.1:5006',
        'http://127.0.0.1:5007',
        'http://127.0.0.1:5008',
        // "https://ursula0-po3c904a5f23f868f309a6db2a428529f33848f517-authority.stackos.io",
        // "https://ursula1-po3c904a5f23f868f309a6db2a428529f33848f517-authority.stackos.io",
        // "https://ursula2-po3c904a5f23f868f309a6db2a428529f33848f517-authority.stackos.io",
        // "https://ursula3-po3c904a5f23f868f309a6db2a428529f33848f517-authority.stackos.io",
        // "https://ursula4-po3c904a5f23f868f309a6db2a428529f33848f517-authority.stackos.io",
        // "https://ursula5-po3c904a5f23f868f309a6db2a428529f33848f517-authority.stackos.io",
        // "https://ursula6-po3c904a5f23f868f309a6db2a428529f33848f517-authority.stackos.io",
        // "https://ursula7-po3c904a5f23f868f309a6db2a428529f33848f517-authority.stackos.io",
        // "https://ursula8-po3c904a5f23f868f309a6db2a428529f33848f517-authority.stackos.io",
    ],
};

export const SECONDS_PER_DAY = 86400;

export const NFT_FACTOR_ADDRESSES = {
    platform: 0,
    support: 1,
    license: 2,
    referral: 3,
};

export const RESTYPE_NAME_TO_ID_MAP = {
    cpuStandard: 0,
    cpuIntensive: 1,
    gpuStandard: 2,
    storage: 3,
    bandwidth: 4,
    ipfsUpload: 5,
    googleCloudUpload: 6,
    amazonS3: 7,
};

export const RESTYPE_ID_TO_NAME_MAP: { [resType: number]: string } = {
    0: 'cpuStandard',
    1: 'cpuIntensive',
    2: 'gpuStandard',
    3: 'storage',
    4: 'bandwidth',
    5: 'ipfsUpload',
    6: 'googleCloudUpload',
    7: 'amazonS3',
};

export const RESOURCE_CATEGORY = {
    cpuType: [0, 1, 2],
    storageType: [3],
    bandwidthType: [4],
    fileType: [5, 6, 7],
};

export const EXECUTION_QUEUE_SLEEP_TIME = 1000 / 60;

export const API_CALL_RETRY_LIMIT = Number(process.env.API_CALL_RETRY_LIMIT) || 1000;
