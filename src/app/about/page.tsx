import { memo } from 'react';
import phone from 'lucide-react'

const Page = () => {
  const tableus = [
    {
      id: 1,
      iden: 'Email',
      icon: 'phone'
    },
    {
      id: 2,
      iden: 'Plan',
      icon: 'calendar'
    },
    {
      id: 3,
      iden: 'Upload',
      icon: 'upload'
    }
  ]
  return (
    <div className="m-7">
      <h1 className="font-bold text-3xl font-serif ml-3 mt-3">This is the abouts page</h1>
      <div className="flex gap-3 items-center">
      {tableus.map((tab) => (
        <div key={tab.id} className="bg-orange-500 p-3 rounded-lg text-white ">
            <span className="text-sm">{tab.iden}</span>
        </div>
      ))}
      </div>
    </div>
  );
};

export default memo(Page);