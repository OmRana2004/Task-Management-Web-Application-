const SearchFilter = ({
  search,
  setSearch,
  filter,
  setFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="flex-1 bg-slate-900 text-white p-3 rounded-xl border border-slate-800"
      />

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
        className="bg-slate-900 text-white p-3 rounded-xl border border-slate-800"
      >
        <option value="all">
          All
        </option>

        <option value="pending">
          Pending
        </option>

        <option value="completed">
          Completed
        </option>
      </select>
    </div>
  );
};

export default SearchFilter;