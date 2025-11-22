import Image from "next/image";
import create_or_select_new_project from "@/public/svgs/create-or-select-new-project.svg";

export function CreateOrSelectNewProject() {
  return (
    <div className="flex flex-col items-center w-full mt-[5rem] px-[2rem]">
      {/* Decorative image, so no alt text */}
      <Image src={create_or_select_new_project} alt="" className="h-[12rem]" />

      <p className="text-sm p-2 xs:px-6 border border-green-500 rounded mt-[1.5rem]">
        Create or select a project to get started.
      </p>
    </div>
  );
}
