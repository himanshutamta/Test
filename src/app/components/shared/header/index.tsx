"use client";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import React, { useState } from "react";

const Header = () => {
  const [select, setSeclect] = useState<string | any>("");
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-3xl font-semibold">Todo</div>
        <div className="flex gap-5 items-center">
          <div>
            <Autocomplete
              className="max-w-[150px]"
              variant="bordered"
              aria-label="Select an user"
              selectedKey={select}
              onSelectionChange={setSeclect}
            >
              <AutocompleteItem key="complete" value="complete">
                Complete
              </AutocompleteItem>
              <AutocompleteItem key="begin" value="begin">
                Begin
              </AutocompleteItem>
            </Autocomplete>
          </div>
          <Button size="sm" className="px-3 font-medium">
            Start Timer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
