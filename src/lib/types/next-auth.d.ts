import { ISODateString, User } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: "user" | "admin" | "editor";
    isVerified: boolean;
    createdAt: ISODateString;
    accessToken: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Session extends Omit<User, "accessToken"> {}
}

declare module "next-auth/jwt" {
  interface JWT extends User {
    idToken?: string;
  }
}
