# Activity 1: Research Git

## Overview
This document provides a comprehensive overview of Git version control system, covering its architecture, core concepts, and workflow.

---

## 1. Types of Version Control Systems

### What type is Git?

Git is a **Distributed Version Control System (DVCS)**. Let's explore the three main types of version control systems:

### Local Version Control Systems (LVCS)
- **Storage**: Files stored on a single local device
- **Version Control**: Managed through a local database
- **Workflow**: Developers pull files, make modifications, then store them back
- **Limitations**: 
  - Difficult to manage conflicts with multiple developers
  - No central coordination point
  - Risk of losing all version history if local device is lost
- **Example**: Revision Control System (RCS)

![Local Version Control](https://git-scm.com/book/en/v2/images/local.png)

### Centralized Version Control Systems (CVCS)
- **Storage**: Single repository on a central server
- **Workflow**: Developers pull from and push to one central location
- **Features**: File checkout mechanisms, sometimes with locking to prevent conflicts
- **Limitations**:
  - Single point of failure (server dependency)
  - Difficult to work offline
  - Risk of losing previous versions if server fails
- **Examples**: Subversion (SVN), Perforce

![Centralized Version Control](https://git-scm.com/book/en/v2/images/centralized.png)

### Distributed Version Control Systems (DVCS) - Git's Type
- **Architecture**: Server + local machines with full repository copies
- **Key Advantage**: Each local copy is a complete repository with full project history
- **Benefits**:
  - Work offline (commit, branch switching without network)
  - Better version rollbacks
  - Built-in backups of entire project history
  - Enhanced developer control and flexibility
- **Conflict Resolution**: Compare and merge conflicts when pushing to server
- **Status**: Git is the most widely used DVCS

![Distributed Version Control](https://git-scm.com/book/en/v2/images/distributed.png)

**Reference**: [Git - About Version Control](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

---

## 2. Git Snapshots

Git fundamentally treats data as a series of **snapshots** rather than tracking file-by-file changes.

### How Snapshots Work
- **Commit Process**: Git takes a "picture" of all tracked files at commit time
- **Storage**: References stored in repository's object database
- **State Management**: Snapshots relate to:
  - **HEAD**: Pointer to current commit/branch
  - **Index**: Staging Area
  - **Working Directory**: Active files

### Git Commands and Snapshots
Most Git commands compare file states between these areas or move snapshots between states:
- Working directory vs. staging area
- Staging area vs. last commit
- Moving snapshots from staging to commit

### Efficiency
While Git uses deltas internally (especially in packfiles) to save space, the core concept remains based on complete state snapshots with each commit.

![Git Reset Workflow](https://git-scm.com/book/en/v2/images/reset-workflow.png)

**Reference**: [Git Tools - Reset Demystified](https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified)

---

## 3. Repository Concepts

### What is a Repository?
A **repository** (or repo) is the central storage location containing:
- All project files and their complete history
- Commits, branches, tags
- All Git metadata for version management

### Remote vs. Local Repositories

#### Remote Repository
- **Location**: Server/cloud storage
- **Purpose**: Shared team storage
- **Function**: Central coordination point for collaboration

#### Local Repository
- **Location**: Hidden `.git` directory on your machine
- **Purpose**: Your working copy with full project history
- **Function**: Create file instances in Git's tracked states

### Synchronization
- **Push**: Send committed changes from local to remote
- **Pull**: Update local copy with changes from remote
- **Result**: Synchronized repository history across team

---

## 4. Working Directory

The **working directory** (or working tree) is:
- The actual directory on your file system containing project files
- Where you pulled files to your local machine
- A single checkout of one version (commit) from the repository

### What You Do Here
- Make edits to files
- Add new files
- Delete files
- Work with untracked or modified files

### Important Notes
- Changes here are initially untracked or "modified" by Git
- Changes don't affect other developers until explicitly staged
- Changes don't impact repository history until committed

---

## 5. Staging Area

The **Staging Area** (also called the **Index** or Index Tree) is a crucial intermediate step between the working directory and repository.

### Purpose
- Stores information about what will go into your next commit
- Located within the `.git` directory
- Allows careful curation of changes for logical commit groups

### Workflow
1. Use `git add` to move changes from working directory to staging
2. Review and organize changes before committing
3. Create logical groups of modifications

### Additional Uses
- Temporary save state for quick branch switching
- Pre-commit staging for changes not ready for permanent commit
- Changes here are considered "staged changes"

---

## 6. Commit

A **commit** is the operation of saving a snapshot from the Staging Area to your local Git repository's history.

### Commit Components
Each commit is an immutable object containing:
- **Author and Committer**: User information
- **Date and Time**: When the commit was made
- **Commit Message**: Description of changes
- **SHA-1 Hash**: Unique 40-character identifier (checksum)
- **File Snapshot**: Complete state of tracked files
- **Parent Pointers**: Links to previous commit(s)

### Commit Structure
- Forms a Directed Acyclic Graph (DAG) of project history
- Enables rollback to any previous state
- Provides complete project timeline

### Analogy
Think of commits like save states in video games:
- You can return to previous "games" (commits)
- Rolling back requires careful handling to avoid data loss
- Use `git push` to share commits with remote repository

---

## 7. Git Architecture and Flow

The following diagram illustrates Git's overall architecture and workflow:

![Git Architecture Overview](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fuser-images.githubusercontent.com%2F83613651%2F153767766-3c16ba10-75d2-4c28-8598-0163f8013965.png)

**Reference**: [Git: An Overview at High Level](https://dev.to/vinothmohan/git-an-overview-at-high-level-2ckk)

---

## Summary

Git's distributed architecture provides developers with:
- **Flexibility**: Work offline with full repository capabilities
- **Safety**: Built-in backups and version history
- **Collaboration**: Efficient conflict resolution and team coordination
- **Control**: Granular staging and commit management

The snapshot-based approach, combined with the three-state system (Working Directory → Staging Area → Repository), creates a powerful and reliable version control system that has become the industry standard for software development.
