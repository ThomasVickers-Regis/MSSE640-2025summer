export interface TriangleResponse {
  sideA: number
  sideB: number
  sideC: number
  type: string
  isValid: boolean
  error?: string
}

function isFiniteNumber(x: any) {
  return typeof x === 'number' && isFinite(x) && !isNaN(x)
}

export function classifyTriangle(a: number, b: number, c: number): TriangleResponse {
  // Input validation
  if (!isFiniteNumber(a) || !isFiniteNumber(b) || !isFiniteNumber(c)) {
    return {
      sideA: a,
      sideB: b,
      sideC: c,
      type: "",
      isValid: false,
      error: "All sides must be positive numbers",
    }
  }
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
  // Triangle inequality theorem (with epsilon for floating point)
  const epsilon = 1e-10
  if (a + b < c - epsilon || a + c < b - epsilon || b + c < a - epsilon ||
      Math.abs(a + b - c) < epsilon || Math.abs(a + c - b) < epsilon || Math.abs(b + c - a) < epsilon) {
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
  if (Math.abs(a - b) < epsilon && Math.abs(b - c) < epsilon) {
    type = "Equilateral"
  } else if (Math.abs(a - b) < epsilon || Math.abs(b - c) < epsilon || Math.abs(a - c) < epsilon) {
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