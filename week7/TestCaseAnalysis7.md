# Week 7 Test Case Analysis: Control Flow Testing

## Section 1: Introduction
Control Flow Testing is a white-box testing technique that focuses on testing the logical flow of a program by examining the sequence of statements, branches, and paths that can be executed. The primary goal is to ensure that all possible execution paths through the code are tested, including different branches, loops, and conditional statements. This technique is based on the control flow graph (CFG) representation of the program, where nodes represent statements or decision points, and edges represent the flow of control between them.

The technique involves identifying all possible paths through the code and creating test cases that exercise these paths. This includes testing different branches of conditional statements, various iterations of loops, and combinations of multiple conditions. Control Flow Testing is particularly effective for detecting logical errors, unreachable code, infinite loops, and ensuring that all code paths are properly tested. It helps verify that the program behaves correctly under all possible execution scenarios.

## Section 2: Table/Diagram with Example Data
Below is an example of Control Flow Testing for a triangle classification function:

**Scenario:** Testing a function that classifies triangles based on their side lengths.

**Control Flow Graph:**
```
Start
  ↓
Input validation (a > 0, b > 0, c > 0)
  ↓
Triangle inequality check (a + b > c, b + c > a, a + c > b)
  ↓
Side comparison logic
  ↓
Classification (Equilateral, Isosceles, Scalene)
  ↓
End
```

**Test Cases Based on Control Flow:**

| Test Case | Side A | Side B | Side C | Path Taken | Expected Result | Coverage |
|-----------|--------|--------|--------|------------|-----------------|----------|
| 1         | 3      | 4      | 5      | Valid → Triangle → Scalene | Scalene Triangle | Path 1 |
| 2         | 5      | 5      | 5      | Valid → Triangle → Equilateral | Equilateral Triangle | Path 2 |
| 3         | 5      | 5      | 8      | Valid → Triangle → Isosceles | Isosceles Triangle | Path 3 |
| 4         | 0      | 4      | 5      | Invalid Input | Error | Path 4 |
| 5         | -1     | 4      | 5      | Invalid Input | Error | Path 4 |
| 6         | 1      | 2      | 4      | Valid → Invalid Triangle | Error | Path 5 |
| 7         | 2      | 2      | 4      | Valid → Invalid Triangle | Error | Path 5 |

*Diagram:*
```
Control Flow Paths:
Path 1: Start → Valid Input → Valid Triangle → Scalene → End
Path 2: Start → Valid Input → Valid Triangle → Equilateral → End  
Path 3: Start → Valid Input → Valid Triangle → Isosceles → End
Path 4: Start → Invalid Input → Error → End
Path 5: Start → Valid Input → Invalid Triangle → Error → End
```

## Section 3: When Should Control Flow Testing Be Used?
Control Flow Testing is most effective when testing complex algorithms, business logic, or functions with multiple conditional statements and loops. It is particularly valuable for critical applications where thorough testing of all possible execution paths is essential, such as financial systems, safety-critical software, or any application with complex decision-making logic.

This technique should be used when the code contains multiple branches, nested conditions, loops with different iteration counts, or complex logical structures. It is especially useful for unit testing individual functions or methods, as it helps ensure that all code paths are exercised. Control Flow Testing is also beneficial when you need to verify that error handling paths are properly tested and that no unreachable code exists.

## Section 4: Limitations of Control Flow Testing
While Control Flow Testing provides comprehensive path coverage, it has several limitations. The most significant limitation is the exponential growth in the number of possible paths as the complexity of the code increases. For complex functions with many conditional statements, the number of possible paths can become unmanageable, making exhaustive testing impractical.

Another limitation is that Control Flow Testing focuses on the structure of the code rather than the actual data values being processed. It may miss defects related to data validation, boundary conditions, or specific input values that cause unexpected behavior. Additionally, this technique requires access to the source code, making it unsuitable for black-box testing scenarios. The technique also doesn't guarantee that all possible data combinations are tested, only that all code paths are exercised.

## Section 5: References or AI Tool Discussion
- [ISTQB Glossary: Control Flow Testing](https://glossary.istqb.org/en/search/control%20flow%20testing)
- [Software Testing Help: Control Flow Testing](https://www.softwaretestinghelp.com/control-flow-testing/)
- [Guru99: Control Flow Testing](https://www.guru99.com/control-flow-testing.html)

**GenAI Tool Usage:**
1. **Did it hallucinate and describe how it hallucinated if it did?**
   - The AI did not hallucinate in any significant way. It provided accurate information about Control Flow Testing methodology, including the concept of control flow graphs and path coverage. The example correctly demonstrates how to identify and test different execution paths through a program.

2. **List one site that you used to verify the validity of the GenAI output.**
   - I cross-referenced the generated information with the ISTQB Glossary entry on Control Flow Testing to ensure the definitions, benefits, and limitations were accurate and aligned with industry standards.

3. **List one prompt that you provided.**
   - A key prompt used to generate the example in Section 2 was: "Create a clear example of Control Flow Testing for a triangle classification function. Show the control flow graph, identify the different paths through the code, and create test cases that cover each path."

## Section 6: Submission Instructions
Submit this markdown file to the appropriate Dropbox or, if using a GitHub repository, submit a text file with the link to your GitHub repo in the assignment area. Ensure your file is named according to the course instructions.
