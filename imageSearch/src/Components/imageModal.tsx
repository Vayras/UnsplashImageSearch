import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { MdFileDownload } from 'react-icons/md';
import "../App.css"

interface ModalProps {
  imageSrc: string;
  onClose: () => void;
}


const Modal: React.FC<ModalProps> = ({ imageSrc, onClose }) => {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = () => {
    setLikes(likes + (isLiked ? -1 : 1));
    setIsLiked(!isLiked);
  };
  console.log(imageSrc , " imageSrc")
  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-opacity-50">
      <div className="p-4 w-full max-w-lg bg-white rounded-lg shadow-lg">
       
        <img src={imageSrc} alt="Image" className="w-full h-auto" />
        <div className="flex justify-between mt-4">
          <button className="text-blue-500" onClick={handleLike}>
            {isLiked ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
          </button>
          <a
            href={imageSrc}
            download="image.jpg"
            className="text-blue-500"
          >
            <MdFileDownload size={24} />
          </a>
        </div>
        <p className="mt-4 text-center">
          Likes: {likes}
        </p>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
