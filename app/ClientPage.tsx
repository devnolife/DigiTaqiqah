"use client"

import InvitationCard from "@/components/invitation-card"

export default function ClientPage() {
  return (
    // Update the background color
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0D8A6A]/10 to-white">
      <div className="w-full max-w-md mx-auto">
        <InvitationCard />
      </div>
    </main>
  )
}

