"use client";

import { IPal } from "@/common/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Typography } from "./ui/typography";
import { suitabilities } from "@/common/const/suitabilities";

export type PalCardProps = {
  className?: string;
  pal: IPal;
};

export function PalCard({ className, pal }: PalCardProps) {
  return (
    <Card className={cn("", className)}>
      <Image
        src={`${process.env.API_URL}${pal.image}`}
        alt={pal.name}
        width={512}
        height={512}
        className="max-w-full w-full h-auto object-cover aspect-square gradient-mask-b-[rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.8)_80%]"
      />
      <div className="flex gap-0 items-center justify-between p-4 pt-0">
        <CardHeader className="p-0">
          <CardTitle>{pal.key.toString().padStart(3, "0")}</CardTitle>
          <CardDescription>{pal.name}</CardDescription>
        </CardHeader>
        <div className="flex gap-0 items-center">
          {pal.types.map((type) => (
            <TooltipProvider key={type}>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    key={type}
                    src={`${process.env.API_URL}/public/images/elements/${type}.png`}
                    alt={type}
                    width={24}
                    height={24}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <Typography variant="p">{type}</Typography>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
      <CardContent className="px-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start gap-1 flex-nowrap">
            {suitabilities
              .slice(0, suitabilities.length / 2)
              .map((suitability) => (
                <Suitability
                  key={suitability.value}
                  suitability={suitability}
                  level={
                    pal.suitability.find((s) => s.type === suitability.value)
                      ?.level
                  }
                />
              ))}
          </div>
          <div className="flex items-center justify-start gap-1 flex-nowrap">
            {suitabilities
              .slice(suitabilities.length / 2)
              .map((suitability) => (
                <Suitability
                  key={suitability.value}
                  suitability={suitability}
                  level={
                    pal.suitability.find((s) => s.type === suitability.value)
                      ?.level
                  }
                />
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Suitability({
  suitability,
  level,
}: {
  suitability: {
    value: string;
    label: string;
    iconUrl: string;
  };
  level?: number;
}) {
  return (
    <TooltipProvider key={suitability.value}>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex flex-col items-center gap-0">
            <Image
              src={`${process.env.API_URL}${suitability.iconUrl}`}
              alt={suitability.label}
              width={24}
              height={24}
              className={cn("fliter opa", {
                grayscale: !level,
                "opacity-50": !level,
              })}
            />
            <span>{level?.toString() ?? ""}&nbsp;</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <Typography variant="p">{suitability.label}</Typography>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
