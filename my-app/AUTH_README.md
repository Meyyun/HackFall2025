# NextAuth.js Authentication System

## 🚀 Complete Authentication Setup

This Next.js project includes a full authentication system using NextAuth.js with the following features:

### ✅ Features Included
- **Sign Up** - User registration with email/password
- **Sign In** - User login with credentials
- **Sign Out** - Secure logout functionality
- **Protected Routes** - Dashboard page requires authentication
- **Session Management** - Persistent user sessions
- **Responsive UI** - Mobile-friendly design with Tailwind CSS

## 📁 Project Structure

```
my-app/
├── app/
│   ├── api/auth/
│   │   ├── [...nextauth]/
│   │   │   └── route.ts          # NextAuth configuration
│   │   └── signup/
│   │       └── route.ts          # User registration API
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx          # Sign in page
│   │   └── signup/
│   │       └── page.tsx          # Sign up page
│   ├── dashboard/
│   │   └── page.tsx              # Protected dashboard page
│   ├── layout.tsx                # Root layout with SessionProvider
│   └── page.tsx                  # Home page
├── components/
│   └── auth/
│       ├── Navbar.tsx            # Navigation with auth status
│       ├── SessionProvider.tsx   # NextAuth session provider
│       ├── SignInForm.tsx        # Sign in form component
│       └── SignUpForm.tsx        # Sign up form component
├── middleware.ts                 # Route protection middleware
└── .env.local                    # Environment variables
```

## 🛠️ Setup Instructions

### 1. Environment Configuration
Create/update `.env.local` with:
```env
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Application
```bash
npm run dev
```

## 🔐 Authentication Flow

### Test Credentials
For demo purposes, use these test credentials:
- **Email**: `test@example.com`
- **Password**: `password`

### Routes Available
- `/` - Home page (public)
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page
- `/dashboard` - Protected dashboard (requires login)

## 🔧 Configuration Options

### Adding OAuth Providers
Uncomment and configure in `app/api/auth/[...nextauth]/route.ts`:

```typescript
// Google OAuth
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
}),

// GitHub OAuth
GitHubProvider({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
})
```

### Database Integration
Currently uses in-memory storage for demo. For production:

1. Install database adapter:
```bash
npm install @next-auth/prisma-adapter prisma @prisma/client
```

2. Update NextAuth configuration with database adapter
3. Configure your database URL in `.env.local`

## 🎨 Styling
- Uses **Tailwind CSS** for styling
- Responsive design works on mobile and desktop
- Clean, professional UI components

## 🛡️ Security Features
- **Password Hashing** - Uses bcryptjs for secure password storage
- **JWT Sessions** - Secure session management
- **CSRF Protection** - Built-in NextAuth.js security
- **Route Protection** - Middleware guards protected routes

## 📱 Usage Examples

### Accessing User Session
```typescript
'use client'
import { useSession } from 'next-auth/react'

export default function MyComponent() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') return <p>Loading...</p>
  if (!session) return <p>Not logged in</p>
  
  return <p>Welcome {session.user?.email}!</p>
}
```

### Protecting Pages
```typescript
'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/auth/signin')
  }, [session, status, router])

  if (!session) return null
  return <div>Protected content</div>
}
```

## 🚀 Next Steps
1. Replace in-memory user storage with a real database
2. Add email verification for sign up
3. Implement password reset functionality
4. Add user profile management
5. Configure OAuth providers (Google, GitHub, etc.)

## 📝 Notes
- This is a demo implementation with in-memory storage
- For production, implement proper database storage
- Update the `authorize` function in NextAuth config for real authentication
- Consider adding rate limiting and additional security measures

Happy coding! 🎉