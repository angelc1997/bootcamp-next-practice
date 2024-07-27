"use client";

import Link from "next/link";
import CreateForm from "../../components/CreateForm";
import CreateList from "../../components/CreateList";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

// firestore
import { db, auth } from "../../utils/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import router from "next/router";

interface AccountItem {
  id: string;
  item: string;
  price: number;
  isIncome: string;
  userId: string;
}

export default function Account() {
  // 儲存使用者的資訊
  const [user, setUser] = useState<User | null>(null);
  const [accountList, setAccountList] = useState<AccountItem[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setUser(null);
        return;
      }
      // 設定user名字
      setUser(currentUser);
      console.log("我是currentUser", currentUser);

      // 建立使用者
      const userCollection = collection(db, "users");
      console.log("db", userCollection);

      // 在user db 建立使用者ID
      const userDocRef = doc(userCollection, currentUser.uid);
      console.log("doc", userDocRef);

      // 建立使用者 account list collection
      const accountCollection = collection(userDocRef, "accountList");
      console.log("col", accountCollection);

      // 建立記帳紀錄，即時監聽
      const q = query(accountCollection);
      onSnapshot(q, (snapshot) => {
        setAccountList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as AccountItem[]
        );
      });
    });

    return () => unsubscribe();
  }, []);

  // 執行登出
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("登出成功");
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addItem = async (newItem: any) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
      const accountCollection = collection(userDocRef, "accountList");
      await addDoc(accountCollection, { ...newItem, userId: user.uid });
      console.log("新增成功");
    } catch (error) {
      console.log("錯誤:", error);
    }
  };

  const deleteItem = async (id: string) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
      const accountCollection = collection(userDocRef, "accountList");
      await deleteDoc(doc(accountCollection, id));
      console.log("刪除成功");
    } catch (error) {
      console.log("錯誤:", error);
    }
  };

  const totalPrice = () => {
    return accountList.reduce(
      (total, item) =>
        total + (item.isIncome === "income" ? item.price : -item.price),
      0
    );
  };

  // 如果沒有登入則提供回首頁
  if (!user) {
    return (
      <div className="w-4/5 flex flex-col justify-center items-center mx-auto">
        <h1 className="text-2xl font-bold text-white text-center mt-10">
          登入後即可使用記帳小工具
        </h1>
        <Link
          href="/"
          className=" bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-6 px-10 mt-10 rounded-md w-full md:w-1/5 "
        >
          回首頁
        </Link>
      </div>
    );
  }

  return (
    <div className="w-4/5 mx-auto ">
      <h1 className="text-2xl font-bold text-white text-center mt-10">
        你好，{user.email}
      </h1>
      <CreateForm addItem={addItem} />
      <hr className="my-20" />
      {accountList.map((item) => (
        <CreateList key={item.id} item={item} deleteItem={deleteItem} />
      ))}

      <hr className="my-20" />

      <div className="text-3xl font-bold text-white text-center mt-10">
        總計：{totalPrice()}
      </div>

      <button className=" bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-6 px-10 mt-10 rounded-md flex mx-auto">
        <Link href="/">回首頁</Link>
      </button>
      <button
        className=" bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-6 px-10 mt-10 rounded-md flex mx-auto"
        onClick={handleSignOut}
      >
        登出
      </button>
    </div>
  );
}
