const express = require('express')
const router = express.Router();
const Cart = require('../model/Cart')

router.post('/add', async (req, res) => {
    const { userId, item } = req.body;
    console.log('userid-> ',userId)
    console.log('item-> ',item)
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (cart) {
        cart.items.push(item);
      } else {
        cart = new Cart({
          userId,
          items: [item],
        });
      }
  
      await cart.save();
      res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });



router.get('/:userId', async (req, res) => {
    const {userId} = req.params;
    // console.log('this is user is -> ',userId)

    try {
      const cart = await Cart.findOne({userId})

      // console.log('this is the cart of user -> ', cart)

      if(cart){
        res.status(200).json({items: cart.items})
      }else{
        res.status(404).json({ message: 'No cart found for this user', items: [] });
      }

    } catch (error) {
        console.error('Error retrieving cart items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  })



  router.delete('/remove/:userId', async (req, res) => {
    const userId = req.params.userId;
    // console.log('userrrr', userId)

    try {
        await Cart.updateOne({ userId: userId }, { $set: { items: [] } });

        res.status(200).json({ message: 'All items removed from the cart' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete items from cart' });
    }
});


router.delete('/:userId/item/:itemId', async (req, res) => {
  const {userId , itemId} = req.params
  try {
    const cart = await Cart.findOne({userId})
    if(!cart){
      return res.status(404).json({message: "Cart not found"})
    }
    cart.items = cart.items.filter(item => item.itemId != itemId)
    await cart.save()
    res.status(200).json({message: 'Item removed from cart', cart})
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
  }
})

module.exports = router;