import { useMediaQuery } from "react-responsive";


const useScreenSize = () => {
  const isSM = useMediaQuery({ minWidth: 640 })
  const isMD = useMediaQuery({ minWidth: 768 })
  const isLG = useMediaQuery({ minWidth: 1024 })
  const isXL = useMediaQuery({ minWidth: 1280 })
  const is2XL = useMediaQuery({ minWidth: 1536 })
  return { isSM, isMD, isLG, isXL, is2XL };
}


export default useScreenSize;
