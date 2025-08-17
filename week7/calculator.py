import math

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
    
    def square_root(self, number: float) -> float:
        """Calculate the square root of a number."""
        if not isinstance(number, (int, float)):
            raise ValueError("Argument must be a number")
        if number < 0:
            raise ValueError("Cannot calculate square root of negative number")
        return math.sqrt(number)
