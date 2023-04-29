import React, { useState } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import axios from 'axios';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: ""
  })
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  console.log(article.summary);
  console.log(error);

  const handleCopy = () => {
    setCopied(!copied);
    navigator.clipboard.writeText(article.summary)

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCopied(false);
    setFetching(true);
    const options = {
      method: 'GET',
      url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
      params: {
        url: article.url,
        length: '3'
      },
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': "aeb72ec185msh0a6fb6c94815577p1d14b0jsn4216cd64d6f8",
        'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setArticle({ ...article, summary: response.data.summary });
      setFetching(false);
      // console.log(response.data);
    } catch (error) {
      setError(true);
      setFetching(false);
      console.error(error);
    }
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        <form className='relative flex justify-center items-center' onSubmit={(e) => { handleSubmit(e) }}>
          <img
            src={linkIcon}
            alt='link-icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />

          <input
            type='url'
            placeholder='Enter a URL'
            className='url_input peer'
            required
            value={article.url}
            onChange={(e) => setArticle({
              ...article, url: e.target.value
            })}
          />

          <button type='submit' className='submit_btn peer-focus:border-gray-700'>↲</button>
        </form>
      </div>
      <div className='my-10 max-w-full flex justify-center items-center'>
        {fetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Something's Wrong 😬️
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              Check if the URL is correct or check your internet connection
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
              <div className='copy_btn' onClick={() => handleCopy()}>
                <img
                  src={copied ? tick : copy}
                  alt={copied ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
            </div>

          )
        )}
      </div>
    </section>
  )
}

export default Demo
