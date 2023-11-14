import Button from '../components/Button';
import { ButtonSize } from '../constants';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  return (
    <main className='flex flex-col justify-center items-center overflow-hidden '>
      <img
        className='absolute top-0 left-0 h-full w-full -z-10 bg-black'
        src='https://github.githubassets.com/assets/hero-glow-f6eed469bca2.svg'
        alt=''
      />
      <h1 className='font-bold text-40pxr mb-20pxr text-white'>
        Github 레포 검색
      </h1>
      <Button
        size={ButtonSize.Large}
        onClick={() => navigate('/search')}
        text='🔍 검색하러 가기'
      />
    </main>
  );
};

export default Main;
