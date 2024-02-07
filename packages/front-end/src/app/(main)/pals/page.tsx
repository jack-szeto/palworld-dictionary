import { getPals } from "@/lib/api";
import Image from "next/image";

export default async function Page() {
  const pals = await getPals();
  return (
    <main className="container flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-wrap items-start justify-start gap-6">
        {pals.content.map((pal) => (
          <div key={pal.id} className="flex items-center gap-6">
            <Image
              src={`${process.env.API_URL}${pal.image}`}
              alt={pal.name}
              width={64}
              height={64}
              className="rounded-md"
            />
            <div>
              <h2>{pal.name}</h2>
              <p>{pal.types.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
