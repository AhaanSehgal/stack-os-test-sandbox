/* eslint-disable global-require */
module.exports = {
    content: [
        './src/pages/**/*.{html,js,jsx,ts,tsx}',
        './src/components/**/*.{html,js,jsx,ts,tsx}',
    ],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        fontFamily: {},
        extend: {
            backgroundImage: {
                'login-neon': "url('/assets/login/neon.png')",
            },
            colors: {
                'stk-white': '#FDFDFD',
                'stk-green': '#AAFF00',
                'stk-red': '#D65745',
                'stk-blue-500': '#111827',
                'stk-blue-400': '#191F2D',
                'stk-blue-300': '#202635',
                'stk-blue-200': '#1F2937',
                'stk-blue-100': '#2D3948',
                'stk-grey-600': '#4B4B4B',
                'stk-grey-500': '#898989',
                'stk-grey-400': '#CFCFCF ',
                'stk-grey-300': '#DFDFDF ',
                'stk-grey-200': '#E9E9E9 ',
            },
            visibility: ['group-hover'],
            animation: {
                'pulse-fast': 'pulse 1.5s linear infinite',
            },
        },
    },
    plugins: [
        ({ addVariant }) => {
            addVariant('child', '& > *');
            addVariant('p', '& > p');
            addVariant('strong', '& > strong');
            addVariant('child-hover', '& > *:hover');
        },
        require('@tailwindcss/typography'),
    ],
};
