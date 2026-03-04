import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import Story from "./Story";
import { useSession } from "next-auth/react";
function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      id: i,
      username: faker.internet.userName(),
      avatar: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
    }));
    setSuggestions(suggestions);
    console.log(suggestions);
  }, []);
  const {data: session} = useSession();

  return (
    <div
      className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm
         overflow-x-scroll scrollbar-thin scrollbar-thumb-black"
    >
      {session && (
        <Story img={session.user.image} username={session.user.username}  />
      )}

      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
