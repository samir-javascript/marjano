import { getUserById, getUserCart } from '@/lib/actions/cart.actions';
import { currentUser } from '@clerk/nextjs/server';

import { isValidObjectId } from 'mongoose';
import { NextResponse } from 'next/server';


import Stripe  from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
}): null;

export const POST = async (req: Request) => {
  const data = await req.json();
  const userFromClerk = await currentUser()
  try {
   // const { userId } = auth();
    const user = await getUserById({ clerkId: userFromClerk?.id! });
   console.log('USER FROM CHECKOUT HERE HERE ', user)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
    }

    const result = await getUserCart({
      userId: user?.user?._id,
    });

    /*if (!result) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }*/

    const line_items = result?.cart?.cartItems?.map((item: any) => ({
      price_data: {
        currency: 'MAD',
        unit_amount: item.productId.price * 100,
        product_data: {
          name: item.productId.name,
          images: [item.productId.images[0]], // Fixed: images should be an array
        },
      },
      quantity: item.quantity,
    }));
    
   
    const cartId = result?.cart?._id;

    if (!isValidObjectId(cartId)) {
      return NextResponse.json({ error: 'Invalid cart ID' }, { status: 401 });
    }
       const customer = await stripe?.customers.create({
          metadata:  {
              userId: user?.user?._id,
              clerkId: user?.user?.clerkId,
              cartId: cartId,
              type: "checkout"
          }
        })
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      customer: customer?.id
    };

    const checkoutSession = await stripe?.checkout.sessions.create(params);
    console.log('CHECKOUT SESSION')
    return NextResponse.json({ url: checkoutSession?.url });
  } catch (error) {
    console.error('Error during checkout:', error);
  
    // Extract relevant information from the error object
    // @ts-ignore
    const errorMessage = error.message  || 'An error occurred during checkout.';
  
    // Log a more informative message
    console.error(errorMessage);
  
    // Return a more user-friendly error response
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
