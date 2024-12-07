import banner from '@/public/banner-2.png';
import Image from 'next/image';


export default function ConoceMas() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image src={banner} alt="Banner" className="w-[100%] h-[100%]" />
    </div>
  );
}
