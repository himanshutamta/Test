"use client";
import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../store/store";
import { updateUser } from "../store/userReducer";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
const Login = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [select, setSeclect] = useState<string | any>("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log("Getting error on fetching user", error);
      }
    };
    getUser();
  }, []);

  const userLogin = () => {
    if (users && select) {
      const userDetail = users.filter((i) => i.id === parseInt(select));
      dispatch(updateUser(userDetail[0]));
      router.push("/usertodo");
    }
  };
  0;

  return (
    <div className="h-[100vh] w-[100%] flex justify-center items-center">
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.2,
          type: "spring",
          stiffness: 400,
          damping: 10,
        }}
        className="px-5 py-10 bg-black/5 rounded-xl shadow-lg"
      >
        <p className="text-2xl font-semibold mb-3">Login</p>
        <div className="mb-10">
          <p className="mb-2">Select user to login</p>
          <Autocomplete
            defaultItems={users}
            className="max-w-xs"
            variant="bordered"
            placeholder="Select user"
            selectedKey={select}
            onSelectionChange={setSeclect}
          >
            {users.map((user, index) => (
              <AutocompleteItem key={user.id} value={user.name}>
                {user.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        <Button
          color="primary"
          className="w-[100%]"
          onClick={() => userLogin()}
        >
          Get Started
        </Button>
      </motion.div>
    </div>
  );
};

export default Login;
