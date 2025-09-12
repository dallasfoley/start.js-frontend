"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import MetadataInput from "./components/metadata-input";
import { ProjectForm, projectFormSchema } from "@/types";
import FrameworkInput from "./components/framework-input";
import DependenciesInput from "./components/dependencies-input";
import { generate } from "@/server/actions/generate";

export default function HomePageForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<ProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      framework: "react",
      projectName: "",
      description: "",
      frameworkVersion: "1.0.0",
      platform: "",
      dependencies: [],
    },
  });

  const onSubmit = async (data: ProjectForm) => {
    setIsLoading(true);
    console.log("Form Data:", data);
    const res = await generate(data);
    if (!res.success) {
      setError(res.message);
      setIsLoading(false);
      return {};
    }
  };

  console.log("Current form values:", form.watch());
  console.log("Form errors:", form.formState.errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-11/12 md:w-3/4 h-10/12 flex flex-col justify-around items-stretch rounded-lg p-8 mt-8"
      >
        <div className="flex flex-row justify-between mb-16">
          <FrameworkInput methods={form} />
          <DependenciesInput methods={form} />
        </div>
        <MetadataInput methods={form} />
        <Button type="submit" disabled={isLoading} className="mt-4">
          {isLoading ? "Loading..." : "Generate"}
        </Button>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>
      <FormMessage />
    </Form>
  );
}
