"""
Unit tests for the Greeter class.
"""

import pytest
from demo import Greeter


class TestGreeter:
    """Test cases for the Greeter class."""
    
    def test_init_default(self):
        """Test Greeter initialization with default name."""
        greeter = Greeter()
        assert greeter.name == "World"
    
    def test_init_custom_name(self):
        """Test Greeter initialization with custom name."""
        greeter = Greeter("Alice")
        assert greeter.name == "Alice"
    
    def test_init_strips_whitespace(self):
        """Test that initialization strips whitespace from name."""
        greeter = Greeter("  Bob  ")
        assert greeter.name == "Bob"
    
    def test_init_empty_name_raises_error(self):
        """Test that empty name raises ValueError."""
        with pytest.raises(ValueError, match="Name cannot be empty"):
            Greeter("")
    
    def test_init_whitespace_only_raises_error(self):
        """Test that whitespace-only name raises ValueError."""
        with pytest.raises(ValueError, match="Name cannot be empty"):
            Greeter("   ")
    
    def test_init_non_string_raises_error(self):
        """Test that non-string name raises TypeError."""
        with pytest.raises(TypeError, match="Name must be a string"):
            Greeter(123)
    
    def test_greet_default(self):
        """Test greeting with default greeting word."""
        greeter = Greeter("Alice")
        assert greeter.greet() == "Hello, Alice!"
    
    def test_greet_custom(self):
        """Test greeting with custom greeting word."""
        greeter = Greeter("Bob")
        assert greeter.greet("Hi") == "Hi, Bob!"
    
    def test_greet_non_string_raises_error(self):
        """Test that non-string greeting raises TypeError."""
        greeter = Greeter("Alice")
        with pytest.raises(TypeError, match="Greeting must be a string"):
            greeter.greet(123)
    
    def test_greet_multiple_empty_list(self):
        """Test greeting multiple with empty list."""
        greeter = Greeter("World")
        assert greeter.greet_multiple([]) == []
    
    def test_greet_multiple_single_name(self):
        """Test greeting multiple with single name."""
        greeter = Greeter("World")
        result = greeter.greet_multiple(["Alice"])
        assert result == ["Hello, Alice!"]
    
    def test_greet_multiple_many_names(self):
        """Test greeting multiple with many names."""
        greeter = Greeter("World")
        result = greeter.greet_multiple(["Alice", "Bob", "Charlie"])
        assert result == ["Hello, Alice!", "Hello, Bob!", "Hello, Charlie!"]
    
    def test_greet_multiple_non_list_raises_error(self):
        """Test that non-list argument raises TypeError."""
        greeter = Greeter("World")
        with pytest.raises(TypeError, match="Names must be a list"):
            greeter.greet_multiple("Alice")
    
    def test_greet_multiple_with_invalid_name(self):
        """Test that invalid name in list raises appropriate error."""
        greeter = Greeter("World")
        with pytest.raises((TypeError, ValueError)):
            greeter.greet_multiple(["Alice", ""])
