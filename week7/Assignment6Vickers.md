# Assignment #6: Working with CI/CD with GitHub Actions

## MSSE640 - Software Security Engineering
**Week 7 Assignment: Continuous Integration/Continuous Deployment with GitHub Actions**

---

## Table of Contents
1. [Objective](#objective)
2. [Prerequisites](#prerequisites)
3. [Activity 1: Research GitHub Actions](#activity-1-research-github-actions)
4. [Activity 2: Create Repository and Sample Code](#activity-2-create-repository-and-sample-code)
5. [Activity 3: Configure GitHub Actions Workflow](#activity-3-configure-github-actions-workflow)
6. [Activity 4: Add New Function and Test](#activity-4-add-new-function-and-test)
7. [Activity 5: Verify Pipeline Execution](#activity-5-verify-pipeline-execution)
8. [Advanced: Code Coverage](#advanced-code-coverage)
9. [References](#references)

---

## Objective

This assignment focuses on implementing Continuous Integration/Continuous Deployment (CI/CD) using GitHub Actions. Students will learn to:
- Write a simple Python program with unit tests
- Configure GitHub Actions workflows
- Automate testing processes
- Understand CI/CD best practices

---

## Prerequisites

- GitHub account
- Basic knowledge of Python
- Understanding of unit testing concepts
- Git command line or GitHub Desktop

---

## Activity 1: Research GitHub Actions

### What are GitHub Actions?

GitHub Actions is a continuous integration and continuous deployment (CI/CD) platform that allows you to automate your build, test, and deployment pipeline. It enables you to create workflows that automatically build and test every pull request to your repository, or deploy merged pull requests to production.

### Key Concepts:

1. **Workflows**: YAML files that define automated processes
2. **Events**: Triggers that start workflows (push, pull request, etc.)
3. **Jobs**: Groups of steps that run on the same runner
4. **Steps**: Individual tasks that can run commands or actions
5. **Actions**: Reusable units of code for common tasks
6. **Runners**: Servers that run your workflows

### Benefits of CI/CD:

- **Automated Testing**: Tests run automatically on every code change
- **Early Bug Detection**: Issues are caught before they reach production
- **Consistent Builds**: All developers use the same build environment
- **Faster Feedback**: Immediate results on code quality
- **Reduced Manual Work**: Automation reduces human error

---

## Activity 2: Create Repository and Sample Code

### Step 1: Create a New Repository

1. Go to GitHub and create a new repository named `calculator-ci-cd`
2. Make it public for easier sharing
3. Initialize with a README file

### Step 2: Create the Calculator Program

Create a simple calculator program with basic mathematical operations:

**File: `calculator.py`**
```python
class Calculator:
    """A simple calculator class with basic mathematical operations."""
    
    def add(self, a: float, b: float) -> float:
        """Add two numbers."""
        if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
            raise ValueError("Both arguments must be numbers")
        return a + b
    
    def subtract(self, a: float, b: float) -> float:
        """Subtract b from a."""
        if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
            raise ValueError("Both arguments must be numbers")
        return a - b
    
    def multiply(self, a: float, b: float) -> float:
        """Multiply two numbers."""
        if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
            raise ValueError("Both arguments must be numbers")
        return a * b
    
    def divide(self, a: float, b: float) -> float:
        """Divide a by b."""
        if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
            raise ValueError("Both arguments must be numbers")
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b
    
    def power(self, base: float, exponent: float) -> float:
        """Raise base to the power of exponent."""
        if not isinstance(base, (int, float)) or not isinstance(exponent, (int, float)):
            raise ValueError("Both arguments must be numbers")
        return base ** exponent
```

### Step 3: Create Unit Tests

**File: `test_calculator.py`**
```python
import unittest
from calculator import Calculator

class TestCalculator(unittest.TestCase):
    """Test cases for the Calculator class."""
    
    def setUp(self):
        """Set up test fixtures before each test method."""
        self.calc = Calculator()
    
    def test_add(self):
        """Test addition operation."""
        self.assertEqual(self.calc.add(3, 5), 8)
        self.assertEqual(self.calc.add(-1, 1), 0)
        self.assertEqual(self.calc.add(0, 0), 0)
        self.assertEqual(self.calc.add(3.5, 2.5), 6.0)
    
    def test_subtract(self):
        """Test subtraction operation."""
        self.assertEqual(self.calc.subtract(5, 3), 2)
        self.assertEqual(self.calc.subtract(1, 1), 0)
        self.assertEqual(self.calc.subtract(0, 5), -5)
        self.assertEqual(self.calc.subtract(3.5, 1.5), 2.0)
    
    def test_multiply(self):
        """Test multiplication operation."""
        self.assertEqual(self.calc.multiply(3, 4), 12)
        self.assertEqual(self.calc.multiply(-2, 3), -6)
        self.assertEqual(self.calc.multiply(0, 5), 0)
        self.assertEqual(self.calc.multiply(2.5, 2), 5.0)
    
    def test_divide(self):
        """Test division operation."""
        self.assertEqual(self.calc.divide(6, 2), 3)
        self.assertEqual(self.calc.divide(5, 2), 2.5)
        self.assertEqual(self.calc.divide(0, 5), 0)
        self.assertEqual(self.calc.divide(-6, 2), -3)
    
    def test_divide_by_zero(self):
        """Test division by zero raises ValueError."""
        with self.assertRaises(ValueError):
            self.calc.divide(5, 0)
    
    def test_power(self):
        """Test power operation."""
        self.assertEqual(self.calc.power(2, 3), 8)
        self.assertEqual(self.calc.power(5, 0), 1)
        self.assertEqual(self.calc.power(2, -1), 0.5)
        self.assertEqual(self.calc.power(4, 0.5), 2.0)
    
    def test_invalid_inputs(self):
        """Test that invalid inputs raise ValueError."""
        with self.assertRaises(ValueError):
            self.calc.add("3", 5)
        with self.assertRaises(ValueError):
            self.calc.subtract(3, "5")
        with self.assertRaises(ValueError):
            self.calc.multiply("3", 5)
        with self.assertRaises(ValueError):
            self.calc.divide(3, "5")
        with self.assertRaises(ValueError):
            self.calc.power("3", 5)

if __name__ == '__main__':
    unittest.main()
```

### Step 4: Create Requirements File

**File: `requirements.txt`**
```
pytest==7.4.3
pytest-cov==4.1.0
```

### Step 5: Create README

**File: `README.md`**
```markdown
# Calculator CI/CD Project

A simple calculator application demonstrating CI/CD with GitHub Actions.

## Features

- Basic mathematical operations (add, subtract, multiply, divide, power)
- Input validation
- Comprehensive unit tests
- Automated CI/CD pipeline

## Installation

```bash
pip install -r requirements.txt
```

## Usage

```python
from calculator import Calculator

calc = Calculator()
result = calc.add(5, 3)  # Returns 8
```

## Testing

Run tests locally:
```bash
# Navigate to the week7 directory first
cd week7

# Run tests with pytest
python -m pytest test_calculator.py -v

# Or run tests with unittest directly
python -m unittest test_calculator.py -v
```

## CI/CD

This project uses GitHub Actions for continuous integration. Tests run automatically on every push and pull request.
```

---

## Activity 3: Configure GitHub Actions Workflow

### Step 1: Create Workflow Directory

Create the following directory structure:
```
.github/
└── workflows/
    └── ci.yml
```

### Step 2: Create the CI Workflow

**File: `.github/workflows/ci.yml`**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        python-version: [3.8, 3.9, "3.10", "3.11"]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}
    
    - name: Cache pip dependencies
      uses: actions/cache@v3
      with:
        path: ~/.cache/pip
        key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
        restore-keys: |
          ${{ runner.os }}-pip-
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r week7/requirements.txt
    
    - name: Run tests with pytest
      run: |
        python -m pytest week7/test_calculator.py -v
    
    - name: Run tests with coverage
      run: |
        python -m pytest week7/test_calculator.py --cov=week7.calculator --cov-report=xml --cov-report=html
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage.xml
        flags: unittests
        name: codecov-umbrella
        fail_ci_if_error: false

  lint:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: "3.11"
    
    - name: Install flake8
      run: |
        python -m pip install --upgrade pip
        pip install flake8
    
    - name: Lint with flake8
      run: |
        flake8 week7/calculator.py week7/test_calculator.py --count --select=E9,F63,F7,F82 --show-source --statistics
        flake8 week7/calculator.py week7/test_calculator.py --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
```

---

## Activity 4: Add New Function and Test

### Step 1: Add Square Root Function

Add a new method to the Calculator class:

**Update `calculator.py`**
```python
import math

class Calculator:
    """A simple calculator class with basic mathematical operations."""
    
    # ... existing methods ...
    
    def square_root(self, number: float) -> float:
        """Calculate the square root of a number."""
        if not isinstance(number, (int, float)):
            raise ValueError("Argument must be a number")
        if number < 0:
            raise ValueError("Cannot calculate square root of negative number")
        return math.sqrt(number)
```

### Step 2: Add Test for New Function

**Update `test_calculator.py`**
```python
    def test_square_root(self):
        """Test square root operation."""
        self.assertEqual(self.calc.square_root(4), 2.0)
        self.assertEqual(self.calc.square_root(9), 3.0)
        self.assertEqual(self.calc.square_root(0), 0.0)
        self.assertEqual(self.calc.square_root(2), math.sqrt(2))
    
    def test_square_root_negative(self):
        """Test square root of negative number raises ValueError."""
        with self.assertRaises(ValueError):
            self.calc.square_root(-4)
    
    def test_square_root_invalid_input(self):
        """Test square root with invalid input raises ValueError."""
        with self.assertRaises(ValueError):
            self.calc.square_root("4")
```

---

## Activity 5: Verify Pipeline Execution

### Step 1: Push Code to Repository

```bash
git add .
git commit -m "Initial commit: Calculator with CI/CD setup"
git push origin main
```

### Step 2: Check GitHub Actions

1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. You should see the workflow running
4. Monitor the progress and check for any failures

### Step 3: Verify Test Results

The workflow should:
- Run tests on multiple Python versions
- Generate coverage reports
- Perform linting checks
- Show green checkmarks for successful runs

---

## Advanced: Code Coverage

### Step 1: Install Coverage Tools

```bash
pip install coverage
```

### Step 2: Run Coverage Locally

```bash
# Navigate to week7 directory
cd week7

# Run coverage
coverage run -m pytest test_calculator.py
coverage report
coverage html
```

### Step 3: View Coverage Report

Open `htmlcov/index.html` in your browser to see detailed coverage information.

---

## Screenshots and Results

### GitHub Actions Workflow Running
![GitHub Actions Workflow](./assets/github-actions-workflow.png)

### Test Results
![Test Results](Test%20Ran.png)

### Coverage Report
![Coverage Report](./assets/coverage-report.png)

---

## Key Learning Outcomes

1. **CI/CD Concepts**: Understanding of continuous integration and deployment
2. **GitHub Actions**: Practical experience with workflow automation
3. **Testing Automation**: Automated test execution on code changes
4. **Code Quality**: Integration of linting and coverage tools
5. **Best Practices**: Following industry standards for CI/CD

---

## Troubleshooting

### Common Issues:

1. **Workflow Not Triggering**: Check branch names and event triggers
2. **Test Failures**: Review test output and fix failing tests
3. **Dependency Issues**: Verify requirements.txt and Python versions
4. **Permission Errors**: Ensure repository has proper access settings

### Debugging Tips:

- Check workflow logs for detailed error messages
- Test locally before pushing to GitHub
- Use `act` tool to test workflows locally
- Review GitHub Actions documentation for specific issues

---

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Python Testing with pytest](https://docs.pytest.org/)
- [Code Coverage with coverage.py](https://coverage.readthedocs.io/)
- [CI/CD Best Practices](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)
- [GitHub Actions Examples](https://github.com/actions/starter-workflows)

---

## Submission

- **Repository URL**: [https://github.com/yourusername/calculator-ci-cd](https://github.com/yourusername/calculator-ci-cd)
- **Workflow Status**: All tests passing
- **Coverage Report**: Available in repository
- **Documentation**: Complete README and inline comments

**Note**: This assignment will be presented in class or submitted as a video demonstration showing the complete CI/CD pipeline in action. Pushed. 