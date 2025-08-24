#!/usr/bin/env python3
"""
Selenium Test Runner for Assignment 7
MSSE640 - Software Security Engineering

This script runs automated web tests for:
1. Cymbal Shops E-commerce Site
2. Triangle Classifier Application
"""

import os
import sys
import pytest
import argparse
from datetime import datetime

def create_screenshots_directory():
    """Create screenshots directory if it doesn't exist."""
    if not os.path.exists("screenshots"):
        os.makedirs("screenshots")
        print("Created screenshots directory")

def run_tests_with_options(test_type=None, browser_visible=False, generate_report=True):
    """Run tests with specified options."""
    
    # Create necessary directories
    create_screenshots_directory()
    
    # Base pytest arguments
    pytest_args = [
        "selenium_tests/",
        "-v",  # Verbose output
        "--tb=short",  # Short traceback format
    ]
    
    # Add markers based on test type
    if test_type == "ecommerce":
        pytest_args.append("-m")
        pytest_args.append("ecommerce")
        print("Running E-commerce tests only...")
    elif test_type == "mathematical":
        pytest_args.append("-m")
        pytest_args.append("mathematical")
        print("Running Mathematical application tests only...")
    else:
        print("Running all tests...")
    
    # Add HTML report generation
    if generate_report:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        report_file = f"test_report_{timestamp}.html"
        pytest_args.extend([
            "--html", report_file,
            "--self-contained-html",
            "--css", "style.css"
        ])
        print(f"HTML report will be generated: {report_file}")
    
    # Add JUnit XML report
    xml_report = f"junit_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xml"
    pytest_args.extend(["--junitxml", xml_report])
    
    # Run tests
    print(f"Running tests with arguments: {' '.join(pytest_args)}")
    print("=" * 60)
    
    exit_code = pytest.main(pytest_args)
    
    print("=" * 60)
    if exit_code == 0:
        print("✅ All tests passed!")
    else:
        print(f"❌ Some tests failed (exit code: {exit_code})")
    
    return exit_code

def run_specific_test(test_name):
    """Run a specific test by name."""
    pytest_args = [
        "selenium_tests/",
        "-v",
        "-k", test_name,
        "--tb=short"
    ]
    
    print(f"Running specific test: {test_name}")
    return pytest.main(pytest_args)

def run_performance_tests():
    """Run performance-focused tests."""
    pytest_args = [
        "selenium_tests/",
        "-v",
        "-m", "slow",
        "--tb=short"
    ]
    
    print("Running performance tests...")
    return pytest.main(pytest_args)

def main():
    """Main function to handle command line arguments and run tests."""
    parser = argparse.ArgumentParser(
        description="Selenium Test Runner for Assignment 7",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python run_tests.py                    # Run all tests
  python run_tests.py --ecommerce        # Run only e-commerce tests
  python run_tests.py --mathematical     # Run only mathematical tests
  python run_tests.py --test test_homepage_loading  # Run specific test
  python run_tests.py --performance      # Run performance tests
  python run_tests.py --no-report        # Run without HTML report
        """
    )
    
    parser.add_argument(
        "--ecommerce",
        action="store_true",
        help="Run only e-commerce tests"
    )
    
    parser.add_argument(
        "--mathematical",
        action="store_true",
        help="Run only mathematical application tests"
    )
    
    parser.add_argument(
        "--test",
        type=str,
        help="Run a specific test by name"
    )
    
    parser.add_argument(
        "--performance",
        action="store_true",
        help="Run performance tests only"
    )
    
    parser.add_argument(
        "--no-report",
        action="store_true",
        help="Skip HTML report generation"
    )
    
    parser.add_argument(
        "--visible",
        action="store_true",
        help="Run tests with visible browser (for debugging)"
    )
    
    args = parser.parse_args()
    
    # Print header
    print("=" * 60)
    print("Selenium Test Runner - Assignment 7")
    print("MSSE640 - Software Security Engineering")
    print("=" * 60)
    
    # Determine test type
    test_type = None
    if args.ecommerce:
        test_type = "ecommerce"
    elif args.mathematical:
        test_type = "mathematical"
    
    # Run appropriate tests
    if args.test:
        exit_code = run_specific_test(args.test)
    elif args.performance:
        exit_code = run_performance_tests()
    else:
        exit_code = run_tests_with_options(
            test_type=test_type,
            browser_visible=args.visible,
            generate_report=not args.no_report
        )
    
    # Print summary
    print("\n" + "=" * 60)
    print("Test Execution Summary")
    print("=" * 60)
    
    if exit_code == 0:
        print("🎉 All tests completed successfully!")
        print("📊 Check the generated reports for detailed results")
    else:
        print("⚠️  Some tests failed. Check the output above for details.")
        print("🔍 Review the HTML report for more information")
    
    print("\nGenerated files:")
    if not args.no_report:
        print("  - HTML test report")
    print("  - JUnit XML report")
    print("  - Screenshots (if any failures)")
    
    return exit_code

if __name__ == "__main__":
    sys.exit(main())
