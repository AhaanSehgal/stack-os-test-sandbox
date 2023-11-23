export const StackEscrowJson = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_stackToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_resourceFeed',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_staking',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_dnsStore',
        type: 'address',
      },
      {
        internalType: 'contract IUniswapV2Factory',
        name: '_factory',
        type: 'address',
      },
      {
        internalType: 'contract IUniswapV2Router02',
        name: '_router',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_dao',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_gov',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_weth',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_usdt',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_oracle',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalDeposit',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lastTxTime',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'dripRate',
        type: 'uint256',
      },
    ],
    name: 'DEPOSIT',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'accountOwner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountDeposited',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountWithdrawn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'depositedAt',
        type: 'uint256',
      },
    ],
    name: 'WITHDRAW',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'depositer',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
    ],
    name: 'EmergencyRefundByClusterOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'clusterUsers',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'communityDeposits',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'daoFee',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'resouceNr',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: 'resourceName',
        type: 'string',
      },
    ],
    name: 'defineResourceVar',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'depositer',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
    ],
    name: 'getDeposits',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'resourceOneUnits',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceTwoUnits',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceThreeUnits',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceFourUnits',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceFiveUnits',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceSixUnits',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceSevenUnits',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceEightUnits',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalDeposit',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastTxTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalDripRatePerSecond',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'notWithdrawable',
            type: 'uint256',
          },
        ],
        internalType: 'struct EscrowLib.Deposit',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_id',
        type: 'uint8',
      },
    ],
    name: 'getResouceVar',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'resourceOne',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceTwo',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceThree',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceFour',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceFive',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceSix',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceSeven',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceEight',
            type: 'uint256',
          },
        ],
        internalType: 'struct EscrowLib.ResourceUnits',
        name: 'resourceUnits',
        type: 'tuple',
      },
    ],
    name: 'getResourcesDripRateInUSDT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'govFee',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'resourceCapacityState',
    outputs: [
      {
        internalType: 'uint256',
        name: 'resourceOne',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceTwo',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceThree',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceFour',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceFive',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceSix',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceSeven',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceEight',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_daoAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_govAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_oracle',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_resourceFeed',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_staking',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_dnsStore',
        type: 'address',
      },
    ],
    name: 'setAddressSettings',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'minStackAmount',
        type: 'uint256',
      },
    ],
    name: 'setMinPurchase',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '_govFee',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: '_daoFee',
        type: 'uint16',
      },
    ],
    name: 'setVariableFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'depositer',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
    ],
    name: 'settleAccounts',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'nrOfAccounts',
        type: 'uint256',
      },
    ],
    name: 'settleMultipleAccounts',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_stackAmount',
        type: 'uint256',
      },
    ],
    name: 'stackToTokenRate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'TOKENVALUE',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_stackAmount',
        type: 'uint256',
      },
    ],
    name: 'stackToUSDT',
    outputs: [
      {
        internalType: 'uint256',
        name: 'USDVALUE',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_usdtAmount',
        type: 'uint256',
      },
    ],
    name: 'usdtToSTACK',
    outputs: [
      {
        internalType: 'uint256',
        name: 'STACKVALUE',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'depositer',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
    ],
    name: 'withdrawFundsAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'resourceOne',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceTwo',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceThree',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceFour',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceFive',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceSix',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceSeven',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceEight',
            type: 'uint256',
          },
        ],
        internalType: 'struct EscrowLib.ResourceUnits',
        name: 'resourceUnits',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256',
      },
    ],
    name: 'updateResourcesFromStack',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
      {
        internalType: 'bool',
        name: 'withdrawable',
        type: 'bool',
      },
    ],
    name: 'rebateAccount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'resourceOne',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceTwo',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceThree',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceFour',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceFive',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceSix',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceSeven',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceEight',
            type: 'uint256',
          },
        ],
        internalType: 'struct EscrowLib.ResourceUnits',
        name: 'resourceUnits',
        type: 'tuple',
      },
    ],
    name: 'getResourcesDripRateInSTACK',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
    ],
    name: 'rechargeAccount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
    ],
    name: 'withdrawFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'percent',
        type: 'uint256',
      },
    ],
    name: 'setWithdrawTokenPortion',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
    ],
    name: 'withdrawFundsPartial',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'communityDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'developer',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'resourceOne',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceTwo',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceThree',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceFour',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceFive',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceSix',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceSeven',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceEight',
            type: 'uint256',
          },
        ],
        internalType: 'struct EscrowLib.ResourceUnits',
        name: 'resourceUnits',
        type: 'tuple',
      },
    ],
    name: 'issueGrantNewAccount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'developer',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
    ],
    name: 'issueGrantRechargeAccount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const StackTokenJson = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token_holder',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'delegator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'fromDelegate',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'toDelegate',
        type: 'address',
      },
    ],
    name: 'DelegateChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'delegate',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'previousBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newBalance',
        type: 'uint256',
      },
    ],
    name: 'DelegateVotesChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DELEGATION_TYPEHASH',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'DOMAIN_TYPEHASH',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    name: 'checkpoints',
    outputs: [
      {
        internalType: 'uint32',
        name: 'fromBlock',
        type: 'uint32',
      },
      {
        internalType: 'uint256',
        name: 'votes',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256',
      },
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'nonces',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'numCheckpoints',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'delegator',
        type: 'address',
      },
    ],
    name: 'delegates',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'delegatee',
        type: 'address',
      },
    ],
    name: 'delegate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'delegatee',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'expiry',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'delegateBySig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getCurrentVotes',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    name: 'getPriorVotes',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
];

export const ResourceFeedJson = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_stackToken',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'clusterMetadataStore',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'escrowAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'resources',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'dripRatePerUnit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'votingWeightPerUnit',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'resourcesMaxPerDNS',
    outputs: [
      {
        internalType: 'uint256',
        name: 'resourceOne',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceTwo',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceThree',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceFour',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceFive',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceSix',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceSeven',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceEight',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'stackToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'resourceOne',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceTwo',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceThree',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceFour',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceFive',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceSix',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceSeven',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceEight',
            type: 'uint256',
          },
        ],
        internalType: 'struct EscrowLib.ResourceUnits',
        name: 'maxUnits',
        type: 'tuple',
      },
    ],
    name: 'setResourceMaxCapacity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
    ],
    name: 'getResourceMaxCapacity',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'resourceOne',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceTwo',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceThree',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceFour',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceFive',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceSix',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceSeven',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'resourceEight',
            type: 'uint256',
          },
        ],
        internalType: 'struct EscrowLib.ResourceUnits',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_clustermetadatastore',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_escrow',
        type: 'address',
      },
    ],
    name: 'setAddressSetting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
      {
        internalType: 'uint8',
        name: 'resourceID',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'dripRatePerUnit',
        type: 'uint256',
      },
    ],
    name: 'addResource',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
      {
        internalType: 'uint8',
        name: 'resourceID',
        type: 'uint8',
      },
    ],
    name: 'removeResource',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'dripRatePerUnit',
        type: 'uint256',
      },
    ],
    name: 'setResourceDripRateUSDT',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'getResourceDripRateUSDT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'votingWeightPerUnit',
        type: 'uint256',
      },
    ],
    name: 'setResourceVotingWeight',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'getResourceVotingWeight',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'source',
        type: 'string',
      },
    ],
    name: 'stringToBytes32',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'result',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
    ],
    name: 'bytes32ToString',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
    constant: true,
  },
];

export const StakingContractJson = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_dnsClusterStore',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_stackToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_stakingAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_slashFactor',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_rewardsPerUpvote',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_rewardsPerShare',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_daoAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'collector',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'collectedSlash',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'slashCollectedAt',
        type: 'uint256',
      },
    ],
    name: 'SlashCollectedLog',
    type: 'event',
  },
  {
    inputs: [],
    name: 'daoAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'dnsClusterStore',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'lockAmountForBlocks',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'lockTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardsPerShare',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'rewardsPerUpvote',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'slashCollected',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'slashFactor',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'stackToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'stakes',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'stakedAt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'share',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastWithdraw',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'dns',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'lastRewardsCollectedAt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'stakingAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_stakingAmount',
        type: 'uint256',
      },
    ],
    name: 'setStakingAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_daoAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_dnsClusterStore',
        type: 'address',
      },
    ],
    name: 'setAddressSettings',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_slashFactor',
        type: 'uint256',
      },
    ],
    name: 'setSlashFactor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_rewardsPerShare',
        type: 'uint256',
      },
    ],
    name: 'setRewardsPerShare',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_lockAmountForBlocks',
        type: 'uint256',
      },
    ],
    name: 'setLockAmountForBlocks',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: '_dns',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: '_ipAddress',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_whitelistedIps',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_clusterType',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: '_isPrivate',
        type: 'bool',
      },
    ],
    name: 'deposit',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'revokeWithdrawalRequest',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimSlashedRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getStakedShare',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
];

export const ClusterMetadataJson = [
  {
    inputs: [
      {
        internalType: 'contract IResourceFeed',
        name: '_resourceFeed',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'clusterDownvotes',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'clusterUpvotes',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'dnsToClusterMetadata',
    outputs: [
      {
        internalType: 'address',
        name: 'clusterOwner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'ipAddress',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'whitelistedIps',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'upvotes',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'downvotes',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isDefaulter',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'qualityFactor',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'active',
        type: 'bool',
      },
      {
        internalType: 'string',
        name: 'clusterType',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'isPrivate',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'escrowAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'resourceFeed',
    outputs: [
      {
        internalType: 'contract IResourceFeed',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'stakingContract',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_stakingContract',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_escrow',
        type: 'address',
      },
    ],
    name: 'setAddressSetting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_dns',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '_clusterOwner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_ipAddress',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_whitelistedIps',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_clusterType',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: '_isPrivate',
        type: 'bool',
      },
    ],
    name: 'addDnsToClusterEntry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_dns',
        type: 'bytes32',
      },
      {
        internalType: 'bool',
        name: '_status',
        type: 'bool',
      },
    ],
    name: 'changeClusterStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_dns',
        type: 'bytes32',
      },
    ],
    name: 'removeDnsToClusterEntry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_dns',
        type: 'bytes32',
      },
    ],
    name: 'upvoteCluster',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_dns',
        type: 'bytes32',
      },
    ],
    name: 'downvoteCluster',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'resourceOneUnits',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceTwoUnits',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceThreeUnits',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceFourUnits',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceFiveUnits',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceSixUnits',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceSevenUnits',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'resourceEightUnits',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
    ],
    name: 'getTotalVotes',
    outputs: [
      {
        internalType: 'uint256',
        name: 'votes',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'clusterDns',
        type: 'bytes32',
      },
    ],
    name: 'getClusterOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
];

export const StackOracleJson = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'lpstack',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'lpusdt',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'weth',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'PERIOD',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'STACK',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'USDT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'WETH',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'blockTimestampLast',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'price0AverageWETHSTACK',
    outputs: [
      {
        internalType: 'uint224',
        name: '_x',
        type: 'uint224',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'price0AverageWETHUSDT',
    outputs: [
      {
        internalType: 'uint224',
        name: '_x',
        type: 'uint224',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'price0CumulativeLastETHSTACK',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'price0CumulativeLastWETHUSDT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'price1AverageWETHSTACK',
    outputs: [
      {
        internalType: 'uint224',
        name: '_x',
        type: 'uint224',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'price1AverageWETHUSDT',
    outputs: [
      {
        internalType: 'uint224',
        name: '_x',
        type: 'uint224',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'price1CumulativeLastETHSTACK',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'price1CumulativeLastWETHUSDT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'update',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
    ],
    name: 'usdtToSTACKOracle',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
];

export const AppNFTJson = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'awardTitle',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'baseURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentTokenId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gov',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_addresses',
        type: 'address[]',
      },
    ],
    name: 'listNewKnight',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'listedAddresses',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'tokenByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
