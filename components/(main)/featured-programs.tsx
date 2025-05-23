import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { featuredPrograms } from "@/lib/data/featured-programs";
import Image from "next/image";
import Link from "next/link";

const FeaturedPrograms = () => {
  return (
    <div className="w-full bg-muted">
      <div
        id="features"
        className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6"
      >
        <h2 className="text-3xl xs:text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight sm:max-w-xl sm:text-center sm:mx-auto">
          Program Unggulan dari Tax Center
        </h2>
        <div className="mt-8 xs:mt-14 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {featuredPrograms.map((program) => (
            <Card
              key={program.title}
              className="flex flex-col border rounded-xl overflow-hidden shadow-none hover:shadow-md transition-shadow"
            >
              <Link
                href={`/program/${program.link}`}
                className="flex flex-col h-full no-underline"
              >
                <CardHeader>
                  <h4 className="text-xl font-bold tracking-tight">
                    {program.title}
                  </h4>
                  <p className="mt-2 text-muted-foreground text-sm xs:text-[17px]">
                    {program.description}
                  </p>
                </CardHeader>
                <CardContent className="mt-auto px-0 pb-0">
                  <div className="bg-muted h-52 ml-6 rounded-tl-xl relative overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      alt={program.title}
                      fill
                      className="object-cover rounded-tl-xl"
                    />
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPrograms;
