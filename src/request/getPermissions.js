export default async function getPermissions (page = 0) {
  let response;

  if(page > 0) {
    response = await fetch(`http://localhost:8000/api/permissions?page=${page}`, {
                          headers: {
                            'Accept': 'application/json'
                          }
                      });
  }
  else {
    response = await fetch('http://localhost:8000/api/permissions', {
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          }
                      });
  }
    
  let json = await response.json();

  return json;
};