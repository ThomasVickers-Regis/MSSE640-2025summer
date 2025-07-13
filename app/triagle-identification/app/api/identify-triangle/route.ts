import { NextRequest, NextResponse } from 'next/server'

interface TriangleRequest {
  sideA: number
  sideB: number
  sideC: number
}

interface TriangleResponse {
  sideA: number
  sideB: number
  sideC: number
  type: string
  isValid: boolean
  error?: string
}

function classifyTriangle(a: number, b: number, c: number): TriangleResponse {
  // Input validation
  if (a <= 0 || b <= 0 || c <= 0) {
    return {
      sideA: a,
      sideB: b,
      sideC: c,
      type: "",
      isValid: false,
      error: "All sides must be positive numbers",
    }
  }

  // Triangle inequality theorem
  if (a + b <= c || a + c <= b || b + c <= a) {
    return {
      sideA: a,
      sideB: b,
      sideC: c,
      type: "",
      isValid: false,
      error: "These sides cannot form a valid triangle",
    }
  }

  // Determine triangle type
  let type = ""
  if (a === b && b === c) {
    type = "Equilateral"
  } else if (a === b || b === c || a === c) {
    type = "Isosceles"
  } else {
    type = "Scalene"
  }

  return {
    sideA: a,
    sideB: b,
    sideC: c,
    type,
    isValid: true,
  }
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