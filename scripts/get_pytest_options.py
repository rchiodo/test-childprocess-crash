import sys
from _pytest.config import get_config
import time

c = get_config()
time.sleep(30)
c.parse(sys.argv)
print(f"Python classes: {c.getini('python_classes')}")
print(f"Python files: {c.getini('python_files')}")
print(f"Python functions: {c.getini('python_functions')}")