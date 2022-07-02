import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = useContext(userContext);

  //handle signIn
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/account')
    } catch (e :any) {
      setError(e.message);
      console.log(e.message);
      console.log(error)
    }
  };

  return (
    <div  className='min-h-screen'>
        <div className='max-w-[400px] mx-auto min-h-[500px] px-4 py-20'>
              
        <h1 className='text-2xl font-bold'>Sign In</h1>
        <form onSubmit={handleSubmit}>
            
            <div className='my-4'>
            <label>Email</label>
            
              <input
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 border border-input rounded-2xl shadow-2xl text-black outline-none'
                type='email'
              />
              {/* <AiOutlineMail className='absolute right-2 top-3 text-gray-400' /> */}
    
            
          </div>
          
          <div className='my-4'>
            <label>Password</label>
            
              <input
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 border border-input rounded-2xl shadow-2xl text-black outline-none'
                type='password'
              />
              {/* <AiFillLock className='absolute right-2 top-3 text-gray-400' /> */}
          
          </div>

                  
          <button className='w-full my-2 p-3 bg-yellow-400 text-black rounded-2xl shadow-xl outline-none'>Sign in</button>
        </form>
              
        <p className='my-4 text-center'> Don't have an account?{' '}
          <Link to='/signup' className='underline'>
            Sign up
          </Link>
        </p>

        <p className='my-4 text-center text-red-500 text-md'> {error} </p>
        
      </div>
    </div>
  );
};

export default SignIn;