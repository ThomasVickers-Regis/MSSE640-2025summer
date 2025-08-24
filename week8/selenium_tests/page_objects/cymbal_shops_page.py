from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
import time

class CymbalShopsPage:
    """Page Object Model for Cymbal Shops e-commerce website."""
    
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
        self.base_url = "https://cymbal-shops.retail.cymbal.dev/"
    
    def navigate_to_homepage(self):
        """Navigate to Cymbal Shops homepage."""
        self.driver.get(self.base_url)
        time.sleep(2)  # Allow page to load
    
    def get_hot_products_title(self):
        """Get the Hot Products section title."""
        return self.driver.find_element(By.CSS_SELECTOR, "h3").text
    
    def get_product_cards(self):
        """Get all product cards on the homepage."""
        return self.driver.find_elements(By.CSS_SELECTOR, ".hot-product-card")
    
    def get_product_price(self, product_id):
        """Get price of specific product by ID."""
        try:
            product_card = self.driver.find_element(
                By.CSS_SELECTOR, f"a[href='/product/{product_id}']"
            ).find_element(By.XPATH, "..")
            return product_card.find_element(By.CSS_SELECTOR, ".hot-product-card-price").text
        except:
            return None
    
    def get_product_name(self, product_id):
        """Get name of specific product by ID."""
        try:
            product_card = self.driver.find_element(
                By.CSS_SELECTOR, f"a[href='/product/{product_id}']"
            ).find_element(By.XPATH, "..")
            return product_card.find_element(By.CSS_SELECTOR, ".hot-product-card-name").text
        except:
            return None
    
    def click_product(self, product_id):
        """Click on a specific product to view details."""
        product_link = self.driver.find_element(By.CSS_SELECTOR, f"a[href='/product/{product_id}']")
        product_link.click()
        time.sleep(2)
    
    def add_product_to_cart(self, product_id):
        """Add product to cart from product detail page."""
        self.click_product(product_id)
        
        try:
            # Look for add to cart button
            add_button = self.wait.until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "button[data-testid='add-to-cart']"))
            )
            add_button.click()
            time.sleep(1)
            return True
        except:
            # If button not found, try alternative selectors
            try:
                add_button = self.driver.find_element(By.CSS_SELECTOR, "button:contains('Add to Cart')")
                add_button.click()
                time.sleep(1)
                return True
            except:
                return False
    
    def get_cart_total(self):
        """Get the current cart total."""
        try:
            cart_link = self.driver.find_element(By.CSS_SELECTOR, ".cart-link")
            cart_link.click()
            time.sleep(2)
            
            # Look for cart total
            cart_total = self.driver.find_element(By.CSS_SELECTOR, ".cart-total")
            return cart_total.text
        except:
            return None
    
    def change_currency(self, currency_code):
        """Change currency display."""
        try:
            currency_select = self.driver.find_element(By.CSS_SELECTOR, "select[name='currency_code']")
            select = Select(currency_select)
            select.select_by_value(currency_code)
            time.sleep(2)  # Allow currency conversion to complete
            return True
        except:
            return False
    
    def get_current_currency(self):
        """Get the currently selected currency."""
        try:
            currency_select = self.driver.find_element(By.CSS_SELECTOR, "select[name='currency_code']")
            select = Select(currency_select)
            return select.first_selected_option.get_attribute("value")
        except:
            return None
    
    def get_all_product_prices(self):
        """Get all product prices currently displayed."""
        prices = []
        product_cards = self.get_product_cards()
        for card in product_cards:
            try:
                price = card.find_element(By.CSS_SELECTOR, ".hot-product-card-price").text
                prices.append(price)
            except:
                continue
        return prices
    
    def verify_page_loaded(self):
        """Verify that the page has loaded completely."""
        try:
            self.wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".hot-product-card"))
            )
            return True
        except:
            return False
    
    def get_page_title(self):
        """Get the page title."""
        return self.driver.title
    
    def take_screenshot(self, filename):
        """Take a screenshot of the current page."""
        self.driver.save_screenshot(f"screenshots/{filename}.png")
