import { ISODateString } from "next-auth";

export type AuthResponse = {
  token: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: "user" | "admin";
    isVerified: boolean;
    createdAt: ISODateString;
  };
};
