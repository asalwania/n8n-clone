import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Client from "./Client";

const Page = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <Suspense fallback={<p>Loading...</p>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Client />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
};

export default Page;
