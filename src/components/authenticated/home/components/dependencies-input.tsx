import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Badge, Check, ChevronsDown, X } from "lucide-react";
import z from "zod";
import { ProjectForm } from "@/types";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

const packageSchema = z.object({
  name: z.string("name").min(1, ""),
  url: z.string(),
  description: z.string().optional(),
  version: z.string().optional(),
});

export type Package = z.infer<typeof packageSchema>;

interface DependenciesInputProps {
  methods: ReturnType<typeof useFormContext<ProjectForm>>;
}

export default function DependenciesInput({ methods }: DependenciesInputProps) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRegistry = async (query: string) => {
    if (!query.trim()) {
      setPackages([]);
      return;
    }

    try {
      const res = await fetch(
        `/api/search-packages?q=${encodeURIComponent(query)}`
      );
      if (!res.ok) {
        console.error("Failed to search packages:", res.statusText);
        return;
      }
      const data: Package[] = await res.json();
      setPackages(data);
    } catch (error) {
      console.error("Error searching packages:", error);
      setPackages([]);
    }
  };

  return (
    <div>
      <FormField
        control={methods.control}
        name="dependencies"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-semibold mb-8">
              Add Dependencies
            </FormLabel>

            {/* Display selected dependencies */}
            {field.value && field.value.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {field.value.map((dep: string) => (
                  <Badge key={dep} className="flex items-center gap-1">
                    <span>{dep}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="p-0 w-4 h-4 hover:bg-transparent"
                      onClick={() => {
                        const newDeps = field.value.filter(
                          (d: string) => d !== dep
                        );
                        field.onChange(newDeps); // Use field.onChange instead of setValue
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-[200px] md:w-[300px] lg:w-[400px] justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {"Search package registry"}
                    <ChevronsDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] md:w-[300px] lg:w-[400px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search package..."
                    className="h-9"
                    value={searchQuery}
                    onValueChange={(text) => {
                      setSearchQuery(text);
                      searchRegistry(text);
                    }}
                  />
                  <CommandList>
                    <CommandEmpty>No dependencies found.</CommandEmpty>
                    <CommandGroup>
                      {packages.map((p: Package) => {
                        const isSelected =
                          field.value?.includes(p.name) || false;

                        return (
                          <CommandItem
                            value={p.name}
                            key={p.name}
                            onSelect={() => {
                              const currentDeps = field.value || [];
                              if (!isSelected) {
                                const newDeps = [...currentDeps, p.name];
                                field.onChange(newDeps); // Use field.onChange
                                console.log(
                                  "Added dependency:",
                                  p.name,
                                  "New deps:",
                                  newDeps
                                );
                              }
                              setIsOpen(false);
                              setSearchQuery("");
                            }}
                          >
                            <div className="flex flex-col flex-1">
                              <span className="font-medium">{p.name}</span>
                              {p.description && (
                                <span className="text-sm text-muted-foreground truncate">
                                  {p.description}
                                </span>
                              )}
                            </div>
                            <Check
                              className={cn(
                                "ml-auto w-4 h-4",
                                isSelected ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
