import styled from '@/utils/styled';

export const ImageContainer = styled.div`
  position: relative;
  background: #e0e0e0;
`;

export const Placeholder = styled.img`
  display: block;
  width: 100%;
`;

export const Img = styled.img<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;
