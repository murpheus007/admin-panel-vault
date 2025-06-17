import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';

import { Dots } from 'react-activity';
import 'react-activity/dist/library.css';

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const { login, loading } = useAdmin();
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await login(email, password);
      } catch (error) {
         console.log('Login failed:', error.message);
      }
   };

   return (
      <div className='bg-white mx-auto my-[10%] w-full max-w-md p-6 rounded-xl shadow-2xl'>
         {/* Logo */}
         <div className='flex justify-center mb-4'>
            <img
               src='/logo2.svg' // Replace with your logo path
               alt='Brand Logo'
               className='h-12 object-contain'
            />
         </div>

         <h2 className='text-center text-[var(--color-primary)] text-2xl font-bold mb-4'>
            Hello Administrator!
         </h2>

         <form
            onSubmit={handleSubmit}
            className='grid gap-5 w-full'>
            {/* Email */}
            <div>
               <label
                  htmlFor='email'
                  className='text-sm font-medium text-gray-700'>
                  Email Address
               </label>
               <div className='flex items-center border border-gray-300 bg-blue-50 px-3 rounded-md focus-within:ring-2 focus-within:ring-blue-400 gap-1'>
                  <Mail className='w-4 h-4 text-gray-500' />
                  <input
                     type='email'
                     id='email'
                     value={email}
                     placeholder='johndoe@gmail.com'
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     className='flex-1 py-2 bg-transparent text-sm outline-none text-blue-950'
                  />
               </div>
            </div>

            {/* Password */}
            <div>
               <label
                  htmlFor='password'
                  className='text-sm font-medium text-gray-700'>
                  Password
               </label>
               <div className='flex items-center border border-gray-300 bg-blue-50 px-3 rounded-md focus-within:ring-2 focus-within:ring-blue-400 gap-1'>
                  <Lock className='w-4 h-4 text-gray-500' />
                  <input
                     type={showPassword ? 'text' : 'password'}
                     id='password'
                     value={password}
                     placeholder='********'
                     onChange={(e) => setPassword(e.target.value)}
                     required
                     className='flex-1 py-2 bg-transparent text-sm outline-none text-blue-950'
                  />
                  <button
                     type='button'
                     onClick={() => setShowPassword(!showPassword)}
                     className='text-gray-500 hover:text-blue-600'>
                     {showPassword ? (
                        <EyeOff className='w-4 h-4' />
                     ) : (
                        <Eye className='w-4 h-4' />
                     )}
                  </button>
               </div>
            </div>

            {/* Forgot Password */}
            <p
               className='text-sm text-red-600 cursor-pointer'
               onClick={() => navigate('/forgot-password')}>
               Forgot password?
            </p>

            {/* Submit Button */}
            <button
               type='submit'
               disabled={loading}
               className={`py-2 text-sm font-medium rounded-md w-full transition-colors ${
                  loading
                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                     : 'bg-[var(--color-primary)] text-white hover:bg-blue-600 cursor-pointer'
               }`}>
               {loading ? (
                  <span className='flex items-center justify-center gap-2'>
                     Logging In{' '}
                     <Dots
                        size={10}
                        color='#fff'
                     />
                  </span>
               ) : (
                  'Login'
               )}
            </button>
         </form>
      </div>
   );
};

export default LoginForm;
