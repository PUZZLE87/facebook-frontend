import Header from "../../components/header";
import HomeLeft from "../../components/home/left";
import HomeRight from "../../components/home/right";
import Stories from "../../components/home/stories";
import ActivateModel from "../../components/home/ActivateModal";
import { useParams } from "react-router-dom";
import SendVerification from "../../components/home/SendVerification";
import { useSelector } from "react-redux";
import CreatePostPopup from "../../components/createPostPopup";
import { useState } from "react";
import CreatePost from "../../components/createPost";
import Posts from "../../components/posts";

const Home = () => {
  const { token } = useParams();
  console.log(token);
  const user = useSelector((state) => state.user);
  const [visibleCreatePost, setVisibleCreatePost] = useState(false);

  return (
    <div>
      <Header />
      {visibleCreatePost && (
        <CreatePostPopup setVisibleCreatePost={setVisibleCreatePost} />
      )}
      {token && <ActivateModel token={token} />}
      <main className="flex justify-center h-screen items-start  mt-16">
        {/* left */}
        <div className="xl:w-56 lg:w-16 shrink-0 sm:w-16  ">
          <HomeLeft />
        </div>

        {/* middle */}
        <div className=" grow items-center flex flex-col m-3">
          <div className=" max-w-[800px]  ">
            <Stories />
            {!user?.userInfo?.verified && <SendVerification />}
            <CreatePost setVisibleCreatePost={setVisibleCreatePost} />
            <Posts />
          </div>
        </div>

        {/* right */}
        <div className="lg:w-56 shrink-0">
          <HomeRight />
        </div>
      </main>
    </div>
  );
};

export default Home;
