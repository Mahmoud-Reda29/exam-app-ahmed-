import {
  RectangleEllipsis,
  Brain,
  BookOpenCheck,
  FolderCode,
} from "lucide-react";

type FeatureType = {
  title: string;
  description: string;
  icon: JSX.Element;
};

export default function LeftPanel() {
  const features: FeatureType[] = [
    {
      title: "Tailored Diplomas",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
      icon: <Brain className="w-6 h-6 " />,
    },
    {
      title: "Focused Exams",
      description:
        "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
      icon: <BookOpenCheck className="w-6 h-6" />,
    },
    {
      title: "Smart Multi-Step Forms",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
      icon: <RectangleEllipsis className="w-6 h-6" />,
    },
  ];

  return (
    <div className="relative flex flex-col py-28 items-start text-left p-10 w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 overflow-hidden">
      {/* Background Circles */}

      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 blur-2xl bg-blue-400"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full  opacity-30 blur-2xl bg-blue-400"></div>

      {/* {the above icon} */}
      <div className="flex items-center gap-2 mb-6  top-32 font-inter">
        <div className="text-blue-700 font-bold text-xl  flex items-center justify-center gap-1 ">
          <div className="relative ">
            <FolderCode className="w-10 h-10 absolute fill-blue-600 text-transparent z-10" />
            <FolderCode className=" w-10 h-10 text-white relative  z-20 " />
          </div>

          <span>Exam App</span>
        </div>
      </div>

      {/* Content */}

      <div className="relative z-10 max-w-md py-32">
        <h1 className="text-3xl font-bold text-gray-800 mb-14">
          Empower your learning journey <br /> with our smart exam platform.
        </h1>

        {/* Feature List */}

        <div className="space-y-6 font-mono">
          <ul>
            {features.map((feature, i) => (
              <li
                key={feature.title + i}
                className="flex items-start gap-5 mb-9"
              >
                <div className="border-blue-600 text-blue-600 border-2  flex items-center justify-center p-2">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-2 ">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-700 font-normal ">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
