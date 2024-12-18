import MainComponent from "@/components/home/main";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="container mx-auto px-12 py-4">
        <div className="flex items-center min-h-[calc(100vh-70px)] relative">
          <MainComponent />
        </div>
      </section>
    </main>
  );
}
