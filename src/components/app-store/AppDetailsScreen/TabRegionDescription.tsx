import { useTranslation } from 'react-i18next';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkBreaks from 'remark-breaks';
import remarkEmoji from 'remark-emoji';
import remarkToc from 'remark-toc';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

import { useSelector } from '@/redux/hooks';
import SkeletonTagCard from './skeletons/SkeletonDescription';

const TabRegionDescription = () => {
  const { t } = useTranslation();

  const { appStore } = useSelector((state) => state);

  const { searchApp, loading } = appStore;

  return (
    <div className="mx-8 mt-8 flex rounded-2xl bg-stk-blue-200 p-10">
      {searchApp?.dockerDescription || loading ? (
        <div data-cy="description" className="w-full">
          {loading ? (
            <SkeletonTagCard />
          ) : (
            <ReactMarkdown
              className="prose prose-invert min-w-full prose-h1:border-b-[0.1rem] prose-h1:border-stk-grey-500 prose-h1:pb-2 prose-h1:text-3xl prose-h1:font-semibold prose-h2:text-2xl prose-h2:font-semibold prose-h3:text-xl prose-h3:font-semibold prose-a:text-blue-400 prose-a:no-underline prose-code:bg-[#0F141B] prose-code:px-1 prose-code:before:content-[''] prose-code:after:content-['']"
              remarkPlugins={[remarkGfm, remarkMath, remarkBreaks, remarkEmoji, remarkToc]}
              rehypePlugins={[rehypeKatex, rehypeRaw, rehypeSanitize]}
            >
              {searchApp?.dockerDescription || ''}
            </ReactMarkdown>
          )}
        </div>
      ) : (
        <div className="my-10 flex w-full flex-col">
          <i className="fa-solid fa-note text-2xl text-stk-grey-500" />
          <span className="mt-3 w-full text-center text-stk-grey-500">
            {t('APP_STORE_EMPTY_APP_DESCRIPTION')}
          </span>
        </div>
      )}
    </div>
  );
};

export default TabRegionDescription;
