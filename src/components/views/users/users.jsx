import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import MyToast from "components/myToast";
import Confirm from "components/confirm";
import UsersListView from "./usersListView";
import UserModalView from "./userModelView";

//
const emptyUser = {
  id:         '',
  name:       '',
  email:      '',
  password:   '',
  password2:  '',
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
  function handleCloseMessage(){
    setMessage('');
  };

  // 
  function handleCreate(){
    setUser(emptyUser);
    handleToogleModal();
  };

  //
  function handleUpdate(_user){
    setUser({
      id: _user.id,
      name: _user.name,
      email:_user.email,
      password: '',
      password2: '',    
      roles: _user.roles.map(item => item.id)
    });
    handleToogleModal();
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
  function handleChangePassword(event){
    setUser(oldValue => ({
      ...oldValue, 
      password: event.target.value
    }));
  };

  //
  function handleChangePassword2(event){
    setUser(oldValue => ({
      ...oldValue, 
      password2: event.target.value
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
      response = usersFetch.fetchData(`http://localhost:8000/api/users/${user.id}`,{
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
  function handleDelete(id) {
    Confirm("Seguro de ELIMINAR el usuario?")
    .then(result => {
      if (result.isConfirmed) {
        usersFetch.fetchData(`http://localhost:8000/api/users/${id}`,{
          method: 'delete',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if(response.ok) {
            console.log(usersFetch.fetchState);
            if(usersFetch.fetchState.state === 'success') {
              reload();
            }  
          }
        });
      };
    });
  };

  //
  function reload(){
    handleChangePage(usersFetch.fetchState.lastUrl);
  };

  //
  return (
    <>
      { message.length > 0 && <MyToast message={message} handleCloseMessage={handleCloseMessage}/>}

      <UsersListView 
        users={users}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleChangePage={handleChangePage}
      />

      {showModal && <UserModalView 
        roles={roles}
        user={user}
        handleChangeName={handleChangeName}
        handleChangeEmail={handleChangeEmail}
        handleChangePassword={handleChangePassword}
        handleChangePassword2={handleChangePassword2}
        handleChangeRoles={handleChangeRoles}
        handleSubmit={handleSubmit}
        handleToogleModal={handleToogleModal}
      />}
    </>
  );
};