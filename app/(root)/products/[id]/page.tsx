import ProductDetails from '@/components/ProductDetails';
import { getUserById } from '@/lib/actions/cart.actions';
import { getProductDetails } from '@/lib/actions/product.actions';
import { auth } from '@clerk/nextjs';

interface Props {
  params: {
    id: string;
  }
}
const page = async({params}:Props) => {
  const result = await getProductDetails({
    productId: params.id
  })
  const { userId } = auth()
  const user = await getUserById({clerkId:userId!})

  return (
    <div>
       <ProductDetails user={JSON.stringify(user)} product={result.products} />
    </div>
  )
}

export default page