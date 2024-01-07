import { Pagination } from "react-bootstrap";

export default function MyPagination({total, current, onChangePage}) {
  let items = [];

  if(current > 1)
    items.push(<Pagination.Prev key="prev" onClick={() => onChangePage(current - 1)} />);

  for (let page = 1; page <= total; page++) {
    items.push(
      <Pagination.Item key={page} active={page === current} onClick={() => onChangePage(page)} >
        {page}
      </Pagination.Item>
    );
  }

  if(current < total)
    items.push(<Pagination.Next key="next" onClick={() => onChangePage(current + 1)} />);

  return (
    <Pagination className="d-flex justify-content-center">{items}</Pagination>
  );
}