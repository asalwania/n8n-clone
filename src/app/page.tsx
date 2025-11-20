import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import Logout from "./logout";

const Page = async () => {
  await requireAuth();

  const data = await caller.getUsers();

  return (
    <div className="min-h-screen min-w-screen flex flex-col  items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <code>{JSON.stringify(data, null, 2)}</code>
      <Logout />
    </div>
  );
};

export default Page;
