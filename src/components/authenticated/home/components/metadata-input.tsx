import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ProjectForm } from "@/types";
import { useFormContext } from "react-hook-form";

interface MetadataInputProps {
  methods: ReturnType<typeof useFormContext<ProjectForm>>;
}

export default function MetadataInput({ methods }: MetadataInputProps) {
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <FormLabel className="text-xl font-semibold mb-8">
        Enter your project metadata
      </FormLabel>
      <FormField
        control={methods.control}
        name="projectName"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor={field.name}>Project Name</Label>
            <Input
              type="text"
              className="w-[200px] md:w-[300px] lg:w-[400px]"
              {...field}
            />
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor={field.name} className="mt-4">
              Project Description
            </Label>
            <Input
              type="text"
              className="w-[200px] md:w-[300px] lg:w-[400px]"
              {...field}
            />
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="frameworkVersion"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor={field.name} className="mt-4">
              Framework Version
            </Label>
            <Input
              type="number"
              className="w-[200px] md:w-[300px] lg:w-[400px]"
              {...field}
            />
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="platform"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor={field.name} className="mt-4">
              Deployment Platform
            </Label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-[200px] md:w-[300px] lg:w-[400px]">
                <SelectValue placeholder="Select a platform" />
              </SelectTrigger>
              <SelectContent className="w-[200px] md:w-[300px] lg:w-[400px]">
                <SelectItem value="vercel">Vercel</SelectItem>
                <SelectItem value="cloudflare">Cloudflare</SelectItem>
                <SelectItem value="netlify">Netlify</SelectItem>
                <SelectItem value="github">GitHub Pages</SelectItem>
                <SelectItem value="lambda">AWS Lambda</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
}
