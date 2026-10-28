"""Structured logging with sensitive data redaction."""
import logging
import re

SENSITIVE_PATTERNS = [
    re.compile(r'("?(?:password|token|secret|key|authorization|bearer)"?\s*[:=]\s*)"?[^"\s,]+"?', re.I)
]


class RedactingFormatter(logging.Formatter):
    def format(self, record):
        msg = super().format(record)
        for pattern in SENSITIVE_PATTERNS:
            msg = pattern.sub(r'\1"[REDACTED]"', msg)
        return msg


logger = logging.getLogger("smps")
handler = logging.StreamHandler()
handler.setFormatter(RedactingFormatter("%(asctime)s [%(levelname)s] [%(name)s] %(message)s"))
logger.addHandler(handler)
logger.setLevel(logging.INFO)
