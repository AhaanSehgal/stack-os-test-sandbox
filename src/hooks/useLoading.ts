import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useLoading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      const initialRouteQueryIndex = router.asPath.indexOf('?');
      const initialRoute =
        initialRouteQueryIndex >= 0
          ? router.asPath.slice(0, initialRouteQueryIndex)
          : router.asPath;

      const targetRouteQueryIndex = url.indexOf('?');
      const targetRoute = targetRouteQueryIndex ? url.slice(0, targetRouteQueryIndex) : url;

      if (initialRoute !== targetRoute) setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return { loading };
};

export default useLoading;
