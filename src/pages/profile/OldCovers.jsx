import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useClickOutside from "../../hooks/useClickOutside";
import { CHANGE_PROFILE_COVER } from "../../redux/actions/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const OldCovers = ({ setShowOldCovers }) => {
  const user = useSelector((state) => state?.user?.userInfo);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const showCoversRef = useRef(null);
  useClickOutside(showCoversRef, () => setShowOldCovers(false));

  const changeCover = (e) => {
    const url = e.target?.src;
    if (!url) return;
    axiosPrivate.post("/user/updateCover", { url }).then(({ data }) => {
      dispatch({ type: CHANGE_PROFILE_COVER, payload: { cover: data } });
    });
    setShowOldCovers(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setIsLoading(true);
    axiosPrivate
      .post(
        "/user/CoverImages",
        { path: `${user?.username}/cover_pictures`, max: 20, sort: "desc" },
        { signal }
      )
      .then(({ data }) => {
        setImages(data);
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="bg-white z-50 bg-opacity-90 fixed flex items-center justify-center inset-0">
      <div
        ref={showCoversRef}
        className="w-[232px] overflow-hidden sm:w-[336px] lg:w-[440px] text-gray-600 rounded-lg shadow-md bg-white"
      >
        <div className="flex justify-between items-center p-3">
          <span className="font-semibold text-lg">Select Cover Photo </span>
          <div
            onClick={() => setShowOldCovers(false)}
            className="bg-gray-100 p-1 rounded-full text-gray-500 hover:text-red-400 transition-colors cursor-pointer hover:bg-gray-200"
          >
            <XMarkIcon className="w-5" />
          </div>
        </div>
        <div className="divider"></div>
        <p className="font-semibold flex justify-center border-b-blue-600 border-b-4 py-2 text-lg text-blue-600">
          Recent cover photos
        </p>
        <div className="overflow-y-scroll relative overflow-x-hidden space-y-2 flex flex-wrap justify-start items-center content-start h-[550px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full p-3">
          {isLoading && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <FadeLoader size={82} color="#3867d6" />
            </span>
          )}
          {images?.map((image) => (
            <span
              key={image.id}
              className="w-24 h-24 rounded-xl mr-2 overflow-hidden cursor-pointer hover:scale-110 transition-transform"
            >
              <LazyLoadImage
                effect="blur"
                onClick={changeCover}
                src={image?.url}
                alt=""
                className="object-cover w-24 h-24"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OldCovers;
