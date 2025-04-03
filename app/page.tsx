import type { Metadata } from "next"
import ClientPage from "./ClientPage"

// Update the metadata
export const metadata: Metadata = {
  title: "Walimatul Aqiqah | Fadhila Aisya Zaviera",
  description:
    "Dengan mengharap ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara Aqiqah putri kami",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function Home() {
  return <ClientPage />
}

