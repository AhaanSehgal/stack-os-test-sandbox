// eslint-disable-next-line no-unused-vars
import { all, put, takeLatest } from 'redux-saga/effects';
import { SwapTypes, GetQuoteData, Quote, CoinPrice } from './types';
import { fetchCoinPrice, fetchSwapQuote } from '../../services';
import { SwapActions } from '.';

function* getQuoteData({
  payload: { swapParams, networkId, tokenAmount, coin, isStack },
}: GetQuoteData) {
  try {
    if (tokenAmount && tokenAmount > 0) {
      const quote: Quote = yield fetchSwapQuote(swapParams, networkId);

      if (quote?.error) throw quote;

      const result = Number(quote.toTokenAmount * 10 ** -18);
      const expectedOutput = isStack
        ? Number((tokenAmount / result)?.toFixed(4))
        : Number((result / tokenAmount)?.toFixed(4));

      const stack: CoinPrice = yield fetchCoinPrice('stackos', 'usd');
      const tokenIn: CoinPrice = yield fetchCoinPrice(coin, 'usd');

      yield put(
        SwapActions.getQuoteDataSuccess({
          toTokenAmount: isStack ? tokenAmount : result?.toFixed(5),
          fromTokenAmount: isStack ? result?.toFixed(5) : tokenAmount,
          expectedOutput,
          estimatedGas: quote?.estimatedGas,
          fromTokenPrice: tokenIn[coin as keyof CoinPrice]?.usd,
          stackPrice: stack?.stackos?.usd,
        })
      );
    } else {
      yield put(SwapActions.getQuoteDataSuccess({}));
    }
  } catch (err: any) {
    yield put(SwapActions.getQuoteDataFailure(err?.description));
  }
}

function* swapSaga() {
  yield all([takeLatest(SwapTypes.GET_QUOTE_DATA_REQUEST, getQuoteData)]);
}

export default swapSaga;
