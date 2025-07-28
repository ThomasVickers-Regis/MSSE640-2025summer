# Week 4 Test Case Analysis: Decision Tables

## Section 1: Introduction
Decision Table Testing is a black-box software testing technique used to model and test systems with complex logical conditions. It's a systematic approach where we represent complex business rules in a tabular format, which helps in identifying test scenarios that might otherwise be missed. The core idea is to capture all possible combinations of input conditions and their corresponding system actions. A decision table is typically divided into four quadrants: conditions, condition alternatives (or stubs), actions, and action entries. Conditions are the inputs or logical checks the system performs. Actions are the resulting outputs or operations the system executes. Each column in the table, known as a rule, represents a unique combination of conditions that leads to a specific set of actions. This method is incredibly effective for ensuring full test coverage of business logic.

The process involves first identifying all relevant conditions and the actions the system can take. Then, all possible combinations of these conditions (often represented as 'True/False' or 'Yes/No') are listed. For each unique combination of conditions, the corresponding action(s) are determined. This structure allows testers to easily derive test cases by treating each rule (column) as a distinct test scenario. By creating test cases for each rule, we can methodically verify that the system behaves as expected for every possible logical outcome defined in the business requirements.

## Section 2: Table/Diagram with Example Data
Below is an example of a decision table for a website's file upload feature. The feature has specific rules about who can upload files and what types of files are allowed.

**Scenario:** A user attempts to upload a document to a secure portal.

**Conditions:**
- C1: Is the user a registered member?
- C2: Is the user's account active?
- C3: Is the file format a PDF or DOCX?

**Actions:**
- A1: Allow file upload
- A2: Display "Upload Failed: Account Inactive" error
- A3: Display "Upload Failed: Invalid File Format" error
- A4: Display "Upload Failed: Must be a Member" error

| Conditions/Actions | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
|-------------------|---------|---------|---------|---------|
| **C1: Registered Member?** | Y | Y | Y | N |
| **C2: Account Active?** | Y | Y | N | - |
| **C3: File Format OK?** | Y | N | - | - |
| **A1: Allow Upload** | X | | | |
| **A2: Account Inactive Error** | | | X | |
| **A3: Invalid Format Error** | | X | | |
| **A4: Non-Member Error** | | | | X |

*Note: 'Y' stands for Yes, 'N' for No, 'X' marks the action taken, and '-' indicates the condition is irrelevant for that rule.*

## Section 3: When Should Decision Table Testing Be Used?
Decision table testing is most effective in specific situations, particularly for systems where the output depends on a combination of multiple inputs or logical conditions. It is the ideal methodology for testing complex business rules, such as those found in financial applications (e.g., loan eligibility, insurance premium calculation), e-commerce platforms (e.g., applying discounts based on membership, order value, and promo codes), or any system with an intricate if-then-else logical structure.

This technique should be used when the requirements contain causal relationships (cause-and-effect) and logical operators like AND, OR, and NOT. It is also highly valuable when the system's behavior is not easily described by a simple narrative but can be broken down into a set of rules. Using a decision table forces a thorough analysis of the requirements, often revealing gaps or ambiguities in the business logic before a single line of code is even written. It provides a clear and concise way to ensure that all logical paths are considered and tested.

## Section 4: Limitations of Decision Table Testing
While powerful, decision table testing has its limitations. The primary drawback is the problem of combinatorial explosion. As the number of conditions increases, the number of possible rules grows exponentially (2^n, where n is the number of conditions). For example, a system with 10 conditions would result in 2^10 or 1,024 rules, making the table extremely large, complex, and impractical to manage. Techniques like "collapsing" rules can help, but the scalability issue remains significant.

Another limitation is that decision tables are not well-suited for testing the sequence of events or the timing of inputs. They represent logical relationships, not procedural flows or user interactions over time. Therefore, they are not effective for testing graphical user interfaces (GUIs), workflows, or scenarios where the order of operations is critical. For such cases, other techniques like state transition testing or use case testing would be more appropriate.

## Section 5: References or AI Tool Discussion
- [Guru99: Decision Table Testing](https://www.guru99.com/decision-table-testing.html)
- [ISTQB Glossary: Decision Table Testing](https://glossary.istqb.org/en/search/decision%20table%20testing)

**GenAI Tool Usage:**
1. **Did it hallucinate and describe how it hallucinated if it did?**
   - The AI did not appear to hallucinate in a significant way. It accurately defined decision table testing, its components, and its use cases, which aligns with standard software engineering principles. However, during the initial generation of the example table, it created a rule that was logically redundant. I refined the prompt to ensure each rule represented a unique and necessary test case, which corrected the output. This is a common issue where AI might generate plausible but inefficient or redundant examples without specific guidance.

2. **List one site that you used to verify the validity of the GenAI output.**
   - I cross-referenced the generated information with the material on Guru99, specifically their article on Decision Table Testing, to ensure the definitions, benefits, and limitations were accurate and clearly explained.

3. **List one prompt that you provided.**
   - A key prompt used to generate the example in Section 2 was: "Create a simple but clear example of a decision table for a software testing scenario. The scenario should be easy to understand, like a login page or a file upload feature. Identify 3-4 conditions and their corresponding actions. Then, build the decision table with all the necessary rules to test the logic, and explain what each part of the table represents."
