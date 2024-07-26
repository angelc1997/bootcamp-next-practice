// 定義接收的型別
interface Item {
  id: string;
  item: string;
  price: number;
  isIncome: string;
  userId: string;
}

interface Props {
  item: Item;
  deleteItem: (id: string) => void;
}

export default function CreateList({ item, deleteItem }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 text-white mt-5 items-center hover:bg-gray-700 h-20">
      <div
        className={`text-center ${
          item.isIncome === "income" ? "income" : "expense"
        }`}
      >
        {item.isIncome === "income" ? item.price : `-${item.price}`}
      </div>
      <div className="itemName text-center">{item.item}</div>
      <button onClick={() => deleteItem(item.id)}>刪除</button>
    </div>
  );
}
