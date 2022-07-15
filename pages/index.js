import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import React from 'react'
import noImage from '../public/no_image.png'
import { useState, useEffect } from 'react'


function Home({ posts }) {
  let page = 2;
  const [data, setData] = useState(posts)

  const getMorePost = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=ef2fc7966b7886b23c82a2279f82783c&language=en-US&page=${page}`
    );
    const newPosts = await res.json();
    const loadData = newPosts.results
    setData((post) => [...post, ...loadData]);
    page += 1
  };

  const scrollHandle = (e) => {
    if (e.target.clientHeight + e.target.scrollTop + 1 >= e.target.scrollHeight) {
      getMorePost()
    }
  }

  useEffect(() => {
    const scrollBar = document.querySelector('.container')
    scrollBar.addEventListener('scroll', scrollHandle)
  }, [])

  return (
    <>
      <div className='container' style={{ height: 1000, overflowY: "scroll" }}>
        <Head>
          <title>Movie-show Details</title>
          <meta name="title" content="Movie-show Details" />
          <meta name="description" content="Movie show details website using NextJs" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://movie-app-nextjs-dusky.vercel.app/" />
          <meta property="og:title" content="Movie-show Details" />
          <meta property="og:description" content="Movie show details website using NextJs" />
          <meta property="og:image" content="https://i.postimg.cc/gnqyd7mw/movie.jpg" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://movie-app-nextjs-dusky.vercel.app/" />
          <meta property="twitter:title" content="Movie-show Details" />
          <meta property="twitter:description" content="Movie show details website using NextJs" />
          <meta property="twitter:image" content="https://i.postimg.cc/gnqyd7mw/movie.jpg" />
          <link rel="shortcut icon" href="favicon.ico" />
        </Head>
        {
          data.map((item) => {
            return (
              <Link key={item.id} href={`about/${item.id}`}>
                <div key={item.id} className='card'>
                  <Image
                    src={item.poster_path !== null ? `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` : noImage}
                    alt={item.title}
                    height={750}
                    width={500}
                  />
                  <div>
                    <span className='titleforcard'><b>{item.title}</b></span>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div >
    </>
  )
}

export default Home;


export async function getStaticProps() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=ef2fc7966b7886b23c82a2279f82783c&language=en-US&page=1`
  ).then((response) => response.json());
  const result = data.results


  return {
    props: {
      posts: result,
      currentPage: data.page,
    }
  }
}


