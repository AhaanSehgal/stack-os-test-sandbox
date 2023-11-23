import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Refferal = () => {
  const router = useRouter();

  const referralAddress = router.query.address;

  window.localStorage.setItem('referralAddress', `${referralAddress}`);

  router.push('/');

  return (
    <div>
      <Head>
        <title>Deploy - StackOS</title>
        <meta name="description" content="StackOS Deploy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3>Welcome to refferal page....</h3>
    </div>
  );
};

export default Refferal;
