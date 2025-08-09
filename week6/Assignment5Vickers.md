# Assignment #4 - Git Branching and Workflow

## Objective
This assignment focuses on working with branches and implementing a basic Git Flow workflow. The goal is to understand and practice branch management, feature development, and the pull request process.

## Activity 1: Working with Feature Branches

### Step 1: Create a Feature Branch in Visual Studio Code
First, I opened my project repository in Visual Studio Code and followed these steps:
1. Navigated to the Source Control view (three dots connected by lines icon)
2. Clicked on the current branch name at the bottom-left
3. Selected "+ Create new branch..." from the pop-up menu
4. Named the new branch "feature/assignment4"

[![Step 1: Creating a new branch](./assets/SS1%20git%20branch.png)](./assets/SS1%20git%20branch.png)

### Step 2: Verify Local and Remote Branches
To verify the branch creation and check the status of local and remote branches, I used the following commands:

```bash
git branch
```
This command showed my new branch with an asterisk (*) indicating it as the current working branch.

[![Step 2a: Local branches](./assets/SS1%20git%20branch.png)](./assets/SS1%20git%20branch.png)

```bash
git branch -r
```
This command showed only the remote main branch, as the feature branch hadn't been pushed yet.

[![Step 2b: Remote branches](./assets/SS2%20git%20branch%20r.png)](./assets/SS2%20git%20branch%20r.png)

### Step 3: Commit Changes and Publish the Branch
After making changes to the README.md file:
1. Used the Source Control panel to stage changes
2. Added a descriptive commit message: "week 6 created"
3. Committed the changes
4. Published the branch to GitHub

[![Step 3: Committing and publishing changes](./assets/SS3%20Publish%20branch.png)](./assets/SS3%20Publish%20branch.png)

### Step 4: Create a Pull Request on GitHub
On GitHub:
1. Clicked the "Compare & pull request" button from the yellow notification bar
2. Set the base branch to main and compare branch to feature/assignment4
3. Added a title and description
4. Created the pull request
5. Merged the changes
6. Deleted the remote branch

#### Pull Request Process Screenshots:

1. Opening the Pull Request:
[![Step 4a: Opening pull request](./assets/ss4%20git%20PR.png)](./assets/ss4%20git%20PR.png)

2. Pull Request Created:
[![Step 4b: Pull request created](./assets/SS5%20PR.png)](./assets/SS5%20PR.png)

3. Pull Request Merged:
[![Step 4c: Pull request merged](./assets/ss6%20PR%20created.png)](./assets/ss6%20PR%20created.png)

4. Remote Branch Deleted:
[![Step 4d: Remote branch deleted](./assets/SS7%20PR%20Deleted.png)](./assets/SS7%20PR%20Deleted.png)

**Question: Will the local feature branch still exist?**
Yes, the local feature branch will still exist. Deleting the remote branch on GitHub only removes the branch from the remote repository and has no effect on the local branch on your computer.

### Step 5: Clean Up Local Repository
To clean up the local repository after merging:
1. Updated local metadata:
```bash
git fetch -p
```

2. Switched back to main branch:
```bash
git checkout main
```

3. Pulled the latest changes:
```bash
git pull
```

4. Deleted the local feature branch:
```bash
git branch -d feature/assignment4
```

[![Step 5: Branch cleanup completed](./assets/SS8%20Branch%20Cleanup.png)](./assets/SS8%20Branch%20Cleanup.png)

---

## Advanced Exercises

### Deep Fakes and Software Engineering: Parallels in Verification and Validation

#### Background
For this advanced exercise, I watched the film "Deep Fakes" available at [moondisaster.org](https://moondisaster.org/). This documentary explores the creation and implications of deepfake technology, particularly focusing on the "Moon Disaster" - a fabricated video showing President Nixon announcing the failure of the Apollo 11 moon landing.

#### Experience with the "Moon Disaster" Deepfake

Watching the "Moon Disaster" deepfake was a sobering experience that highlighted the sophisticated nature of modern deepfake technology. The video was remarkably convincing, featuring realistic facial movements, appropriate lighting, and authentic-sounding speech patterns. What made it particularly effective was the attention to historical detail - the video incorporated actual footage from the era, authentic background elements, and Nixon's characteristic speech patterns and mannerisms.

The most striking aspect was how the deepfake managed to maintain consistency across multiple elements: facial expressions matched the emotional content of the speech, the lighting remained consistent throughout the video, and the audio quality matched what would be expected from 1969 recording technology. This level of detail made it difficult to immediately identify as fake, even when I was actively looking for signs of manipulation.

#### Question 1: What makes a deepfake "convincing"? What parallels exist between generating believable deepfakes and generating code that "seems" to work but hasn't been properly tested?

**What Makes Deepfakes Convincing:**

Deepfakes achieve their convincing nature through several key factors:

1. **Surface-Level Authenticity**: Deepfakes excel at replicating visual and auditory patterns that humans expect to see. They can generate realistic facial movements, appropriate lighting, and natural speech patterns that pass casual inspection.

2. **Contextual Consistency**: Effective deepfakes maintain consistency across multiple dimensions - facial expressions match emotional content, lighting remains coherent, and audio quality matches the expected source.

3. **Pattern Recognition Exploitation**: Deepfakes leverage the fact that humans rely heavily on pattern recognition. If enough familiar patterns are present (like Nixon's characteristic gestures), our brains fill in the gaps and accept the overall presentation as authentic.

4. **Selective Detail Focus**: Deepfakes often focus on the most critical elements (face, voice) while being less precise in peripheral details, similar to how humans primarily focus on faces when evaluating authenticity.

**Parallels with Untested Code:**

The parallels between convincing deepfakes and seemingly functional but untested code are striking:

1. **Surface-Level Functionality**: Just as deepfakes can appear realistic at first glance, code can appear to work correctly when tested with basic inputs or common scenarios. Both can pass superficial evaluation while hiding underlying flaws.

2. **Contextual Inconsistencies**: Deepfakes may have subtle inconsistencies (like lighting that doesn't quite match), while untested code may work in expected scenarios but fail with edge cases or unexpected inputs.

3. **Pattern-Based Assumptions**: Both rely on users making assumptions based on familiar patterns. Users assume a realistic-looking video is authentic, just as developers might assume code that handles common cases will handle all cases.

4. **The "Works on My Machine" Problem**: Deepfakes might look convincing in controlled environments, just as code might work perfectly in development but fail in production due to different conditions.

**Real-World Implications:**

In software engineering, this parallel manifests in several dangerous scenarios:

- **Demo Code**: Code that works perfectly in demonstrations but fails under real-world conditions
- **Happy Path Testing**: Systems that only test expected scenarios and miss edge cases
- **Assumption-Based Development**: Code that assumes certain conditions will always be met
- **Superficial Validation**: Systems that pass basic tests but fail under stress or unusual conditions

#### Question 3: What happens when you deploy unverified or poorly validated models? Tie this to real-world harms: misinformation, reputational damage, manipulation. Then relate it back to software engineering — what kinds of harm can occur when you ship code without robust V&V?

**Real-World Harms of Poorly Validated Deepfakes:**

The deployment of unverified deepfakes has caused significant real-world harm:

1. **Misinformation and Public Deception**: Deepfakes have been used to spread false information about political events, creating confusion and undermining public trust in media and institutions.

2. **Reputational Damage**: Individuals have had their reputations damaged by deepfake videos showing them saying or doing things they never did, leading to personal and professional consequences.

3. **Manipulation and Coercion**: Deepfakes have been used for blackmail, fraud, and manipulation, exploiting the difficulty of distinguishing real from fake content.

4. **Erosion of Trust**: The existence of deepfakes has created a "liar's dividend" where legitimate content can be dismissed as fake, undermining trust in authentic media.

**Software Engineering Parallels:**

The same types of harm occur when poorly validated software is deployed:

1. **System Failures and Data Loss**: Software bugs can cause catastrophic failures, data corruption, or system crashes that affect thousands or millions of users.

2. **Security Vulnerabilities**: Unvalidated code can contain security flaws that expose sensitive data or allow unauthorized access, leading to data breaches and privacy violations.

3. **Financial Losses**: Software failures in financial systems can result in incorrect transactions, lost funds, or regulatory violations with significant monetary consequences.

4. **Reputational Damage to Organizations**: Software failures can damage company reputations, leading to loss of customers, investor confidence, and market value.

5. **Safety Risks**: In critical systems (medical devices, transportation, infrastructure), software failures can directly endanger human lives.

**Specific Examples:**

- **Therac-25 Radiation Therapy Machine**: Poor software validation led to radiation overdoses that injured or killed patients
- **Boeing 737 MAX**: Insufficient testing of flight control software contributed to fatal crashes
- **Equifax Data Breach**: A software vulnerability that wasn't properly patched led to the exposure of 147 million people's personal data
- **Knight Capital Trading Bug**: A software glitch caused $440 million in losses in 45 minutes

**The Importance of Robust V&V:**

These examples demonstrate why robust verification and validation are essential:

1. **Comprehensive Testing**: Systems must be tested under realistic conditions, not just ideal scenarios
2. **Edge Case Coverage**: Testing must include unusual inputs, error conditions, and boundary cases
3. **Security Testing**: Code must be evaluated for potential security vulnerabilities
4. **Performance Testing**: Systems must be tested under expected and peak loads
5. **User Acceptance Testing**: Real users must validate that the system meets their needs

**Prevention Strategies:**

To prevent these harms, software engineering teams must:

- Implement comprehensive testing strategies that go beyond basic functionality
- Use automated testing tools to catch issues early
- Conduct thorough code reviews and security audits
- Test in environments that mirror production conditions
- Implement monitoring and logging to detect issues in production
- Have rollback plans and incident response procedures

The parallels between deepfakes and poorly validated software highlight the fundamental importance of thorough verification and validation in any system that can cause real-world harm. Both demonstrate that surface-level evaluation is insufficient and that comprehensive testing is essential for preventing damage to individuals, organizations, and society.

---

## References

- [Git Flow Documentation](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Pull Request Guide](https://docs.github.com/en/pull-requests)
- [Visual Studio Code Git Integration](https://code.visualstudio.com/docs/editor/versioncontrol)
- [Deep Fakes Documentary](https://moondisaster.org/)
- [Software Testing Best Practices](https://www.softwaretestinghelp.com/)
- [Therac-25 Case Study](https://en.wikipedia.org/wiki/Therac-25)
- [Boeing 737 MAX Software Issues](https://en.wikipedia.org/wiki/Boeing_737_MAX_groundings)

---

## Submission
- **File Name**: Assignment5Vickers.md
- **GitHub Repository**: [MSSE640-2025summer](https://github.com/ThomasVickers-Regis/MSSE640-2025summer)
- **Collaboration File**: [Assignment5CollaborationFile.md](./Assignment5CollaborationFile.md)
- **Feature Branch Workflow**: Successfully completed with pull request and cleanup
