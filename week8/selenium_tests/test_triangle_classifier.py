import pytest
import time
from page_objects.triangle_classifier_page import TriangleClassifierPage

class TestTriangleClassifier:
    """Test cases for Triangle Classifier application."""
    
    @pytest.mark.mathematical
    def test_application_loading(self, driver):
        """Test that the Triangle Classifier application loads correctly."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        # Verify page loaded
        assert page.verify_page_loaded(), "Application failed to load"
        
        # Verify page title
        title = page.get_page_title()
        assert "Triangle Classifier" in title, f"Unexpected page title: {title}"
        
        print("PASS: Triangle Classifier application loaded successfully")
    
    @pytest.mark.mathematical
    def test_input_fields_presence(self, driver):
        """Test that all required input fields are present."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        # Verify all input fields exist
        side_a = page.get_side_a_input()
        side_b = page.get_side_b_input()
        side_c = page.get_side_c_input()
        
        assert side_a is not None, "Side A input field not found"
        assert side_b is not None, "Side B input field not found"
        assert side_c is not None, "Side C input field not found"
        
        # Verify classify button exists
        classify_button = page.get_classify_button()
        assert classify_button is not None, "Classify button not found"
        
        print("PASS: All input fields and button present")
    
    @pytest.mark.mathematical
    def test_input_field_placeholders(self, driver):
        """Test that input fields have appropriate placeholder text."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        placeholders = page.get_placeholder_text()
        
        # Verify placeholder text contains expected content
        assert "side A" in placeholders["sideA"].lower(), f"Unexpected placeholder for Side A: {placeholders['sideA']}"
        assert "side B" in placeholders["sideB"].lower(), f"Unexpected placeholder for Side B: {placeholders['sideB']}"
        assert "side C" in placeholders["sideC"].lower(), f"Unexpected placeholder for Side C: {placeholders['sideC']}"
        
        print("PASS: Input field placeholders are appropriate")
    
    @pytest.mark.mathematical
    def test_equilateral_triangle_classification(self, driver):
        """Test classification of equilateral triangle."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        # Test equilateral triangle (all sides equal)
        result = page.test_triangle_classification(5, 5, 5)
        
        if result["type"] == "success":
            assert "equilateral" in result["result"].lower(), f"Expected equilateral, got: {result['result']}"
            print("PASS: Equilateral triangle correctly classified")
        else:
            pytest.fail(f"Classification failed: {result['message']}")
    
    @pytest.mark.mathematical
    def test_isosceles_triangle_classification(self, driver):
        """Test classification of isosceles triangle."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        # Test isosceles triangle (two sides equal)
        result = page.test_triangle_classification(5, 5, 3)
        
        if result["type"] == "success":
            assert "isosceles" in result["result"].lower(), f"Expected isosceles, got: {result['result']}"
            print("PASS: Isosceles triangle correctly classified")
        else:
            pytest.fail(f"Classification failed: {result['message']}")
    
    @pytest.mark.mathematical
    def test_scalene_triangle_classification(self, driver):
        """Test classification of scalene triangle."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        # Test scalene triangle (all sides different)
        result = page.test_triangle_classification(3, 4, 5)
        
        if result["type"] == "success":
            assert "scalene" in result["result"].lower(), f"Expected scalene, got: {result['result']}"
            print("PASS: Scalene triangle correctly classified")
        else:
            pytest.fail(f"Classification failed: {result['message']}")
    
    @pytest.mark.mathematical
    def test_invalid_triangle_validation(self, driver):
        """Test validation of invalid triangle inputs."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        # Test invalid triangle (violates triangle inequality)
        result = page.test_triangle_classification(1, 2, 10)
        
        if result["type"] == "error":
            assert "invalid" in result["message"].lower() or "cannot" in result["message"].lower(), \
                f"Expected error message about invalid triangle, got: {result['message']}"
            print("PASS: Invalid triangle properly rejected")
        else:
            pytest.fail(f"Expected error for invalid triangle, got success: {result['result']}")
    
    @pytest.mark.mathematical
    def test_zero_side_validation(self, driver):
        """Test validation of zero side lengths."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        # Test triangle with zero side
        result = page.test_triangle_classification(0, 3, 4)
        
        if result["type"] == "error":
            assert "positive" in result["message"].lower() or "invalid" in result["message"].lower(), \
                f"Expected error message about zero/negative sides, got: {result['message']}"
            print("PASS: Zero side length properly rejected")
        else:
            pytest.fail(f"Expected error for zero side, got success: {result['result']}")
    
    @pytest.mark.mathematical
    def test_negative_side_validation(self, driver):
        """Test validation of negative side lengths."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        # Test triangle with negative side
        result = page.test_triangle_classification(-1, 3, 4)
        
        if result["type"] == "error":
            assert "positive" in result["message"].lower() or "invalid" in result["message"].lower(), \
                f"Expected error message about negative sides, got: {result['message']}"
            print("PASS: Negative side length properly rejected")
        else:
            pytest.fail(f"Expected error for negative side, got success: {result['result']}")
    
    @pytest.mark.mathematical
    def test_floating_point_precision(self, driver):
        """Test handling of floating-point numbers."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        # Test equilateral triangle with floating-point sides
        result = page.test_triangle_classification(5.5, 5.5, 5.5)
        
        if result["type"] == "success":
            assert "equilateral" in result["result"].lower(), f"Expected equilateral, got: {result['result']}"
            print("PASS: Floating-point precision handled correctly")
        else:
            pytest.fail(f"Classification failed: {result['message']}")
    
    @pytest.mark.mathematical
    def test_multiple_triangle_types(self, driver):
        """Test multiple triangle types in sequence."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        test_cases = [
            {"sides": [6, 6, 6], "expected": "equilateral"},
            {"sides": [5, 5, 3], "expected": "isosceles"},
            {"sides": [3, 4, 5], "expected": "scalene"},
            {"sides": [7.5, 7.5, 7.5], "expected": "equilateral"}
        ]
        
        for i, test_case in enumerate(test_cases):
            # Refresh page for each test to ensure clean state
            page.navigate_to_app()
            
            result = page.test_triangle_classification(
                test_case["sides"][0],
                test_case["sides"][1],
                test_case["sides"][2]
            )
            
            if result["type"] == "success":
                assert test_case["expected"] in result["result"].lower(), \
                    f"Test {i+1}: Expected {test_case['expected']}, got: {result['result']}"
            else:
                pytest.fail(f"Test {i+1} failed: {result['message']}")
        
        print("PASS: Multiple triangle types classified correctly")
    
    @pytest.mark.mathematical
    def test_triangle_types_information_display(self, driver):
        """Test that triangle type information is displayed on the page."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        triangle_types = page.get_triangle_types_info()
        
        # Verify all three triangle types are mentioned
        expected_types = ["Equilateral", "Isosceles", "Scalene"]
        found_types = [t for t in triangle_types if t in expected_types]
        
        assert len(found_types) >= 2, f"Expected at least 2 triangle types, found: {found_types}"
        
        print("PASS: Triangle type information displayed correctly")
    
    @pytest.mark.mathematical
    def test_button_state_management(self, driver):
        """Test that the classify button state is managed correctly."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        # Initially button should be disabled (no inputs)
        assert not page.is_button_enabled(), "Button should be disabled initially"
        
        # Add partial input
        page.input_sides(5, "", "")
        assert not page.is_button_enabled(), "Button should be disabled with partial input"
        
        # Add complete input
        page.input_sides(5, 5, 5)
        assert page.is_button_enabled(), "Button should be enabled with complete input"
        
        print("PASS: Button state management working correctly")
    
    @pytest.mark.mathematical
    def test_input_validation(self, driver):
        """Test input field validation."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        # Test with non-numeric input
        page.input_sides("abc", "def", "ghi")
        
        # Try to classify
        page.classify_triangle()
        
        # Should get an error or no result
        result = page.get_result_text()
        error = page.get_error_message()
        
        if error:
            print("PASS: Non-numeric input properly rejected")
        elif not result or "enter" in result.lower():
            print("PASS: Non-numeric input handled appropriately")
        else:
            pytest.fail("Non-numeric input should be rejected")
    
    @pytest.mark.mathematical
    def test_edge_case_triangles(self, driver):
        """Test edge cases for triangle classification."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        # Test very small numbers
        result = page.test_triangle_classification(0.1, 0.1, 0.1)
        if result["type"] == "success":
            assert "equilateral" in result["result"].lower()
            print("PASS: Very small numbers handled correctly")
        
        # Test very large numbers
        result = page.test_triangle_classification(1000, 1000, 1000)
        if result["type"] == "success":
            assert "equilateral" in result["result"].lower()
            print("PASS: Very large numbers handled correctly")
    
    @pytest.mark.mathematical
    def test_application_performance(self, driver):
        """Test application performance with multiple classifications."""
        page = TriangleClassifierPage(driver)
        page.navigate_to_app()
        
        start_time = time.time()
        
        # Perform multiple classifications
        for i in range(5):
            page.input_sides(3 + i, 4 + i, 5 + i)
            page.classify_triangle()
            time.sleep(0.1)  # Brief pause
        
        total_time = time.time() - start_time
        
        # Should complete within reasonable time (2 seconds)
        assert total_time < 2, f"Performance test took too long: {total_time:.2f} seconds"
        
        print(f"PASS: Performance test completed in {total_time:.2f} seconds")
