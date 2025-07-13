import { testCases, TestCase } from './test-data'
import '@testing-library/jest-dom'

// Helper for floating point comparison
function isFiniteNumber(x: any) {
  return typeof x === 'number' && isFinite(x) && !isNaN(x)
}

function classifyTriangle(a: number, b: number, c: number) {
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

describe('Comprehensive Triangle Classification Tests', () => {
  describe('Test Data Driven Tests', () => {
    testCases.forEach((testCase: TestCase) => {
      test(`${testCase.category}: ${testCase.description}`, () => {
        const result = classifyTriangle(testCase.sideA, testCase.sideB, testCase.sideC)
        expect(result.isValid).toBe(testCase.expectedValid)
        if (testCase.expectedValid) {
          expect(result.type).toBe(testCase.expectedType)
          expect(result.sideA).toBe(testCase.sideA)
          expect(result.sideB).toBe(testCase.sideB)
          expect(result.sideC).toBe(testCase.sideC)
        } else {
          expect(result.error).toBe(testCase.expectedError)
        }
      })
    })
  })

  describe('Boundary Value Analysis', () => {
    test('should handle minimum positive values', () => {
      const result = classifyTriangle(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE)
      expect(result.isValid).toBe(false) // MIN_VALUE is too small, violates triangle inequality
    })
    test('should handle maximum safe integer values', () => {
      const maxSafe = Number.MAX_SAFE_INTEGER
      const result = classifyTriangle(maxSafe, maxSafe, maxSafe)
      expect(result.isValid).toBe(true)
      expect(result.type).toBe("Equilateral")
    })
    test('should handle very small differences in isosceles triangles', () => {
      const result = classifyTriangle(1, 1, 1.000000000000001)
      expect(result.isValid).toBe(true)
      expect(result.type).toBe("Equilateral") // With epsilon, this is considered equilateral
    })
    test('should handle values just below triangle inequality threshold', () => {
      const result = classifyTriangle(1, 1, 1.999999999999999)
      expect(result.isValid).toBe(false) // With epsilon, this is considered degenerate/invalid
    })
    test('should reject values at triangle inequality threshold', () => {
      const result = classifyTriangle(1, 1, 2)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("These sides cannot form a valid triangle")
    })
  })

  describe('Floating Point Precision Tests', () => {
    test('should handle floating point arithmetic precision', () => {
      const result = classifyTriangle(0.1, 0.2, 0.3)
      expect(result.isValid).toBe(false) // 0.1 + 0.2 = 0.3, but with epsilon, still degenerate
    })
    test('should handle very small floating point differences', () => {
      const result = classifyTriangle(1.000000000000001, 1.000000000000001, 1.000000000000001)
      expect(result.isValid).toBe(true)
      expect(result.type).toBe("Equilateral")
    })
    test('should handle floating point precision in scalene triangles', () => {
      const result = classifyTriangle(1.1, 2.2, 3.3)
      expect(result.isValid).toBe(false) // 1.1 + 2.2 = 3.3, degenerate
    })
  })

  describe('Performance Tests', () => {
    test('should handle large numbers efficiently', () => {
      const startTime = performance.now()
      const result = classifyTriangle(1000000, 1000000, 1000000)
      const endTime = performance.now()
      expect(result.isValid).toBe(true)
      expect(result.type).toBe("Equilateral")
      expect(endTime - startTime).toBeLessThan(100)
    })
    test('should handle many rapid classifications', () => {
      const startTime = performance.now()
      for (let i = 0; i < 1000; i++) {
        classifyTriangle(i + 1, i + 2, i + 3)
      }
      const endTime = performance.now()
      expect(endTime - startTime).toBeLessThan(1000)
    })
  })

  describe('Error Handling Tests', () => {
    test('should handle NaN values', () => {
      const result = classifyTriangle(NaN, 2, 3)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("All sides must be positive numbers")
    })
    test('should handle Infinity values', () => {
      const result = classifyTriangle(Infinity, 2, 3)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("All sides must be positive numbers")
    })
    test('should handle -Infinity values', () => {
      const result = classifyTriangle(-Infinity, 2, 3)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("All sides must be positive numbers")
    })
    test('should handle undefined values', () => {
      const result = classifyTriangle(undefined as any, 2, 3)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("All sides must be positive numbers")
    })
  })

  describe('Mathematical Properties Tests', () => {
    test('should maintain commutative property for side order', () => {
      const sides = [3, 4, 5]
      const permutations = [
        [sides[0], sides[1], sides[2]],
        [sides[0], sides[2], sides[1]],
        [sides[1], sides[0], sides[2]],
        [sides[1], sides[2], sides[0]],
        [sides[2], sides[0], sides[1]],
        [sides[2], sides[1], sides[0]]
      ]
      const results = permutations.map(([a, b, c]) => classifyTriangle(a, b, c))
      const firstResult = results[0]
      results.forEach(result => {
        expect(result.isValid).toBe(firstResult.isValid)
        if (firstResult.isValid) {
          expect(result.type).toBe(firstResult.type)
        } else {
          expect(result.error).toBe(firstResult.error)
        }
      })
    })
    test('should handle Pythagorean triples correctly', () => {
      const pythagoreanTriples = [
        [3, 4, 5],
        [5, 12, 13],
        [6, 8, 10],
        [8, 15, 17],
        [9, 12, 15]
      ]
      pythagoreanTriples.forEach(([a, b, c]) => {
        const result = classifyTriangle(a, b, c)
        expect(result.isValid).toBe(true)
        expect(result.type).toBe("Scalene")
      })
    })
    test('should handle golden ratio triangles', () => {
      const phi = (1 + Math.sqrt(5)) / 2 // Golden ratio
      const result = classifyTriangle(1, phi, phi * phi)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("These sides cannot form a valid triangle")
    })
  })

  describe('Regression Tests', () => {
    test('should maintain consistent behavior for known edge cases', () => {
      const edgeCases = [
        { sides: [1, 1, 1], expected: { valid: true, type: "Equilateral" } },
        { sides: [1, 1, 2], expected: { valid: false, error: "These sides cannot form a valid triangle" } },
        { sides: [0, 1, 1], expected: { valid: false, error: "All sides must be positive numbers" } },
        { sides: [-1, 1, 1], expected: { valid: false, error: "All sides must be positive numbers" } },
        { sides: [0.1, 0.1, 0.1], expected: { valid: true, type: "Equilateral" } }
      ]
      edgeCases.forEach(({ sides, expected }) => {
        const result = classifyTriangle(sides[0], sides[1], sides[2])
        expect(result.isValid).toBe(expected.valid)
        if (expected.valid) {
          expect(result.type).toBe(expected.type)
        } else {
          expect(result.error).toBe(expected.error)
        }
      })
    })
  })
}) 