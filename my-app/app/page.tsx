
'use client'

import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to My App
          </h1>
          
          {session ? (
            <div className="mt-8">
              <p className="text-xl text-gray-600">
                Hello, {session.user?.name || session.user?.email}!
              </p>
              <p className="mt-4 text-lg text-gray-500">
                You are successfully signed in.
              </p>
            </div>
          ) : (
            <div className="mt-8">
              <p className="text-xl text-gray-600">
                Please sign in to access your account.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
