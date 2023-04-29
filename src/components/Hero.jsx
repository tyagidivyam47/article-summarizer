import React from 'react'
import logo from '../assets/logo.png'

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className='flex justify-between items-center w-full mb-10 pt-3 '>
        <img src={logo} alt='logo' className='w-28' />
        <button type='button'
          onClick={() => window.open("https://github.com/tyagidivyam47/article-summarizer")}
          className='black_btn '
        >
          Github
        </button>
      </nav>
      <h1 className='head_text'>
        Summarize Articles using <br />
        <span className='orange_gradient'>Artificial Intelligence</span>
      </h1>

      <h2 className='desc'>
        Save time, absorb more: Experience efficient reading with this powerful AI based article summarizer
      </h2>
    </header>
  )
}

export default Hero
