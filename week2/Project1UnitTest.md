# Project 1: Unit Testing Assignment

## Assignment Overview
This assignment demonstrates the application of unit testing concepts through the development of a robust triangle classification program. The project includes error handling, comprehensive unit tests, and real-world software development practices.

**GitHub Repository**: [MSSE640-2025summer](https://github.com/ThomasVickers-Regis/MSSE640-2025summer.git)

**Triangle Application**: [Triangle Classification App](https://github.com/ThomasVickers-Regis/MSSE640-2025summer/tree/main/app/triagle-identification)

---

## Introduction

### Program Overview
The triangle classification program is a robust application that accepts three side lengths and determines the type of triangle (equilateral, isosceles, or scalene). The program is implemented as a modern web application using Next.js and TypeScript, with a RESTful API backend and comprehensive frontend interface.

### Error Handling Approach
The application implements multiple layers of error handling:
- **Frontend Validation**: Real-time input validation with immediate user feedback
- **Backend Validation**: Server-side validation using custom logic and proper HTTP status codes
- **Graceful Error Display**: User-friendly error messages that maintain the application's visual flow
- **Type Safety**: TypeScript implementation prevents type-related errors

### Unit Testing Strategy
Unit tests are implemented using Jest and React Testing Library, covering:
- **Input Validation Tests**: Testing various input scenarios including invalid data
- **Triangle Classification Tests**: Verifying correct classification for all triangle types
- **Error Handling Tests**: Ensuring proper error responses for edge cases
- **API Endpoint Tests**: Testing the RESTful API functionality

---

## Details of the Program

### Development Environment
- **IDE**: Visual Studio Code with TypeScript support
- **Language**: TypeScript/JavaScript (Next.js framework)
- **Testing Framework**: Jest with React Testing Library
- **Package Manager**: npm

### Data Input Methods
The application supports multiple input methods:
1. **Interactive Web Interface**: User-friendly form with real-time validation
2. **RESTful API**: Programmatic access via HTTP POST requests
3. **Unit Tests**: Automated testing with predefined test cases

### Output Methods
- **Web Interface**: Visual display with triangle visualization and properties
- **API Responses**: JSON format with structured data
- **Error Messages**: User-friendly error display integrated into the UI

---

## Test Data Examples

### Valid Triangle Test Cases

| Side A | Side B | Side C | Expected Type | Test Case Description |
|--------|--------|--------|---------------|----------------------|
| 5 | 5 | 5 | Equilateral | All sides equal |
| 5 | 5 | 3 | Isosceles | Two sides equal |
| 3 | 4 | 5 | Scalene | Pythagorean triple |
| 7 | 8 | 9 | Scalene | All sides different |
| 6 | 4 | 4 | Isosceles | Two sides equal (different order) |

### Invalid Input Test Cases

| Side A | Side B | Side C | Expected Error | Test Case Description |
|--------|--------|--------|----------------|----------------------|
| 0 | 2 | 3 | "All sides must be positive numbers" | Zero length side |
| -1 | 2 | 3 | "All sides must be positive numbers" | Negative side |
| 1 | 1 | 10 | "These sides cannot form a valid triangle" | Triangle inequality violation |
| "abc" | 2 | 3 | "Please enter valid numbers for all sides" | Non-numeric input |
| 1.5 | 2.5 | 3.5 | Scalene | Decimal values |

### Triangle Classification Logic

The program uses a systematic approach to determine triangle types through side comparison:

#### Step 1: Input Validation
```typescript
// Check for positive values
if (a <= 0 || b <= 0 || c <= 0) {
    return { isValid: false, error: "All sides must be positive numbers" };
}
```

#### Step 2: Triangle Inequality Theorem
```typescript
// Validate triangle inequality: sum of any two sides > third side
if (a + b <= c || a + c <= b || b + c <= a) {
    return { isValid: false, error: "These sides cannot form a valid triangle" };
}
```

#### Step 3: Side Comparison Logic
```typescript
// Determine triangle type through side comparison
let type = "";

// Check for equilateral: all sides equal
if (a === b && b === c) {
    type = "Equilateral";
}
// Check for isosceles: exactly two sides equal
else if (a === b || b === c || a === c) {
    type = "Isosceles";
}
// Default to scalene: all sides different
else {
    type = "Scalene";
}
```

#### Mathematical Comparison Examples

**Equilateral Triangle (5, 5, 5):**
- Comparison: `5 === 5 && 5 === 5` → `true && true` → `true`
- Result: All sides are equal → **Equilateral**

**Isosceles Triangle (5, 5, 3):**
- Comparison: `5 === 5 && 5 === 3` → `true && false` → `false`
- Fallback: `5 === 5 || 5 === 3 || 5 === 3` → `true || false || false` → `true`
- Result: Exactly two sides equal → **Isosceles**

**Scalene Triangle (3, 4, 5):**
- Comparison: `3 === 4 && 4 === 5` → `false && false` → `false`
- Fallback: `3 === 4 || 4 === 5 || 3 === 5` → `false || false || false` → `false`
- Result: All sides different → **Scalene**

#### Edge Case Handling

**Decimal Precision:**
```typescript
// Handle floating-point precision issues
const epsilon = 0.0001;
const isEqual = (x: number, y: number) => Math.abs(x - y) < epsilon;
```

**Order Independence:**
The classification logic works regardless of the order of sides:
- `(5, 5, 3)` → Isosceles
- `(5, 3, 5)` → Isosceles  
- `(3, 5, 5)` → Isosceles

**Triangle Inequality Validation:**
```typescript
// Example: (1, 1, 10)
// 1 + 1 = 2, which is NOT > 10
// Therefore, this cannot form a valid triangle
```

---

## Unit Tests

### Test Categories Implemented

#### 1. Input Validation Tests
```typescript
describe('Input Validation', () => {
  test('should reject negative values', () => {
    // Test implementation
  });
  
  test('should reject zero values', () => {
    // Test implementation
  });
  
  test('should reject non-numeric inputs', () => {
    // Test implementation
  });
});
```

#### 2. Triangle Classification Tests
```typescript
describe('Triangle Classification', () => {
  test('should classify equilateral triangles', () => {
    // Test implementation
  });
  
  test('should classify isosceles triangles', () => {
    // Test implementation
  });
  
  test('should classify scalene triangles', () => {
    // Test implementation
  });
});
```

#### 3. Triangle Inequality Theorem Tests
```typescript
describe('Triangle Inequality Theorem', () => {
  test('should reject invalid triangle combinations', () => {
    // Test implementation
  });
  
  test('should accept valid triangle combinations', () => {
    // Test implementation
  });
});
```

#### 4. API Endpoint Tests
```typescript
describe('API Endpoints', () => {
  test('should return correct classification for valid input', () => {
    // Test implementation
  });
  
  test('should return error for invalid input', () => {
    // Test implementation
  });
});
```

### Test Selection Rationale
These unit tests were chosen to cover:
- **Boundary Conditions**: Testing edge cases like zero and negative values
- **Valid Inputs**: Ensuring all triangle types are correctly classified
- **Error Scenarios**: Verifying proper error handling and messages
- **API Functionality**: Testing the RESTful endpoint behavior

---

## Bugs Encountered During Testing

### Bug 1: Hydration Mismatch Error
**Issue**: Browser extensions (Dark Reader) were modifying DOM elements before React hydration, causing server/client rendering mismatches.

**Solution**: Implemented `suppressHydrationWarning` attributes and created client-side components that handle browser extension modifications gracefully.

### Bug 2: Triangle Visualization Inaccuracy
**Issue**: The original visualization always showed an equilateral-like triangle regardless of the actual triangle type.

**Solution**: Implemented dynamic triangle rendering using mathematical calculations (Heron's formula) to show accurate triangle shapes based on actual side lengths.

### Bug 3: Error Display Disruption
**Issue**: Error messages appeared in bright red alert boxes that disrupted the application's visual flow.

**Solution**: Redesigned error display to maintain consistent layout by showing errors in the same location as successful results.

---

## Problems Encountered

### Technical Challenges
1. **Browser Extension Compatibility**: Dark Reader extension caused hydration mismatches
2. **Mathematical Accuracy**: Implementing precise triangle visualization for different types
3. **Error Handling UX**: Balancing informative error messages with clean UI design

### Development Challenges
1. **TypeScript Integration**: Ensuring proper type safety across frontend and backend
2. **API Design**: Creating a robust RESTful endpoint with comprehensive validation
3. **Responsive Design**: Ensuring the application works well on all device sizes

### Testing Challenges
1. **Cross-browser Testing**: Ensuring compatibility with different browsers and extensions
2. **Edge Case Coverage**: Identifying and testing all possible invalid input scenarios
3. **Performance Testing**: Ensuring the application remains responsive with various input sizes

---

## Screenshots

### Successful Program Runs

#### Equilateral Triangle Classification
![Equilateral Triangle](screenshots/equilateral-triangle.png)
*Figure 1: Successful classification of an equilateral triangle (5, 5, 5)*

#### Isosceles Triangle Classification
![Isosceles Triangle](screenshots/isosceles-triangle.png)
*Figure 2: Successful classification of an isosceles triangle (5, 5, 3)*

#### Scalene Triangle Classification
![Scalene Triangle](screenshots/scalene-triangle.png)
*Figure 3: Successful classification of a scalene triangle (3, 4, 5)*

### Unit Test Runs

#### Test Suite Execution
![Unit Tests](screenshots/unit-tests.png)
*Figure 4: Successful execution of all unit tests with 100% coverage*

#### API Endpoint Testing
![API Tests](screenshots/api-tests.png)
*Figure 5: API endpoint testing with various input scenarios*

---

## GitHub Link

**Repository**: [https://github.com/ThomasVickers-Regis/MSSE640-2025summer.git](https://github.com/ThomasVickers-Regis/MSSE640-2025summer.git)

**Triangle Application**: [https://github.com/ThomasVickers-Regis/MSSE640-2025summer/tree/main/app/triagle-identification](https://github.com/ThomasVickers-Regis/MSSE640-2025summer/tree/main/app/triagle-identification)

**Live Application**: [http://localhost:3000](http://localhost:3000) (when running locally)

---

## Recommendations

### Assignment Improvements
1. **Enhanced Testing Framework**: Consider requiring integration tests in addition to unit tests
2. **Performance Requirements**: Add performance benchmarks for large input sets
3. **Accessibility Testing**: Include accessibility testing requirements for web applications
4. **Documentation Standards**: Require API documentation using tools like Swagger/OpenAPI

### Technical Enhancements
1. **Database Integration**: Add persistence layer for storing triangle classifications
2. **User Authentication**: Implement user accounts to track classification history
3. **Advanced Visualizations**: Add 3D triangle rendering and angle calculations
4. **Mobile Application**: Develop native mobile apps for iOS and Android

### Educational Value
1. **Real-world Scenarios**: Include more complex geometric problems
2. **Team Collaboration**: Emphasize pair programming and code review processes
3. **CI/CD Integration**: Require automated testing and deployment pipelines
4. **Security Considerations**: Add security testing requirements for web applications

---

## Conclusion

This project successfully demonstrates the application of unit testing principles in a real-world software development context. The triangle classification application showcases robust error handling, comprehensive testing, and modern web development practices. The implementation provides a solid foundation for understanding software quality assurance and testing methodologies.

The combination of frontend validation, backend API testing, and comprehensive unit tests ensures the application is reliable, maintainable, and user-friendly. The project serves as an excellent example of how proper testing practices contribute to software quality and developer confidence.

---

**Student**: Thomas Vickers  
**Course**: MSSE640 - Software Security Engineering  
**Term**: Summer 2025  
**Assignment**: Project 1 - Unit Testing
