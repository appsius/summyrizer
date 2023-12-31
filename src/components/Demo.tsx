import React from 'react';
import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [allArticles, setAllArticles] = useState([{}]);
  const [copied, setCopied] = useState('');
  // const [isCopied, setIsCopied] = useState(false);

  let errMsg;
  error &&
    'status' in error &&
    (errMsg = 'error' in error ? error?.error : JSON.stringify(error?.data));

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')!
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    // setIsCopied(true);

    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied('');
      // setIsCopied(false);
    }, 3000);
  };

  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form
          className='flex justify-center items-center relative'
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt='link_icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />
          <input
            type='url'
            value={article.url}
            placeholder='Enter a url'
            className='url_input peer'
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
            required
          />
          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
          >
            ↲
          </button>
        </form>

        {/* Browse URL Summary History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item: any, index: number) => {
            if (item.summary !== undefined) {
              return (
                <div
                  key={`link_${index}`}
                  onClick={() => setArticle(item)}
                  className='link_card'
                >
                  <div
                    className='copy_btn'
                    onClick={() => handleCopy(item.url)}
                  >
                    <img
                      src={copied === item.url ? tick : copy}
                      alt='copy_icon'
                      className='w-[40%] h-[40%] object-contain'
                    />
                  </div>
                  <p className='flex-1 font-satoshi text-sm font-medium truncate text-blue-700'>
                    {item.url}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* Display results */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well this does not supposed to be! <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {errMsg}
            </span>
          </p>
        ) : (
          article?.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
