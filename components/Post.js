import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import Moment from "react-moment";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  //like abd unlike post functionality - to check if the user has already liked the post or not and to update the likes collection accordingly

  //for comments
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc"),
        ),
        (snapshot) => setComments(snapshot.docs),
      ),
    [db, id],
  );
  //for likes mapping
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "likes"),
          orderBy("timestamp", "desc"),
        ),
        (snapshot) => setLikes(snapshot.docs),
      ),
    [db, id],
  );

  //to check if the user has already liked the post or not
  const hasLiked =
    likes.findIndex((like) => like.id === session?.user?.uid) !== -1;

  const likePost = async () => {
    const likeRef = doc(db, "posts", id, "likes", session.user.uid);

    if (hasLiked) {
      await deleteDoc(likeRef);
    } else {
      await setDoc(likeRef, {
        username: session.user.username,
        timestamp: serverTimestamp(),
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/*header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          alt="post_user"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/*img */}
      <img src={img} className="object-cover w-full" alt="post_img" />
      {/* buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                className="btn text-red-500"
                onClick={likePost}
              />
            ) : (
              <HeartIcon className="btn" onClick={likePost} />
            )}
            {likes.length > 0 && (
              <p className="text-sm font-semibold flex items-center">{likes.length} {likes.length==1?"Like" : "Likes"} </p>
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/*caption */}
      <div className="">
        <p className="p-5 truncate">
          <span className="font-bold mr-1">{username} </span>
          {caption}
        </p>
      </div>
      {/*comments*/}
      {comments.length > 0 && (
        <div className="space-y-2 p-5">
          {comments.map((doc) => (
            <div key={doc.id} className="flex items-center space-x-2">
              {/* {console.log("COMMENT DOC", doc.data())} */}
              <img
                src={doc.data().userImage}
                className="rounded-full h-8 w-8 object-contain"
                alt="comment_user"
              />
              <p className="font-semibold">{doc.data().username}</p>
              <p className="flex-1">{doc.data().comment}</p>
              <Moment fromNow className="text-xs text-gray-400">
                {doc.data()?.timestamp?.toDate()?.getTime()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/*input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="btn" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment.."
            className="border-none flex-1 focus:ring-0
             outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
