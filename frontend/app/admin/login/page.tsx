"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_BASE_URL } from '@/lib/api'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(data?.detail || 'Login failed')
        return
      }

      const data = await res.json()
      // store token
      localStorage.setItem('admin_token', data.access_token)
      router.push('/admin/dashboard')
    } catch (err) {
      setError('Network error')
    }
  }

  return (
    <div style={{maxWidth:480, margin:'3rem auto'}}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:12}}>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{width:'100%'}} />
        </div>
        <div style={{marginBottom:12}}>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{width:'100%'}} />
        </div>
        {error && <div style={{color:'red', marginBottom:12}}>{error}</div>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
