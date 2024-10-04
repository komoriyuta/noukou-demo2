'use client'

import { useState } from 'react'
import { getGeminiResponse } from '../components/actions'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function Home() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<'compare' | 'intermediate'>('compare')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await getGeminiResponse(text1, text2)
      setResult(response)
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while processing your request.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">文章の間</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text1" className="block text-sm font-medium text-gray-700">Text 1</label>
          <Textarea
            id="text1"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            required
            className="mt-1 block w-full"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="text2" className="block text-sm font-medium text-gray-700">Text 2</label>
          <Textarea
            id="text2"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            required
            className="mt-1 block w-full"
            rows={4}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Analyze Texts'}
        </Button>
      </form>

      {result  && (
        <div className="mt-8 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intermediate Text</CardTitle>
            </CardHeader>
            <CardContent>{result.intermediateText}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Explanation</CardTitle>
            </CardHeader>
            <CardContent>{result.explanation}</CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}