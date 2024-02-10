import React from 'react'

const Home = () => {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>
        Welcome to My Authentication App!
      </h1>
      <p className='mb-4 text-slate-700'>
        This is an authentication application built with the MERN (MongoDB,
        Express, React, Node.js) stack. It allows users to sign up for new
        accounts, log in securely, and access protected routes once authenticated.
      </p>
      <p className='mb-4 text-slate-700'>
        The front-end of the application is developed using React and utilizes
        React Router for client-side routing. On the server-side, we have Node.js
        and Express handling authentication requests, while MongoDB stores user
        information securely.
      </p>
      <p className='mb-4 text-slate-700'>
        Whether you're building a small-scale application with basic authentication
        features or planning to extend it further with additional functionalities,
        this authentication app serves as a solid foundation. Feel free to use it
        as a template for your own projects!
      </p>
    </div>
  );
  
}

export default Home