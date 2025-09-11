import { ChevronLeft, type LucideProps } from "lucide-react";
import type React from "react";

type HeaderProp = {
  title: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  visible?: boolean;
};

const PageTitle = ({ title, Icon, visible = true }: HeaderProp) => {
  return (
    <div className="flex  items-center gap-3  font-inter  w-full">
      <div
        className={`h-16 bg-white border-1 border-blue-600 text-gray-600 w-9 justify-center
       items-center ${visible ? "flex" : "hidden"}`}
      >
        <ChevronLeft />
      </div>
      <div className="flex items-center bg-blue-600 px-6 py-3 w-full ">
        <Icon className="text-white mr-3 h-9 w-9" />
        <h1 className="font-semibold text-white text-4xl">{title}</h1>
      </div>
    </div>
  );
};

export default PageTitle;
