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
  let {state,
       data,
       getData,
       postData,
       deleteData
      }                             = useFetch();
  
  //
  useEffect(() => {
    handleChangePage('http://localhost:8000/api/permissions?page=1');
  }, []);

  //
  useEffect(() => {
    if (state === 'success' && data?.data?.current_page) {
      setPermissions(data.data);
    };
  }, [data]);

  //
  function handleChangePage(url){
    getData(url);
  };

  //
  function handleCloseModal(){
    setShowModal(false);
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
      let response = postData('http://localhost:8000/api/permissions',options)
                      .then(result => {
                        setShowModal(false);
                        reload();
                      });
    }
    // else {
    //   await fetchData(`http://localhost:8000/api/permissions/${permission.id}`,{
    //           method: 'put',
    //           headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           },
    //           body: JSON.stringify(permission)
    //         });
    // };

  };

  //
  function handleDelete(id){
    let response = deleteData(`http://localhost:8000/api/permissions/${id}`,{
                method: 'delete',
                headers: {
                  'Accept': 'application/json'
                }
          })
          .then(result => {
            reload();
          })
  };

  //
  function reload(){
    getData(permissions.links.find(item => item.active).url);
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