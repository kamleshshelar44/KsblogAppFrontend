import React, { Suspense, useState } from 'react'
import './App.css'


const Home=React.lazy(()=>import('./Pages/Home'))
function App() {

  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
    <Home/>
    </Suspense>
    </>
  )
}

export default App
