"""
Greeter Module

Provides a simple Greeter class for demonstration purposes.
"""


class Greeter:
    """
    A simple greeter class that generates greeting messages.
    
    Attributes:
        name (str): The name to greet.
    """
    
    def __init__(self, name: str = "World"):
        """
        Initialize the Greeter.
        
        Args:
            name (str): The name to greet. Defaults to "World".
        """
        if not isinstance(name, str):
            raise TypeError("Name must be a string")
        if not name.strip():
            raise ValueError("Name cannot be empty")
        self.name = name.strip()
    
    def greet(self, greeting: str = "Hello") -> str:
        """
        Generate a greeting message.
        
        Args:
            greeting (str): The greeting word to use. Defaults to "Hello".
            
        Returns:
            str: The formatted greeting message.
            
        Examples:
            >>> greeter = Greeter("Alice")
            >>> greeter.greet()
            'Hello, Alice!'
            >>> greeter.greet("Hi")
            'Hi, Alice!'
        """
        if not isinstance(greeting, str):
            raise TypeError("Greeting must be a string")
        return f"{greeting}, {self.name}!"
    
    def greet_multiple(self, names: list) -> list:
        """
        Generate greeting messages for multiple names.
        
        Args:
            names (list): List of names to greet.
            
        Returns:
            list: List of greeting messages.
            
        Examples:
            >>> greeter = Greeter("World")
            >>> greeter.greet_multiple(["Alice", "Bob"])
            ['Hello, Alice!', 'Hello, Bob!']
        """
        if not isinstance(names, list):
            raise TypeError("Names must be a list")
        
        greetings = []
        for name in names:
            temp_greeter = Greeter(name)
            greetings.append(temp_greeter.greet())
        return greetings
