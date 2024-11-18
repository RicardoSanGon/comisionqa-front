import { Suspense, useEffect, useState } from "react";
import { fetchData } from "../fetchData";
import env from "../env";

const apiData = fetchData(`${env.api}/user`);

const editFunction = (id) => {
  console.log(`Edit user with id: ${id}`);
};

export function User() {
  const [users, setUsers] = useState([]); 
  const [searchUser, setSearchUser] = useState("");

  const filteredUsers = users.filter(user =>
    user.profile.firstname.toLowerCase().includes(searchUser.toLowerCase())
  );
  
  
  useEffect(() => {
    setUsers(apiData.read())
  }, [])
  
  return (
    <>
      <div>
        <div className="w-full flex justify-center my-4">
          <h1 className="text-4xl">Usuarios</h1>
        </div>
        <div className="h-full w-full rounded-md border-2 border-emerald-600 p-3 bg-white">
          <div className="w-full h-8">
            <input
              type="text"
              className="rounded border-emerald-600 border-2 p-1"
              placeholder="Search for users"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </div>
          <div className="w-full h-auto mt-4">
            <table className="w-full bg-emerald-600 text-white rounded-t-2xl">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Correo</th>
                  <th>Telefono</th>
                  <th>Status</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody >
                <Suspense fallback={<div>Loading...</div>}>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="bg-white text-black text-center border-2 border-emerald-600 text-xl">
                    <td className="font-bold">{user.id}</td>
                    <td>{user.profile.firstname}</td>
                    <td>{user.profile.paternal}</td>
                    <td>{user.email}</td>
                    <td>{user.profile.phone}</td>
                    <td>{user.status ? "Activo":"Inactivo"}</td>
                    <td>{user.rol.name}</td>
                    <td>
                      <button className="rounded-md px-2 py-1">
                        <img src="./../icons/edit_icon.svg" alt="" onClick={() => editFunction(user.id)} />
                      </button>
                      <button className="rounded-md px-2 py-1">
                        <img src="./../icons/delete_icon.svg" alt="" />
                      </button>
                    </td>
                  </tr>
                ))}
                </Suspense>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;