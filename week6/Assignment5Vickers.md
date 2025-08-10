# Assignment 5 Collaboration File

## Team C Collaboration Instructions

**Team Members:** (previous class)
- Spencer
- Ben  
- Thomas (Repository Owner)
- Nigel

This file is designed for team collaboration using Git workflow. Each team member will follow these steps to contribute to their teammates' repositories.

---

## Step 1: Create Your Own Collaboration File

**Action**: Create a new file in your repository called "Assignment5CollaborationFile.md"

**Instructions**:
1. In your local repository, create a new file named `Assignment5CollaborationFile.md`
2. Add a basic header and description (like this file)
3. Commit and push this file to your main branch
4. Share your repository URL with your team members

- **Thomas**: https://github.com/ThomasVickers-Regis/msse642-2025summer.git

---

## Step 2: Clone Your Teammates' Repositories

**Action**: Each member will clone the repositories of other team members

**Instructions**:
1. Get the repository URLs from your teammates (see above)
2. Open your terminal/command prompt
3. Navigate to a directory where you want to store the cloned repositories
4. Run the clone command for each teammate's repository:
   ```bash
   git clone [teammate-repository-url]
   ```
5. Verify the clone was successful by checking the directory contents

**Example for Team C**:
```bash
git clone https://github.com/ThomasVickers-Regis/msse642-2025summer.git
git clone https://github.com/SpencerLamphere/msse642-2025summer
git clone [Ben's-repo-url]
git clone [Nigel's-repo-url]
```

---

## Step 3: Create a Local Branch with Your Name

**Action**: Make a local branch that is named with your name

**Instructions**:
1. Navigate into the cloned repository directory
2. Check the current branch: `git branch`
3. Create and switch to a new branch with your name:
   ```bash
   git checkout -b [your-name]
   ```
4. Verify you're on the new branch: `git branch`

**Example for Team C**:
```bash
cd msse642-2025summer
git checkout -b spencer
# or
git checkout -b ben
# or
git checkout -b nigel
```

---

## Step 3.5: Update Remote URL (If Needed)

**Action**: Update the remote URL to point to your fork if you don't have write access

**Instructions**:
1. After cloning, check your remote configuration:
   ```bash
   git remote -v
   ```
2. If you get permission errors when pushing, you need to update remote to your fork:
   - Update the remote to point to your fork:
   ```bash
   git remote set-url origin https://github.com/[your-username]/[repository-name].git
   ```
3. Verify the remote is updated:
   ```bash
   git remote -v
   ```

**Example**:
```bash
# If you cloned Ben's repo but don't have write access
git remote set-url origin https://github.com/ThomasVickers-Regis/msse642.git
```
```bash
git remote -v
#should show your forks address as the remote address
origin  https://github.com/ThomasVickers-Regis/msse642.git (fetch)
origin  https://github.com/ThomasVickers-Regis/msse642.git (push)
```

---

## Step 4: Make Changes, Commit, and Publish the Branch

**Action**: Make changes to the file, commit, and publish the branch

**Instructions**:
1. Open the `Assignment5CollaborationFile.md` file
2. Add your name and a brief message to the file (see format below)
3. Save the file
4. Stage your changes: `git add Assignment5CollaborationFile.md`
5. Commit your changes with a descriptive message:
   ```bash
   git commit -m "Add [your-name] to collaboration file"
   ```
6. Push your branch to the remote repository:
   ```bash
   git push origin [your-branch-name]
   ```

**Example File Addition**:
```markdown
## Team Members Who Have Contributed

- **Thomas Vickers** - Repository owner
- **Spencer** - Added on [date]
- **Ben** - Added on [date]
- **Nigel** - Added on [date]
```

---

## Step 5: Submit a Pull Request

**Action**: Submit a pull request to merge your branch

**Instructions**:
1. Go to the repository on GitHub/GitLab
2. You should see a notification about your recently pushed branch
3. Click "Compare & pull request" or "Create pull request"
4. Fill in the pull request details:
   - **Title**: "Add [your-name] to collaboration file"
   - **Description**: Brief description of your changes
5. Click "Create pull request"

**Example Pull Request for Team C**:
- **Title**: "Add Spencer to collaboration file"
- **Description**: "Added my name to the team members list in the collaboration file as part of Assignment 5."

## Screenshot

### PR created on forked branch
![Ben PR Header](./assets/SS1%20Ben%20PR%20Header.png)

### PR submitted to teammate's repository
![PR created Ben](./assets/SS2%20PR%20created%20Ben.png)

---

## Step 6: Review and Merge Pull Requests

**Action**: The owner of the repo accepts or rejects the pull request

**Instructions** (for repository owners):
1. Go to the "Pull requests" tab in your repository
2. Review each pull request:
   - Check the changes made
   - Ensure the branch name follows the naming convention
   - Verify the commit message is descriptive
3. If the changes look good:
   - Click "Merge pull request"
   - Confirm the merge
   - Delete the branch (optional)
4. If changes are needed:
   - Add comments requesting modifications
   - Wait for the contributor to update the PR

---

## Team Members Who Have Contributed

*This section will be populated as team members complete their contributions*

- **Thomas Vickers** - Repository owner
- **Spencer** – Added on June 24, 2025

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
