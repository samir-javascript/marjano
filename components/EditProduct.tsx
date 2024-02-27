"use client"
import { ProductProps } from "@/utils/shared";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState, useTransition } from "react";
import Spinner from 'react-bootstrap/Spinner'
import { toast } from "react-toastify";
import { editProduct } from "@/lib/actions/product.actions";



const EditProduct = ({product}:ProductProps) => {
 
  const [isPending,startTransition] = useTransition()
 const router = useRouter()
 const pathname = usePathname()
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  const [productType, setProductType] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [countInStock, setCountInStock] = useState(0);
 
 
 useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setPrevPrice(product.prevPrice);
      setPosition(product.position);
      //@ts-ignore
      setProductType(product?.productType);
      setCategory(product.category);
      setPrice(product.price);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      // @ts-ignore
      setProductImages(product.images);
    }
  }, [product]);
  

  const uploadFileHandler = (e:any) => {
    const files = e.target.files;
    transformFile(files);
  };

  const transformFile = (files:any) => {
    const promises = Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file as any);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(promises).then((results) => {
      setProductImages(results as any);
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      editProduct({
        productId: product._id,
        name,
        brand,
        category,
        position,
        productType,
        prevPrice,
        price,
        countInStock,
        images: productImages,
        description,
        path: pathname,
      })
        .then(() => {
          router.push('/admin/productsList');
          toast.success('Product updated');
        })
        .catch((error) => {
          // Handle error appropriately
          console.error('Error updating product:', error);
        });
    });
  };



 
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
    
    <div className="mb-4 flex flex-col" >
      <label  className="font-bold text-[16px] text-[#333] mb-2">Product Name</label>
      <input
          className="outline-none mb-2 bg-[#F4F6F8] placeholder:text-sm border
     border-[#ddd] rounded-lg px-3 py-2 text-semibold text-[#4c4c4c] text-base "
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
   
    <div className="mb-4 flex flex-col" >
      <label className="font-bold  text-[16px] text-[#333] mb-2">Product Description</label>
      <input
          className="outline-none bg-[#F4F6F8] mb-2 placeholder:text-sm border
     border-[#ddd] rounded-lg px-3 py-2 text-semibold text-[#4c4c4c] text-base "
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
    
     <div className="mb-4 flex flex-col" >
      <label className="font-bold  text-[16px] text-[#333] mb-2">Product Brand</label>
      <input
          className="outline-none bg-[#F4F6F8] mb-2 placeholder:text-sm border
     border-[#ddd] rounded-lg px-3 py-2 text-semibold text-[#4c4c4c] text-base "
        type="text"
        placeholder="Enter brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
    </div>

    <div className="mb-4 flex flex-col" >
      <label className="font-bold text-[16px] text-[#333] mb-2">Product Category</label>
      <input
          className="outline-none bg-[#F4F6F8] mb-2 placeholder:text-sm border
     border-[#ddd] rounded-lg px-3 py-2 text-semibold text-[#4c4c4c] text-base "
        type="text"
        placeholder="Enter Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
    </div>
    
     <div className="mb-4 flex flex-col" >
      <label className="font-bold text-[16px] text-[#333] mb-2">Product PrevPrice</label>
      <input
          className="outline-none bg-[#F4F6F8] mb-2 placeholder:text-sm border
     border-[#ddd] rounded-lg px-3 py-2 text-semibold text-[#4c4c4c] text-base "
        type="number"
        placeholder="Enter previous price"
        value={prevPrice}
        // @ts-ignore
        onChange={(e) => setPrevPrice(e.target.value)}
      />
    </div>
  
    <div className="mb-4 flex flex-col" >
      <label className="font-bold text-[16px] text-[#333] mb-2">Product Price</label>
      <input
          className="outline-none bg-[#F4F6F8] mb-2 placeholder:text-sm border
     border-[#ddd] rounded-lg px-3 py-2 text-semibold text-[#4c4c4c] text-base "
        type="number"
        placeholder="Enter Price"
        value={price}
        // @ts-ignore
        onChange={(e) => setPrice(e.target.value)}
      />
    </div>
    <div className="mb-4 flex-col flex" >
      <label className="font-bold text-[16px] text-[#333] mb-2">Product Count In Stock</label>
      <input
         className="outline-none bg-[#F4F6F8] mb-2 placeholder:text-sm border
     border-[#ddd] rounded-lg px-3 py-2 text-semibold text-[#4c4c4c] text-base "
        type="number"
        placeholder="Enter Count In Stock"
        value={countInStock}
        // @ts-ignore
        onChange={(e) => setCountInStock(e.target.value)}
      />
    </div>
    <div className="mb-4 flex-col flex" >
      <label className="font-bold text-[16px] text-[#333] mb-2">Product position</label>
      <input
         className="outline-none bg-[#F4F6F8] mb-2 placeholder:text-sm border
     border-[#ddd] rounded-lg px-3 py-2 text-semibold text-[#4c4c4c] text-base "
        type="text"
        placeholder="Enter product position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
    </div>
    <div className="mb-4 flex-col flex" >
      <label className="font-bold text-[16px] text-[#333] mb-2">Product Type</label>
      <input
         className="outline-none bg-[#F4F6F8] mb-2 placeholder:text-sm border
     border-[#ddd] rounded-lg px-3 py-2 text-semibold text-[#4c4c4c] text-base "
        type="text"
        placeholder="Enter product type"
        value={productType}
        onChange={(e) => setProductType(e.target.value)}
      />
    </div>
    <div className="mb-4 flex flex-col" >
<label className="font-bold text-[16px] text-[#333] mb-2">Product Images</label>
<div>
<input type="file"
// @ts-ignore
        label="Choose files"
        onChange={uploadFileHandler}
        multiple
       
      />

</div>
</div>
<button disabled={isPending} type='submit' className="px-[15px] py-[8px] 
     rounded-[8px] transition-all duration-150  text-white font-bold  bg-[#00afaa] hover:bg-[#0b4d54] ">
        {isPending ? <Spinner role='status' animation='border' style={{
        display:'block',
        width:'30px',
        height:'30px',
        margin:'auto',
        color:'#fff'
      }} >
        </Spinner> : 'update'}
     </button>
  </form>
  );
};

export default EditProduct;



