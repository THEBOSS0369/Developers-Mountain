// app/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')
  
  // Add error handling
  if (error || error_description) {
    // Redirect to error page with the error message
    return NextResponse.redirect(
      `${origin}/error?message=${encodeURIComponent(error_description || 'An error occurred during authentication')}`
    )
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // ... rest of your success logic ...
      return NextResponse.redirect(`${origin}/account`) // or wherever you want to redirect
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}