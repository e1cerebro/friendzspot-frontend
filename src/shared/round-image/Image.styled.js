import styled from 'styled-components';

export const Image = styled.div.attrs(props => ({
  size: props.size || '50px',
}))`
  height: ${props => props.size};
  width: ${props => props.size};
  border: 3px solid rgb(228, 225, 225);
  background-image: url(${props => props.url});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin: 0px auto;
`;
