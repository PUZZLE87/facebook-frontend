import BarLoader from "react-spinners/BarLoader";

const BLoader = ({ isLoading }) => {
  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#0652DD",
  };
  const color = "#1877f2";
  return (
    <div className="fixed top-0 z-50 left-0 w-full">
      <BarLoader
        loading={isLoading}
        color={color}
        width="100%"
        speedMultiplier={1}
        height={4}
        cssOverride={override}
      />
    </div>
  );
};

export default BLoader;
