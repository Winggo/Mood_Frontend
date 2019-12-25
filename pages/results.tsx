import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { NextPage } from 'next';

interface resultsProps {
    query: string,
    numTweets: number,
    tweets: Array<String>,
}

const Results: NextPage<resultsProps> = (props) => {
    return (
        <div>
            <Head>
                <title>Mood</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <Link href='/'>
                    <a>Mood</a> 
                </Link>
                <h1>
                    {props.query}
                </h1>
                <h3>
                    {props.numTweets} Tweets found
                </h3>
                {props.tweets.map((tweet, index) => (
                    <p key={index}>{tweet}</p>
                ))}
                <p>
                    {props.tweets}
                </p>
            </div>
        </div>
    );
}

Results.getInitialProps = async ({query}) => {
    console.log('http://localhost:5000/' + query['q']);
    const res = await fetch('http://localhost:5000/' + query['q'], {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return {
        'query': data['query'],
        'tweets': data['tweets'],
        'numTweets': data['numTweets'],
    };
}

export default Results;