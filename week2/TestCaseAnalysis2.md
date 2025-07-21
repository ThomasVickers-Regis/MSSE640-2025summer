# Week 2 Test Case Analysis: Equivalence Classes

## Section 1: Introduction
Equivalence class testing is a black-box test design technique that divides input data into partitions of equivalent data from which test cases can be derived. The main idea is that if one test case in an equivalence class detects a defect, all other test cases in that class will likely detect the same defect. This approach reduces the total number of test cases needed while maintaining effective coverage. For example, when testing a function that accepts triangle side lengths, we can group all valid side combinations into one class and invalid ones (e.g., negative numbers, zeros, or values that cannot form a triangle) into others.

## Section 2: Table/Diagram with Example Data
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

## Section 4: Limitations of Equivalence Class Testing
While equivalence class testing reduces the number of test cases, it may miss edge cases that occur at the boundaries of equivalence classes. It also assumes that all values within a class are truly equivalent, which may not always be the case if the implementation has subtle bugs. This technique does not guarantee detection of all defects, especially those related to boundary values or complex logic that spans multiple classes.

## Section 5: References or AI Tool Discussion
- [ISTQB Glossary: Equivalence Partitioning](https://glossary.istqb.org/en/search/equivalence%20partitioning)
- [Software Testing Help: Equivalence Partitioning](https://www.softwaretestinghelp.com/equivalence-partitioning/)

**GenAI Tool Usage:**
1. Did it hallucinate and describe how it hallucinated if it did?
   - No hallucinations were detected. The AI output provided accurate information about equivalence class testing that aligned with standard software testing practices and definitions.
2. List one site that you used to verify the validity of the GenAI output.
   - [ISTQB Glossary: Equivalence Partitioning](https://glossary.istqb.org/en/search/equivalence%20partitioning)
3. List one prompt that you provided.
   - "Write a markdown-formatted test case analysis for equivalence class testing, including an example table, use cases, limitations, and a section on AI tool usage."

## Section 6: Submission Instructions
Submit this markdown file to the appropriate Dropbox or, if using a GitHub repository, submit a text file with the link to your GitHub repo in the assignment area. Ensure your file is named according to the course instructions.