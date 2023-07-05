"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";

const MyProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userPrompts, setUserPrompts] = useState([]);

  useEffect(() => {
    //fetchPrompts
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setUserPrompts(data);
    };
    if (session?.user.id) {
      fetchPrompts();
    }
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const askConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (askConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = userPrompts.filter((p) => p._id !== post_id);
        setUserPrompts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={"My"}
      desc={"Welcome to your personalised profile page "}
      data={userPrompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfilePage;
