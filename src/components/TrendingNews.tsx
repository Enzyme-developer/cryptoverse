import React, { useState, useEffect } from 'react'
import axios from "axios";
import moment from "moment";
import { Link } from 'react-router-dom';

interface Propsa {
    method: string;
    url: string;
    params: {
        q: {
            search: string;
            count?:string
        };
    freshness: string;
    textFormat: string;
    safeSearch: string;
};
headers: {
    'X-BingApis-SDK': string;
    'X-RapidAPI-Key': any;
    'X-RapidAPI-Host': string;
    'X-Search-Location'?: string;
};
}



interface Propsb {
    method: string;
    url: string;
    params: {
        category: string;
        cc: string;
        mkt: string;
        setLang: string;
        safeSearch: string;
        textFormat: string;
        count: string;
 
};
headers: {
    'X-BingApis-SDK': string;
    'X-RapidAPI-Key': any;
    'X-RapidAPI-Host': string;
    'X-Search-Location'?: string;
};
}


const TrendingNews = () => {
    const [ trending , setTrending ] = useState<any>([])
    const [ search , setSearch ] = useState('')
    

    useEffect(() => {

        if (search) {
            const options:Propsa = {
                method: 'GET',
                url: 'https://bing-news-search1.p.rapidapi.com/news/search',
                params: {q: {search}, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off'},
                headers: {
                  'X-BingApis-SDK': 'true',
                  'X-RapidAPI-Key': process.env.REACT_APP_NEWS_API_KEY,
                  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                }
              };
              
              axios.request(options).then(function (response) {
                  console.log(response.data);
                  setTrending(response.data.value)
              }).catch(function (error) {
                  console.error(error);
              });
            
        } else {
            const options : Propsb = {
                method: 'GET',
                url: 'https://bing-news-search1.p.rapidapi.com/news',
                params: {
                  count: '12',
                  category: 'Business',
                  cc: 'us',
                  mkt: ' en-US',
                  setLang: ' EN ',
                  safeSearch: 'Off',
                  textFormat: 'Raw'
                },
                headers: {
                  'X-BingApis-SDK': 'true',
                  'X-RapidAPI-Key': process.env.REACT_APP_NEWS_API_KEY,
                  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                }
              };
        
            axios.request(options).then(function (response) {console.log(response.data)
                console.log(response.data)
                setTrending(response.data.value)
            }).catch(function (error) {
                console.error(error);
            });
        }
   
    }, [search])
 


    return (
        <div className='p-4 '>

        <div className='flex flex-col md:items-center justify-between md:flex-row'>
            <label>Enter Keyword</label>
            <input type='text'className='text-black shadow-2xl border-gray-500 border outline-none rounded p-1' placeholder='Type in a word' value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
            
        <p className='font-bold py-4'>TRENDING NEWS</p>
        <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-10 items-center justify-center'>
          
          {trending.map((trend : any) => (
            <div key={trend?.name} className=' rounded-lg flex flex-col md:max-w-[300px] w-full border shadow-2xl cursor-pointer'>
                <img className='rounded-lg w-full max-h-[180px] min-h-[180px]' src={trend?.image?.thumbnail?.contentUrl} alt={trend.name} />
                <p className='flex font-bold p-2'>{trend?.name.slice(0,100)}...</p>
                <p className='font-bold p-2'>{trend?.datePublished.toString().slice(0,10)}</p>
                  {/* <p>{trend.description.slice(0,80)}</p> */}
                <a target="_blank" rel="noopener noreferrer" href={trend?.url}>
                    <p className='p-2 underline text-gray-500 overflow-x-hidden font-bold'>Read More</p>
                </a>
            </div>
          ))}

        </div>
        </div>
  )
}

export default TrendingNews