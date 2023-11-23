import { useDispatch } from 'react-redux';
import { useSelector } from 'src/redux/hooks';
import { BiChevronDown, BiChevronUp, BiInfoCircle, BiLinkExternal } from 'react-icons/bi';
import { MdErrorOutline } from 'react-icons/md';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Separator } from '@radix-ui/react-separator';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/common';
import { setErrorStatus } from '@/redux/swap/actions';

const SwapError = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const { swap } = useSelector((state) => state);
    const { errorMessage } = swap;

    const [isCollapseOpen, setIsCollapseOpen] = useState(false);

    return (
        <div className="h-[340px] w-full rounded-md border-[0.5px] border-solid border-stk-grey-500 bg-stk-blue-200 p-4 duration-500">
            <div className="flex flex-row justify-between">
                <a
                    href="https://app.1inch.io/"
                    target="_blank"
                    rel="noreferrer"
                    className="mb-2 flex flex-row items-end text-stk-green hover:cursor-pointer"
                >
                    <BiLinkExternal className="text-xl duration-500" color="#AAFF00" />
                    <p className="mx-2 text-sm font-normal duration-500">By 1inch</p>
                </a>
            </div>
            <div className="flex flex-col items-center justify-center text-white">
                <MdErrorOutline className="text-xl duration-500" size={43} />
                <span className={`mt-2 ${isCollapseOpen ? 'mb-2' : 'mb-4'}`}>
                    {t('SWAP_ERROR_TITLE')}
                </span>
                {!isCollapseOpen && <span className="text-center">{t('SWAP_ERROR_SUBTITLE')}</span>}
            </div>
            <Collapsible
                open={isCollapseOpen}
                onOpenChange={() => setIsCollapseOpen(!isCollapseOpen)}
                className={`w-full text-[#CFCFCF] ${!isCollapseOpen && 'mt-4'}`}
            >
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row">
                        <BiInfoCircle className="text-xl duration-500" color="#CFCFCF" />
                        <p className="mx-2 text-sm font-normal duration-500">
                            {t('SWAP_ERROR_DETAILS')}
                        </p>
                    </div>
                    <CollapsibleTrigger asChild className="hover:cursor-pointer">
                        {isCollapseOpen ? <BiChevronUp /> : <BiChevronDown />}
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                    <Separator className="my-2 h-px w-full bg-[#565A69]" />
                    <div className="scrollbar flex h-20 flex-col overflow-y-scroll pr-1 child:my-1">
                        <span>{errorMessage}</span>
                    </div>
                </CollapsibleContent>
            </Collapsible>
            <div className="mt-6 flex w-full flex-row items-center justify-center">
                <div
                    className="w-full child:w-full"
                    onClick={() => dispatch(setErrorStatus(false))}
                >
                    <Button className="bg-[#FDFDFD]">{t('SWAP_ERROR_FOOTER')}</Button>
                </div>
            </div>
        </div>
    );
};

export default SwapError;
