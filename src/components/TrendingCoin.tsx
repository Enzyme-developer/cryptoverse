import { useState , useEffect } from 'react'
import axios from 'axios';


const TrendingCoin = () => {
    const [trendingCoins, setTrendingCoins] = useState<[]>([])
    
    const url: string = 'https://api.coingecko.com/api/v3/search/trending'
    
    //fetch coin data
    useEffect(() => {
      axios.get(url).then((response) => {
        setTrendingCoins(response.data.coins)
        console.log(response.data.coins)
    })
    }, [])

  return (
    <div className='rounded-div p-4'>
        <h1 className='font-bold text-2xl'>Trending Coins</h1>
        
        <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {trendingCoins.map((trendingCoin : any) => (
            <div key={trendingCoin.item.name} className='flex items-center justify-between shadow-2xl dark:border rounded dark:border-white my-4 px-2 py-4'>

                <div className='flex items-center'>
                    <img className='w-8 h-8 rounded-full' src={trendingCoin.item.thumb} alt={ trendingCoin.item.id} />
                    <div className='flex flex-col ml-2'>
                        <p>{trendingCoin.item.name}</p>
                        <p>{trendingCoin.item.symbol}</p>
                    </div>
                </div>

                <div className='flex space-x-2 text-center'>
                    <img className='w-6 rounded-full' src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?15470" alt='btc' ></img>
                    <p>{trendingCoin.item.price_btc.toFixed(7)}</p>
                </div>

            </div>
        ))}
        </div>
    </div>
  )
}

export default TrendingCoin