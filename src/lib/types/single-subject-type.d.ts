// Branded type for Image URLs
type ImageUrl = string & { __type: "ImageUrl" };

type SingleSubject = {
  _id: string;
  name: string;
  icon: ImageUrl; // explicitly an image url
  createdAt: string; // ISO date string
};

export type SingleSubjectResponse = {
  category: SingleSubject;
};
