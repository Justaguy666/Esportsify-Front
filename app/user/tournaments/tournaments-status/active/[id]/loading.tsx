export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#3D5AF1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading Tournament...</p>
      </div>
    </div>
  )
}
