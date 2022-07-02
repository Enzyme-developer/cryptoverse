import React from 'react'
import CoinSearch from './CoinSearch'
import TrendingCoin from './TrendingCoin'
import Loading from './Loading';

//interface for props
interface Props{
  coins : []
  loading : boolean
}


const Home = ({ coins, loading }: Props) => {
  if (loading) { return <Loading /> };

  return (
    <div>
      <CoinSearch coins={coins} />
      <TrendingCoin />
    </div>
  )
}

export default Home