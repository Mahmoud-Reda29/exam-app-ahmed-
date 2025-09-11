import { Breadcrumb } from "@/components/ui/breadcrumb";
import React from "react";
import PageTitle from "./page-title";
import { type LucideProps } from "lucide-react";

type HeaderType = {
  items: {
    label: string;
    href: string;
  }[];
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  visible?: boolean;
};
const HomePageHeader = ({ items, Icon, title, visible = true }: HeaderType) => {
  return (
    <div className="px-6 py-4 w-full gap-6  flex  flex-col justify-center items-center ">
      <Breadcrumb items={items} />
      <PageTitle Icon={Icon} title={title} visible={visible} />
    </div>
  );
};

export default HomePageHeader;
