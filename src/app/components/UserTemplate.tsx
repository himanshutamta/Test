"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import NoUserFound from "./shared/noUserFound";

const UserTemplate = (props: any) => {
  const user = useSelector((state: RootState) => state.user);

  const [todos, setTodos] = useState<any>();

  useEffect(() => {
    if (user.length) {
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
      getUser();
    }
  }, []);
  return <div>{user.length ? props.children : <NoUserFound />}</div>;
};

export default UserTemplate;
