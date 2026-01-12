import HomeFeed from "@/components/HomeFeed";

export default function Home() {
  return (
    <div className="w-full flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="homefeed flex flex-col min-h-screen w-full bg-white dark:bg-black sm:items-start">
       <HomeFeed/>
      </main>
    </div>
  );
}
