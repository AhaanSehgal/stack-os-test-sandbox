import type { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const Search: NextPage = () => (
    <div>
        <Head>
            <title>Search - StackOS</title>
            <meta name="description" content="StackOS App search" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    </div>
);

export async function getStaticProps({ locale }: { locale: any }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default Search;
