"""
Command-line interface for the demo package.
"""

import argparse
import sys
from .greeter import Greeter


def main():
    """Main entry point for the CLI."""
    parser = argparse.ArgumentParser(
        description="Demo greeting application",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python -m demo --name Alice
  python -m demo --name "Bob Smith" --greeting Hi
        """
    )
    
    parser.add_argument(
        "--name",
        "-n",
        type=str,
        default="World",
        help="Name to greet (default: World)"
    )
    
    parser.add_argument(
        "--greeting",
        "-g",
        type=str,
        default="Hello",
        help="Greeting word (default: Hello)"
    )
    
    parser.add_argument(
        "--version",
        "-v",
        action="version",
        version="%(prog)s 0.1.0"
    )
    
    args = parser.parse_args()
    
    try:
        greeter = Greeter(args.name)
        message = greeter.greet(args.greeting)
        print(message)
        return 0
    except (TypeError, ValueError) as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
