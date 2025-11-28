"use client";

import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import Logout from "./logout";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(trpc.getWorkflows.queryOptions());

  const testAi = useMutation(
    trpc.testAI.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    })
  );

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    })
  );

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <ul className="flex flex-col gap-4">
        {isLoading ? (
          <Spinner className="size-20" />
        ) : (
          data?.map((w, idx) => (
            <li
              className="capitalize p-2 w-[350px] shadow-2xl font-bold active:scale-[0.95] border-s rounded cursor-pointer hover:scale-[1.03] transition duration-300"
              key={w.id}
            >
              {idx + 1}
              {". "}
              {w.name}
            </li>
          ))
        )}
      </ul>

      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test AI
      </Button>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
      <Logout />
    </div>
  );
};

export default Page;
