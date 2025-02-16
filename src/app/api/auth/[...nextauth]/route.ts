import NextAuth , {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" },
      },

      async authorize(credentials:any) {
        const { email, password, username } = credentials;

        // Check if user is signing up (via `username` presence)
        if (username) {
          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email },
          });
          if (existingUser) {
            throw new Error("User already exists");
          }

          // Hash password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Create the user in the database
          const newUser = await prisma.user.create({
            data: {
              username,
              email,
              password: hashedPassword,
            },
          });

          // Return newly created user for authentication
          return newUser;
        }

        // If not signing up, validate user credentials (login)
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user } : {token:any , user:any}) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.name;
      }
      return token;
    },
    async session({ session, token } : {session:any , token:any}) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        return session;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
