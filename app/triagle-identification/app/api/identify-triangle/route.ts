import { NextRequest, NextResponse } from 'next/server'
import { classifyTriangle } from '../../../lib/classifyTriangle'

interface TriangleRequest {
  sideA: number
  sideB: number
  sideC: number
}

export async function POST(request: NextRequest) {
  try {
    const body: TriangleRequest = await request.json()
    const { sideA, sideB, sideC } = body

    // Validate input
    if (typeof sideA !== 'number' || typeof sideB !== 'number' || typeof sideC !== 'number') {
      return NextResponse.json(
        {
          sideA: sideA || 0,
          sideB: sideB || 0,
          sideC: sideC || 0,
          type: "",
          isValid: false,
          error: "All sides must be valid numbers",
        },
        { status: 400 }
      )
    }

    // Classify the triangle
    const result = classifyTriangle(sideA, sideB, sideC)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error processing triangle classification:', error)
    return NextResponse.json(
      {
        sideA: 0,
        sideB: 0,
        sideC: 0,
        type: "",
        isValid: false,
        error: "Invalid request format",
      },
      { status: 400 }
    )
  }
} 