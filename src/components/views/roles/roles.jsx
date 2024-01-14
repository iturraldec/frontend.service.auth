
import useFetch from "hooks/useFetch";
import RolesListView from "./rolesListView";
import RolesModalView from "./rolesModalView";
import { useState } from "react";

//
let emptyRole = {
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
  const [role, setRole] = useState(emptyRole);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0
  });
  const [showModal, setShowModal] = useState(false);
  const permissions = useFetch('http://localhost:8000/api/permissions');
  const roles = useFetch(getUrl(pagination.current));

  //
  function handleCreate() {
    setRole(emptyRole);
    handleShowModal();
  };

  //
  function handleUpdate(role) {
    setRole({
      id: role.id,
      name: role.name,
      slug: role.slug,
      permissions: role.permissions.map(item => item.id)
    });
    setShowModal(true);
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
    let texto = event.target.value.toUpperCase().trim();

    setRole(oldValue => (
      {
        ...oldValue, 
        name: texto,
        slug: texto.replace(/ /g, "-").toLowerCase()
      }));
  };

  //
  function handleChangePermissions(event) {
    let checkId = parseInt(event.target.id)

    setRole(oldValue => (
      {
        ...oldValue,
        permissions: (event.target.checked ? [...role.permissions, checkId] : role.permissions.filter(a => a !== checkId))
    }));
  };

  //
  function handleSubmit(event) {
    event.preventDefault();

    fetch('http://localhost:8000/api/roles',{
         method: 'post',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(role)
       })
       .then(response => response.json())
       .then(json => console.log(json));
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

      {permissions.data && <RolesModalView 
        show={showModal}
        role={role}
        permissionsDataList={permissions.data.data.map(({id,name}) => ({id,name}))}
        handleShowModal={handleShowModal}
        handleChangeName={handleChangeName}
        handleChangePermissions={handleChangePermissions}
        handleSubmit={handleSubmit}
      />}
    </>
  );
}