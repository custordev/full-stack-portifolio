import { getAnalytics } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/config/auth";
import { DollarSign } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const analytics = (await getAnalytics()) || [];
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="py-6">
        <Card className="sm:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>
              Hi Welcome,{" "}
              <span className="capitalize">{user?.name?.toLowerCase()}</span>
            </CardTitle>
            {/* <CardDescription className="max-w-lg text-balance leading-relaxed">
              Introducing Our Dynamic Orders Dashboard for Seamless Management
              and Insightful Analysis.
            </CardDescription> */}
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href={"/dashboard/blogs/new"}>Create New Article</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics.map((item, i) => {
          const Icon = item.icon;
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {item.symbol && item.symbol}
                  {item.count}
                </div>
                <Link
                  href={item.href}
                  className="text-xs text-muted-foreground"
                >
                  View Details
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
