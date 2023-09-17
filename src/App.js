import React, { useState } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [albums, setAlbums] = useState([]);

  // Load data from https://jsonplaceholder.typicode.com/albums?userId=${user.id}

  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} setUsers={setUsers} />
      </div>
      <div className="right column">
        <AlbumList user={currentUser} albums={albums} setAlbums={setAlbums} />
      </div>
    </div>
  );
}

export default App;
