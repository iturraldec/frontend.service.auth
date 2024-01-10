
import useFetch from "hooks/useFetch";
import RolesListView from "./rolesListView";
import RolesModalView from "./rolesModalView";
import { useEffect, useState } from "react";

//
let emptyPermission = {
  id: '',
  name:'',
  slug:'',
  permissions: []
};

//
function getUrl(page) {
  return `http://localhost:8000/api/roles?page=${page}`;
};

//
export default function Roles() {
  const [rol, setRol] = useState(emptyPermission);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0
  });
  const [showModal, setShowModal] = useState(false);
  let roles = useFetch(getUrl(pagination.current));
  let permissions = useFetch('http://localhost:8000/api/permissions');

  //
  function handleCreate() {
    console.log('created');
    setRol(emptyPermission);
    handleShowModal();
  };

  //
  function handleUpdate() {
    console.log('update');
  };

  //
  function handleDelete() {
    console.log('delete');
  };

  //
  function handleChangePage() {
    console.log("cpage")
  }

  //
  function handleShowModal() {
    setShowModal(oldValue => !oldValue);
  };

  //
  function handleChangeName(event) {
    //setName(event.target.value.toUpperCase());
  };

  //
  function handleSubmit() {
    console.log("envie");
  };

  return (
    <>
      {roles.state === 'success' && <RolesListView 
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleChangePage={handleChangePage}
        dataList={roles.data.data.data}
        totalPage={pagination.total}
        currentPage={pagination.current}
      />}

      <RolesModalView 
        show={showModal}
        roles={roles}
        permissionsDataList={permissions.data}
        handleShowModal={handleShowModal}
        handleChangeName={handleChangeName}
        handleSubmit={handleSubmit}
      />
    </>
  );
}