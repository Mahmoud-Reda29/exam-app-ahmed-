import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export const getSessionServer = () => {
  const session = getServerSession(authOptions);
  if (!session) {
    return null;
  }

  return session;
};

export default getSessionServer;
