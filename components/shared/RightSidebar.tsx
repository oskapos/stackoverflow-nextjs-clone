import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RenderTag from './RenderTag';

const questions = [
  { _id: 1, title: 'How can an airconditioning machine exist?' },
  { _id: 2, title: 'Would it be appropriate to point out an error in another paper during a referee report?' },
  { _id: 3, title: 'Interrogated every time crossing UK Border as citizen' },
  { _id: 4, title: 'Low digit addition generator' },
  { _id: 5, title: 'What is an example of 3 numbers that do not make up a vector?' },
];

const popTags = [
  { _id: '1', name: 'JS', totalQs: 5 },
  { _id: '2', name: 'React', totalQs: 5 },
  { _id: '3', name: 'Next', totalQs: 5 },
  { _id: '4', name: 'Node', totalQs: 5 },
  { _id: '5', name: 'Rust', totalQs: 5 },
];

const RightSidebar = () => {
  return (
    <section className='background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-7 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
      <div>
        <h3 className='h3-bold text-dark200_light900'>Top questions</h3>
        <div className='mt-7 flex w-full flex-col gap-[30px]'>
          {questions.map((q) => (
            <Link key={q._id} href={`/questions/${q._id}`} className='flex cursor-pointer items-center justify-between gap-7'>
              <p className='body-medium text-dark500_light700'>{q.title}</p>
              <Image src='/assets/icons/chevron-right.svg' alt='chevron right' width={20} height={20} className='invert-colors' />
            </Link>
          ))}
        </div>
      </div>
      <div className='mt-16'>
        <h3 className='h3-bold text-dark200_light900'>Popular tags</h3>
        <div className='mt-7 flex flex-col gap-4'>
          {popTags.map((tag) => (
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} totalQs={tag.totalQs} showCount />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
