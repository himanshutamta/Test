"use client";
import { RootState } from "@/app/store/store";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoUserFound from "../shared/noUserFound";
import TimeSession from "../shared/timeSession";

interface UserDetail {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
const TodoDetail = () => {
  const user = useSelector((state: RootState) => state.user);
  const [todos, setTodos] = useState<any>();
  const [select, setSeclect] = useState<string | any>("");

  useEffect(() => {
    if (select && todos) {
    }
  }, [select]);

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
        <div className="max-w-[80%] mx-auto py-4 ">
          <div className="space-y-8 bg-black/5 p-5  pt-16 rounded-2xl">
            <TimeSession />
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

            {todos && (
              <div className="space-y-3">
                {todos?.map((i: UserDetail, indx: number) => {
                  return (
                    <div className="flex gap-2">
                      <p>{indx + 1}. </p>
                      <p className="w-[55%]">{i.title}</p>
                      <p className="bg-black/10 outline outline-1 px-3 ">
                        {i.completed ? "Completed" : "Begin"}
                      </p>
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
