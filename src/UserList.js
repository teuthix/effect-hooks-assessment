import React, {useEffect} from "react";

function UserList({ users, setCurrentUser, setUsers }) {

  useEffect(() => {
    setUsers([]);
    const abortController = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        { signal: abortController.signal }
      );
      const userfromAPI = await response.json();
      //console.log("setCurrentUser", userfromAPI);
      setUsers(userfromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
            console.log("Aborted");
        } else {
            throw error;
          }
        }
      }
      loadUsers();
      return () => abortController.abort();
    }, [setUsers]);

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id}>
          <button type="button" onClick={() => {
            setCurrentUser(user);
            //console.log(user)
          }}>
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
