const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  if (totalPages <= 1)
    return null;

  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(
            currentPage - 1
          )
        }
        className="bg-slate-800 px-4 py-2 rounded text-white"
      >
        Prev
      </button>

      <span className="text-white px-4 py-2">
        {currentPage} / {totalPages}
      </span>

      <button
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          setCurrentPage(
            currentPage + 1
          )
        }
        className="bg-slate-800 px-4 py-2 rounded text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;