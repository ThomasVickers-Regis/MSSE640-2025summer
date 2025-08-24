from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class TriangleClassifierPage:
    """Page Object Model for Triangle Classifier application."""
    
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
        self.base_url = "https://msse-640-2025summer.vercel.app/"
    
    def navigate_to_app(self):
        """Navigate to Triangle Classifier application."""
        self.driver.get(self.base_url)
        time.sleep(2)  # Allow page to load
    
    def get_page_title(self):
        """Get the page title."""
        return self.driver.title
    
    def get_side_a_input(self):
        """Get the Side A input field."""
        return self.driver.find_element(By.ID, "sideA")
    
    def get_side_b_input(self):
        """Get the Side B input field."""
        return self.driver.find_element(By.ID, "sideB")
    
    def get_side_c_input(self):
        """Get the Side C input field."""
        return self.driver.find_element(By.ID, "sideC")
    
    def get_classify_button(self):
        """Get the Classify Triangle button."""
        return self.driver.find_element(By.CSS_SELECTOR, "button")
    
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
        
        time.sleep(0.5)  # Allow input to register
    
    def classify_triangle(self):
        """Click classify button."""
        classify_button = self.get_classify_button()
        classify_button.click()
        time.sleep(1)  # Allow processing
    
    def get_result_text(self):
        """Get the classification result text."""
        try:
            # Look for result in the analysis section
            result_element = self.wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".text-center"))
            )
            return result_element.text
        except:
            return None
    
    def get_error_message(self):
        """Get error message if validation fails."""
        try:
            # Look for error message
            error_element = self.driver.find_element(By.CSS_SELECTOR, ".text-red-500")
            return error_element.text
        except:
            return None
    
    def is_button_enabled(self):
        """Check if the classify button is enabled."""
        classify_button = self.get_classify_button()
        return classify_button.is_enabled()
    
    def get_placeholder_text(self):
        """Get placeholder text from input fields."""
        side_a_placeholder = self.get_side_a_input().get_attribute("placeholder")
        side_b_placeholder = self.get_side_b_input().get_attribute("placeholder")
        side_c_placeholder = self.get_side_c_input().get_attribute("placeholder")
        return {
            "sideA": side_a_placeholder,
            "sideB": side_b_placeholder,
            "sideC": side_c_placeholder
        }
    
    def get_triangle_types_info(self):
        """Get information about triangle types displayed on the page."""
        triangle_types = []
        type_elements = self.driver.find_elements(By.CSS_SELECTOR, ".text-center .text-green-400, .text-center .text-blue-400, .text-center .text-purple-400")
        
        for element in type_elements:
            triangle_types.append(element.text)
        
        return triangle_types
    
    def verify_page_loaded(self):
        """Verify that the page has loaded completely."""
        try:
            self.wait.until(
                EC.presence_of_element_located((By.ID, "sideA"))
            )
            return True
        except:
            return False
    
    def clear_all_inputs(self):
        """Clear all input fields."""
        side_a_input = self.get_side_a_input()
        side_b_input = self.get_side_b_input()
        side_c_input = self.get_side_c_input()
        
        side_a_input.clear()
        side_b_input.clear()
        side_c_input.clear()
    
    def get_input_values(self):
        """Get current values in input fields."""
        side_a_value = self.get_side_a_input().get_attribute("value")
        side_b_value = self.get_side_b_input().get_attribute("value")
        side_c_value = self.get_side_c_input().get_attribute("value")
        
        return {
            "sideA": side_a_value,
            "sideB": side_b_value,
            "sideC": side_c_value
        }
    
    def test_triangle_classification(self, side_a, side_b, side_c, expected_result=None):
        """Complete triangle classification test."""
        self.input_sides(side_a, side_b, side_c)
        self.classify_triangle()
        
        result_text = self.get_result_text()
        error_message = self.get_error_message()
        
        if error_message:
            return {"type": "error", "message": error_message}
        else:
            return {"type": "success", "result": result_text}
    
    def take_screenshot(self, filename):
        """Take a screenshot of the current page."""
        self.driver.save_screenshot(f"screenshots/{filename}.png")
