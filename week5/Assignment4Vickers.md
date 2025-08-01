# Assignment #4: Git Branching and Workflow

## MSSE640 - Software Security Engineering
**Week 5 Assignment: Git Flow, Feature Branches, and Advanced AI Coding Tools**

---

## Table of Contents
1. [Objective](#objective)
2. [Activity 1: Working with Feature Branches](#activity-1-working-with-feature-branches)
3. [Advanced Exercises](#advanced-exercises)
4. [References](#references)

---

## Objective

This assignment focuses on working with branches and implementing a basic Git Flow workflow. The goal is to understand and practice branch management, feature development, and the pull request process. Students will learn to create feature branches, manage local and remote repositories, and implement proper Git workflow practices.

---

## Activity 1: Working with Feature Branches

### Background

This week we practice working with branches. Often you will see a main branch, a dev branch, and several other branches that are used for new features, releases, or bug fixes. The main branch is very carefully controlled and all of the developers will integrate their code into the dev branch, which will eventually be merged with the main branch after the code is known to work. Several developers will work at the same time on different features and merge those into the dev branch.

### Step 1: Create a Feature Branch in Visual Studio Code

First, I opened my project repository in Visual Studio Code and followed these steps:

1. Navigated to the Source Control view (three dots connected by lines icon)
2. Clicked on the current branch name at the bottom-left
3. Selected "+ Create new branch..." from the pop-up menu
4. Named the new branch "feature/assignment4"

![Step 1: Creating a new branch](./assets/SS1%20git%20branch.png)

### Step 2: Verify Local and Remote Branches

To verify the branch creation and check the status of local and remote branches, I used the following commands:

```bash
git branch
```

This command showed my new branch with an asterisk (*) indicating it as the current working branch.

![Step 2a: Local branches](./assets/SS1%20git%20branch.png)

```bash
git branch -r
```

This command showed only the remote main branch, as the feature branch hadn't been pushed yet.

![Step 2b: Remote branches](./assets/SS2%20git%20branch%20r.png)

**Question: What is different when you run `git branch` and `git branch -r`?**

- `git branch` shows all local branches in your repository
- `git branch -r` shows all remote branches that exist on the remote repository (GitHub)
- The feature branch appears in local but not remote because it hasn't been pushed yet

### Step 3: Commit Changes and Publish the Branch

After making changes to the README.md file:

1. Used the Source Control panel to stage changes
2. Added a descriptive commit message: "week 6 created"
3. Committed the changes
4. Published the branch to GitHub

![Step 3: Committing and publishing changes](./assets/SS3%20Publish%20branch.png)

### Step 4: Create a Pull Request on GitHub

On GitHub:
1. Clicked the "Compare & pull request" button from the yellow notification bar
2. Set the base branch to main and compare branch to feature/assignment4
3. Added a title and description
4. Created the pull request
5. Merged the changes
6. Deleted the remote branch

#### Pull Request Process Screenshots:

1. **Opening the Pull Request:**
![Step 4a: Opening pull request](./assets/ss4%20git%20PR.png)

2. **Pull Request Created:**
![Step 4b: Pull request created](./assets/SS5%20PR.png)

3. **Pull Request Merged:**
![Step 4c: Pull request merged](./assets/ss6%20PR%20created.png)

4. **Remote Branch Deleted:**
![Step 4d: Remote branch deleted](./assets/SS7%20PR%20Deleted.png)

**Question: Will the local feature branch still exist?**

Yes, the local feature branch will still exist. Deleting the remote branch on GitHub only removes the branch from the remote repository and has no effect on the local branch on your computer.

### Step 5: Clean Up Local Repository

To clean up the local repository after merging:

1. **Updated local metadata:**
```bash
git fetch -p
```

2. **Switched back to main branch:**
```bash
git checkout main
```

3. **Pulled the latest changes:**
```bash
git pull
```

4. **Deleted the local feature branch:**
```bash
git branch -d feature/assignment4
```

![Step 5: Branch cleanup completed](./assets/SS8%20Branch%20Cleanup.png)

### A Typical Git Flow

A typical Git Flow involves:
- **Main branch**: Production-ready code
- **Dev branch**: Integration branch for features
- **Feature branches**: Individual feature development
- **Release branches**: Preparing for production releases
- **Hotfix branches**: Emergency fixes for production

---

## Advanced Exercises

### AI-Assisted Coding Tools and the Future of Software Engineering

The landscape of software development is rapidly evolving with the introduction of AI-assisted coding tools. These tools are transforming how developers write, debug, and maintain code, raising important questions about the future of programming as a skill.

#### AI-Assisted Coding Tools

**Cursor, GitHub Copilot, and Similar Tools**

AI-assisted coding tools like Cursor, GitHub Copilot, Amazon CodeWhisperer, and Tabnine are revolutionizing the development process. These tools use large language models trained on vast repositories of code to provide intelligent code completion, bug detection, and even full function generation based on natural language descriptions.

**Key Capabilities:**
- **Intelligent Code Completion**: Suggests entire functions or code blocks based on context
- **Natural Language to Code**: Converts plain English descriptions into working code
- **Bug Detection and Fixing**: Identifies potential issues and suggests corrections
- **Documentation Generation**: Automatically creates comments and documentation
- **Refactoring Assistance**: Suggests improvements to existing code

#### Will AI Replace Coding as a Skill?

The question of whether AI will replace coding as a skill is complex and multifaceted. While AI tools are becoming increasingly sophisticated, they are more likely to augment rather than replace human developers.

**Arguments for AI Augmentation:**
- **Enhanced Productivity**: AI tools can handle repetitive tasks, allowing developers to focus on higher-level problem-solving
- **Reduced Learning Curve**: New developers can learn faster with AI assistance
- **Code Quality**: AI can help maintain consistent coding standards and catch common errors
- **Accessibility**: Programming becomes more accessible to non-technical users

**Arguments Against Complete Replacement:**
- **Understanding vs. Generation**: AI can generate code but often lacks deep understanding of business logic and user needs
- **Debugging and Problem-Solving**: Complex debugging and system design still require human intuition and creativity
- **Ethical and Security Considerations**: Human oversight is crucial for security and ethical decision-making
- **Domain Expertise**: Understanding specific business domains and user requirements remains a human skill

#### New Skills for Software Engineers

If learning to code becomes less important, software engineers will need to develop new skills to remain competitive:

**1. AI Tool Proficiency**
- Understanding how to effectively prompt and work with AI coding tools
- Knowing when to use AI-generated code vs. writing custom solutions
- Ability to review and validate AI-generated code

**2. System Architecture and Design**
- High-level system design and architecture planning
- Understanding of distributed systems and microservices
- Knowledge of cloud platforms and infrastructure

**3. Problem-Solving and Critical Thinking**
- Ability to break down complex problems into solvable components
- Understanding of algorithms and data structures
- Analytical thinking for debugging and optimization

**4. Domain Expertise**
- Deep understanding of specific business domains
- Ability to translate business requirements into technical solutions
- Knowledge of industry-specific regulations and standards

**5. Communication and Collaboration**
- Clear communication with stakeholders and non-technical team members
- Ability to work effectively in cross-functional teams
- Documentation and knowledge sharing skills

#### People Skills and AI Competition

The question of whether AI will outperform humans in people skills is particularly interesting. While AI has made significant progress in natural language processing and communication, there are fundamental limitations:

**AI Limitations in People Skills:**
- **Emotional Intelligence**: AI lacks genuine emotional understanding and empathy
- **Context and Nuance**: Human communication involves subtle cues and cultural context that AI may miss
- **Building Trust**: Establishing genuine trust and relationships requires human connection
- **Creative Problem-Solving**: Collaborative problem-solving often requires creative thinking that AI cannot replicate

**Human Advantages:**
- **Emotional Intelligence**: Understanding and responding to human emotions and needs
- **Adaptability**: Quickly adapting to changing situations and requirements
- **Intuition**: Making decisions based on experience and gut feeling
- **Relationship Building**: Creating lasting professional relationships and networks

**The Future of Software Engineering**

The future of software engineering will likely involve a hybrid approach where:
- AI handles routine coding tasks and code generation
- Humans focus on high-level design, problem-solving, and user experience
- Teams become more diverse, including both technical and non-technical members
- Continuous learning and adaptation become essential skills

Software engineers will need to become "AI whisperers" - professionals who can effectively collaborate with AI tools while maintaining the human perspective necessary for creating truly valuable software solutions.

---

## References

- [Git Flow Documentation](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Pull Request Guide](https://docs.github.com/en/pull-requests)
- [Visual Studio Code Git Integration](https://code.visualstudio.com/docs/editor/versioncontrol)
- [AI-Assisted Coding Tools](https://github.com/features/copilot)
- [The Future of Software Development](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai)

---

## Submission
- **File Name**: Assignment4Vickers.md
- **GitHub Repository**: [MSSE640-2025summer](https://github.com/ThomasVickers-Regis/MSSE640-2025summer)
- **Feature Branch Workflow**: Successfully completed with pull request and cleanup
