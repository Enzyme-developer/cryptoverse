import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { userContext } from '../context/AuthContext';

const Navbar = () => {
  const [nav, setNav] = useState<boolean>(false);
  const { user, logOut } = useContext(userContext);
  const navigate = useNavigate();

  const handleNav: () => void = () => {
    setNav(!nav);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (e:any) {
      console.log(e.message);
    }
  };


  return (
   
    <div className={nav ? 'border-b z-100 fixed bg-white h-[8vh] flex w-full items-center shadow-xl justify-between px-4 py-8 dark:bg-black dark:text-white'
      :  'border-b z-100 h-[8vh] flex w-full items-center shadow-xl justify-between px-4 py-8 dark:bg-black dark:text-white' }>
      <div>
        <Link to='/'><h1 className='text-xl uppercase font-bold'>CryptoVerse</h1></Link>
      </div>

      <div className=''>
        <ThemeToggle />
      </div>



      <div className={
           nav
             ? 'md:hidden  fixed left-0 top-[8vh] flex flex-col w-full h-[100%] px-4 ease-in duration-300 z-1000 bg-white  dark:bg-black dark:text-white '
             : 'md:hidden absolute left-[-100%] top-[8vh] flex flex-col w-full h-[100%] px-4 ease-in duration-300 z-1000 bg-white dark:bg-black dark:text-white'
         }
     >
            
        <ul className='flex flex-col h-[100%] font-bold'>

       
          <li onClick={handleNav} className='border-b border-slate-400 py-6 dark:border-white'>
            <Link to='/'>Home</Link>
          </li>

          <li onClick={handleNav} className='border-b border-slate-400 py-6 dark:border-white'>
            <Link to='/account'>Account</Link>
          </li>
       

        {!user?.email ? (
          <div className='flex flex-col md:hidden space-y-4 mt-6'>
            <Link to='/signin' onClick={handleNav} className='border-b border-slate-400 shadow-lg hover:shadow-2xl pb-6 dark:border-white outline-none' >Sign In</Link>
            <Link to='/signup' onClick={handleNav} className='rounded-2xl shadow-lg hover:shadow-2xl p-2 bg-blue-600 text-white outline-none'>Sign Up</Link>
          </div> )
    
           : (
          <div className='flex flex-col md:hidden space-y-4 mt-6' onClick={handleNav}>
            <button className='bg-red-500 p-2 rounded border-none text-white outline-none' onClick={handleSignOut}>Sign out</button>
          </div>
           )}
          
        </ul>
      </div>
           

      <div onClick={handleNav} className='block md:hidden cursor-pointer z-10'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>


      {user?.email ? (
        <div className='hidden md:block space-x-4 font-bold'>
          <Link to='/account' className='p-3 rounded-2xl shadow-lg hover:shadow-2xl'>Account</Link>
          <button className='rounded-2xl shadow-lg p-3 hover:shadow-2xl border-none outline-none' onClick={handleSignOut}>Sign out</button>
        </div>
      ) : (
        <div className='hidden md:block space-x-4 font-bold'>
          <Link to='/signin' className='rounded-2xl shadow-lg hover:shadow-2xl px-3 py-2 bg-yellow-400 outline-none'>Sign In</Link>
          <Link to='/signup' className='rounded-2xl shadow-lg hover:shadow-2xl px-3 py-2 bg-blue-600 text-white outline-none'>Sign Up</Link>
        </div>

      )}
 
      
    </div>

  );
};


export default Navbar;