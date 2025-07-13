# Week 2 Test Case Analysis: Equivalence Classes

## Section 1: Introduction
Equivalence class testing is a black-box test design technique that divides input data into partitions of equivalent data from which test cases can be derived. The main idea is that if one test case in an equivalence class detects a defect, all other test cases in that class will likely detect the same defect. This approach reduces the total number of test cases needed while maintaining effective coverage. For example, when testing a function that accepts triangle side lengths, we can group all valid side combinations into one class and invalid ones (e.g., negative numbers, zeros, or values that cannot form a triangle) into others.

## Section 2: Example Table of Equivalence Classes
Below is a table showing equivalence classes for triangle side input validation:

| Test Case | Side A | Side B | Side C | Class Type         | Expected Result         |
|-----------|--------|--------|--------|--------------------|------------------------|
| 1         | 3      | 4      | 5      | Valid              | Triangle (Scalene)     |
| 2         | 5      | 5      | 5      | Valid              | Triangle (Equilateral) |
| 3         | 0      | 4      | 5      | Invalid (Zero)     | Error                  |
| 4         | -1     | 4      | 5      | Invalid (Negative) | Error                  |
| 5         | 1      | 2      | 3      | Invalid (Inequality)| Error                 |
| 6         | 1000   | 1000   | 1      | Invalid (Inequality)| Error                 |

*Diagram:*
```
Valid Equivalence Class: All positive numbers that satisfy triangle inequality
Invalid Equivalence Classes: Zeros, negatives, and numbers that violate triangle inequality
```

## Section 3: When Should Equivalence Class Testing Be Used?
Equivalence class testing is most effective when the input domain can be divided into distinct partitions, such as ranges of valid and invalid values. It is commonly used in input validation, form field testing, and any scenario where the software processes a range of possible values. This method is especially useful early in the testing process to quickly identify major defects with minimal test cases.

## Section 4: Limitations
While equivalence class testing reduces the number of test cases, it may miss edge cases that occur at the boundaries of equivalence classes. It also assumes that all values within a class are truly equivalent, which may not always be the case if the implementation has subtle bugs. This technique does not guarantee detection of all defects, especially those related to boundary values or complex logic that spans multiple classes.

## Section 5: References and AI Tool Usage
- [ISTQB Glossary: Equivalence Partitioning](https://glossary.istqb.org/en/search/equivalence%20partitioning)
- [Software Testing Help: Equivalence Partitioning](https://www.softwaretestinghelp.com/equivalence-partitioning/)
- GenAI (ChatGPT/Gemini) was used to help structure and clarify this analysis. 
- **Prompt used:** "Write a markdown-formatted test case analysis for equivalence class testing, including an example table, use cases, limitations, and a section on AI tool usage."
- **Verification:** The output was cross-checked with the ISTQB glossary and Software Testing Help. No hallucinations were detected; the information aligns with standard definitions and practices.