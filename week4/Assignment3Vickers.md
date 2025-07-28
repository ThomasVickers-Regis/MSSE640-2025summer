# Assignment #3: Git Command Line Basics

## MSSE640 - Software Security Engineering
**Week 4 Assignment: Git Command Line Interface and Advanced LLM Challenges**

---

## Table of Contents
1. [Configuration](#configuration)
2. [Working with a Local Repo](#working-with-a-local-repo)
3. [Working with a Remote](#working-with-a-remote)
4. [Branches](#branches)
5. [Advanced Exercises](#advanced-exercises)
6. [References](#references)

---

## Configuration

### 1. What are the commands to configure your user.name and your user.email? Should this be configured globally or in your repo? Why or why not?

```bash
# Global configuration
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Local configuration (for specific repo)
git config user.name "Your Name (for this repo)"
git config user.email "your.repo.email@example.com"
```

Configuring global or local depends if you work on more than one project on your computer. If you use your computer for only your projects then global is a good way to add your account to all of your projects. If you work with other organizations or with other accounts and need to switch its better to set them locally for each repo/branch.

![Git config](./assets/SS1%20gitconfig.png)
![Git config](./assets/SS1%20gitconfig2.png)

### 2. How do you configure the core editor for git?

```bash
git config --global core.editor "code --wait"
```

### 3. How do you view your global config and your local (for the repo) config?

```bash
# View global config
git config --global --list

# View local config
git config --local --list
```

---

## Working with a Local Repo

### 4. What are the steps to create a new local repo via the CLI?

```bash
# Create and navigate to directory
mkdir my-new-repo
cd my-new-repo

# Initialize repository
git init
```

![Git init](./assets/SS3%20git%20init.png)

### 5. How do you clone a repo and what's the difference between cloning and creating a new repo from scratch? Practice cloning a public repo from somewhere.

```bash
git clone https://github.com/octocat/Spoon-Knife.git
```

Git init is used on a blank project to get it ready to push up to github. Git clone is used to pull down existing repos onto your machine.

![Git Clone](./assets/SS4%20-%20VSC%20class%20workstation.png)

### 6. How do you look at the status of your repo? What information does this give you?

```bash
git status
```

Git status shows you the branch you are on and any staged or unstaged changes on that working branch.

![Git status](./assets/SS%20git%20status.png)

### 7. How do you stage changes to your local repo in preparation for a commit?

```bash
# Stage specific file
git add my_file.txt

# Stage all changes
git add .

# Stage modified files only
git add -u
```

### 8. How do you commit changes to your local repo?

```bash
git commit -m "Your descriptive commit message here"
```

![git commit](./assets/git%20add.png)

### 9. Include an example of a file that will allow you to "ignore" files in your repo. What kinds of files should not be part of your version control?

```gitignore
# Log files
*.log
logs/

# Operating System files
.DS_Store
Thumbs.db

# Build artifacts
/build/
/dist/
*.o
*.pyc
*.class

# Dependency directories
node_modules/
vendor/

# Environment variables
.env
.env.local

# IDE and editor files
.vscode/
.idea/
*.swp
```

Any file that contains sensitive data relating API keys, database credentials, or secrets. Generated files, dependency directories, or user specific files.

### 10. When files are under version control, you can't delete them using the OS commands. How do you delete files using git?

```bash
# Delete file and stage deletion
git rm filename.txt

# Remove from Git but keep locally
git rm --cached sensitive_data.txt
```

---

## Working with a Remote

### 11. How do you view the remote repo that is associated with your local repo?

```bash
git remote -v
```

![git remote](./assets/SS%20git%20remote.png)

### 12. What is the function of the git fetch command?

```bash
git fetch origin
```

![git fetch](./assets/git%20fetch.png)

Git fetch is used to pull down changes made by other users without merging them into your local branch.

### 13. What is the difference between fetch and pull? Practice using both and show the results.

```bash
# Fetch
git fetch origin

# Pull
git pull origin main
```

Git pull does what fetch does but then also merges those changes into your local branch. If there is any conflicts it will highlight them and allow you to resolve any conflicts before finishing the merge.

### 14. Make some changes in your repo and using the command line to sync those changes with your remote repo. Show the results.

```bash
# Stage changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push origin main
```

![git push](./assets/git%20add.png)

---

## Branches

### 15. How do you view the local and the remote branches for your repositories?

```bash
# View local branches
git branch

# View all branches (local and remote)
git branch -a
```

![git branch](./assets/git%20branch.png)

### 16. View the local branches and create a new branch. Look again. Show before and after.

```bash
# View branches before
git branch

# Create new branch
git branch feature/user-profile

# View branches after
git branch
```

![git branch creation](./assets/git%20branch2.png)

### 17. What are different ways to switch to a new branch?

```bash
# Method 1: Using switch
git switch feature/user-profile

# Method 2: Using checkout
git checkout feature/user-profile

# Method 3: Create and switch in one command
git switch -c another-new-branch
# OR
git checkout -b another-new-branch
```

### 18. Delete your local branch without pushing to a remote or merging to your main branch. Show that it's gone.

```bash
# Delete branch
git branch -D feature/user-profile

# Verify branch is gone
git branch
```

![git branch deletion](./assets/git%20branch3.png)

---

## Advanced Exercises

### Easy Problems That Are Hard for LLMs

Large Language Models (LLMs) have demonstrated remarkable capabilities in many domains, yet they continue to struggle with seemingly simple problems that humans find trivial. This paradox reveals fundamental limitations in their architecture and understanding.

#### Mathematical Reasoning and Basic Arithmetic
Despite their training on vast amounts of mathematical data, LLMs often fail at basic arithmetic operations, especially when dealing with large numbers or multi-step calculations. For example, asking an LLM to multiply two large numbers or perform long division frequently results in incorrect answers. This is particularly striking because these are deterministic operations with clear, unambiguous answers.

The difficulty stems from the fact that LLMs are trained to predict the next token based on patterns in text, not to perform actual mathematical computation. While they can recognize mathematical notation and generate plausible-looking solutions, they lack the ability to execute the underlying algorithms that humans use for calculation. This limitation persists even in models specifically fine-tuned on mathematical problems, suggesting that the fundamental architecture may not be suited for precise numerical reasoning.

#### Spatial Reasoning and Visual Understanding
LLMs struggle with spatial reasoning tasks that require understanding of physical relationships, object permanence, and spatial transformations. For instance, when asked to describe what happens when a ball is placed behind a box and then the box is moved, many LLMs fail to maintain the correct spatial relationship. This is because their training data consists primarily of text, which lacks the rich spatial information that humans acquire through direct interaction with the physical world.

Even when provided with visual inputs through multimodal models, LLMs often fail to understand basic spatial concepts like occlusion, perspective, or object relationships. This limitation suggests that true spatial reasoning may require different architectural approaches than those currently used in language models.

#### Temporal Reasoning and Causality
LLMs frequently struggle with temporal reasoning and understanding cause-and-effect relationships, especially when they involve complex sequences of events or counterfactual scenarios. For example, asking an LLM to reason about what would have happened if a historical event had occurred differently often results in inconsistent or illogical responses.

This difficulty arises because LLMs are trained on static text data rather than experiencing events as they unfold over time. They lack the ability to model dynamic processes or understand how actions in the present affect future states. This limitation is particularly evident in tasks requiring planning, prediction, or understanding of complex systems with multiple interacting components.

#### What This Tells Us About LLM Capabilities

These limitations reveal that LLMs excel at pattern recognition and text generation but struggle with tasks requiring:
- **Algorithmic computation**: Precise mathematical operations
- **Spatial reasoning**: Understanding physical relationships and transformations
- **Temporal modeling**: Understanding cause-and-effect over time
- **Abstract reasoning**: Applying logical principles to novel situations

The persistence of these limitations despite years of intensive research and development suggests that current LLM architectures may be approaching fundamental boundaries. While continued improvements in training data, model size, and fine-tuning techniques may yield incremental gains, truly solving these problems may require fundamentally different approaches, such as hybrid systems that combine language models with specialized modules for mathematical computation, spatial reasoning, or causal modeling.

This analysis suggests that while LLMs will continue to improve and find new applications, they may not be the optimal solution for all types of reasoning tasks. The future of AI may lie in developing systems that can intelligently combine the strengths of language models with other specialized computational approaches.

---

## References
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Understanding LLM Limitations](https://arxiv.org/abs/2303.08774)

---

## Submission
- [Assignment #3 Vickers](./Assignment3Vickers.md)
- Posted link to GitHub repo in Slack channel #github-project
