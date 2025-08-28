/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplication";
import { BarLoader } from "react-spinners";
import AppLayout from "@/layouts/app-layout";

// const schema = z.object({
//   experience: z
//     .number()
//     .min(0, { message: "Experience must be at least 0" })
//     .int(),
//   skills: z.string().min(1, { message: "Skills are required" }),
//   education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
//     message: "Education is required",
//   }),
//   resume: z
//     .any()
//     .refine(
//       (file) =>
//         file[0] &&
//         (file[0].type === "application/pdf" ||
//           file[0].type === "application/msword"),
//       { message: "Only PDF or Word documents are allowed" }
//     ),
// });

// export function ApplyJobDrawer({ user, job, fetchJob, applied = false }) {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const {
//     loading: loadingApply,
//     error: errorApply,
//     fn: fnApply,
//   } = useFetch(applyToJob);

//   const onSubmit = (data) => {
//     fnApply({
//       ...data,
//       job_id: job.id,
//       candidate_id: user.id,
//       name: user.fullName,
//       status: "applied",
//       resume: data.resume[0],
//     }).then(() => {
//       fetchJob();
//       reset();
//     });
//   };

//   );
// };

const ApplyJobDrawer = ({ user, job, applied = false, fetchJob }) => {
  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          variant={job?.isOpen && !applied ? "default" : "destructive"}
          disabled={!job?.isOpen || applied}
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Apply for {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Please Fill the form below</DrawerDescription>
        </DrawerHeader>

        <form className="flex flex-col gap-4 p-4 pb-0">
          <Input
            type="number"
            placeholder="Years of Experience"
            className="flex-1"
          />
          <Input
            type="text"
            placeholder="Skills (Comma Separated)"
            className="flex-1"
          />
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Intermediate" id="Intermediate" />
              <Label htmlFor="Intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Graduate" id="Graduate" />
              <Label htmlFor="Graduate">Graduate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Post Graduate" id="Post Graduate" />
              <Label htmlFor="Post Graduate">Graduate</Label>
            </div>
          </RadioGroup>
          <Input
            type="file"
            accept=".pdf, .doc, .docx"
            className="flex-1 file:text-gray-500"
          />
          <Button type="submit" variant="default" size="lg">
            Apply
          </Button>
        </form>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="default">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyJobDrawer;
