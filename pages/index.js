import { Fragment } from 'react';
import Head from 'next/head';

import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { getFeaturedPosts } from '../lib/posts-util';
import Link from 'next/link';
import styled from 'styled-components'

const RecruitList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const RecruitItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 480px;
  height: 300px;
  background-color: #f2f2f2;
  margin-bottom: 8px;
  border-radius: 4px;
`


function HomePage({ data }) {

  if (!data) return <div>loading...</div>

  return (
    <Fragment>
      <Head>
        <title>Max' Blog</title>
        <meta
          name='description'
          content='I post about programming and web development.'
        />
      </Head>

      <RecruitList>
        <ul>
          {data.map((list, i) => (
            <RecruitItem key={i} >
              <li  >
                <div >{list.description}</div>
                <div >{list.endDate}</div>
                <Link  href={list.link} >보러가기</Link>
              </li>
            </RecruitItem>
          ))}
        </ul>
      </RecruitList>
    
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  const res = await fetch('https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app/recruits.json')
  const data = await res.json()
  return {
    props: {
      data,
    },
  };
}

export default HomePage;
