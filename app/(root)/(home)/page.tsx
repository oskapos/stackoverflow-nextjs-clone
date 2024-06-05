import React from 'react';
import HomeFilters from '@/components/home/HomeFilters';
import Filter from '@/components/shared/Filter';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import Link from 'next/link';
import NoResult from '@/components/shared/NoResult';
import QuestionCard from '@/components/shared/cards/QuestionCard';

const questions = [
  {
    _id: '12345',
    title: 'How does TypeScript improve JavaScript development?',
    tags: [
      {
        _id: 't1',
        name: 'TypeScript',
      },
      {
        _id: 't2',
        name: 'JavaScript',
      },
      {
        _id: 't3',
        name: 'Development',
      },
    ],
    author: {
      _id: 'a1',
      name: 'Jane Doe',
      picture: 'https://example.com/picture.jpg',
    },
    upvotes: 42700,
    views: 256000000,
    answers: [
      {
        _id: 'ans1',
        author: {
          _id: 'a2',
          name: 'John Smith',
          picture: 'https://example.com/picture2.jpg',
        },
        content: 'TypeScript adds static types to JavaScript, which helps catch errors early and improve code quality.',
        upvotes: 30,
        createdAt: new Date('2024-06-01T12:00:00Z'),
      },
      {
        _id: 'ans2',
        author: {
          _id: 'a3',
          name: 'Alice Johnson',
          picture: 'https://example.com/picture3.jpg',
        },
        content: 'It also offers modern features like interfaces, generics, and type inference, making the code more robust and maintainable.',
        upvotes: 15,
        createdAt: new Date('2024-06-02T08:30:00Z'),
      },
    ],
    createdAt: new Date('2023-05-28T10:00:00Z'),
  },
];

const Home = () => {
  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
        <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>Ask a Question</Button>
        </Link>
      </div>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchbar route='/' iconPosition='left' imgSrc='/assets/icons/search.svg' placeholder='Search for questions' otherClasses='flex-1' />
        <Filter filters={HomePageFilters} otherClasses='min-h-[56px] sm:min-w-[170px]' containerClasses='hidden max-md:flex' />
      </div>
      <HomeFilters />

      <div className='mt-10 flex w-full flex-col gap-6'>
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              answers={question.answers}
              views={question.views}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no questions to show"
            description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Our query could be the next big thing others learn from. Get involved! 💡'
            link='/ask-question'
            linkTitle='Ask a Question'
          />
        )}
      </div>
    </>
  );
};

export default Home;
