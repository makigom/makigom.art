import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <section className="h-screen">
        <Hero />
        <h1 className="absolute bottom-10 left-16 font-bold text-6xl">
          makigom
        </h1>
      </section>
      <section className="bg-turquoise-light h-screen"></section>
    </main>
  );
}
