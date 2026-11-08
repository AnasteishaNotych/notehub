import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { useState } from "react";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import { Flex, Spin, Alert } from "antd";
import NoteForm from "../NoteForm/NoteForm";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes({ search, page }),
    placeholderData: keepPreviousData,
  });
  const notesList = data?.notes;
  const totalPages = data ? data.totalPages : 0;

  const handleSearchChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setSearch(event.target.value);
    },
    1000,
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            onPageChange={setPage}
            currentPage={page}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isError && (
        <Alert
          title="Error"
          description="Oops, something went wrong"
          type="error"
          showIcon
        />
      )}

      {isLoading && (
        <Flex gap="medium">
          <Spin description="Loading" size="large"></Spin>
        </Flex>
      )}
      {notesList && notesList.length > 0 && <NoteList notes={notesList} />}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onModalClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default App;
