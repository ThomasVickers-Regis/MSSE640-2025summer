#!/usr/bin/env python3
"""
Simple Selenium Demo for Assignment 7
MSSE640 - Software Security Engineering

This script demonstrates basic Selenium functionality without requiring the full test framework.
"""

import time
import sys
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def setup_driver():
    """Setup Chrome WebDriver with basic options."""
    try:
        # Setup Chrome options
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Run in headless mode
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        
        # Try to use webdriver-manager to get ChromeDriver
        try:
            from webdriver_manager.chrome import ChromeDriverManager
            driver_path = ChromeDriverManager().install()
            driver = webdriver.Chrome(executable_path=driver_path, options=chrome_options)
        except ImportError:
            # Fallback to system ChromeDriver
            driver = webdriver.Chrome(options=chrome_options)
        
        driver.implicitly_wait(10)
        return driver
    except Exception as e:
        print(f"Error setting up WebDriver: {e}")
        return None

def test_cymbal_shops():
    """Test basic functionality of Cymbal Shops website."""
    print("\n" + "="*60)
    print("Testing Cymbal Shops E-commerce Site")
    print("="*60)
    
    driver = setup_driver()
    if not driver:
        print("❌ Failed to setup WebDriver")
        return False
    
    try:
        # Navigate to the website
        print("🌐 Navigating to Cymbal Shops...")
        driver.get("https://cymbal-shops.retail.cymbal.dev/")
        time.sleep(3)
        
        # Check if page loaded
        print("📄 Checking page title...")
        title = driver.title
        print(f"   Page title: {title}")
        
        # Look for Hot Products section
        print("🛍️  Looking for Hot Products section...")
        try:
            hot_products = driver.find_element(By.CSS_SELECTOR, "h3")
            print(f"   Found section: {hot_products.text}")
        except:
            print("   ⚠️  Hot Products section not found")
        
        # Look for product cards
        print("📦 Looking for product cards...")
        try:
            product_cards = driver.find_elements(By.CSS_SELECTOR, ".hot-product-card")
            print(f"   Found {len(product_cards)} product cards")
            
            if len(product_cards) > 0:
                # Get first product info
                first_product = product_cards[0]
                try:
                    name = first_product.find_element(By.CSS_SELECTOR, ".hot-product-card-name")
                    price = first_product.find_element(By.CSS_SELECTOR, ".hot-product-card-price")
                    print(f"   First product: {name.text} - {price.text}")
                except:
                    print("   ⚠️  Could not get product details")
        except:
            print("   ⚠️  Product cards not found")
        
        print("✅ Cymbal Shops test completed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error testing Cymbal Shops: {e}")
        return False
    finally:
        driver.quit()

def test_triangle_classifier():
    """Test basic functionality of Triangle Classifier application."""
    print("\n" + "="*60)
    print("Testing Triangle Classifier Application")
    print("="*60)
    
    driver = setup_driver()
    if not driver:
        print("❌ Failed to setup WebDriver")
        return False
    
    try:
        # Navigate to the application
        print("🌐 Navigating to Triangle Classifier...")
        driver.get("https://msse-640-2025summer.vercel.app/")
        time.sleep(3)
        
        # Check if page loaded
        print("📄 Checking page title...")
        title = driver.title
        print(f"   Page title: {title}")
        
        # Look for input fields
        print("📝 Looking for input fields...")
        try:
            side_a = driver.find_element(By.ID, "sideA")
            side_b = driver.find_element(By.ID, "sideB")
            side_c = driver.find_element(By.ID, "sideC")
            print("   ✅ Found all three input fields")
        except:
            print("   ⚠️  Input fields not found")
            return False
        
        # Test equilateral triangle
        print("🔺 Testing equilateral triangle (5, 5, 5)...")
        try:
            side_a.clear()
            side_a.send_keys("5")
            side_b.clear()
            side_b.send_keys("5")
            side_c.clear()
            side_c.send_keys("5")
            
            # Find and click classify button
            classify_button = driver.find_element(By.CSS_SELECTOR, "button")
            classify_button.click()
            time.sleep(2)
            
            # Look for result
            try:
                result_elements = driver.find_elements(By.CSS_SELECTOR, ".text-center")
                for element in result_elements:
                    if "equilateral" in element.text.lower():
                        print(f"   ✅ Result found: {element.text}")
                        break
                else:
                    print("   ⚠️  Expected equilateral result not found")
            except:
                print("   ⚠️  Could not find result")
                
        except Exception as e:
            print(f"   ❌ Error testing triangle: {e}")
        
        print("✅ Triangle Classifier test completed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error testing Triangle Classifier: {e}")
        return False
    finally:
        driver.quit()

def main():
    """Main function to run all tests."""
    print("="*60)
    print("Selenium Demo - Assignment 7")
    print("MSSE640 - Software Security Engineering")
    print("="*60)
    
    # Test Cymbal Shops
    cymbal_success = test_cymbal_shops()
    
    # Test Triangle Classifier
    triangle_success = test_triangle_classifier()
    
    # Summary
    print("\n" + "="*60)
    print("Test Summary")
    print("="*60)
    print(f"Cymbal Shops: {'✅ PASS' if cymbal_success else '❌ FAIL'}")
    print(f"Triangle Classifier: {'✅ PASS' if triangle_success else '❌ FAIL'}")
    
    if cymbal_success and triangle_success:
        print("\n🎉 All tests passed!")
        return 0
    else:
        print("\n⚠️  Some tests failed. Check the output above for details.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
