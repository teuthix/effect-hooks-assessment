import React, { useEffect } from "react";

function AlbumList({ user = {}, albums, setAlbums }) {
  
  //find current user's album and display
  useEffect(() => {
    setAlbums([]);
    const abortController = new AbortController();
    async function loadAlbums() {
      //issue was if there was no user, user={} (undefined)
      if (!user.id){
        return
      }
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`,
          { signal: abortController.signal }
        );
        const albumsFromAPI = await response.json();
        //console.log("albums", albumsFromAPI);
        setAlbums(albumsFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
      } else {
          throw error;
        }
      }
    }
    loadAlbums();
    return () => abortController.abort();
  }, [user, setAlbums]);

  // const originalTitle = document.title;
  // console.log(originalTitle)

  useEffect(() => {
    //console.log("user", user.name);
    if(user.name){
      document.title = `${user.name}'s Album`;
    }else {
      document.title = `Awesome Album App`;
    }
  }, [user]);

  if(user.id){
    return (
      <>
      <h1>{user.name}'s Albums</h1>
      <ul>
        {albums.map((album, index) => (
          <li key={index}>
            {album.id} - {album.title}
          </li>
          ))}
      </ul>
      </>
    )
  }
  return <p>Please click on a user name to the left</p>;
}

export default AlbumList;
