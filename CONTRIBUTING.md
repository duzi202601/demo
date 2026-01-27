# Contributing to Demo Project

Thank you for your interest in contributing to this project! We welcome contributions from everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/demo.git
   cd demo
   ```
3. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
4. Install development dependencies:
   ```bash
   pip install -r requirements-dev.txt
   ```
5. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

1. **Before You Start**: Check if there's an existing issue for what you want to work on. If not, create one to discuss your plans.

2. **Make Your Changes**: 
   - Write clear, concise code
   - Follow the coding standards (see below)
   - Add or update tests as needed
   - Update documentation if necessary

3. **Test Your Changes**:
   ```bash
   # Run tests
   pytest
   
   # Check code coverage
   pytest --cov=demo --cov-report=html
   ```

4. **Check Code Quality**:
   ```bash
   # Format code
   black demo tests
   
   # Sort imports
   isort demo tests
   
   # Lint code
   flake8 demo tests
   
   # Type check
   mypy demo
   ```

## Coding Standards

- **Python Version**: Support Python 3.8+
- **Code Style**: Follow PEP 8 guidelines
- **Formatting**: Use Black for code formatting
- **Import Sorting**: Use isort
- **Type Hints**: Add type hints to all functions
- **Docstrings**: Use Google-style docstrings for all public functions and classes
- **Line Length**: Maximum 100 characters (Black's default)

### Example Code Style

```python
def greet(name: str, greeting: str = "Hello") -> str:
    """
    Generate a greeting message.
    
    Args:
        name (str): The name to greet.
        greeting (str): The greeting word to use. Defaults to "Hello".
        
    Returns:
        str: The formatted greeting message.
        
    Raises:
        TypeError: If name or greeting is not a string.
        ValueError: If name is empty.
    """
    if not isinstance(name, str):
        raise TypeError("Name must be a string")
    return f"{greeting}, {name}!"
```

## Testing

- Write unit tests for all new functionality
- Ensure all tests pass before submitting a pull request
- Aim for high code coverage (>80%)
- Use pytest for testing
- Follow the existing test structure in `tests/`

### Running Tests

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_greeter.py

# Run with coverage
pytest --cov=demo --cov-report=html

# Run with verbose output
pytest -v
```

## Submitting Changes

1. **Commit Your Changes**:
   - Write clear, descriptive commit messages
   - Use the imperative mood ("Add feature" not "Added feature")
   - Reference issue numbers in commit messages when applicable
   
   ```bash
   git add .
   git commit -m "Add new greeting feature (#123)"
   ```

2. **Push to Your Fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request**:
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template with:
     - Description of changes
     - Related issue number
     - Testing performed
     - Screenshots (if applicable)

4. **Code Review**:
   - Respond to review comments promptly
   - Make requested changes
   - Update your PR by pushing new commits to your branch

## Pull Request Checklist

Before submitting a pull request, ensure:

- [ ] Code follows the project's coding standards
- [ ] All tests pass
- [ ] New code is covered by tests
- [ ] Documentation is updated (if applicable)
- [ ] Commit messages are clear and descriptive
- [ ] PR description clearly explains the changes

## Questions?

If you have questions, please:
- Open an issue on GitHub
- Check existing documentation
- Review closed issues and PRs for similar questions

Thank you for contributing!
