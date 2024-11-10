import React, { useState, useEffect } from 'react'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componenets/Navbar'
import { useCart } from './CartContext';

export default function Cart() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [items, setItems] = useState([]);
    const { updateCartLength } = useCart();
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/cart/${userId}`);
                // console.log(response)
                setItems(response.data.items);
                updateCartLength(response.data.items.length)
            } catch (err) {
                console.error(err);
            } 
        };

        fetchCartItems();
    }, [items]);

    
    let totalPrice = items.reduce((total, food) => total + food.price, 0);



    const removeItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5000/cart/${userId}/item/${itemId}`);
            setItems(items.filter(item => item.itemId !== itemId)); 
            updateCartLength(items.length)
            enqueueSnackbar("Item deleted from cart", {variant:"success"})
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    }

    const checkoutPage = async () => {
        try {
            await axios.delete(`http://localhost:5000/cart/remove/${userId}`);
            navigate('/checkout')
        } catch (error) {
            console.log('Error removing all items from cart:', error)
        }
    }

    return (
        <div>
            <Navbar/>
            {!items.length>0 ? <h1 style={{display:'flex', justifyContent:'center', alignItems:'center', height:'80vh', textEmphasisStyle:'circle'}}>Please add itmes for cart</h1> :
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover'>
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col' style={{ textAlign: 'center' }}>#</th>
                        <th scope='col' style={{ textAlign: 'center' }}>Name</th>
                        <th scope='col' style={{ textAlign: 'center' }}>Quantity</th>
                        <th scope='col' style={{ textAlign: 'center' }}>Option</th>
                        <th scope='col' style={{ textAlign: 'center' }}>Amount</th>
                        <th scope='col'></th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((food, index) => (
                        
                        <tr key={index}>
                            <th scope='row' style={{ textAlign: 'center', verticalAlign: 'middle' }}>{index + 1}</th>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{food.name}</td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{food.quantity}</td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{food.size}</td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{food.price}</td>
                            <td ><FontAwesomeIcon icon={faXmark} className='icon-hover'  onClick={() => removeItem(food.itemId)}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1> </div>
            <div>
                <button className='btn bg-success mt-5' onClick={checkoutPage}> Check Out</button>
            </div>
        </div>}
        </div>
    )
}
