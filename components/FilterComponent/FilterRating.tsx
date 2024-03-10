"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Rating from "../Rating";
import { useRouter, useSearchParams } from "next/navigation";
import { filterRating, formUrlQuery, removeKeysFromQuery } from "@/utils/constants";

const RatingFilter = () => {
  const router = useRouter(); // Move this line to the top
  const searchParams = useSearchParams();

  const handleClearFilter = () => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ['page', 'filter'],
    });
    router.push(newUrl, { scroll: false });
  };
  

  const paramFilter = searchParams.get('filterRating');
  //const cateBraFilter = searchParams.get('filter')
  const handleUpdateFilter = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'filterRating',
      value: value.toLowerCase(),
    });
      handleClearFilter();
      router.push(newUrl, { scroll: false });
  
  };

  return (
    <div className={` relative`}>
      <Select onValueChange={handleUpdateFilter} defaultValue={paramFilter || undefined}>
        <SelectTrigger
          className={` body-regular bg-[#F4F6F8] !border-none !outline-none lg:w-full px-5 py-2.5 text-black`}
        >
          <div className="flex-1 font-semibold capitalize  text-left line-clamp-1 ">
            <SelectValue className="!font-semibold  !capitalize" placeholder={"Evaluation"} />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-[#fff] text-[#000] border-none outline-none">
          <SelectGroup>
            {filterRating?.map((filter: any) => (
              <SelectItem
                className="focus:bg-[#F4F6F8] hover:bg-[#F4F6F8] cursor-pointer"
                key={filter.value}
                value={filter.value}
              >
                <Rating value={+filter.label} />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RatingFilter;