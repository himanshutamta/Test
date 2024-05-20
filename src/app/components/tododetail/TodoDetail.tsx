"use client";
import { RootState } from "@/app/store/store";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoUserFound from "../shared/noUserFound";
import TimeSession from "../shared/timeSession";
import { IoCheckmarkOutline } from "react-icons/io5";

interface UserDetail {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
const TodoDetail = () => {
  const user = useSelector((state: RootState) => state.user);
  const [todos, setTodos] = useState<any>();
  const [afterFilter, setAfterFilter] = useState<any>();
  const [select, setSeclect] = useState<string | any>("");
  console.log(select, "sjdkj");

  useEffect(() => {
    if (select === "complete" && todos.length) {
      const selectFilter = todos.filter((i: UserDetail) => i.completed);
      setAfterFilter(selectFilter);
    } else if (select === "progress" && todos.length) {
      const selectFilter = todos.filter((i: UserDetail) => !i.completed);
      setAfterFilter(selectFilter);
    } else {
      setAfterFilter(todos);
    }
  }, [select, todos]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/todos?userId=${user[0].id}`
        );
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.log("Getting error on fetching Todos", error);
      }
    };
    if (user.length) {
      getUser();
    }
  }, []);
  return (
    <div>
      {user.length ? (
        <div className="sm:max-w-[80%] mx-3 sm:mx-auto py-4 ">
          <div className="space-y-8 bg-black/5 p-5  pt-16 rounded-2xl relative">
            <div className="">
              <TimeSession />
            </div>
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
                    placeholder="Select"
                  >
                    <AutocompleteItem key="complete" value="complete">
                      Complete
                    </AutocompleteItem>
                    <AutocompleteItem key="progress" value="progress">
                      in-progress
                    </AutocompleteItem>
                    <AutocompleteItem key="" value="">
                      All
                    </AutocompleteItem>
                  </Autocomplete>
                </div>
              </div>
            </div>

            {afterFilter && (
              <div className="space-y-3">
                {afterFilter?.map((i: UserDetail, indx: number) => {
                  return (
                    <div
                      key={indx}
                      className="flex justify-between gap-2 items-center bg-white shadow-md py-2 px-6 rounded-full"
                    >
                      <p className="">{i.title}</p>

                      {i.completed ? (
                        <div className="bg-black/10 outline font-bold outline-green-400 bg-green-400 outline-1 p-1 h-6 w-6 rounded-full">
                          <IoCheckmarkOutline className="" />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <NoUserFound />
      )}
    </div>
  );
};

export default TodoDetail;
