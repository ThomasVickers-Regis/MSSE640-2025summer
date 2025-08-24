# Assignment 7: Selenium Web Testing

## MSSE640 - Software Security Engineering
**Week 8: Automated Web Testing with Selenium WebDriver**

This project demonstrates comprehensive automated web testing using Selenium WebDriver with Python, testing both e-commerce and mathematical applications.

---

## 🎯 Project Overview

### Tested Applications
1. **Cymbal Shops E-commerce Site** (https://cymbal-shops.retail.cymbal.dev/)
   - Product catalog navigation
   - Currency conversion functionality
   - Shopping cart operations
   - Responsive design testing

2. **Triangle Classifier Application** (https://msse-640-2025summer.vercel.app/)
   - Triangle classification algorithm
   - Input validation
   - Mathematical accuracy verification
   - User interface testing

### Key Features
- **Page Object Model** design pattern for maintainable tests
- **Comprehensive test coverage** for both applications
- **Automated reporting** with HTML and JUnit XML formats
- **Cross-browser compatibility** testing
- **Performance monitoring** and validation
- **Integration with CI/CD** concepts from previous weeks

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- Chrome browser installed
- Git (for version control)

### Installation

1. **Clone the repository** (if not already done):
```bash
git clone https://github.com/ThomasVickers-Regis/MSSE640-2025summer.git
cd MSSE640-2025summer/week8
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

3. **Verify installation**:
```bash
python -c "import selenium; print('Selenium installed successfully')"
```

### Running Tests

#### Run All Tests
```bash
python run_tests.py
```

#### Run Specific Test Categories
```bash
# E-commerce tests only
python run_tests.py --ecommerce

# Mathematical application tests only
python run_tests.py --mathematical

# Performance tests only
python run_tests.py --performance
```

#### Run Individual Tests
```bash
# Run a specific test
python run_tests.py --test test_homepage_loading

# Run with visible browser (for debugging)
python run_tests.py --visible
```

#### Advanced Options
```bash
# Run without HTML report generation
python run_tests.py --no-report

# Run with custom pytest options
pytest selenium_tests/ -v -m ecommerce
```

---

## 📁 Project Structure

```
week8/
├── selenium_tests/
│   ├── __init__.py
│   ├── conftest.py                 # Pytest configuration and fixtures
│   ├── test_cymbal_shops.py        # E-commerce test cases
│   ├── test_triangle_classifier.py # Mathematical app test cases
│   └── page_objects/
│       ├── __init__.py
│       ├── cymbal_shops_page.py    # Page Object for e-commerce site
│       └── triangle_classifier_page.py # Page Object for triangle app
├── requirements.txt                # Python dependencies
├── run_tests.py                   # Main test runner script
├── README.md                      # This file
└── Assignment7Vickers.md          # Assignment documentation
```

---

## 🧪 Test Categories

### E-commerce Tests (`@pytest.mark.ecommerce`)
- **Homepage Loading**: Verify page loads correctly
- **Product Catalog**: Validate product display and structure
- **Currency Conversion**: Test multi-currency support
- **Product Navigation**: Test product detail pages
- **Shopping Cart**: Validate cart functionality
- **Responsive Design**: Test across different screen sizes
- **Performance**: Measure page load times

### Mathematical Application Tests (`@pytest.mark.mathematical`)
- **Application Loading**: Verify app initialization
- **Input Validation**: Test field validation and error handling
- **Triangle Classification**: Test all triangle types (Equilateral, Isosceles, Scalene)
- **Edge Cases**: Test boundary conditions and invalid inputs
- **Floating Point Precision**: Test decimal number handling
- **Button State Management**: Test UI state changes
- **Performance**: Test classification speed

### Performance Tests (`@pytest.mark.slow`)
- Load time measurements
- Responsive design validation
- Multiple operation sequences

---

## 📊 Test Reports

### Generated Reports
- **HTML Report**: Comprehensive test results with screenshots
- **JUnit XML**: CI/CD integration compatible
- **Console Output**: Real-time test progress

### Report Location
Reports are generated in the `week8/` directory with timestamps:
- `test_report_YYYYMMDD_HHMMSS.html`
- `junit_report_YYYYMMDD_HHMMSS.xml`

### Viewing Reports
```bash
# Open HTML report in browser
open test_report_*.html

# Or navigate to the file and open manually
```

---

## 🔧 Configuration

### Browser Configuration
The tests are configured to run in headless mode by default. To run with visible browser:

```bash
python run_tests.py --visible
```

### Test Markers
Use pytest markers to run specific test categories:

```bash
# Run only e-commerce tests
pytest -m ecommerce

# Run only mathematical tests
pytest -m mathematical

# Run performance tests
pytest -m slow

# Run all tests except slow ones
pytest -m "not slow"
```

### Parallel Execution
For faster test execution, you can run tests in parallel:

```bash
pytest -n auto selenium_tests/
```

---

## 🐛 Troubleshooting

### Common Issues

#### ChromeDriver Issues
```bash
# If ChromeDriver is not found, it will be automatically downloaded
# If you encounter issues, manually install:
pip install webdriver-manager --upgrade
```

#### Permission Issues
```bash
# On Linux/Mac, make the test runner executable:
chmod +x run_tests.py
```

#### Network Issues
- Ensure stable internet connection for web testing
- Some tests may fail if target websites are down
- Check firewall settings if tests can't access external sites

#### Memory Issues
- Close other browser instances before running tests
- Use headless mode for better performance
- Reduce parallel execution if memory is limited

### Debug Mode
For debugging test failures:

```bash
# Run with visible browser
python run_tests.py --visible

# Run specific failing test
python run_tests.py --test test_name

# Run with detailed output
pytest -v -s selenium_tests/test_file.py::test_name
```

---

## 📈 Integration with Previous Weeks

This assignment builds upon concepts from previous weeks:

- **Week 2-3**: Unit testing principles applied to web automation
- **Week 4-5**: Git workflows for test version control
- **Week 6**: Performance testing concepts
- **Week 7**: CI/CD pipeline integration

### CI/CD Integration
The test structure is designed to integrate with CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run Selenium Tests
  run: |
    cd week8
    pip install -r requirements.txt
    python run_tests.py --no-report
```

---

## 🎓 Learning Objectives

### Technical Skills
- **Selenium WebDriver**: Master web automation framework
- **Page Object Model**: Implement maintainable test design
- **Test Automation**: Create robust automated test suites
- **Cross-Browser Testing**: Validate multi-platform compatibility
- **Performance Testing**: Measure and optimize web application performance

### Testing Concepts
- **End-to-End Testing**: Validate complete user journeys
- **Regression Testing**: Prevent bugs in existing functionality
- **User Acceptance Testing**: Verify application meets user requirements
- **Integration Testing**: Test component interactions

### Best Practices
- **Test Organization**: Structure tests for maintainability
- **Error Handling**: Implement robust error recovery
- **Reporting**: Generate comprehensive test reports
- **Documentation**: Maintain clear test documentation

---

## 📚 References

### Documentation
- [Selenium Python Documentation](https://selenium-python.readthedocs.io/)
- [Pytest Framework](https://docs.pytest.org/)
- [Page Object Model](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)

### Previous Week Materials
- Week 2-7 course materials and assignments
- Testing patterns and methodologies
- CI/CD concepts and implementation

### External Resources
- [WebDriver Manager](https://github.com/SergeyPirogov/webdriver_manager)
- [Pytest HTML Plugin](https://pytest-html.readthedocs.io/)
- [Selenium Best Practices](https://www.selenium.dev/documentation/webdriver/)

---

## 👨‍💻 Author

**Thomas Vickers**  
MSSE640 - Software Security Engineering  
Regis University  
Spring 2025

---

## 📄 License

This project is part of academic coursework and follows educational fair use guidelines.

---

## 🚀 Future Enhancements

### Planned Improvements
- [ ] Mobile testing automation
- [ ] Visual regression testing
- [ ] API testing integration
- [ ] Accessibility testing
- [ ] Cross-browser testing matrix
- [ ] Test data management
- [ ] Advanced reporting features

### Contributing
This is an academic project, but suggestions for improvements are welcome through the course platform.
