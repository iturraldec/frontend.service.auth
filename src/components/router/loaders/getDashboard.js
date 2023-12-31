export default async function getDashboard() {
  let response = await fetch('http://localhost:8000/api/dashboard/users', {
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }
                        });
  let json = await response.json();

  return json;
}