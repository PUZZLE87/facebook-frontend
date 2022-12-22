import { PulseLoader as PLoader } from "react-spinners";

const PulseLoader = ({ isLoading, color }) => {
  return (
    <div>
      <PLoader loading={isLoading} color={color} size={6} />
    </div>
  );
};

export default PulseLoader;
