import React from 'react';
import { Circles } from  'react-loader-spinner'

//create loader to show user data is being fetched
const Loading = () => {
  return (
    <div className='flex justify-center item-center'>
        <Circles color="#00BFFF" height='550' width='80' />
    </div>
  )
}

export default Loading;