import { InfinitySpin } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styles';

export function Loader() {
  return (
    <LoaderContainer>
      <InfinitySpin width="200" color="#4fa94d" />
    </LoaderContainer>
  );
}
