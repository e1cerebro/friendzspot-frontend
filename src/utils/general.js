import M from 'materialize-css';

export const streamIsValid = stream => {
  return stream.id ? true : false;
};

export const toggleModal = (id, state) => {
  let elems = document.getElementById(id);
  let modal = M.Modal.init(elems, { dismissible: false });
  if ('show' === state) {
    modal.open();
  } else if ('hide' === state) {
    modal.close();
  }
};
