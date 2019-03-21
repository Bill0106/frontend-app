import styled, { keyframes } from '@/utils/styled';

const loading = keyframes`
  0% {
    color: #666;
  }
  50% {
    color: #ccc;
  }
  100% {
    color: #666;
  }
`;

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

export const Icon = styled.i<{ show: boolean }>`
  display: ${props => (props.show ? 'inline-block' : 'none')};
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: #666;
  transform: translate(-50%, -50%);
  animation: ${loading} 1.5s ease-in-out infinite;
`;
