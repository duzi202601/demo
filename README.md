# Demo Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

A comprehensive demo project showcasing best practices for Python development, including project structure, documentation, testing, and CI/CD integration.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Clean Architecture**: Well-organized project structure following Python best practices
- **Comprehensive Documentation**: Detailed README and inline code documentation
- **Testing Support**: Unit tests with pytest
- **Code Quality**: Pre-configured linting and formatting tools
- **CI/CD Ready**: GitHub Actions workflow for automated testing

## Installation

### Prerequisites

- Python 3.8 or higher
- pip package manager

### Setup

1. Clone the repository:
```bash
git clone https://github.com/duzi202601/demo.git
cd demo
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Basic Example

```python
from demo import Greeter

# Create a greeter instance
greeter = Greeter("World")

# Get greeting message
message = greeter.greet()
print(message)  # Output: Hello, World!
```

### Command Line Interface

```bash
# Run the demo application
python -m demo --name "Alice"

# Show help
python -m demo --help
```

## Project Structure

```
demo/
├── demo/                  # Main package directory
│   ├── __init__.py       # Package initialization
│   ├── __main__.py       # CLI entry point
│   └── greeter.py        # Core functionality
├── tests/                 # Test directory
│   ├── __init__.py
│   └── test_greeter.py   # Unit tests
├── docs/                  # Documentation
│   └── examples.md       # Usage examples
├── .gitignore            # Git ignore rules
├── .github/              # GitHub configuration
│   └── workflows/        # CI/CD workflows
│       └── test.yml      # Testing workflow
├── requirements.txt      # Project dependencies
├── setup.py              # Package setup
├── LICENSE               # License file
├── CONTRIBUTING.md       # Contribution guidelines
├── CODE_OF_CONDUCT.md    # Code of conduct
└── README.md             # This file
```

## Development

### Setting up Development Environment

1. Install development dependencies:
```bash
pip install -r requirements-dev.txt
```

2. Install pre-commit hooks (optional):
```bash
pre-commit install
```

### Code Style

This project uses:
- **Black** for code formatting
- **isort** for import sorting
- **flake8** for linting
- **mypy** for type checking

Run code quality checks:
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

## Testing

Run tests using pytest:

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=demo --cov-report=html

# Run specific test file
pytest tests/test_greeter.py
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development process
- Submitting pull requests
- Reporting issues

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or issues, please:
- Open an issue on GitHub
- Check existing documentation in the `docs/` folder

## Acknowledgments

- Thanks to all contributors
- Built with Python and love ❤️
