import React, { useRef, useState, useEffect } from 'react';
import DefaultCoverImage from '../../../images/default-cover-photo.jpg';
import './user-profile-banner.style.css';
import Icon from '../../../shared/icon/Icon';
import Button from '../../../shared/form-inputs/button/Button';
import { connect } from 'react-redux';
import { updateProfilePhotoAction } from '../../../redux/actions/user.actions';
import { CHAT_API_URL } from '../../../utils/api-settings';
import RequestLoading from '../../../shared/request-loading/RequestLoading';

const UserProfileBanner = ({
  currentUser,
  profilePhotoUpdating,
  updateProfilePhotoAction,
}) => {
  const [imageFile, setImageFile] = useState('');
  const [imageFileURL, setImageFileURL] = useState('');
  const [tempImageFileURL, setTempImageFileURL] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const UserPhotoRef = useRef(null);
  const userProfileRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      setImageFileURL(currentUser.profilePhotoURL);
    }
  }, [currentUser]);

  const actionCallback = () => {
    alert('Remember to handle the cover photo upload later');
  };

  const handleImageUpload = event => {
    console.log(event.target);
    if (event.target.files.length === 1) {
      const image = event.target.files[0];
      setImageFile(image);
      const objectURL = URL.createObjectURL(image);
      userProfileRef.current.src = objectURL;
      setTempImageFileURL(objectURL);
      setShowUpload(true);
    }
  };

  const undoImageSelection = () => {
    setTempImageFileURL('');
    setImageFile('');
    setShowUpload(false);
  };
  const confirmPhotoUpload = async () => {
    setShowUpload(false);
    const formData = new FormData();
    formData.append('profile_photo_file', imageFile);
    await updateProfilePhotoAction(formData);
    setTempImageFileURL('');
  };

  const getImageURL = () => {
    if (tempImageFileURL) {
      return tempImageFileURL;
    } else if (imageFileURL) {
      return CHAT_API_URL + '/' + imageFileURL;
    } else {
      return 'https://www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png';
    }
  };

  const showUploadButton = () => {
    if (showUpload) {
      return (
        <span
          onClick={confirmPhotoUpload}
          className='add-photo  success confirm-upload left'>
          <Icon icon='cloud_done' color='neutral' size='35px' />
        </span>
      );
    }
  };
  const showChooseUndoButton = () => {
    if (tempImageFileURL && !profilePhotoUpdating) {
      return (
        <span className='add-photo' onClick={undoImageSelection}>
          <Icon icon='undo' color='neutral' size='35px' />
        </span>
      );
    } else if (!tempImageFileURL && !profilePhotoUpdating) {
      return (
        <span className='add-photo'>
          <Icon
            iconClick={() => UserPhotoRef.current.click()}
            icon='photo_camera'
            color='neutral'
            size='35px'
          />
        </span>
      );
    }
  };

  const showRequestLoading = () => {
    return (
      <RequestLoading
        type='circle'
        className='center-loader'
        show={profilePhotoUpdating}
      />
    );
  };

  return (
    <section style={defaultCoverImage} className='user-header-banner'>
      <div className='user-profile-photo  center-absolute'>
        <div className='img-container'>
          <input
            style={{ display: 'none' }}
            type='file'
            ref={UserPhotoRef}
            className='form-control-file'
            id='exampleFormControlFile1'
            name='photoURL'
            onChange={handleImageUpload}
            accept='image/*'
          />
          {showRequestLoading()}
          <div
            onClick={() => UserPhotoRef.current.click()}
            className='circle'
            style={{
              height: '200px',
              width: '200px',
              border: '6px solid #b30c0c',
              backgroundImage: `url(${getImageURL()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: ' no-repeat',
            }}
            ref={userProfileRef}></div>
          {showUploadButton()}
          {showChooseUndoButton()}
        </div>
      </div>
      <div className='edit-cover-photo'>
        <Button
          type='submit'
          size='large'
          name='update_cover_photo'
          color='btn-primary'
          buttonCallback={actionCallback}>
          Edit Cover Photo
          <Icon
            className='left'
            icon='photo_camera'
            color='neutral'
            size='35px'
          />
        </Button>
      </div>
    </section>
  );
};

const defaultCoverImage = {
  backgroundImage: `url(${DefaultCoverImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  padding: '0',
  position: 'relative',
  minHeight: '320px',
  borderBottomLeftRadius: '22px',
  borderBottomRightRadius: '22px',
  backgroundSize: ' cover',
};

const smallImageCircle = {
  height: '200px',
  width: '200px',
  border: '6px solid #fff',
  backgroundImage: `url('https://www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png')`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    profilePhotoUpdating: state.api.profilePhotoUpdating,
  };
};

export default connect(mapStateToProps, { updateProfilePhotoAction })(
  UserProfileBanner
);
