import { PalCard } from "@/components/pal-card";
import { PaldeckSearchForm } from "@/components/paldeck-search-form";
import { Typography } from "@/components/ui/typography";
import { getPals } from "@/lib/api";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const palsResponse = await getPals({
    page: searchParams.page ? parseInt(searchParams.page as string) : 1,
    limit: searchParams.limit ? parseInt(searchParams.limit as string) : 999,
    name: searchParams.name as string,
    types: searchParams.types as string,
    suitability: searchParams.suitability as string,
    drops: searchParams.drops as string,
    key: searchParams.key as string,
    term: searchParams.term as string,
  });

  // Sort pals by key
  const pals = palsResponse.content.sort((a, b) => {
    const keyA = parseInt(a.key);
    const keyB = parseInt(b.key);

    // Check if both keys are numbers
    if (!isNaN(keyA) && !isNaN(keyB)) {
      return keyA - keyB;
    }

    // Handle special keys
    if (isNaN(keyA) && isNaN(keyB)) {
      return a.key.localeCompare(b.key);
    }

    // Sort numbers before special keys
    if (!isNaN(keyA)) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <main className="container max-w-screen-2xl flex min-h-screen flex-col items-center justify-between">
      <Typography variant="h2">Paldeck</Typography>
      <div className="flex-col flex items-center gap-6 sticky top-14 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <PaldeckSearchForm
          defaultValues={{
            types: searchParams.types as string,
            suitability: searchParams.suitability as string,
            drops: searchParams.drops as string,
            key: searchParams.key as string,
            term: searchParams.term as string,
          }}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-6 w-full">
        {pals.map((pal) => (
          <PalCard key={pal.id} pal={pal} className="min-w-0" />
        ))}
      </div>
    </main>
  );
}
