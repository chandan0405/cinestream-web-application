import nextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "../../../lib/prismadb";
var bcrypt = require("bcrypt");

export default nextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(" Email and password required");
        }
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || user?.hashedPassword) {
          throw new Error("Email Does not Exist");
        }

        const isCorrectedPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectedPassword) {
          throw new Error("Incorrect password");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV==='development',
  session:{
    strategy:'jwt'
  },
  jwt:{
   secret:process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET
});
