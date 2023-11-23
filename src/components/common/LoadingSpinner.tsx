interface Props {
  loadingValue?: number;
  sm?: boolean;
}

const LoadingSpinner = ({ loadingValue, sm }: Props) => (
  <div data-cy="loading-spinner" className="flex items-center justify-center">
    <svg
      className="animate-spin"
      viewBox="0 0 114 114"
      width={`${sm ? 30 : 114}`}
      height={`${sm ? 30 : 114}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="clip">
        <path d="M57 5.13785e-06C88.4802 3.7618e-06 114 25.5198 114 57C114 88.4802 88.4802 114 57 114C25.5198 114 -1.1155e-06 88.4802 -2.49155e-06 57C-3.86759e-06 25.5198 25.5198 6.51389e-06 57 5.13785e-06ZM57 98.9619C80.1749 98.9619 98.9619 80.1749 98.9619 57C98.9619 33.8251 80.1749 15.0381 57 15.0381C33.8251 15.0381 15.0381 33.8251 15.0381 57C15.0381 80.1749 33.8251 98.9619 57 98.9619Z" />
      </clipPath>
      <foreignObject width="114" height="114" clipPath="url(#clip)">
        <div className="spinner-color flex h-full w-full items-center justify-center" />
      </foreignObject>
    </svg>
    {loadingValue && <span className="text-xl font-bold text-stk-green">{`${loadingValue}%`}</span>}
  </div>
);

export default LoadingSpinner;
