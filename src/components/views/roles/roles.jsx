import { useEffect, useState } from "react";
import MyToast from "components/myToast";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useFetch from "hooks/useFetch";
import RolesListView from "./rolesListView";
import RolesModalView from "./rolesModalView";

//
let emptyRole = {
  id: '',
  name:'',
  slug:'',
  permissions: []
};

//
export default function Roles() {
  const [role, setRole]               = useState(emptyRole);
  const [roles,setRoles]              = useState(null);
  const [permissions,setPermissions]  = useState([]);
  const [showModal, setShowModal]     = useState(false);
  const [message,setMessage]          = useState('');
  let {fetchState,fetchData}          = useFetch();

  //
  useEffect(() => {
    fetchData('http://localhost:8000/api/permissions')
    .then(() => {
      handleChangePage('http://localhost:8000/api/roles?page=1');
    });
  }, []);

  //
  useEffect(() => {
    let ignore = false;

    if(!ignore) {
      if(fetchState.data?.message === 'Listado de permisos.') {
        setPermissions(fetchState.data.data);
      }
      else if(fetchState.data?.message === 'Listado de roles, paginados.') {
        setRoles(fetchState.data.data);
      }
    }

    return () => {
      ignore = true;
    }
    
  }, [fetchState])

  //
  function handleChangePage(url){
    setMessage("Cargando roles...");
    fetchData(url)
    .then(() => {
      if(fetchState.state === 'success') {
        setMessage('');
      }
    });
  };

  //
  function handleCloseMessage(){
    setMessage('');
  };

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
    handleShowModal();
  };

  //
  function handleDelete(id) {
    withReactContent(Swal).fire({
      title: "Seguro de ELIMINAR el rol y sus relaciones?",
      text: "No podras revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!",
      cancelButtonText: "Cancelar"
    })
    .then(result => {
      if (result.isConfirmed) {
        fetchData(`http://localhost:8000/api/roles/${id}`,{
          method: 'delete',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(() => {
          if(fetchState.state === 'success') {
            reload();
          }
        });
      };
    });
  };

  //
  function handleShowModal() {
    setShowModal(oldValue => !oldValue);
  };

  //
  function handleChangeName(event) {
    let texto = event.target.value.toUpperCase();

    setRole(oldValue => ({
      ...oldValue, 
      name: texto,
      slug: texto.replace(/ /g, "-").toLowerCase()
    }));
  };

  //
  function handleChangePermissions(event) {
    let checkId = parseInt(event.target.id)

    setRole(oldValue => ({
      ...oldValue,
      permissions: (event.target.checked ? [...role.permissions, checkId] : role.permissions.filter(a => a !== checkId))
    }));
  };

  //
  function handleSubmit(event) {
    let response;

    event.preventDefault();
    if (role.id === '') {
      response = fetchData('http://localhost:8000/api/roles',{
                    method: 'post',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(role)
                  });
    }
    else {
      response = fetchData(`http://localhost:8000/api/roles/${role.id}`,{
                    method: 'put',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(role)
                  });
    };

    response.then(() => {
      if(fetchState.state === 'success') {
        handleShowModal();
        reload();
      };
    });
  };

  //
  function reload(){
    fetchData(fetchState.lastUrl);
  };

  return (
    <>
      <MyToast message={message} handleCloseMessage={handleCloseMessage} />

      {roles !== null && <RolesListView
        dataList={roles}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleChangePage={handleChangePage}
      />}

      {permissions.length > 0 && <RolesModalView 
        show={showModal}
        role={role}
        permissionsDataList={permissions.map(({id,name}) => ({id,name}))}
        handleShowModal={handleShowModal}
        handleChangeName={handleChangeName}
        handleChangePermissions={handleChangePermissions}
        handleSubmit={handleSubmit}
      />}
    </>
  );
};