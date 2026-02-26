# settings.py
import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# DO NOT crash at import time
if not OPENROUTER_API_KEY:
    print("WARNING: OPENROUTER_API_KEY is not set")
