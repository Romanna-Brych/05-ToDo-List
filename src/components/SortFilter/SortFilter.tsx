import type { SortOrder } from "../../types/task";

interface SortFilterProps {
  sort: SortOrder;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SortFilter({ sort, onChange }: SortFilterProps) {
  return (
    <select value={sort} onChange={onChange}>
      <option value="asc">Complited last</option>
      <option value="desc">Complited first</option>
    </select>
  );
}

export default SortFilter;
