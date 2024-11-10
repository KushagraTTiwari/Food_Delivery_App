import React from 'react'
import hoorayAnimation from '../assets/hooray.mp4';
import Navbar from '../componenets/Navbar'

export default function Checkout() {

  return (
    <>
      <Navbar />
      <div style={{ height: '80vh', textAlign: 'center', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <video
          src={hoorayAnimation}
          autoPlay
          loop
          muted
          style={{ width: '300px', height: 'auto', borderRadius: '8px' }}
        />
        <h1>Thank you for your purchase!</h1>
        <h3>Soon you will get your orders.</h3>
      </div>
    </>
  )
}
