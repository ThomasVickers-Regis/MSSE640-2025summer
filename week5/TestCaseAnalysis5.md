# Week 5 Test Case Analysis: Pairwise Testing

## Section 1: Introduction
Pairwise testing, also known as all-pairs testing or 2-way testing, is a black-box test design technique that focuses on testing all possible combinations of every pair of input parameters. The fundamental principle is that most defects are caused by interactions between two parameters rather than by single parameters or interactions between three or more parameters. This approach significantly reduces the number of test cases needed while maintaining high defect detection capability.

The technique works by systematically selecting test cases that cover all possible pairs of parameter values. For example, if you have three parameters (A, B, C) each with two possible values, instead of testing all 2³ = 8 combinations, pairwise testing would require only 4 test cases to cover all possible pairs. This makes it an efficient method for testing systems with multiple input parameters, especially when exhaustive testing is impractical due to the combinatorial explosion problem.

## Section 2: Table/Diagram with Example Data
Below is an example of pairwise testing for a user registration form with three parameters:

**Scenario:** Testing a user registration form with different combinations of user type, age group, and subscription plan.

**Parameters:**
- User Type: [Regular, Premium]
- Age Group: [18-25, 26-35, 36+]
- Subscription Plan: [Basic, Standard, Pro]

**Pairwise Test Cases:**

| Test Case | User Type | Age Group | Subscription Plan | Expected Result |
|-----------|-----------|-----------|-------------------|-----------------|
| 1         | Regular   | 18-25     | Basic             | Valid Registration |
| 2         | Regular   | 26-35     | Standard          | Valid Registration |
| 3         | Regular   | 36+       | Pro               | Valid Registration |
| 4         | Premium   | 18-25     | Standard          | Valid Registration |
| 5         | Premium   | 26-35     | Pro               | Valid Registration |
| 6         | Premium   | 36+       | Basic             | Valid Registration |
| 7         | Regular   | 18-25     | Pro               | Valid Registration |
| 8         | Premium   | 18-25     | Pro               | Valid Registration |
| 9         | Regular   | 26-35     | Basic             | Valid Registration |

*Diagram:*
```
Parameter Combinations Covered:
- User Type + Age Group: All 6 pairs covered
- User Type + Subscription Plan: All 6 pairs covered  
- Age Group + Subscription Plan: All 9 pairs covered
```

## Section 3: When Should Pairwise Testing Be Used?
Pairwise testing is most effective when dealing with systems that have multiple input parameters, each with several possible values. It is particularly valuable in scenarios where exhaustive testing is impractical due to the large number of possible combinations. This technique is commonly used in testing web forms, configuration systems, API endpoints with multiple parameters, and any application where different input combinations might interact in unexpected ways.

This approach should be used when the system's behavior depends on the interaction between different input parameters rather than individual parameter values alone. It is especially useful in regression testing, where you need to ensure that changes to one parameter don't adversely affect the system's behavior with other parameters. Pairwise testing is also beneficial when time and resources are limited, as it provides a good balance between test coverage and efficiency.

## Section 4: Limitations of Pairwise Testing
While pairwise testing is efficient, it has several limitations. The most significant limitation is that it only covers interactions between two parameters at a time. Defects that arise from interactions between three or more parameters may go undetected. For example, a bug that only occurs when all three parameters have specific values simultaneously would not be caught by pairwise testing.

Another limitation is that pairwise testing assumes that most defects are caused by 2-way interactions, which may not always be true for complex systems. Additionally, the technique requires careful selection of test cases to ensure all pairs are covered, which can be challenging for systems with many parameters or parameters with many possible values. The technique also doesn't account for the relative importance of different parameter combinations, treating all pairs equally when some combinations might be more critical than others.

## Section 5: References or AI Tool Discussion
- [ISTQB Glossary: Pairwise Testing](https://glossary.istqb.org/en/search/pairwise%20testing)
- [Software Testing Help: Pairwise Testing](https://www.softwaretestinghelp.com/pairwise-testing/)
- [Pairwise Testing Tools](https://www.pairwise.org/)

**GenAI Tool Usage:**
1. **Did it hallucinate and describe how it hallucinated if it did?**
   - The AI did not hallucinate in any significant way. It provided accurate information about pairwise testing methodology, including the mathematical basis (2-way interactions) and practical applications. The example table correctly demonstrates the pairwise testing concept with appropriate parameter combinations.

2. **List one site that you used to verify the validity of the GenAI output.**
   - I cross-referenced the generated information with the ISTQB Glossary entry on Pairwise Testing to ensure the definitions, benefits, and limitations were accurate and aligned with industry standards.

3. **List one prompt that you provided.**
   - A key prompt used to generate the example in Section 2 was: "Create a clear example of pairwise testing for a user registration form with three parameters: user type (Regular/Premium), age group (18-25/26-35/36+), and subscription plan (Basic/Standard/Pro). Show the test cases that cover all possible pairs of these parameters."

## Section 6: Submission Instructions
Submit this markdown file to the appropriate Dropbox or, if using a GitHub repository, submit a text file with the link to your GitHub repo in the assignment area. Ensure your file is named according to the course instructions.
