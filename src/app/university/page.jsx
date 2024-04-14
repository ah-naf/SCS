import UniversityForm from "@/components/UniversityForm";
import { Button } from "@/components/ui/button";
import { open_sans } from "@/lib/fonts";
import { PlusCircleIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

function University() {
  return (
    <div className="bg-[whitesmoke] w-full h-full p-8">
      <div className="flex items-center justify-between">
        <h1
          className={`text-4xl ${open_sans.className} font-bold text-gray-700`}
        >
          University
        </h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="primary">
              <PlusCircleIcon />
              <span className="ml-2">Add new university</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto w-[450px]">
            <SheetHeader>
              <SheetTitle className="text-xl border-b pb-3">
                Add new university
              </SheetTitle>
            </SheetHeader>
            <div className="w-full">
              <UniversityForm />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default University;
