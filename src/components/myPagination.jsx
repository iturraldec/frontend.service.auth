import { Pagination } from "react-bootstrap";

export default function MyPagination({pageData, onChangePage}) {
  let items = [];

  for (let page = 1; page <= pageData.last_page; page++) {
    items.push(
      <Pagination.Item 
        key={page}
        active={pageData.links[page].active} 
        onClick={() => onChangePage(pageData.links[page].url)}
      >
        {pageData.links[page].label}
      </Pagination.Item>
    );
  }
  
  return (
    <Pagination className="d-flex justify-content-center">{items}</Pagination>
  );
};