"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../utils/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

export default function Signup() {
  // 設定註冊登入切換
  const [isSignup, setSignup] = useState(true);
  // 取得信箱
  const [email, setEmail] = useState("");
  // 取得密碼
  const [password, setPassword] = useState("");
  // 取得router
  const router = useRouter();

  // 彈跳視窗套件設定
  type NotifyStatus = "success" | "error";
  const showNotify = (status: NotifyStatus, msg: string) => {
    const notifySetting = {
      autoClose: 3000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: false,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "light",
    };
    if (status === "success") {
      toast.success(msg, notifySetting);
    } else if (status === "error") {
      toast.error(msg, notifySetting);
    }
  };

  // Google登入
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      console.log(res);
      console.log(user);
      router.push("/account");
    } catch (error: FirebaseError | any) {
      switch (error.code) {
        case "auth/popup-closed-by-user":
          showNotify("success", "Google登入已關閉");
          break;
        default:
          showNotify("error", "Google登入失敗");
          break;
      }
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userCredential);
        showNotify("success", "帳號註冊成功");
        router.push("/account");
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userCredential.user);
        showNotify("success", "帳密登入成功");
        router.push("/account");
      }
    } catch (error: FirebaseError | any) {
      // console.log(error);
      setEmail("");
      setPassword("");
      console.log(error.code);
      console.log(error.message);
      switch (error.code) {
        case "auth/invalid-email":
          showNotify("error", "電子郵件無效");
          break;
        case "auth/email-already-in-use":
          showNotify("error", "電子郵件已被註冊");
          break;
        case "auth/wrong-password":
          showNotify("error", "密碼錯誤");
          break;
        case "auth/weak-password":
          showNotify("error", "密碼強度不足");
          break;
        case "auth/invalid-credential":
          showNotify("error", "帳密錯誤");
          break;
        case "auth/network-request-failed":
          showNotify("error", "無網路連線");
          break;
        default:
          showNotify("error", "發生錯誤");
          break;
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="font-bold mb-10 text-white">
        歡迎使用記帳小工具，請先登入您的帳號
        {/* {`${isSignup}`} */}
      </h2>
      <form className="bg-white rounded px-8 py-6" onSubmit={onSubmit}>
        <div className="flex justify-center mb-4">
          <h3
            className={`text-center font-bold mx-4 px-8 py-2 rounded-md cursor-pointer ${
              isSignup ? "text-white bg-blue-500" : "text-gray-700"
            }`}
            onClick={() => setSignup(true)}
          >
            註冊
          </h3>
          <h3
            className={`text-center font-bold mx-4 px-8 py-2 rounded-md cursor-pointer ${
              !isSignup ? "text-white bg-blue-500" : "text-gray-700"
            }`}
            onClick={() => setSignup(false)}
          >
            登入
          </h3>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            信箱
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="username"
            type="text"
            placeholder="123@gmail.com"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            密碼
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="password"
            type="password"
            placeholder="******"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-2 px-10 rounded-md"
            type="submit"
          >
            {isSignup ? "註冊" : "登入"}
          </button>
        </div>

        <button
          className="w-full bg-gray-200 hover:bg-blue-500 hover:text-white text-black text-base font-bold py-2 px-10 rounded-md mt-4"
          onClick={signInWithGoogle}
          type="button"
        >
          以 Google 帳號登入
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
