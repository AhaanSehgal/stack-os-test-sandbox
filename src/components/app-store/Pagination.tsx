interface Props {
  currentPage: number;
  totalPage: number;
  // eslint-disable-next-line no-unused-vars
  onChangePage: (page: number) => void;
}

const Pagination = ({ currentPage, totalPage, onChangePage }: Props) => (
  <nav className="flex items-center justify-between border-t border-stk-blue-100 px-4 sm:px-0">
    <div className="-mt-px flex w-0 flex-1">
      {currentPage !== 1 && (
        <a
          onClick={() => onChangePage(currentPage - 1)}
          className="inline-flex cursor-pointer items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-stk-grey-500 duration-300 hover:border-gray-300 hover:text-stk-grey-200"
        >
          <i className="fa-solid fa-chevron-left mr-[0.6rem] ml-4 text-stk-green" />
          Previous
        </a>
      )}
    </div>

    <div className="hidden md:flex">
      {currentPage > 2 && (
        <a
          onClick={() => onChangePage(1)}
          className="inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-stk-grey-500 duration-300 hover:border-gray-300 hover:text-stk-grey-200"
        >
          {1}
        </a>
      )}
      {currentPage > 2 && (
        <span className="inline-flex select-none items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
          ...
        </span>
      )}

      <div className="flex md:-mt-px">
        {currentPage - 2 !== 0 && currentPage === totalPage && totalPage > 1 && (
          <a
            onClick={() => onChangePage(currentPage - 2)}
            className="inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-stk-grey-500 duration-300 hover:border-gray-300 hover:text-stk-grey-200"
          >
            {currentPage - 2}
          </a>
        )}
        {currentPage - 1 !== 0 && (
          <a
            onClick={() => onChangePage(currentPage - 1)}
            className="inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-stk-grey-500 duration-300 hover:border-gray-300 hover:text-stk-grey-200"
          >
            {currentPage - 1}
          </a>
        )}
        <a
          onClick={() => onChangePage(currentPage)}
          className="inline-flex cursor-pointer items-center border-t-2 border-stk-green px-4 pt-4 text-sm font-medium text-stk-green duration-300"
          aria-current="page"
        >
          {currentPage}
        </a>
        {currentPage + 1 <= totalPage && totalPage > 1 && (
          <a
            onClick={() => onChangePage(currentPage + 1)}
            className="inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-stk-grey-500 duration-300 hover:border-gray-300 hover:text-stk-grey-200"
          >
            {currentPage + 1}
          </a>
        )}
        {currentPage === 1 && totalPage > 2 && (
          <a
            onClick={() => onChangePage(currentPage + 2)}
            className="inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-stk-grey-500 duration-300 hover:border-gray-300 hover:text-stk-grey-200"
          >
            {currentPage + 2}
          </a>
        )}
      </div>

      {totalPage > 7 && currentPage < totalPage - 1 && (
        <span className="inline-flex select-none items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
          ...
        </span>
      )}
      {totalPage > 7 && currentPage < totalPage - 1 && (
        <a
          onClick={() => onChangePage(totalPage)}
          className="inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-stk-grey-500 duration-300 hover:border-gray-300 hover:text-stk-grey-200"
        >
          {totalPage}
        </a>
      )}
    </div>

    <div className="-mt-px flex w-0 flex-1 justify-end">
      {totalPage !== currentPage && (
        <a
          onClick={() => onChangePage(currentPage + 1)}
          className="inline-flex cursor-pointer items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-stk-grey-500 duration-300 hover:border-gray-300 hover:text-stk-grey-200"
        >
          Next
          <i className="fa-regular fa-chevron-right mr-[0.6rem] ml-4 text-stk-green" />
        </a>
      )}
    </div>
  </nav>
);

export default Pagination;
