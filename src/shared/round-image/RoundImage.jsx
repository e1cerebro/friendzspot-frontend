import React from 'react';
import { CHAT_API_URL } from '../../utils/api-settings';

const RoundImage = ({ url, size = '50px' }) => {
  const imageURl = url
    ? CHAT_API_URL + '/' + url
    : 'https://www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png';
  return (
    <div
      className='circle'
      style={{
        height: `${size}`,
        width: `${size}`,
        border: '3px solid rgb(228, 225, 225)',
        backgroundImage: `url(${imageURl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: ' no-repeat',
      }}></div>
  );
};

export default RoundImage;
