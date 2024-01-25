import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import MyToast from "components/myToast";
import Confirm from "components/confirm";
import UsersListView from "./usersListView";
import UserModalView from "./userModelView";

//
const emptyUser = {
  id:     '',
  name:   '',
  email:  '',
  email2: '',
  roles:  []
};

//
export default function Users() {
  let rolesFetch              = useFetch();
  let usersFetch              = useFetch();
  const [roles,setRoles]      = useState([]);
  const [user,setUser]        = useState(emptyUser);
  const [users,setUSers]      = useState(null);
  const [message,setMessage]  = useState('');
  const [showModal,setShowModal]  = useState(false);

  //
  useEffect(() => {
    rolesFetch.fetchData('http://localhost:8000/api/roles');
    handleChangePage('http://localhost:8000/api/users?page=1'); 
  },[]);

  //
  useEffect(() => {
    if(rolesFetch.fetchState.state === 'success') setRoles(rolesFetch.fetchState.data.data);
  }, [rolesFetch.fetchState]);

  //
  useEffect(() => {
    if(usersFetch.fetchState.state === 'success' && usersFetch.fetchState.data?.data?.hasOwnProperty("current_page")) {
      setUSers(usersFetch.fetchState.data.data);
      setMessage('');
    }
  }, [usersFetch.fetchState]);

  //
  function handleChangePage(url){
    setMessage("Cargando usuarios...");
    usersFetch.fetchData(url);
  };

  //
  function handleDelete(id) {
    Confirm("Seguro de ELIMINAR el usuario?", "No podra reverstir esta acción!", "Si, eliminalo!")
    .then(result => {
      if (result.isConfirmed) {
        console.log("elimino: ",id);
      };
    });
  }

  //
  function handleCloseMessage(){
    setMessage('');
  };

  // 
  function handleCreate(){
    setUser(emptyUser);
    handleToogleModal();
  };

  //
  function handleUpdate(){

  };

  //
  function handleToogleModal(){
    setShowModal(oldValue => !oldValue);
  }

  //
  function handleChangeName(event){
    setUser(oldValue => ({
      ...oldValue, 
      name: event.target.value.toUpperCase()
    }));
  };

  //
  function handleChangeEmail(event){
    setUser(oldValue => ({
      ...oldValue, 
      email: event.target.value
    }));
  };

  //
  function handleChangeEmail2(event){
    setUser(oldValue => ({
      ...oldValue, 
      email2: event.target.value
    }));
  };

  //
  function handleChangeRoles(event) {
    let checkId = parseInt(event.target.id)

    setUser(oldValue => ({
      ...oldValue,
      roles: (event.target.checked ? [...user.roles,checkId] : user.roles.filter(a => a !== checkId))
    }));
  };

  //
  function handleSubmit(event){
    let response;

    event.preventDefault();
    if (user.id === '') {
      response = usersFetch.fetchData('http://localhost:8000/api/users',{
                    method: 'post',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                  });
    }
    else {
      response = usersFetch.fetchData(`http://localhost:8000/api/roles/${user.id}`,{
                    method: 'put',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                  });
    };

    response.then(() => {
      if(usersFetch.fetchState.state === 'success') {
        handleToogleModal();
        reload();
      };
    });
  };

  //
  function reload(){
    usersFetch.fetchData(usersFetch.fetchState.lastUrl);
  };

  //
  return (
    <>
      <MyToast message={message} handleCloseMessage={handleCloseMessage}/>

      { users && <UsersListView 
        users={users}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleChangePage={handleChangePage}
      />}

      {showModal && <UserModalView 
        roles={roles}
        user={user}
        handleChangeName={handleChangeName}
        handleChangeEmail={handleChangeEmail}
        handleChangeEmail2={handleChangeEmail2}
        handleChangeRoles={handleChangeRoles}
        handleSubmit={handleSubmit}
        handleToogleModal={handleToogleModal}
      />}
    </>
  );
};