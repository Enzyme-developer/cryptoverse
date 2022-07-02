import React, { useState } from 'react';
import Coin from './Coin'

interface Props{
  coins : []
}

const CoinSearch = ({ coins }: Props) => {

  const [searchText, setSearchText] = useState<string>('');

  console.log(coins)

  return (
    <div className='rounded-div my-4 px-4'>

      <div className='flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
        <h1 className='text-2xl font-bold my-2'>Search Crypto</h1>
        <form>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className='w-full border border-input px-4 py-2 rounded-2xl shadow-xl dark:text-black focus:outline-0'
            type='text'
            placeholder='Search for a coin'
          />
        </form>
      </div>

      <table className='w-full border-collapse text-center'>

        <thead>
          <tr className='border-b'>
            <th>Save</th>
            <th className='px-4'>#</th>
            <th className='text-left'>Coin</th>
            <th></th>
            <th>Price</th>
            <th>24h</th>
            <th className='hidden md:table-cell'>24h Volume</th>
            <th className='hidden sm:table-cell'>Mkt</th>
            <th className='hidden sm:table-cell'>Last 7 Days</th>
          </tr>
        </thead>

        <tbody>
          {/* filter coins */}
          {coins
            // eslint-disable-next-line array-callback-return
            .filter((coin : any) => {
              if (searchText === '') {
                return coin
              } else if (
                coin.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return coin
              }
            })
            // map coins to give a single coin object
            .map((coin : any) => (
              <Coin key={coin.id} coin={coin} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinSearch;