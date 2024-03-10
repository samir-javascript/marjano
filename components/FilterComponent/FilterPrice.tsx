"use client"
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/utils/constants";

const FilterPrice = () => {
  const [maxRange, setMaxRange] = useState<number>(55000);
  const [minRange, setMinRange] = useState<number>(50);
  const [valueRange, setValueRange] = useState<number>(50);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleUpdateFilter = () => {
    const updatedUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'minPrice',
      value: minRange.toString(),
    });

    const updatedUrlWithMax = formUrlQuery({
      params: updatedUrl,
      key: 'maxPrice',
      value: maxRange.toString(),
    });

    router.push(updatedUrlWithMax, { scroll: false });
  };

  return (
    <div className={`relative flex flex-col gap-2`}>
      <div className="flex flex-col">
        <label htmlFor="priceRange">Price Range:</label>
        <input
          type="range"
          id="priceRange"
          min="50"
          max="55000"
          className="outline-none text-[#00affa] bg-[#00affa]"
          step="1"
          value={valueRange}
          onChange={(e) => setValueRange(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center gap-x-3">
        <input
          type="number"
          min={50}
          onChange={(e) => setMinRange(Number(e.target.value))}
          placeholder="Min"
          value={minRange}
          className="outline-none indent-2 border text-sm border-[#efefef] py-2 rounded-md w-20"
        />
        <p className="text-gray-700">-</p>
        <input
          max={55000}
          type="number"
          onChange={(e) => setMaxRange(Number(e.target.value))}
          placeholder="Max"
          value={maxRange}
          className="outline-none border text-sm indent-2 border-[#efefef] py-2 rounded-md w-20"
        />
      </div>
      <button
        type="button"
        className="bg-[#00affa] text-sm font-bold max-sm:w-fit mt-2 text-white border-none outline-none rounded-2xl px-3 py-2"
        onClick={handleUpdateFilter}
      >
        Apply Price Filter
      </button>
    </div>
  );
};

export default FilterPrice;
