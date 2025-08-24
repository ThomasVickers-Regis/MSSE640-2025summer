# Selenium WebDriver Learning Guide
## Complete Guide to Automated Web Testing

### MSSE640 - Software Security Engineering
**Week 8: Comprehensive Selenium Tutorial**

---

## Table of Contents
1. [Introduction to Selenium](#introduction-to-selenium)
2. [Setting Up Your Environment](#setting-up-your-environment)
3. [Understanding WebDriver](#understanding-webdriver)
4. [Page Object Model (POM)](#page-object-model-pom)
5. [Element Locators and Selectors](#element-locators-and-selectors)
6. [Test Framework Architecture](#test-framework-architecture)
7. [Real-World Test Examples](#real-world-test-examples)
8. [Best Practices and Patterns](#best-practices-and-patterns)
9. [Advanced Concepts](#advanced-concepts)
10. [Troubleshooting and Debugging](#troubleshooting-and-debugging)

---

## Introduction to Selenium

### What is Selenium WebDriver?

Selenium WebDriver is a powerful tool for automating web browsers. It allows you to:
- **Control browsers programmatically** - Open, navigate, and interact with web pages
- **Simulate user actions** - Click buttons, fill forms, scroll pages
- **Extract information** - Read text, get attributes, capture screenshots
- **Validate functionality** - Test that applications work as expected

### Why Use Selenium?

1. **Automation**: Replace manual testing with automated scripts
2. **Consistency**: Run the same tests repeatedly without human error
3. **Speed**: Execute tests much faster than manual testing
4. **Coverage**: Test multiple scenarios and edge cases
5. **Regression Testing**: Ensure new changes don't break existing functionality

### How Selenium Works

```
Your Test Script → Selenium WebDriver → Browser Driver → Web Browser
```

1. **Test Script**: Your Python code that describes what to test
2. **WebDriver**: The Selenium library that translates your commands
3. **Browser Driver**: ChromeDriver, GeckoDriver, etc. that controls the browser
4. **Web Browser**: Chrome, Firefox, Safari, etc. that displays the website

---

## Setting Up Your Environment

### Prerequisites

1. **Python 3.8+**: The programming language we'll use
2. **Chrome Browser**: The web browser we'll automate
3. **pip**: Python package manager

### Installation Steps

```bash
# Install Selenium
pip install selenium

# Install WebDriver Manager (automatically downloads browser drivers)
pip install webdriver-manager

# Install Pytest (testing framework)
pip install pytest
```

### Project Structure

```
week8/
├── selenium_tests/
│   ├── __init__.py
│   ├── conftest.py                 # Pytest configuration
│   ├── test_cymbal_shops.py        # E-commerce tests
│   ├── test_triangle_classifier.py # Mathematical app tests
│   └── page_objects/
│       ├── __init__.py
│       ├── cymbal_shops_page.py    # Page Object for e-commerce
│       └── triangle_classifier_page.py # Page Object for triangle app
├── requirements.txt
└── README.md
```

---

## Understanding WebDriver

### Basic WebDriver Setup

Let's look at how we set up WebDriver in our tests:

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

def setup_driver():
    """Setup Chrome WebDriver with basic options."""
    # 1. Configure Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run without GUI
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    # 2. Download and setup ChromeDriver automatically
    driver_path = ChromeDriverManager().install()
    
    # 3. Create WebDriver instance
    driver = webdriver.Chrome(executable_path=driver_path, options=chrome_options)
    
    # 4. Set implicit wait (wait for elements to appear)
    driver.implicitly_wait(10)
    
    return driver
```

### Key Concepts Explained

#### 1. **Chrome Options**
```python
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run browser in background
chrome_options.add_argument("--no-sandbox")  # Security setting for CI/CD
chrome_options.add_argument("--window-size=1920,1080")  # Set window size
```

#### 2. **WebDriver Manager**
```python
from webdriver_manager.chrome import ChromeDriverManager
driver_path = ChromeDriverManager().install()
```
- Automatically downloads the correct ChromeDriver version
- Handles version compatibility issues
- Manages driver updates

#### 3. **Implicit Wait**
```python
driver.implicitly_wait(10)  # Wait up to 10 seconds for elements
```
- Tells WebDriver to wait for elements to appear
- Reduces "Element not found" errors
- Makes tests more reliable

### Basic WebDriver Operations

```python
# Navigate to a website
driver.get("https://example.com")

# Get page title
title = driver.title

# Get current URL
current_url = driver.current_url

# Navigate back/forward
driver.back()
driver.forward()

# Refresh page
driver.refresh()

# Close browser
driver.quit()
```

---

## Page Object Model (POM)

### What is Page Object Model?

Page Object Model is a design pattern that:
- **Encapsulates page elements** and actions in classes
- **Separates test logic** from page interaction logic
- **Makes tests more maintainable** and reusable
- **Reduces code duplication**

### Structure of a Page Object

Let's examine our `TriangleClassifierPage` class:

```python
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TriangleClassifierPage:
    """Page Object Model for Triangle Classifier application."""
    
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)  # Explicit wait
        self.base_url = "https://msse-640-2025summer.vercel.app/"
    
    # Navigation methods
    def navigate_to_app(self):
        """Navigate to Triangle Classifier application."""
        self.driver.get(self.base_url)
    
    # Element getter methods
    def get_side_a_input(self):
        """Get the Side A input field."""
        return self.driver.find_element(By.ID, "sideA")
    
    def get_side_b_input(self):
        """Get the Side B input field."""
        return self.driver.find_element(By.ID, "sideB")
    
    def get_side_c_input(self):
        """Get the Side C input field."""
        return self.driver.find_element(By.ID, "sideC")
    
    # Action methods
    def input_sides(self, side_a, side_b, side_c):
        """Input triangle side lengths."""
        side_a_input = self.get_side_a_input()
        side_b_input = self.get_side_b_input()
        side_c_input = self.get_side_c_input()
        
        # Clear existing values
        side_a_input.clear()
        side_b_input.clear()
        side_c_input.clear()
        
        # Input new values
        side_a_input.send_keys(str(side_a))
        side_b_input.send_keys(str(side_b))
        side_c_input.send_keys(str(side_c))
    
    def classify_triangle(self):
        """Click classify button."""
        classify_button = self.driver.find_element(By.CSS_SELECTOR, "button")
        classify_button.click()
    
    # Result methods
    def get_result_text(self):
        """Get the classification result text."""
        result_element = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".text-center"))
        )
        return result_element.text
```

### Benefits of Page Object Model

1. **Maintainability**: If page elements change, you only update the Page Object
2. **Reusability**: Multiple tests can use the same Page Object
3. **Readability**: Test methods read like natural language
4. **Separation of Concerns**: Test logic separate from page interaction logic

---

## Element Locators and Selectors

### Types of Element Locators

Selenium provides several ways to find elements on a page:

#### 1. **ID Selector** (Most Reliable)
```python
# Find element by ID
element = driver.find_element(By.ID, "sideA")
```
- **Use when**: Element has a unique ID
- **Example**: `<input id="sideA" type="text">`

#### 2. **CSS Selector** (Most Flexible)
```python
# Find element by CSS selector
element = driver.find_element(By.CSS_SELECTOR, ".hot-product-card")
```
- **Use when**: Need complex selectors or classes
- **Examples**:
  - `.class-name` - Elements with specific class
  - `#id-name` - Element with specific ID
  - `tag[attribute=value]` - Element with specific attribute

#### 3. **XPath** (Most Powerful)
```python
# Find element by XPath
element = driver.find_element(By.XPATH, "//button[contains(text(), 'Classify')]")
```
- **Use when**: Need complex element selection
- **Examples**:
  - `//tag` - Any tag in document
  - `//tag[@attribute='value']` - Tag with specific attribute
  - `//tag[contains(text(), 'text')]` - Tag containing specific text

#### 4. **Class Name**
```python
# Find element by class name
element = driver.find_element(By.CLASS_NAME, "hot-product-card")
```

#### 5. **Tag Name**
```python
# Find element by tag name
element = driver.find_element(By.TAG_NAME, "button")
```

### Real Examples from Our Tests

#### Cymbal Shops Page Elements
```python
# Product cards
product_cards = driver.find_elements(By.CSS_SELECTOR, ".hot-product-card")

# Product names
name = card.find_element(By.CSS_SELECTOR, ".hot-product-card-name")

# Product prices
price = card.find_element(By.CSS_SELECTOR, ".hot-product-card-price")

# Product links
link = card.find_element(By.CSS_SELECTOR, "a")
```

#### Triangle Classifier Page Elements
```python
# Input fields by ID
side_a = driver.find_element(By.ID, "sideA")
side_b = driver.find_element(By.ID, "sideB")
side_c = driver.find_element(By.ID, "sideC")

# Button by CSS selector
classify_button = driver.find_element(By.CSS_SELECTOR, "button")

# Results by CSS selector
result_elements = driver.find_elements(By.CSS_SELECTOR, ".text-center")
```

### Finding Multiple Elements

```python
# Find all elements matching a selector
product_cards = driver.find_elements(By.CSS_SELECTOR, ".hot-product-card")

# Iterate through elements
for card in product_cards:
    name = card.find_element(By.CSS_SELECTOR, ".hot-product-card-name")
    print(f"Product: {name.text}")
```

---

## Test Framework Architecture

### Pytest Configuration (conftest.py)

Our test framework uses Pytest with custom fixtures:

```python
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

@pytest.fixture(scope="function")
def driver():
    """Setup and teardown WebDriver for each test."""
    # Setup Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    # Setup WebDriver
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.implicitly_wait(10)
    
    yield driver  # Provide driver to test
    
    driver.quit()  # Cleanup after test
```

### Test Class Structure

```python
import pytest
from page_objects.triangle_classifier_page import TriangleClassifierPage

class TestTriangleClassifier:
    """Test cases for Triangle Classifier application."""
    
    @pytest.mark.mathematical  # Custom marker for test categorization
    def test_application_loading(self, driver):
        """Test that the Triangle Classifier application loads correctly."""
        # Arrange
        page = TriangleClassifierPage(driver)
        
        # Act
        page.navigate_to_app()
        
        # Assert
        assert page.verify_page_loaded(), "Application failed to load"
        
        title = page.get_page_title()
        assert "Triangle Classifier" in title, f"Unexpected page title: {title}"
        
        print("PASS: Triangle Classifier application loaded successfully")
```

### Test Organization Principles

1. **Arrange-Act-Assert Pattern**:
   - **Arrange**: Set up test data and conditions
   - **Act**: Perform the action being tested
   - **Assert**: Verify the expected outcome

2. **Test Method Naming**:
   - Use descriptive names: `test_equilateral_triangle_classification`
   - Follow pattern: `test_[what]_[condition]_[expected_result]`

3. **Test Documentation**:
   - Docstrings explain what each test does
   - Comments explain complex logic
   - Print statements provide feedback

---

## Real-World Test Examples

### Example 1: E-commerce Product Testing

Let's examine our Cymbal Shops test:

```python
@pytest.mark.ecommerce
def test_product_information_retrieval(self, driver):
    """Test retrieving product information."""
    # Arrange
    page = CymbalShopsPage(driver)
    page.navigate_to_homepage()
    
    # Act - Get product information
    price = page.get_product_price("OLJCESPC7Z")  # Sunglasses
    name = page.get_product_name("OLJCESPC7Z")    # Sunglasses
    
    # Assert - Verify product details
    assert price is not None, "Failed to get product price"
    assert "$" in price, f"Price should contain '$', got '{price}'"
    assert name is not None, "Failed to get product name"
    assert name == "Sunglasses", f"Expected 'Sunglasses', got '{name}'"
    
    print("PASS: Product information retrieved successfully")
```

**What This Test Does**:
1. **Navigates** to the e-commerce homepage
2. **Finds** a specific product (Sunglasses)
3. **Extracts** price and name information
4. **Validates** the information is correct and formatted properly

### Example 2: Mathematical Application Testing

Let's examine our Triangle Classifier test:

```python
@pytest.mark.mathematical
def test_equilateral_triangle_classification(self, driver):
    """Test classification of equilateral triangle."""
    # Arrange
    page = TriangleClassifierPage(driver)
    page.navigate_to_app()
    
    # Act - Input triangle sides and classify
    result = page.test_triangle_classification(5, 5, 5)
    
    # Assert - Verify correct classification
    if result["type"] == "success":
        assert "equilateral" in result["result"].lower(), \
            f"Expected equilateral, got: {result['result']}"
        print("PASS: Equilateral triangle correctly classified")
    else:
        pytest.fail(f"Classification failed: {result['message']}")
```

**What This Test Does**:
1. **Opens** the triangle classifier application
2. **Inputs** three equal sides (5, 5, 5)
3. **Triggers** the classification algorithm
4. **Verifies** the result is "Equilateral"

### Example 3: Complex User Journey Testing

```python
@pytest.mark.ecommerce
def test_currency_conversion(self, driver):
    """Test currency conversion functionality."""
    # Arrange
    page = CymbalShopsPage(driver)
    page.navigate_to_homepage()
    
    # Get initial prices in USD
    initial_prices = page.get_all_product_prices()
    assert len(initial_prices) > 0, "No product prices found"
    
    # Act - Change currency
    success = page.change_currency("EUR")
    assert success, "Failed to change currency to EUR"
    
    # Verify currency changed
    current_currency = page.get_current_currency()
    assert current_currency == "EUR", f"Currency should be EUR, got {current_currency}"
    
    # Assert - Verify prices changed
    new_prices = page.get_all_product_prices()
    assert len(new_prices) > 0, "No product prices found after currency change"
    
    # Verify prices changed (should have € symbol)
    for price in new_prices:
        assert "€" in price, f"Price should contain '€', got '{price}'"
    
    print("PASS: Currency conversion working correctly")
```

**What This Test Does**:
1. **Loads** the e-commerce site
2. **Captures** initial USD prices
3. **Changes** currency to EUR
4. **Verifies** currency setting changed
5. **Validates** prices updated with Euro symbol

---

## Best Practices and Patterns

### 1. **Explicit Waits**

Instead of using `time.sleep()`, use explicit waits:

```python
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Wait for element to be present
result_element = self.wait.until(
    EC.presence_of_element_located((By.CSS_SELECTOR, ".text-center"))
)

# Wait for element to be clickable
add_button = self.wait.until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, "button[data-testid='add-to-cart']"))
)
```

### 2. **Error Handling**

Always handle potential errors gracefully:

```python
def get_product_price(self, product_id):
    """Get price of specific product by ID."""
    try:
        product_card = self.driver.find_element(
            By.CSS_SELECTOR, f"a[href='/product/{product_id}']"
        ).find_element(By.XPATH, "..")
        return product_card.find_element(By.CSS_SELECTOR, ".hot-product-card-price").text
    except:
        return None  # Return None instead of crashing
```

### 3. **Test Data Management**

Use test data factories for consistent testing:

```python
def test_multiple_triangle_types(self, driver):
    """Test multiple triangle types in sequence."""
    test_cases = [
        {"sides": [6, 6, 6], "expected": "equilateral"},
        {"sides": [5, 5, 3], "expected": "isosceles"},
        {"sides": [3, 4, 5], "expected": "scalene"},
        {"sides": [7.5, 7.5, 7.5], "expected": "equilateral"}
    ]
    
    for test_case in test_cases:
        # Test each case
        result = page.test_triangle_classification(
            test_case["sides"][0],
            test_case["sides"][1],
            test_case["sides"][2]
        )
        # Verify result
```

### 4. **Test Isolation**

Each test should be independent:

```python
@pytest.mark.mathematical
def test_multiple_triangle_types(self, driver):
    """Test multiple triangle types in sequence."""
    for i, test_case in enumerate(test_cases):
        # Refresh page for each test to ensure clean state
        page.navigate_to_app()
        
        # Run test case
        result = page.test_triangle_classification(...)
```

### 5. **Meaningful Assertions**

Use descriptive assertion messages:

```python
# Good
assert len(product_cards) >= 9, f"Expected at least 9 products, found {len(product_cards)}"

# Better than
assert len(product_cards) >= 9
```

---

## Advanced Concepts

### 1. **Custom Test Markers**

Organize tests by category:

```python
# In conftest.py
def pytest_configure(config):
    """Configure pytest with custom markers."""
    config.addinivalue_line("markers", "ecommerce: marks tests as ecommerce related")
    config.addinivalue_line("markers", "mathematical: marks tests as mathematical application related")
    config.addinivalue_line("markers", "slow: marks tests as slow running")

# In test files
@pytest.mark.ecommerce
def test_product_catalog(self, driver):
    pass

@pytest.mark.mathematical
def test_triangle_classification(self, driver):
    pass

# Run specific test categories
# pytest -m ecommerce
# pytest -m mathematical
# pytest -m "not slow"
```

### 2. **Screenshot Capture**

Capture screenshots for debugging:

```python
def take_screenshot(self, filename):
    """Take a screenshot of the current page."""
    self.driver.save_screenshot(f"screenshots/{filename}.png")

# Use in tests
def test_failure_with_screenshot(self, driver):
    try:
        # Test logic
        assert False, "This test fails"
    except:
        driver.save_screenshot("test_failure.png")
        raise
```

### 3. **JavaScript Execution**

Execute JavaScript when needed:

```python
# Scroll to element
driver.execute_script("arguments[0].scrollIntoView();", element)

# Get page title via JavaScript
title = driver.execute_script("return document.title;")

# Click element via JavaScript (bypasses overlay issues)
driver.execute_script("arguments[0].click();", element)
```

### 4. **Window Management**

Handle multiple windows and tabs:

```python
# Get current window handle
current_window = driver.current_window_handle

# Get all window handles
all_windows = driver.window_handles

# Switch to new window
for window in all_windows:
    if window != current_window:
        driver.switch_to.window(window)
        break

# Switch back to original window
driver.switch_to.window(current_window)
```

---

## Troubleshooting and Debugging

### Common Issues and Solutions

#### 1. **Element Not Found**

**Problem**: `NoSuchElementException: Message: no such element`

**Solutions**:
```python
# Add explicit wait
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "element-id"))
)

# Check if element exists before interacting
try:
    element = driver.find_element(By.ID, "element-id")
    element.click()
except NoSuchElementException:
    print("Element not found, skipping test")
```

#### 2. **Element Not Clickable**

**Problem**: `ElementClickInterceptedException`

**Solutions**:
```python
# Wait for element to be clickable
element = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, "button"))
)

# Use JavaScript click
driver.execute_script("arguments[0].click();", element)

# Scroll to element first
driver.execute_script("arguments[0].scrollIntoView();", element)
element.click()
```

#### 3. **Stale Element Reference**

**Problem**: `StaleElementReferenceException`

**Solutions**:
```python
# Re-find element each time
def click_button(self):
    button = self.driver.find_element(By.CSS_SELECTOR, "button")
    button.click()

# Use explicit wait to ensure element is fresh
element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "element-id"))
)
```

#### 4. **ChromeDriver Version Issues**

**Problem**: Version mismatch between Chrome and ChromeDriver

**Solutions**:
```python
# Use webdriver-manager (recommended)
from webdriver_manager.chrome import ChromeDriverManager
driver_path = ChromeDriverManager().install()
driver = webdriver.Chrome(executable_path=driver_path)

# Or update ChromeDriver manually
# Download from: https://chromedriver.chromium.org/
```

### Debugging Techniques

#### 1. **Add Delays for Debugging**

```python
import time

# Add temporary delays to see what's happening
time.sleep(2)  # Wait 2 seconds
```

#### 2. **Print Debug Information**

```python
# Print element information
element = driver.find_element(By.ID, "sideA")
print(f"Element found: {element}")
print(f"Element text: {element.text}")
print(f"Element value: {element.get_attribute('value')}")
```

#### 3. **Take Screenshots**

```python
# Take screenshot at failure point
driver.save_screenshot("debug_screenshot.png")
```

#### 4. **Use Browser Developer Tools**

```python
# Open browser in non-headless mode for debugging
chrome_options = Options()
# chrome_options.add_argument("--headless")  # Comment out for debugging
```

---

## Running Tests

### Basic Test Execution

```bash
# Run all tests
pytest selenium_tests/

# Run specific test file
pytest selenium_tests/test_triangle_classifier.py

# Run specific test method
pytest selenium_tests/test_triangle_classifier.py::TestTriangleClassifier::test_equilateral_triangle_classification

# Run tests with verbose output
pytest -v selenium_tests/

# Run tests with markers
pytest -m ecommerce selenium_tests/
pytest -m mathematical selenium_tests/
```

### Test Reports

```bash
# Generate HTML report
pytest --html=report.html --self-contained-html selenium_tests/

# Generate JUnit XML report
pytest --junitxml=report.xml selenium_tests/

# Run with coverage
pytest --cov=selenium_tests selenium_tests/
```

### Continuous Integration

```yaml
# Example GitHub Actions workflow
name: Selenium Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: 3.9
    - name: Install dependencies
      run: |
        pip install -r requirements.txt
    - name: Run tests
      run: |
        pytest selenium_tests/ --html=report.html
    - name: Upload test results
      uses: actions/upload-artifact@v2
      with:
        name: test-results
        path: report.html
```

---

## Conclusion

This guide has covered the fundamentals of Selenium WebDriver testing using real-world examples from our e-commerce and mathematical application tests. Key takeaways:

### What You've Learned

1. **Selenium Fundamentals**: How WebDriver works and interacts with browsers
2. **Page Object Model**: How to structure maintainable test code
3. **Element Locators**: Different ways to find and interact with web elements
4. **Test Framework**: How to organize and run tests with Pytest
5. **Best Practices**: Patterns for reliable and maintainable tests
6. **Troubleshooting**: How to debug common Selenium issues

### Next Steps

1. **Practice**: Try modifying our existing tests
2. **Experiment**: Add new test cases to our applications
3. **Explore**: Learn about advanced Selenium features
4. **Integrate**: Set up CI/CD pipelines for automated testing
5. **Expand**: Apply these concepts to your own projects

### Resources

- [Selenium Python Documentation](https://selenium-python.readthedocs.io/)
- [Pytest Framework](https://docs.pytest.org/)
- [Page Object Model](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)
- [WebDriver Manager](https://github.com/SergeyPirogov/webdriver_manager)

---

**Remember**: The best way to learn Selenium is through practice. Start with simple tests and gradually build up to more complex scenarios. Our test examples provide a solid foundation for understanding real-world automated testing!

---

**Student**: Thomas Vickers  
**Course**: MSSE640 - Software Security Engineering  
**Date**: Augest 2025  
**Repository**: https://github.com/ThomasVickers-Regis/MSSE640-2025summer
