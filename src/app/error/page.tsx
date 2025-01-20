// app/error/page.tsx
export default function ErrorPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
      <p className="text-red-500 mb-4">{searchParams.message}</p>
      <p className="mb-4">This might be because:</p>
      <ul className="list-disc pl-6 mb-6">
        <li>You already have an account with this email using a different login method</li>
        <li>There was an issue with the GitHub authentication process</li>
      </ul>
      <div className="flex gap-4">
        <a 
          href="/login" 
          className="px-4 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600"
        >
          Back to Login
        </a>
        <a 
          href="/support" 
          className="px-4 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600"
        >
          Contact Support
        </a>
      </div>
    </div>
  )
}