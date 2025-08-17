# Calculator CI/CD Project

A simple calculator application demonstrating CI/CD with GitHub Actions.

## Features

- Basic mathematical operations (add, subtract, multiply, divide, power, square root)
- Input validation
- Comprehensive unit tests
- Automated CI/CD pipeline
- Code coverage reporting
- Linting with flake8

## Installation

```bash
pip install -r requirements.txt
```

## Usage

```python
from calculator import Calculator

calc = Calculator()
result = calc.add(5, 3)  # Returns 8
sqrt_result = calc.square_root(16)  # Returns 4.0
```

## Testing

Run tests locally:
```bash
python -m pytest
```

Run tests with coverage:
```bash
python -m pytest --cov=calculator --cov-report=html
```

## CI/CD

This project uses GitHub Actions for continuous integration. Tests run automatically on every push and pull request.

### Workflow Features:
- Multi-Python version testing (3.8, 3.9, 3.10, 3.11)
- Automated test execution
- Code coverage reporting
- Linting with flake8
- Caching for faster builds

## Project Structure

```
calculator-ci-cd/
├── calculator.py          # Main calculator class
├── test_calculator.py     # Unit tests
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
└── .github/
    └── workflows/
        └── ci.yml        # GitHub Actions workflow
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.
