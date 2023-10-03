import React from 'react';
import { logo } from '../assets';

const Hero = () => {
  return (
    <header className='flex flex-col justify-content items-center w-full'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt='summirizer_logo' className='w-8 object-contain' />
        <button
          type='button'
          className='black_btn'
          onClick={() => window.open('https://github.com/appsius')}
        >
          Github
        </button>
      </nav>

      <h1 className='head_text'>
        Summarize Articeles with <br className='max-md:hidden' />
        <span className='orange_gradient'>OPENAI GPT-4</span>
      </h1>
      <h2 className='desc'>
        Simply your reading with Summarize App, an open-source article
        summarizer that transform lengthy articles into clear and concise
        summaries.
      </h2>
    </header>
  );
};

export default Hero;
