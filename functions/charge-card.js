const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const products = require("./products.json")

exports.handler = async (event, context)=>{
    //talking to stripe & charging actual card
    const {cart}= JSON.parse(event.body)
    const cartWithProudcts=cart.map(({id,qty})=>{
        const product=products.find(p=>p.id===id)
        return{
            ...product,
            qty,
        }
    })
    console.log(cartWithProudcts)
    const lineItems=cartWithProudcts.map(product =>({
      price_data:{
          currency:"aud",
          product_data:{
              name:product.name,
          },
          unit_amount: product.price,
      },
      quantity: product.qty,

    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items: lineItems,
        mode:"payment",
        success_url:`${process.env.URL}/success`,
        cancel_url:`${process.env.URL}/cancelled`,
    })
    return {
        statusCode: 200,
        body:JSON.stringify({
            id:session.id,
        })
    }
}