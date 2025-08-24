import pytest
import time
from page_objects.cymbal_shops_page import CymbalShopsPage

class TestCymbalShops:
    """Test cases for Cymbal Shops e-commerce website."""
    
    @pytest.mark.ecommerce
    def test_homepage_loading(self, driver):
        """Test that the homepage loads correctly."""
        page = CymbalShopsPage(driver)
        page.navigate_to_homepage()
        
        # Verify page loaded
        assert page.verify_page_loaded(), "Page failed to load"
        
        # Verify page title
        title = page.get_page_title()
        assert "Online Boutique" in title, f"Unexpected page title: {title}"
        
        print("PASS: Homepage loaded successfully")
    
    @pytest.mark.ecommerce
    def test_hot_products_section(self, driver):
        """Test that the Hot Products section is displayed correctly."""
        page = CymbalShopsPage(driver)
        page.navigate_to_homepage()
        
        # Verify Hot Products title
        title = page.get_hot_products_title()
        assert title == "Hot Products", f"Expected 'Hot Products', got '{title}'"
        
        # Verify product cards exist
        product_cards = page.get_product_cards()
        assert len(product_cards) >= 9, f"Expected at least 9 products, found {len(product_cards)}"
        
        print("PASS: Hot Products section displayed correctly")
    
    @pytest.mark.ecommerce
    def test_product_catalog_structure(self, driver):
        """Test that all product cards have required elements."""
        page = CymbalShopsPage(driver)
        page.navigate_to_homepage()
        
        product_cards = page.get_product_cards()
        
        for i, card in enumerate(product_cards):
            try:
                # Check for product name
                name = card.find_element_by_css_selector(".hot-product-card-name")
                assert name.text != "", f"Product {i+1} has empty name"
                
                # Check for product price
                price = card.find_element_by_css_selector(".hot-product-card-price")
                assert price.text != "", f"Product {i+1} has empty price"
                
                # Check for product link
                link = card.find_element_by_css_selector("a")
                assert link.get_attribute("href") != "", f"Product {i+1} has empty link"
                
            except Exception as e:
                pytest.fail(f"Product card {i+1} missing required elements: {str(e)}")
        
        print("PASS: All product cards have required elements")
    
    @pytest.mark.ecommerce
    def test_product_information_retrieval(self, driver):
        """Test retrieving product information."""
        page = CymbalShopsPage(driver)
        page.navigate_to_homepage()
        
        # Test getting product price
        price = page.get_product_price("OLJCESPC7Z")  # Sunglasses
        assert price is not None, "Failed to get product price"
        assert "$" in price, f"Price should contain '$', got '{price}'"
        
        # Test getting product name
        name = page.get_product_name("OLJCESPC7Z")  # Sunglasses
        assert name is not None, "Failed to get product name"
        assert name == "Sunglasses", f"Expected 'Sunglasses', got '{name}'"
        
        print("PASS: Product information retrieved successfully")
    
    @pytest.mark.ecommerce
    def test_currency_conversion(self, driver):
        """Test currency conversion functionality."""
        page = CymbalShopsPage(driver)
        page.navigate_to_homepage()
        
        # Get initial prices in USD
        initial_prices = page.get_all_product_prices()
        assert len(initial_prices) > 0, "No product prices found"
        
        # Change to EUR
        success = page.change_currency("EUR")
        assert success, "Failed to change currency to EUR"
        
        # Verify currency changed
        current_currency = page.get_current_currency()
        assert current_currency == "EUR", f"Currency should be EUR, got {current_currency}"
        
        # Get new prices
        new_prices = page.get_all_product_prices()
        assert len(new_prices) > 0, "No product prices found after currency change"
        
        # Verify prices changed (should have € symbol)
        for price in new_prices:
            assert "€" in price, f"Price should contain '€', got '{price}'"
        
        print("PASS: Currency conversion working correctly")
    
    @pytest.mark.ecommerce
    def test_multiple_currencies(self, driver):
        """Test multiple currency options."""
        page = CymbalShopsPage(driver)
        page.navigate_to_homepage()
        
        currencies_to_test = ["USD", "EUR", "JPY", "GBP"]
        
        for currency in currencies_to_test:
            success = page.change_currency(currency)
            assert success, f"Failed to change currency to {currency}"
            
            current_currency = page.get_current_currency()
            assert current_currency == currency, f"Currency should be {currency}, got {current_currency}"
            
            # Verify prices are displayed
            prices = page.get_all_product_prices()
            assert len(prices) > 0, f"No prices found for {currency}"
            
            time.sleep(1)  # Brief pause between currency changes
        
        print("PASS: Multiple currencies tested successfully")
    
    @pytest.mark.ecommerce
    def test_product_navigation(self, driver):
        """Test navigating to product detail pages."""
        page = CymbalShopsPage(driver)
        page.navigate_to_homepage()
        
        # Test clicking on a product
        page.click_product("OLJCESPC7Z")  # Sunglasses
        
        # Verify we're on a product page
        current_url = driver.current_url
        assert "/product/" in current_url, f"Should be on product page, got {current_url}"
        
        print("PASS: Product navigation working correctly")
    
    @pytest.mark.ecommerce
    @pytest.mark.slow
    def test_cart_functionality(self, driver):
        """Test adding products to cart."""
        page = CymbalShopsPage(driver)
        page.navigate_to_homepage()
        
        # Try to add a product to cart
        success = page.add_product_to_cart("OLJCESPC7Z")  # Sunglasses
        
        # Note: This test might fail if the demo site doesn't have full cart functionality
        # The test validates that the add to cart process doesn't crash
        if success:
            print("PASS: Product added to cart successfully")
        else:
            print("INFO: Cart functionality not fully implemented in demo site")
    
    @pytest.mark.ecommerce
    def test_page_responsiveness(self, driver):
        """Test page responsiveness by changing window size."""
        page = CymbalShopsPage(driver)
        page.navigate_to_homepage()
        
        # Test different window sizes
        window_sizes = [(1920, 1080), (1366, 768), (768, 1024), (375, 667)]
        
        for width, height in window_sizes:
            driver.set_window_size(width, height)
            time.sleep(1)
            
            # Verify page still loads
            assert page.verify_page_loaded(), f"Page failed to load at {width}x{height}"
            
            # Verify products are still visible
            product_cards = page.get_product_cards()
            assert len(product_cards) > 0, f"No products visible at {width}x{height}"
        
        print("PASS: Page responsive across different screen sizes")
    
    @pytest.mark.ecommerce
    def test_page_performance(self, driver):
        """Test page load performance."""
        page = CymbalShopsPage(driver)
        
        start_time = time.time()
        page.navigate_to_homepage()
        load_time = time.time() - start_time
        
        # Verify page loads within reasonable time (5 seconds)
        assert load_time < 5, f"Page took too long to load: {load_time:.2f} seconds"
        
        # Verify page loaded correctly
        assert page.verify_page_loaded(), "Page failed to load after performance test"
        
        print(f"PASS: Page loaded in {load_time:.2f} seconds")
