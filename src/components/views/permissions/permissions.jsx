import { useEffect, useState } from "react";
import MyToast from "components/myToast";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useFetch from "hooks/useFetch";
import PermissionsListView from "./permissionsListView";
import PermissionsModalView from "./permissionsModalView";

//
const emptyPermission = {
  id: '',
  name: '',
  slug: ''
};

//
export default function Permissions() {
  const [permission,setPermission]  = useState(emptyPermission);
  const [showModal,setShowModal]    = useState(false);
  const [message,setMessage]        = useState('');
  let {fetchState,fetchData}        = useFetch();
  
  //
  useEffect(() => {
    handleChangePage('http://localhost:8000/api/permissions?page=1');
  }, []);

  //
  function handleChangePage(url){
    setMessage("Cargando datos...");
    fetchData(url)
    .then(() => handleCloseMessage());
  };

  //
  function handleCloseModal(){
    setShowModal(false);
  };

  //
  function handleCloseMessage(){
    setMessage('');
  };

  //
  function handleCreate(){
    setPermission(emptyPermission);
    setShowModal(true);
  }
  
  //
  function handleUpdate(permission) {
    setPermission({
      id: permission.id,
      name: permission.name,
      slug: permission.slug
    });
    setShowModal(true);
  };

  //
  function handleSubmit(event){
    event.preventDefault();

    if (permission.id === '') {
      let options = {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(permission)
      };
      let response = fetchData('http://localhost:8000/api/permissions',options)
                    .then(result => {
                      if(result.ok) {
                        setShowModal(false);
                        reload();
                        setMessage('Permiso creado...');
                      };
                    });
    }
    else {
      let options = {
            method: 'put',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(permission)
      };
      let response = fetchData(`http://localhost:8000/api/permissions/${permission.id}`,options)
                    .then(result => {
                      if(result.ok) {
                        setShowModal(false);
                        reload();
                      };
                    });
    };
  };

  //
  function handleDelete(id){
    withReactContent(Swal).fire({
      title: "Seguro de ELIMINAR el permiso y sus relaciones?",
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
        let options = {
              method: 'delete',
              headers: {
                'Accept': 'application/json'
              }
        };
        fetchData(`http://localhost:8000/api/permissions/${id}`,options)
        .then(result => {
          if(result.ok) reload();
        });
      };
    });
  };

  //
  function reload(){
    fetchData(fetchState.lastUrl);
  };

  //
  function handleChangeName(event){
    let texto = event.target.value.toUpperCase();

    setPermission(oldValue => ({
      ...oldValue,
      name: texto,
      slug: texto.replace(/ /g, "-").toLowerCase()
    }));
  }

  //
  return (
    <>
      <MyToast message={message} handleCloseMessage={handleCloseMessage} />

      { fetchState.data?.data && <PermissionsListView 
        permissions={fetchState.data.data}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleChangePage={handleChangePage}
      />}

      <PermissionsModalView 
        show={showModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        permission={permission}
        handleChangeName={handleChangeName}
      />
    </>
  );
};