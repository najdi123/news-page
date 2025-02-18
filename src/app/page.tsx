import News from "./_components/news";
import SelectedArticles from "./_components/selectedArticles";

export default function Home() {
  return (
    <div className="w-full max-w-full flex flex-col md:flex-row justify-center gap-6 *:w-full md:*:w-[45%] *:p-6 ">
      <News />
      <SelectedArticles />
    </div>
  );
}
