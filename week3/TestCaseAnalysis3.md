# Week 3 Test Case Analysis: Boundary Value Analysis

## Section 1: Introduction
Boundary value analysis (BVA) is a black-box test design technique that focuses on creating test cases at the edges of input domains. The rationale is that errors are more likely to occur at the boundaries rather than in the center of input ranges. BVA is often used alongside equivalence class testing to ensure robust input validation, especially for functions that process numerical or range-based data. This methodology helps uncover off-by-one errors and ensures that edge cases are handled correctly.

## Section 2: Table/Diagram with Example Data
Below is a table showing boundary value test cases for triangle side input validation (assuming valid side lengths are integers from 1 to 1000):

| Test Case | Side A | Side B | Side C | Boundary Type         | Expected Result         |
|-----------|--------|--------|--------|----------------------|------------------------|
| 1         | 1      | 1      | 1      | Lower boundary       | Triangle (Equilateral) |
| 2         | 1      | 1      | 2      | Lower +1             | Error (Inequality)     |
| 3         | 1000   | 1000   | 1000   | Upper boundary       | Triangle (Equilateral) |
| 4         | 999    | 1000   | 1000   | Upper -1             | Triangle (Isosceles)   |
| 5         | 0      | 500    | 500    | Below lower boundary | Error                  |
| 6         | 1001   | 500    | 500    | Above upper boundary | Error                  |

*Diagram:*
```
Boundaries: Minimum = 1, Maximum = 1000
Test cases at, just below, and just above these boundaries
```

## Section 3: When Should Boundary Value Analysis Be Used?
Boundary value analysis is most effective when the input domain is ordered and has clear minimum and maximum values. It is commonly used for numeric fields, date ranges, and any scenario where the software enforces strict limits. BVA is especially useful for catching off-by-one errors and ensuring that edge cases are handled correctly. It is recommended early in the testing process to quickly identify major defects with minimal test cases.

## Section 4: Limitations of Boundary Value Analysis
While BVA is powerful for detecting errors at the boundaries, it may miss defects that occur within the interior of the input domain or due to complex logic not related to boundaries. It also assumes that boundaries are well-defined and known, which may not always be the case in poorly specified systems. Additionally, BVA may not detect issues that arise from interactions between multiple input variables unless combined with other techniques.

## Section 5: References or AI Tool Discussion
- [ISTQB Glossary: Boundary Value Analysis](https://glossary.istqb.org/en/search/boundary%20value%20analysis)
- [Software Testing Help: Boundary Value Analysis](https://www.softwaretestinghelp.com/boundary-value-analysis/)

**GenAI Tool Usage:**
1. Did it hallucinate and describe how it hallucinated if it did?
   - No hallucinations were detected. The AI output provided accurate information about boundary value analysis that aligned with standard software testing practices and definitions.
2. List one site that you used to verify the validity of the GenAI output.
   - [ISTQB Glossary: Boundary Value Analysis](https://glossary.istqb.org/en/search/boundary%20value%20analysis)
3. List one prompt that you provided.
   - "Write a markdown-formatted test case analysis for boundary value analysis, including an example table, use cases, limitations, and a section on AI tool usage."

## Section 6: Submission Instructions
Submit this markdown file to the appropriate Dropbox or, if using a GitHub repository, submit a text file with the link to your GitHub repo in the assignment area. Ensure your file is named according to the course instructions. 