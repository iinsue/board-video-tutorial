"use client";

import qs from "query-string";
import { ChangeEvent, useEffect } from "react";
import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

export const SearchInput = () => {
  const router = useRouter();
  const [debouncedValue, setValue] = useDebounceValue("", 1000);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <>
      <div className="w-full relative">
        <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          className="w-full max-w-[516px] pl-9"
          placeholder="Search boards"
          onChange={handleChange}
        />
      </div>
    </>
  );
};