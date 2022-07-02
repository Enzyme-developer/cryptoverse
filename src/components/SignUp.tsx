import React, { useState , useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../context/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signUp } = useContext(userContext);
  

  //handle signup
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setError('')
    try {
      await signUp(email,password)
      navigate('/account')
    } catch (e : any) {
      setError(e.message)
      console.log(e.message)
    }
  }



  return (
    <div className='min-h-screen'>
      <div className='max-w-[400px] mx-auto min-h-[500px] px-4 py-20'>
        
        <h1 className='text-2xl font-bold'>Sign Up</h1>
        {error ? <p className='bg-red-400 p-3 my-2'>{error}</p> : null}
        
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
                className='w-full p-2 border border-input rounded-2xl shadow-2xl outline-none'
                type='password'
              />
              {/* <AiFillLock className='absolute right-2 top-3 text-gray-400' /> */}
       
          </div>

                  
          <button className='w-full my-2 p-3 bg-blue-600 text-white rounded-2xl shadow-xl outline-none'
          
          >
            Sign up
          </button>
                  
        </form>

        <p className='my-4 text-center'>Already have an account?{' '}
          <Link to='/signin' className='underline'>
            Sign in
          </Link>
        </p>


        <p className='my-4 text-center text-red-500 text-md'> {error} </p>
        
      </div>
    </div>
  );
};

export default SignUp;