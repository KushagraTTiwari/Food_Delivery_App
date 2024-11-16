import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { useCart } from './CartContext';
import { config } from "../App";

export default function Card(props) {
  const {cartLength, updateCartLength} = useCart()
  const { enqueueSnackbar } = useSnackbar()
  let priceRef = useRef();

  let options = props.options
  let priceOptions = Object.keys(options)
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let finalPrice = qty * parseInt(options[size]);

  const token = localStorage.getItem('token');


const handleAddToCart = async () => {
    if(token){
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.id;
      localStorage.setItem('userId',userId)
      const itemData = {
        userId: userId,
        item: {
          itemId: props.foodItem._id, 
          name: props.foodItem.name,
          quantity: qty,
          price: finalPrice,
          size:size,
        },
      };
  
      try {
        const response = await axios.post(`${config.endpoint}/cart/add`, {userId:itemData.userId, item:itemData.item});
        updateCartLength(cartLength+1)
        if (response.status === 200) {
          enqueueSnackbar(`${itemData.item.name} has been added to your cart!`, {variant: "success"})
        } else {
          enqueueSnackbar('Failed to add item to cart', {variant: "error"});
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }else{
      enqueueSnackbar("You are not logged in", {variant: "error"});
    }
  };

  useEffect(()=> {
    setSize(priceRef.current.value)
  },[])


  return (
    <div>
      <div>
        <div className="card mt-3" style={{"width": "18rem", "maxHeight": "460px"}}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "cover" }} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text">This is some important text</p>
            <div className='container w-100'>
              <select className='m-2 h-100 bg-success rounded' onChange={(e)=> setQty(e.target.value)}>
                {Array.from(Array(6), (e,i)=>{
                  return(
                    <option key={i+1} value={i+1}>{i+1}</option>
                  )
                })}
              </select>

              <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                {
                  priceOptions.map((data)=>{
                    return <option key={data} value={data}>{data}</option>
                  })
                }
              </select>

              <div className='d-inline h-100 fs-5'>
              ₹{finalPrice}/-
              </div>
            </div>
            <hr></hr>
            <div className='justify-content-center w-100'>
            <button className='btn btn-success justify-content-center w-100' onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
