"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_BASE_URL } from '@/lib/api'

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetch(`${API_BASE_URL}/api/v1/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized')
        return res.json()
      })
      .then(data => setAdmin(data))
      .catch(() => {
        localStorage.removeItem('admin_token')
        router.push('/admin/login')
      })
  }, [router])

  if (!admin) return <div>Loading...</div>

  return (
    <div style={{padding:24}}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {admin.first_name} {admin.last_name}</p>
      <div>
        <strong>Email:</strong> {admin.email_id}
      </div>
      <div style={{marginTop:12}}>
        <button onClick={() => { localStorage.removeItem('admin_token'); router.push('/admin/login') }}>Sign out</button>
      </div>
    </div>
  )
}
