// Test data for triangle classification unit tests
// Based on the assignment requirements and edge cases

export interface TestCase {
  sideA: number
  sideB: number
  sideC: number
  expectedType: string
  expectedValid: boolean
  expectedError?: string
  description: string
  category: string
}

export const testCases: TestCase[] = [
  // Valid Equilateral Triangles
  {
    sideA: 5,
    sideB: 5,
    sideC: 5,
    expectedType: "Equilateral",
    expectedValid: true,
    description: "Standard equilateral triangle with integer sides",
    category: "Valid Equilateral"
  },
  {
    sideA: 2.5,
    sideB: 2.5,
    sideC: 2.5,
    expectedType: "Equilateral",
    expectedValid: true,
    description: "Equilateral triangle with decimal sides",
    category: "Valid Equilateral"
  },
  {
    sideA: 0.1,
    sideB: 0.1,
    sideC: 0.1,
    expectedType: "Equilateral",
    expectedValid: true,
    description: "Equilateral triangle with very small sides",
    category: "Valid Equilateral"
  },
  {
    sideA: 1000,
    sideB: 1000,
    sideC: 1000,
    expectedType: "Equilateral",
    expectedValid: true,
    description: "Equilateral triangle with large sides",
    category: "Valid Equilateral"
  },

  // Valid Isosceles Triangles
  {
    sideA: 5,
    sideB: 5,
    sideC: 3,
    expectedType: "Isosceles",
    expectedValid: true,
    description: "Standard isosceles triangle (A=B)",
    category: "Valid Isosceles"
  },
  {
    sideA: 3,
    sideB: 5,
    sideC: 5,
    expectedType: "Isosceles",
    expectedValid: true,
    description: "Isosceles triangle (B=C)",
    category: "Valid Isosceles"
  },
  {
    sideA: 5,
    sideB: 3,
    sideC: 5,
    expectedType: "Isosceles",
    expectedValid: true,
    description: "Isosceles triangle (A=C)",
    category: "Valid Isosceles"
  },
  {
    sideA: 4.5,
    sideB: 4.5,
    sideC: 3.2,
    expectedType: "Isosceles",
    expectedValid: true,
    description: "Isosceles triangle with decimal sides",
    category: "Valid Isosceles"
  },
  {
    sideA: 0.1,
    sideB: 0.1,
    sideC: 0.15,
    expectedType: "Isosceles",
    expectedValid: true,
    description: "Isosceles triangle with very small sides",
    category: "Valid Isosceles"
  },

  // Valid Scalene Triangles
  {
    sideA: 3,
    sideB: 4,
    sideC: 5,
    expectedType: "Scalene",
    expectedValid: true,
    description: "Standard right triangle (3-4-5)",
    category: "Valid Scalene"
  },
  {
    sideA: 7,
    sideB: 8,
    sideC: 9,
    expectedType: "Scalene",
    expectedValid: true,
    description: "Standard scalene triangle",
    category: "Valid Scalene"
  },
  {
    sideA: 1.5,
    sideB: 2.5,
    sideC: 3.5,
    expectedType: "Scalene",
    expectedValid: true,
    description: "Scalene triangle with decimal sides",
    category: "Valid Scalene"
  },
  {
    sideA: 6,
    sideB: 8,
    sideC: 10,
    expectedType: "Scalene",
    expectedValid: true,
    description: "Right triangle (6-8-10)",
    category: "Valid Scalene"
  },

  // Invalid Triangles - Negative Values
  {
    sideA: -1,
    sideB: 2,
    sideC: 3,
    expectedType: "",
    expectedValid: false,
    expectedError: "All sides must be positive numbers",
    description: "Negative side A",
    category: "Invalid - Negative Values"
  },
  {
    sideA: 1,
    sideB: -2,
    sideC: 3,
    expectedType: "",
    expectedValid: false,
    expectedError: "All sides must be positive numbers",
    description: "Negative side B",
    category: "Invalid - Negative Values"
  },
  {
    sideA: 1,
    sideB: 2,
    sideC: -3,
    expectedType: "",
    expectedValid: false,
    expectedError: "All sides must be positive numbers",
    description: "Negative side C",
    category: "Invalid - Negative Values"
  },
  {
    sideA: -1,
    sideB: -2,
    sideC: 3,
    expectedType: "",
    expectedValid: false,
    expectedError: "All sides must be positive numbers",
    description: "Multiple negative sides",
    category: "Invalid - Negative Values"
  },
  {
    sideA: -1,
    sideB: -2,
    sideC: -3,
    expectedType: "",
    expectedValid: false,
    expectedError: "All sides must be positive numbers",
    description: "All negative sides",
    category: "Invalid - Negative Values"
  },

  // Invalid Triangles - Zero Values
  {
    sideA: 0,
    sideB: 2,
    sideC: 3,
    expectedType: "",
    expectedValid: false,
    expectedError: "All sides must be positive numbers",
    description: "Zero side A",
    category: "Invalid - Zero Values"
  },
  {
    sideA: 1,
    sideB: 0,
    sideC: 3,
    expectedType: "",
    expectedValid: false,
    expectedError: "All sides must be positive numbers",
    description: "Zero side B",
    category: "Invalid - Zero Values"
  },
  {
    sideA: 1,
    sideB: 2,
    sideC: 0,
    expectedType: "",
    expectedValid: false,
    expectedError: "All sides must be positive numbers",
    description: "Zero side C",
    category: "Invalid - Zero Values"
  },
  {
    sideA: 0,
    sideB: 0,
    sideC: 0,
    expectedType: "",
    expectedValid: false,
    expectedError: "All sides must be positive numbers",
    description: "All zero sides",
    category: "Invalid - Zero Values"
  },

  // Invalid Triangles - Triangle Inequality Violation
  {
    sideA: 1,
    sideB: 1,
    sideC: 10,
    expectedType: "",
    expectedValid: false,
    expectedError: "These sides cannot form a valid triangle",
    description: "Sum of two sides less than third side",
    category: "Invalid - Triangle Inequality"
  },
  {
    sideA: 1,
    sideB: 2,
    sideC: 3,
    expectedType: "",
    expectedValid: false,
    expectedError: "These sides cannot form a valid triangle",
    description: "Sum of two sides equals third side (degenerate triangle)",
    category: "Invalid - Triangle Inequality"
  },
  {
    sideA: 5,
    sideB: 1,
    sideC: 1,
    expectedType: "",
    expectedValid: false,
    expectedError: "These sides cannot form a valid triangle",
    description: "Large side with small sides",
    category: "Invalid - Triangle Inequality"
  },
  {
    sideA: 10,
    sideB: 2,
    sideC: 3,
    expectedType: "",
    expectedValid: false,
    expectedError: "These sides cannot form a valid triangle",
    description: "Large side violates triangle inequality",
    category: "Invalid - Triangle Inequality"
  },

  // Edge Cases
  {
    sideA: 0.001,
    sideB: 0.001,
    sideC: 0.001,
    expectedType: "Equilateral",
    expectedValid: true,
    description: "Very small equilateral triangle",
    category: "Edge Cases"
  },
  {
    sideA: 999999,
    sideB: 999999,
    sideC: 999999,
    expectedType: "Equilateral",
    expectedValid: true,
    description: "Very large equilateral triangle",
    category: "Edge Cases"
  },
  {
    sideA: 0.1,
    sideB: 0.1,
    sideC: 0.1000001,
    expectedType: "Isosceles",
    expectedValid: true,
    description: "Nearly equilateral (floating point precision)",
    category: "Edge Cases"
  },
  {
    sideA: 1.0000001,
    sideB: 1.0000001,
    sideC: 1.0000001,
    expectedType: "Equilateral",
    expectedValid: true,
    description: "Equilateral with floating point precision",
    category: "Edge Cases"
  },
  {
    sideA: 1.1,
    sideB: 2.2,
    sideC: 3.3,
    expectedType: "Scalene",
    expectedValid: false,
    expectedError: "These sides cannot form a valid triangle",
    description: "Scalene triangle with floating point precision (degenerate)",
    category: "Edge Cases"
  }
]

// Helper function to get test cases by category
export const getTestCasesByCategory = (category: string): TestCase[] => {
  return testCases.filter(testCase => testCase.category === category)
}

// Helper function to get all valid test cases
export const getValidTestCases = (): TestCase[] => {
  return testCases.filter(testCase => testCase.expectedValid)
}

// Helper function to get all invalid test cases
export const getInvalidTestCases = (): TestCase[] => {
  return testCases.filter(testCase => !testCase.expectedValid)
}

// Helper function to get test cases by triangle type
export const getTestCasesByType = (type: string): TestCase[] => {
  return testCases.filter(testCase => testCase.expectedType === type)
}

// Test data for API endpoint testing
export const apiTestCases = [
  {
    name: "Valid Equilateral Triangle",
    input: { sideA: 5, sideB: 5, sideC: 5 },
    expectedStatus: 200,
    expectedResponse: {
      isValid: true,
      type: "Equilateral",
      sideA: 5,
      sideB: 5,
      sideC: 5
    }
  },
  {
    name: "Valid Isosceles Triangle",
    input: { sideA: 5, sideB: 5, sideC: 3 },
    expectedStatus: 200,
    expectedResponse: {
      isValid: true,
      type: "Isosceles",
      sideA: 5,
      sideB: 5,
      sideC: 3
    }
  },
  {
    name: "Valid Scalene Triangle",
    input: { sideA: 3, sideB: 4, sideC: 5 },
    expectedStatus: 200,
    expectedResponse: {
      isValid: true,
      type: "Scalene",
      sideA: 3,
      sideB: 4,
      sideC: 5
    }
  },
  {
    name: "Invalid Triangle - Negative Values",
    input: { sideA: -1, sideB: 2, sideC: 3 },
    expectedStatus: 200,
    expectedResponse: {
      isValid: false,
      error: "All sides must be positive numbers",
      sideA: -1,
      sideB: 2,
      sideC: 3
    }
  },
  {
    name: "Invalid Triangle - Triangle Inequality Violation",
    input: { sideA: 1, sideB: 1, sideC: 10 },
    expectedStatus: 200,
    expectedResponse: {
      isValid: false,
      error: "These sides cannot form a valid triangle",
      sideA: 1,
      sideB: 1,
      sideC: 10
    }
  },
  {
    name: "Invalid Request Format",
    input: "invalid json",
    expectedStatus: 400,
    expectedResponse: {
      isValid: false,
      error: "Invalid request format"
    }
  }
] 