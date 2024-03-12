import EditProduct from "@/components/forms/EditProduct"
import FormContainer from "@/components/FormContainer"
import { getProductDetails } from "@/lib/actions/product.actions"
import Link from "next/link"

interface props {
    params: {
        id: string
    }
}
const page = async({params}:props) => {
    const result = await getProductDetails({
        productId: params.id
      })
  return (
    <div className="bg-white w-full" style={{ padding: "30px" }}>
    <Link href="/admin/productsList" className="btn btn-light my-3">
      Go Back
    </Link>

    <FormContainer>
    <h2 className="text-[#333] font-extrabold text-[30px] mb-5 ">
      Edit Product
  </h2>

      <div className="sm:w-[600px] w-[400px]  ">
          <EditProduct product={result.products} />
      </div>
    </FormContainer>
  </div>
  )
}

export default page