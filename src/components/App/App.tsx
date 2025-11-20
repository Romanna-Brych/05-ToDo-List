import css from "./App.module.css";
import TaskList from "../TaskList/TaskList";
import Modal from "../Modal/Modal";
import TaskForm from "../TaskForm/TaskForm";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../services/taskService";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";
import SortFilter from "../SortFilter/SortFilter";
import type { SortOrder } from "../../types/task";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [search, setSearchValue] = useState("");
  const [sort, setSort] = useState<SortOrder>("asc");

  const debounsSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    500
  );

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value as SortOrder);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", search, sort],
    queryFn: () => getTasks(search, sort),
  });

  return (
    <div className={css.container}>
      <header className={css.header}>
        <SearchBox search={search} onChange={debounsSearch} />
        <SortFilter sort={sort} onChange={handleSort} />
        <button onClick={openModal} className={css.createButton}>
          Create task
        </button>
      </header>
      {isLoading && <strong className={css.loading}>Loading tasks...</strong>}
      {data && !isLoading && <TaskList tasks={data} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <TaskForm onSucces={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
