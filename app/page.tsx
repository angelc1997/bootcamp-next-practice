import Link from "next/link";
import RenderSvgIcon from "../components/RenderSvgIcon";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white">
      <header className="text-4xl font-bold text-center">
        歡迎使用記帳小工具
      </header>
      <section className="text-2xl mt-10">
        <h3 className="text-center">
          使用React、Next.js、Tailwind、Vercel建立
        </h3>
        <RenderSvgIcon />
      </section>

      <button className="bg-blue-500 hover:bg-blue-700 text-white text-base	font-bold py-6 px-10 mt-10 rounded-md">
        <Link href="/signup">點此開始</Link>
      </button>
    </main>
  );
}
