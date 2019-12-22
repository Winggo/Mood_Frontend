import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'


Router.events.on('routeChangeStart', url => {
  NProgress.start();
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


const onSubmit = (e) => {
  if(e.keyCode === 13) {
    e.preventDefault();
    let query = document.getElementById('searchBox').value;
    Router.push({
      pathname: '/results',
      query: {'q': query}
    })
  }
}

const Home = () => {
  useEffect(() => {
    document.getElementById('searchBox').focus();
  }, [])

  return (
    <div>
      <Head>
        <title>Mood</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      
      <div className="hero">
        <h1 className="title">Mood</h1>
        <p className="description">
          What's the sentiment of the internet?
        </p>

        <input type='text' name='search' id='searchBox' 
          placeholder="Press 'enter' to search" 
          onKeyDown={(e) => onSubmit(e)}/>
      </div>

      <style jsx>{` 
        .hero {
          width: 100%;
          color: #333;
          padding-top: 30vh;
          text-align: center;
        }
        .title {
          margin: 0;
          width: 100%;
          line-height: 1.15;
          font-size: 48px;
        }
        #searchBox {
          margin: 20px;
          width: 30vw;
        }
        #searchBox::placeholder {
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export default Home
