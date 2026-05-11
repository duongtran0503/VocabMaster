'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
      const router = useRouter()
      useEffect(() => {
            router.push("/admin")
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      return <div>

      </div>
}