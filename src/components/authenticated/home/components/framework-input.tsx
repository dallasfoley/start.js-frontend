"use client";

import { FormField, FormItem } from "@/components/ui/form";
import type { useFormContext } from "react-hook-form";
import {
  SiAngular,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiSvelte,
  SiVuedotjs,
  SiAstro,
  SiNuxtdotjs,
  SiReactquery,
  SiReactrouter,
} from "react-icons/si";
import type { ProjectForm } from "@/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

interface FrameworkInputProps {
  methods: ReturnType<typeof useFormContext<ProjectForm>>;
}

const frameworks = {
  frontend: [
    { value: "vanilla", name: "Vanilla JS", icon: SiJavascript },
    { value: "react", name: "React", icon: SiReact },
    { value: "svelte", name: "Svelte", icon: SiSvelte },
    { value: "vue", name: "Vue", icon: SiVuedotjs },
    { value: "angular", name: "Angular", icon: SiAngular },
  ],
  fullstack: [
    { value: "next", name: "Next.js", icon: SiNextdotjs },
    { value: "sveltekit", name: "SvelteKit", icon: SiSvelte },
    { value: "nuxt", name: "Nuxt", icon: SiNuxtdotjs },
    { value: "angular-full", name: "Angular", icon: SiAngular },
    { value: "astro", name: "Astro", icon: SiAstro },
    { value: "remix", name: "React Router 7+ (Remix)", icon: SiReactrouter },
    { value: "tanstack", name: "TanStack Start", icon: SiReactquery },
  ],
};

const getFrameworkDetails = (value: string) => {
  const allFrameworks = [...frameworks.frontend, ...frameworks.fullstack];
  return allFrameworks.find((fw) => fw.value === value);
};

export default function FrameworkInput({ methods }: FrameworkInputProps) {
  return (
    <div className="w-full flex flex-col items-start">
      <h2 className="text-xl font-semibold mb-8">
        Select a frontend or fullstack framework
      </h2>
      <div className="w-full flex flex-row justify-between">
        <FormField
          control={methods.control}
          name="framework"
          render={({ field }) => {
            const selectedFramework = field.value
              ? getFrameworkDetails(field.value)
              : null;

            return (
              <FormItem className="w-[300px]">
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a framework">
                      {selectedFramework && (
                        <div className="flex items-center gap-2">
                          <selectedFramework.icon className="w-4 h-4" />
                          <span>{selectedFramework.name}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectGroup>
                      <SelectLabel>Frontend Frameworks</SelectLabel>
                      {frameworks.frontend.map((framework) => (
                        <SelectItem
                          key={framework.value}
                          value={framework.value}
                        >
                          <div className="flex items-center gap-2">
                            <framework.icon className="w-4 h-4" />
                            <span>{framework.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Fullstack Frameworks</SelectLabel>
                      {frameworks.fullstack.map((framework) => (
                        <SelectItem
                          key={framework.value}
                          value={framework.value}
                        >
                          <div className="flex items-center gap-2">
                            <framework.icon className="w-4 h-4" />
                            <span>{framework.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* Display selected framework icon below the select */}
                {selectedFramework && (
                  <div className="mt-4 flex flex-col items-center gap-2">
                    <selectedFramework.icon className="w-12 h-12 text-blue-600" />
                    <span className="text-sm text-gray-600 font-medium">
                      {selectedFramework.name}
                    </span>
                  </div>
                )}
              </FormItem>
            );
          }}
        />
      </div>
    </div>
  );
}
