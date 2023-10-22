import { useEffect, useState } from 'react';
import Modal from './imageModal';
import { getImages } from '../api/api';

export const Gallery = ({ data }) => {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

  const imagefunction = async () => {
    const response = await getImages();
    setImages(response?.data.slice(0, 8));
  };

  const CondiFunction = async () => {
    if (data && data.length > 0) {
      setImages(data);
    } else {
      imagefunction();
    }
  };

  useEffect(() => {
    CondiFunction();
  }, [data]);

  const [loadingImages, setLoadingImages] = useState(true);

  const handleImageLoad = () => {
    setLoadingImages(false);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
      {images.map((image, index) => (
        <div className='flex flex-col w-96 bg-white rounded-t-md rounded-b-md h-[15rem]' key={index}>
          <img
            onClick={() => setSelectedImageIndex(index)}
            loading="lazy"
            className='rounded-t-md shadow-md'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: loadingImages ? 'blur(5px)' : 'none',
            }}
            src={image.urls.full}
            alt="loading"
            onLoad={handleImageLoad}
          />
          {selectedImageIndex === index && (
            <Modal imageSrc={image.urls.full} onClose={() => setSelectedImageIndex(-1)} />
          )}
          <div className='p-4 w-full h-20 bg-white rounded-b-md'>
            <h1 className='font-semibold'>{image.user.username}</h1>
            <h1 className='font-semibold text-gray-400'>{image.user.total_likes}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};
