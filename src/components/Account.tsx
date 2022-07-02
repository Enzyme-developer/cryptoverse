import React, { useContext } from 'react';
import SavedCoin from '../components/SavedCoin';
import { userContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Account = () => {
  const { user, logOut } = useContext(userContext);
  const navigate = useNavigate();

  const handleSignOut = async (e:any) => {
    try {
      await logOut();
      navigate('/');
    } catch (e :any) {
      console.log(e.message);
    }
  };
  

  if (user) {
    return (
      <div className='w-full mx-auto p-4 min-h-screen'>
        <div className='flex justify-between items-center my-12 py-8 rounded-div'>
            
          <div>
            <h1 className='text-2xl font-bold'>Account</h1>
            <div>
              <p>Welcome, {user?.email}</p>
            </div>
          </div>

                
          <div>
            <button
              onClick={handleSignOut}
              className='border px-6 py-2 rounded-2xl text-white font-bold border-none bg-red-500 shadow-lg hover:shadow-2xl'
            >
              Sign Out
            </button>
          </div>
                
        </div>

            
        <div className='flex justfiy-between items-center my-12 py-8 rounded-div'>
          <div className='w-full'>
            <h1 className='text-2xl font-bold py-4'>Watch List</h1>
            <SavedCoin />
          </div>
        </div>

            
      </div>
    );
    
  } else {
    return <Navigate to='/signin' />;
    }
    
};

export default Account;