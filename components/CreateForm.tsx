"use client";
import { useState } from "react";

interface Props {
  addItem: (item: { item: string; price: number; isIncome: string }) => void;
}

export default function CreateForm({ addItem }: Props) {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [isIncome, setIsIncome] = useState("income");

  const handleAddButton = () => {
    const itemName = item.trim();
    const itemPrice = parseInt(price);
    console.log(typeof itemPrice);
    console.log("項目名稱", itemName, "價格", itemPrice);
    if (!itemName) {
      alert("請輸入項目名稱");
    } else if (isNaN(itemPrice)) {
      alert("請輸入項目價格");
    } else {
      addItem({ item: itemName, price: itemPrice, isIncome });
      setItem("");
      setPrice("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:mt-10 mt-20 h-14">
      <select
        className="h-full mt-4 md:mr-2 md:ml-2 md:w-1/5 px-4 py-2 w-full rounded-md md:rounded-l-lg "
        name="add"
        id="add"
        value={isIncome}
        onChange={(e) => setIsIncome(e.target.value)}
      >
        <option value="income">收入</option>
        <option value="expense">支出</option>
      </select>
      <input
        className="h-full mt-4 md:w-1/5 px-4 py-2 w-full rounded-md"
        type="text"
        placeholder="輸入項目"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <input
        className="h-full mt-4 md:ml-2 md:mr-2 md:w-1/5 px-4 py-2 w-full rounded-md"
        type="text"
        placeholder="輸入金額"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button
        onClick={handleAddButton}
        className="bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-2 px-4 rounded-md h-full mt-4 w-full md:w-1/5"
      >
        新增
      </button>
    </div>
  );
}
