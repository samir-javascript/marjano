import ProductDetails from '@/components/ProductDetails';
import { getUserById } from '@/lib/actions/cart.actions';
import { getProductDetails, getrecommendationProducts } from '@/lib/actions/product.actions';
import { auth } from '@clerk/nextjs';

interface Props {
  params: {
    id: string;
  }
}
export async function generateMetadata({ params }:Props) {

const result = await getProductDetails({
  productId: params.id
})
    return {
      title: ` marjanemall Maroc | ${result.products.name}`,
      description: result.products.description,
    }
  }
const page = async({params}:Props) => {
  const result = await getProductDetails({
    productId: params.id
  })
  const recommendedProducts = await getrecommendationProducts({productId:params.id})
  const { userId } = auth()
  const user = await getUserById({clerkId:userId!})

  return (
    <div>
       <ProductDetails recommendedProducts={JSON.stringify(recommendedProducts)} user={JSON.stringify(user)} product={JSON.stringify(result.products)} />
    </div>
  )
}

export default page