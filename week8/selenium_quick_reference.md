# Selenium WebDriver Quick Reference
## Essential Commands and Patterns

### MSSE640 - Software Security Engineering
**Week 8: Selenium Quick Reference Card**

---

## 🚀 Setup and Configuration

### Basic WebDriver Setup
```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# Setup Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--window-size=1920,1080")

# Create WebDriver
driver_path = ChromeDriverManager().install()
driver = webdriver.Chrome(executable_path=driver_path, options=chrome_options)
driver.implicitly_wait(10)
```

### Pytest Fixture
```python
@pytest.fixture(scope="function")
def driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.implicitly_wait(10)
    yield driver
    driver.quit()
```

---

## 🎯 Element Locators

### By ID (Most Reliable)
```python
element = driver.find_element(By.ID, "element-id")
```

### By CSS Selector (Most Flexible)
```python
element = driver.find_element(By.CSS_SELECTOR, ".class-name")
element = driver.find_element(By.CSS_SELECTOR, "#id-name")
element = driver.find_element(By.CSS_SELECTOR, "tag[attribute='value']")
```

### By XPath (Most Powerful)
```python
element = driver.find_element(By.XPATH, "//tag[@attribute='value']")
element = driver.find_element(By.XPATH, "//button[contains(text(), 'Click')]")
```

### By Class Name
```python
element = driver.find_element(By.CLASS_NAME, "class-name")
```

### By Tag Name
```python
element = driver.find_element(By.TAG_NAME, "button")
```

### Find Multiple Elements
```python
elements = driver.find_elements(By.CSS_SELECTOR, ".product-card")
```

---

## 🔧 Element Interactions

### Basic Actions
```python
# Click element
element.click()

# Type text
element.send_keys("text to type")

# Clear field
element.clear()

# Get text
text = element.text

# Get attribute
value = element.get_attribute("value")
href = element.get_attribute("href")
```

### Advanced Actions
```python
# Submit form
element.submit()

# Check if enabled
is_enabled = element.is_enabled()

# Check if displayed
is_displayed = element.is_displayed()

# Check if selected (for checkboxes/radio)
is_selected = element.is_selected()
```

---

## ⏱️ Waits and Timing

### Implicit Wait
```python
driver.implicitly_wait(10)  # Wait up to 10 seconds for elements
```

### Explicit Wait
```python
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Wait for element to be present
element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "element-id"))
)

# Wait for element to be clickable
element = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, "button"))
)

# Wait for element to be visible
element = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.CLASS_NAME, "visible-element"))
)
```

### Common Expected Conditions
```python
EC.presence_of_element_located((By.ID, "id"))
EC.element_to_be_clickable((By.CSS_SELECTOR, "button"))
EC.visibility_of_element_located((By.CLASS_NAME, "class"))
EC.text_to_be_present_in_element((By.ID, "id"), "expected text")
EC.title_contains("expected title")
```

---

## 🌐 Browser Navigation

### Basic Navigation
```python
# Navigate to URL
driver.get("https://example.com")

# Get current URL
current_url = driver.current_url

# Get page title
title = driver.title

# Navigate back/forward
driver.back()
driver.forward()

# Refresh page
driver.refresh()
```

### Window Management
```python
# Get window handles
current_window = driver.current_window_handle
all_windows = driver.window_handles

# Switch to window
driver.switch_to.window(window_handle)

# Close current window
driver.close()

# Quit browser
driver.quit()
```

---

## 📄 Page Object Model (POM)

### Basic Page Object Structure
```python
class ExamplePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
    
    # Navigation methods
    def navigate_to_page(self):
        self.driver.get("https://example.com")
    
    # Element getters
    def get_button(self):
        return self.driver.find_element(By.CSS_SELECTOR, "button")
    
    # Action methods
    def click_button(self):
        self.get_button().click()
    
    # Verification methods
    def get_title(self):
        return self.driver.title
```

### Page Object Best Practices
```python
# Use explicit waits in page objects
def wait_for_element(self, locator):
    return self.wait.until(EC.presence_of_element_located(locator))

# Handle errors gracefully
def get_element_safely(self, locator):
    try:
        return self.driver.find_element(*locator)
    except:
        return None

# Combine actions
def login(self, username, password):
    self.get_username_field().send_keys(username)
    self.get_password_field().send_keys(password)
    self.get_login_button().click()
```

---

## 🧪 Test Structure

### Basic Test Method
```python
def test_example(self, driver):
    """Test description."""
    # Arrange
    page = ExamplePage(driver)
    page.navigate_to_page()
    
    # Act
    page.click_button()
    
    # Assert
    assert "expected" in page.get_title()
    print("PASS: Test completed successfully")
```

### Test with Data
```python
def test_with_test_data(self, driver):
    """Test with multiple data sets."""
    test_cases = [
        {"input": "value1", "expected": "result1"},
        {"input": "value2", "expected": "result2"}
    ]
    
    for test_case in test_cases:
        # Test logic here
        assert test_case["expected"] in result
```

---

## 🐛 Error Handling

### Try-Catch Pattern
```python
try:
    element = driver.find_element(By.ID, "element-id")
    element.click()
except NoSuchElementException:
    print("Element not found")
except ElementClickInterceptedException:
    driver.execute_script("arguments[0].click();", element)
```

### Screenshot on Failure
```python
def test_with_screenshot(self, driver):
    try:
        # Test logic
        assert False, "Test fails"
    except:
        driver.save_screenshot("failure.png")
        raise
```

---

## 🔍 Debugging Commands

### Print Debug Info
```python
# Print element info
print(f"Element: {element}")
print(f"Text: {element.text}")
print(f"Value: {element.get_attribute('value')}")

# Print page info
print(f"Title: {driver.title}")
print(f"URL: {driver.current_url}")
```

### JavaScript Execution
```python
# Execute JavaScript
driver.execute_script("arguments[0].scrollIntoView();", element)
driver.execute_script("arguments[0].click();", element)
driver.execute_script("return document.title;")
```

---

## 📊 Test Execution

### Pytest Commands
```bash
# Run all tests
pytest selenium_tests/

# Run specific test
pytest test_file.py::TestClass::test_method

# Run with markers
pytest -m ecommerce
pytest -m "not slow"

# Run with verbose output
pytest -v

# Generate HTML report
pytest --html=report.html --self-contained-html
```

### Test Markers
```python
@pytest.mark.ecommerce
@pytest.mark.mathematical
@pytest.mark.slow
@pytest.mark.smoke
```

---

## 🎨 CSS Selectors Cheat Sheet

### Basic Selectors
```css
.class-name          /* Elements with class */
#id-name             /* Element with ID */
tag-name             /* All tags */
tag.class            /* Tag with class */
tag#id               /* Tag with ID */
```

### Attribute Selectors
```css
[attribute]          /* Has attribute */
[attribute=value]    /* Attribute equals value */
[attribute*=value]   /* Attribute contains value */
[attribute^=value]   /* Attribute starts with value */
[attribute$=value]   /* Attribute ends with value */
```

### Combinators
```css
parent > child       /* Direct child */
ancestor descendant  /* Any descendant */
element + sibling    /* Adjacent sibling */
element ~ sibling    /* General sibling */
```

### Pseudo-selectors
```css
:first-child         /* First child */
:last-child          /* Last child */
:nth-child(n)        /* Nth child */
:contains(text)      /* Contains text */
```

---

## 🚨 Common Exceptions

### Element Not Found
```python
NoSuchElementException: Message: no such element
# Solution: Add explicit wait or check if element exists
```

### Element Not Clickable
```python
ElementClickInterceptedException
# Solution: Wait for clickable or use JavaScript click
```

### Stale Element Reference
```python
StaleElementReferenceException
# Solution: Re-find element or use explicit wait
```

### Timeout Exception
```python
TimeoutException
# Solution: Increase wait time or check element locator
```

---

## 📝 Best Practices Checklist

- [ ] Use Page Object Model for maintainability
- [ ] Use explicit waits instead of time.sleep()
- [ ] Handle exceptions gracefully
- [ ] Use descriptive test names
- [ ] Follow Arrange-Act-Assert pattern
- [ ] Use meaningful assertion messages
- [ ] Keep tests independent
- [ ] Use test data factories
- [ ] Take screenshots on failures
- [ ] Use custom test markers
- [ ] Generate test reports
- [ ] Document complex test logic

---

## 🔗 Useful Resources

- **Selenium Documentation**: https://selenium-python.readthedocs.io/
- **Pytest Framework**: https://docs.pytest.org/
- **CSS Selectors**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
- **XPath Tutorial**: https://www.w3schools.com/xml/xpath_intro.asp
- **WebDriver Manager**: https://github.com/SergeyPirogov/webdriver_manager

---

**Quick Tips**:
1. **ID selectors** are fastest and most reliable
2. **CSS selectors** are most flexible
3. **XPath** is most powerful but slowest
4. **Always use explicit waits** for dynamic content
5. **Handle exceptions** to make tests robust
6. **Use Page Objects** for maintainable code
7. **Take screenshots** for debugging failures

---

**Student**: Thomas Vickers  
**Course**: MSSE640 - Software Security Engineering  
**Date**: January 2025
