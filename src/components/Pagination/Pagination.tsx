import css from "./Pagination.module.css";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";

interface PaginationProps {
  totalPages: number;
  onPageChange: (nextPage: number) => void;
  currentPage: number;
}

type ModuleWithDefault<T> = { default: T };
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

function Pagination({
  totalPages,
  onPageChange,
  currentPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}

export default Pagination;
