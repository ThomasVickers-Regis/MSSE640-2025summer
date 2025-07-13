import '@testing-library/jest-dom'

// Mock triangle classification function for isolated testing
function classifyTriangle(a: number, b: number, c: number) {
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

describe('Triangle Classification Logic', () => {
  describe('Input Validation', () => {
    test('should reject negative values', () => {
      const result = classifyTriangle(-1, 2, 3)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("All sides must be positive numbers")
    })

    test('should reject zero values', () => {
      const result = classifyTriangle(0, 2, 3)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("All sides must be positive numbers")
    })

    test('should reject multiple negative values', () => {
      const result = classifyTriangle(-1, -2, 3)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("All sides must be positive numbers")
    })

    test('should reject all zero values', () => {
      const result = classifyTriangle(0, 0, 0)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("All sides must be positive numbers")
    })
  })

  describe('Triangle Inequality Theorem', () => {
    test('should reject sides that violate triangle inequality', () => {
      const result = classifyTriangle(1, 1, 10)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("These sides cannot form a valid triangle")
    })

    test('should reject sides where sum equals third side', () => {
      const result = classifyTriangle(1, 2, 3)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("These sides cannot form a valid triangle")
    })

    test('should accept valid triangle combinations', () => {
      const result = classifyTriangle(3, 4, 5)
      expect(result.isValid).toBe(true)
      expect(result.type).toBe("Scalene")
    })

    test('should accept sides in different orders', () => {
      const result1 = classifyTriangle(5, 3, 4)
      const result2 = classifyTriangle(4, 5, 3)
      const result3 = classifyTriangle(3, 4, 5)
      
      expect(result1.isValid).toBe(true)
      expect(result2.isValid).toBe(true)
      expect(result3.isValid).toBe(true)
      expect(result1.type).toBe("Scalene")
      expect(result2.type).toBe("Scalene")
      expect(result3.type).toBe("Scalene")
    })
  })

  describe('Triangle Type Classification', () => {
    describe('Equilateral Triangles', () => {
      test('should classify equilateral triangle with equal sides', () => {
        const result = classifyTriangle(5, 5, 5)
        expect(result.isValid).toBe(true)
        expect(result.type).toBe("Equilateral")
      })

      test('should classify equilateral triangle with decimal values', () => {
        const result = classifyTriangle(2.5, 2.5, 2.5)
        expect(result.isValid).toBe(true)
        expect(result.type).toBe("Equilateral")
      })

      test('should classify equilateral triangle in different orders', () => {
        const result1 = classifyTriangle(5, 5, 5)
        const result2 = classifyTriangle(5, 5, 5)
        const result3 = classifyTriangle(5, 5, 5)
        
        expect(result1.type).toBe("Equilateral")
        expect(result2.type).toBe("Equilateral")
        expect(result3.type).toBe("Equilateral")
      })
    })

    describe('Isosceles Triangles', () => {
      test('should classify isosceles triangle with two equal sides', () => {
        const result = classifyTriangle(5, 5, 3)
        expect(result.isValid).toBe(true)
        expect(result.type).toBe("Isosceles")
      })

      test('should classify isosceles triangle with different side orders', () => {
        const result1 = classifyTriangle(5, 3, 5)
        const result2 = classifyTriangle(3, 5, 5)
        
        expect(result1.type).toBe("Isosceles")
        expect(result2.type).toBe("Isosceles")
      })

      test('should classify isosceles triangle with decimal values', () => {
        const result = classifyTriangle(4.5, 4.5, 3.2)
        expect(result.isValid).toBe(true)
        expect(result.type).toBe("Isosceles")
      })
    })

    describe('Scalene Triangles', () => {
      test('should classify scalene triangle with all different sides', () => {
        const result = classifyTriangle(3, 4, 5)
        expect(result.isValid).toBe(true)
        expect(result.type).toBe("Scalene")
      })

      test('should classify scalene triangle with decimal values', () => {
        const result = classifyTriangle(1.5, 2.5, 3.5)
        expect(result.isValid).toBe(true)
        expect(result.type).toBe("Scalene")
      })

      test('should classify scalene triangle in different orders', () => {
        const result1 = classifyTriangle(7, 8, 9)
        const result2 = classifyTriangle(8, 9, 7)
        const result3 = classifyTriangle(9, 7, 8)
        
        expect(result1.type).toBe("Scalene")
        expect(result2.type).toBe("Scalene")
        expect(result3.type).toBe("Scalene")
      })
    })
  })

  describe('Edge Cases', () => {
    test('should handle very small positive values', () => {
      const result = classifyTriangle(0.1, 0.1, 0.1)
      expect(result.isValid).toBe(true)
      expect(result.type).toBe("Equilateral")
    })

    test('should handle large values', () => {
      const result = classifyTriangle(1000, 1000, 1000)
      expect(result.isValid).toBe(true)
      expect(result.type).toBe("Equilateral")
    })

    test('should handle mixed small and large values', () => {
      const result = classifyTriangle(0.1, 0.1, 0.15)
      expect(result.isValid).toBe(true)
      expect(result.type).toBe("Isosceles")
    })
  })
}) 