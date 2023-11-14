import Button from '../components/Button';
import { ButtonSize } from '../constants';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  return (
    <main className='flex flex-col justify-center items-center'>
      <h1 className='font-bold text-40pxr'>Github 레포 검색</h1>
      <Button
        size={ButtonSize.Large}
        onClick={() => navigate('/search')}
        text='검색하러 가기'
      />
    </main>
  );
};

export default Main;
