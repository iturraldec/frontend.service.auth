import { Pagination } from "react-bootstrap";

export default function MyPagination({permissions, onChangePage}) {
  let items = [];

  for (let page = 1; page <= permissions.last_page; page++) {
    items.push(
      <Pagination.Item 
        key={page}
        active={permissions.links[page].active} 
        onClick={() => onChangePage(permissions.links[page].url)}
      >
        {permissions.links[page].label}
      </Pagination.Item>
    );
  }
  
  return (
    <Pagination className="d-flex justify-content-center">{items}</Pagination>
  );
}