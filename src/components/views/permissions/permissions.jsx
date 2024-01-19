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
  const [permissions,setPermissions]= useState(null);
  const [showModal,setShowModal]    = useState(false);
  const [message,setMessage]        = useState('');
  let {state,data,fetchData}        = useFetch();
  
  //
  useEffect(() => {
    fetchData('http://localhost:8000/api/permissions?page=1');
  }, []);

  //
  useEffect(() => {
    switch(state){
      case 'loading':
        setMessage('Cargando permisos...');
        break;
      case 'adding':
        setMessage('Agregando permisos...');
        break;
      case 'updating':
        setMessage('Actualizando permisos...');
        break;
      case 'removing':
        setMessage('Eliminando permisos...');
        break;
      default:
        handleCloseMessage();
        break;
    };
  }, [state]);

  //
  useEffect(() => {
    if(data !==null && data.data !== null && data.data.hasOwnProperty('current_page')) {
      setPermissions({...data.data});
    }
  }, [data]);

  //
  function handleCloseModal(){
    setShowModal(false);
  }

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
  function handleUpdate(){

  };

  //
  async function handleSubmit(event){
    event.preventDefault();

    if (permission.id === '') {
      await fetchData('http://localhost:8000/api/permissions',{
              method: 'post',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(permission)
            });
    }
    else {
      await fetchData(`http://localhost:8000/api/permissions/${permission.id}`,{
              method: 'put',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(permission)
            });
    };

    setShowModal(false);
    reload();
  }

  //
  async function handleDelete(id) {
    // await withReactContent(Swal).fire({
    //   title: "Seguro de ELIMINAR el permiso y sus relaciones?",
    //   text: "No podras revertir esta acción!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Si, eliminalo!",
    //   cancelButtonText: "Cancelar"
    // })
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     permissionDelete(id);
    //   }
    // })
    permissionDelete(id);
  }

  //
  function permissionDelete(id){
    console.log("borre");
    fetchData(`http://localhost:8000/api/permissions/${id}`,{
                method: 'delete',
                headers: {
                  'Accept': 'application/json'
                }
          });
    
          console.log(response);
    if(response.ok) reload();
  } 

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
  function handleChangePage(url){
    fetchData(url);
  };

  //
  function reload(){
    fetchData(permissions.links.find(item => item.active).url);
  }

  //
  return (
    <>
      <MyToast message={message} handleCloseMessage={handleCloseMessage} />

      { permissions !== null && <PermissionsListView 
        permissions={permissions}
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
}