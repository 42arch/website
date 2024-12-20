import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    })
  ],
  pages: {
    signIn: '/sign-in'
  }
})
