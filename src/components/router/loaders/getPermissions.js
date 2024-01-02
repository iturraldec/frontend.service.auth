export default async function getPermissions() {
  let response = await fetch('http://localhost:8000/api/permissions', {
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }
                        });
  let json = await response.json();

  return json;
}