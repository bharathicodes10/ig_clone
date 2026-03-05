import { useEffect, useState } from "react";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
const posts=[
    {
        id:'123',
        username:'grace_p',
        userImg:'https://i.pravatar.cc/150?img=47',
        img: 'https://images.unsplash.com/photo-1600759487717-62bbb608106e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        caption:'Be your own kind of beautiful. You are beautiful and you are unique from the others.'
    },
    {
        id:'124',
        username:'amber_kiss',
        userImg:'https://i.pravatar.cc/150?img=48',
        img: 'https://marketplace.canva.com/EAFX7f80Y3g/1/0/1600w/canva-blue-watercolor-self-love-inspirational-quote-instagram-post-9dZ_z7eh-DU.jpg',
        caption:'Everything I need is within me. I am whole and complete.'
    },
];
function Posts() {
    const [posts,setPosts]=useState([]);
   useEffect(() => {

  const unsubscribe = onSnapshot(
    query(collection(db, 'posts'), orderBy('timeStamp', 'desc')),
    (snapshot) => {
        console.log("SNAPDOCS",snapshot.docs);
      setPosts(snapshot.docs);
    }
  );

  return () => unsubscribe();

}, [db]);

    return (
        <div>
            {posts.map((post) =>(
                <Post key={post.id} id={post.id}
                username={post.data()?.username}
                userImg={post.data()?.profileImage}
                img={post.data().image}
                caption={post.data().caption}
                />
            )
            )}
             
        </div>
    );
}

export default Posts
