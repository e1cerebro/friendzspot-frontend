import React, { useRef, useState, useEffect, Fragment } from 'react';
import DefaultCoverImage from '../../../images/default-cover-photo.jpg';
import './user-profile-banner.style.css';
import Icon from '../../../shared/icon/Icon';
import Button from '../../../shared/form-inputs/button/Button';
import { connect } from 'react-redux';
import {
  updateProfilePhotoAction,
  updateCoverPhotoAction,
} from '../../../redux/actions/user.actions';
import { CHAT_API_URL } from '../../../utils/api-settings';
import RequestLoading from '../../../shared/request-loading/RequestLoading';

const UserProfileBanner = ({
  currentUser,
  profilePhotoUpdating,
  updateProfilePhotoAction,
  updateCoverPhotoAction,
}) => {
  const [imageFile, setImageFile] = useState('');
  const [imageFileURL, setImageFileURL] = useState('');
  const [tempImageFileURL, setTempImageFileURL] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const [coverImageTempFileURL, setCoverImageTempFileURL] = useState(''); //stores the selected file from the dialogue
  const [coverImageFile, setCoverImageFile] = useState(''); //store the form formatted file
  const [coverImageFileURL, setCoverImageFileURL] = useState(''); //stores the file url from the api request
  const [showCoverImageUpload, setShowCoverImageUpload] = useState(false); //show or hide the upload button
  const [uploadingCoverPhoto, setUploadingCoverPhoto] = useState(false); //show or hide the upload button

  const UserPhotoRef = useRef(null);
  const userProfileRef = useRef(null);
  const coverPhotoRef = useRef(null);
  const coverPhotoFileRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      setImageFileURL(currentUser.profilePhotoURL);
      setCoverImageFileURL(currentUser.coverPhotoURL);
    }
  }, [currentUser]);

  const chooseCoverPhoto = () => {
    coverPhotoFileRef.current.click();
  };

  const handleCoverImageUpload = event => {
    if (event.target.files.length === 1) {
      const image = event.target.files[0];
      setCoverImageFile(image);
      const objectURL = URL.createObjectURL(image);

      // coverPhotoRef.current.src = objectURL;
      setCoverImageTempFileURL(objectURL);
      setShowCoverImageUpload('true');
    }
  };
  const getCoverImageURL = () => {
    if (coverImageTempFileURL) {
      return coverImageTempFileURL;
    } else if (coverImageFileURL) {
      return CHAT_API_URL + '/' + coverImageFileURL;
    } else {
      return DefaultCoverImage;
    }
  };

  const undoCoverPhoto = () => {
    setCoverImageFile('');
    setCoverImageTempFileURL('');
    setShowCoverImageUpload(false);
  };

  const uploadCoverPhoto = async () => {
    setUploadingCoverPhoto(true); //The loading animation
    setShowCoverImageUpload(false);
    const formData = new FormData();
    formData.append('cover_photo_file', coverImageFile);
    console.log(formData);
    await updateCoverPhotoAction(formData);
    setCoverImageTempFileURL('');
    setUploadingCoverPhoto(false); //turn off loading animation
  };

  const handleImageUpload = event => {
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
    // setTempImageFileURL('');
    setImageFile('');
  };

  const getProfileImageURL = () => {
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
    if (imageFile && !profilePhotoUpdating) {
      return (
        <span className='add-photo' onClick={undoImageSelection}>
          <Icon icon='undo' color='neutral' size='35px' />
        </span>
      );
    } else if (!imageFile && !profilePhotoUpdating) {
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

  const showRequestLoading = profilePhotoUpdating => {
    return (
      <RequestLoading
        type='circle'
        className='center-loader'
        show={profilePhotoUpdating}
      />
    );
  };

  return (
    <section
      ref={coverPhotoRef}
      style={{
        backgroundImage: `url(${getCoverImageURL()})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: '0',
        position: 'relative',
        minHeight: '320px',
        borderBottomLeftRadius: '22px',
        borderBottomRightRadius: '22px',
        backgroundSize: ' cover',
      }}
      className='user-header-banner'>
      {uploadingCoverPhoto && (
        <div className='cover-photo-loading'>
          {showRequestLoading(true)}
          <p>Updating cover photo...</p>
        </div>
      )}
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
          {showRequestLoading(profilePhotoUpdating)}
          <div
            onClick={() => UserPhotoRef.current.click()}
            className='circle'
            style={{
              height: '200px',
              width: '200px',
              border: '6px solid #b30c0c',
              backgroundImage: `url(${getProfileImageURL()})`,
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
        <input
          style={{ display: 'none' }}
          type='file'
          ref={coverPhotoFileRef}
          className='form-control-file'
          id='coverPhotoFile'
          name='coverPhoto'
          onChange={handleCoverImageUpload}
          accept='image/*'
        />

        {showCoverImageUpload ? (
          <Fragment>
            <Button
              type='submit'
              size='medium'
              name='update_cover_photo'
              color='btn-success'
              style={{ marginRight: '10px' }}
              buttonCallback={uploadCoverPhoto}>
              Save
              <Icon
                className='left'
                icon='cloud_upload'
                color='neutral'
                size='25px'
              />
            </Button>
            <Button
              type='submit'
              size='medium'
              name='update_cover_photo'
              color='btn-danger'
              buttonCallback={undoCoverPhoto}>
              Undo
              <Icon className='left' icon='undo' color='neutral' size='25px' />
            </Button>
          </Fragment>
        ) : (
          <Button
            type='submit'
            size='medium'
            name='update_cover_photo'
            color='btn-primary'
            buttonCallback={chooseCoverPhoto}>
            Cover Photo
            <Icon
              className='left'
              icon='photo_camera'
              color='neutral'
              size='25px'
            />
          </Button>
        )}
      </div>
    </section>
  );
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

export default connect(mapStateToProps, {
  updateProfilePhotoAction,
  updateCoverPhotoAction,
})(UserProfileBanner);
