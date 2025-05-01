import Header from "@/components/header"

export default function PrivateRepo() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold mb-4">Private Repository</h1>
          <p className="text-lg text-muted-foreground">
            Sorry, the code for this website is in a private repository and cannot be viewed.
          </p>
        </div>
      </div>
    </main>
  )
}