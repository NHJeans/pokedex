import PokemonList from "@/app/_components/PokemonList";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const Main = () => {
  return (
    <div className="relative">
      <Link href="/">
        <h1 className="text-3xl font-bold my-10 text-center flex items-center justify-center space-x-4">
          <Image src="/pika.png" alt="포켓몬 로고" width={40} height={40} />
          <strong className="text-4xl font-pixelify">Pokédex</strong>
        </h1>
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <PokemonList />
      </Suspense>
    </div>
  );
};

export default Main;
