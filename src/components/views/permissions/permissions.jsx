import { useEffect, useState } from "react";
import useFetch from "hooks/useFetch";
import MyToast from "components/myToast";
import PermissionsListView from "./permissionsListView";

//
const emptyPermission = {
  id: '',
  name: '',
  slug: ''
};

//
export default function Permissions() {
  const [permission,setPermission]  = useState(emptyPermission);
  const [message,setMessage]        = useState('');
  let {state,data,getData}          = useFetch();
  
  //
  useEffect(() => {
     getData('http://localhost:8000/api/permissions?page=1');
  }, []);

  //
  useEffect(() => {
    if(state === 'loading') setMessage('Cargando los permisos...')
    else handleCloseMessage();
  }, [state])
  
  //
  function handleCloseMessage(){
    setMessage('');
  };

  //
  function handleCreate(){
    setPermission(emptyPermission);
  }
  
  //
  function handleUpdate(){

  };

  //
  function handleDelete(){

  };

  //
  function handleChangePage(url){
    getData(url);
  };

  //
  return (
    <>
      <MyToast message={message} handleCloseMessage={handleCloseMessage} />
 
      {state === 'success' && <PermissionsListView 
        permissions={data.data}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleChangePage={handleChangePage}
      />}
    </>
  );
}