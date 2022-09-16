import Header from "../../components/header";
import HomeLeft from "../../components/home/left";
import HomeRight from "../../components/home/right";
import Stories from "../../components/home/stories";
import ActivateModal from "../../components/home/ActivateModal";
import { useParams } from "react-router-dom";
import SendVerification from "../../components/home/SendVerification";
import { useSelector } from "react-redux";

const Home = () => {
  const { token } = useParams();
  const user = useSelector((state) => state.user);
  return (
    <div>
      <Header />
      {token && <ActivateModal token={token} />}
      <main className="flex justify-center h-screen items-start mt-16">
        {/* left */}
        <div className="xl:w-56 lg:w-16 shrink-0 sm:w-16">
          <HomeLeft />
        </div>

        {/* middle */}
        <div className="grow m-3">
          <Stories />
          {!user?.userInfo?.verified && <SendVerification />}
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
