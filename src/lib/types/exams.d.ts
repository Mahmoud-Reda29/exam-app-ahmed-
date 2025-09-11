type Metadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
};

//  type for Image URLs
type ImageUrl = string & { __type: "ImageUrl" };

export type Exams = {
  _id: string;
  title: string;
  duration: number; // in minutes
  subject: string; // subject_id reference
  numberOfQuestions: number;
  active: boolean;
  createdAt: string; // ISO date string
};

export type ExamsResopnse = {
  data: {
    metadata: Metadata;
    exams: Exams[];
  };
};
