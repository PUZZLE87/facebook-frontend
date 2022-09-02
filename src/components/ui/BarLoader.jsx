import BarLoader from "react-spinners/BarLoader";


const BLoader = ({ isLoading }) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#0652DD",
  }

  const color = "#1877f2";

  return <div className="fixed top-0 left-0 w-full">
    <BarLoader loading={isLoading} color={color} width="100%" speedMultiplier={1} height={8} cssOverride={override} />
  </div>
}


export default BLoader;
