type Metadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
};

// Branded type for Image URLs
type ImageUrl = string & { __type: "ImageUrl" };

type Subject = {
  _id: string;
  name: string;
  icon: ImageUrl; // explicitly an image url
  createdAt: string; // ISO date string
};

export type SubjectResponse = {
  data: {
    metadata: Metadata;
    subjects: Subject[];
  };
};
