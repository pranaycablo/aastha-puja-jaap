# -*- coding: utf-8 -*-
import os
import re

dir_path = 'src/data/canonicalScriptures'
for fname in os.listdir(dir_path):
    if not fname.endswith('.ts'):
        continue
    fpath = os.path.join(dir_path, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        text = f.read()

    # In these files, sanskrit, hindi, and english properties might have raw newlines inside single quotes
    # Let's replace:
    # sanskrit: '...' -> sanskrit: `...`
    # or escape newlines inside single quotes
    
    # We can match: sanskrit: '(.*?)' with re.DOTALL and replace with sanskrit: `\1`
    def replacer(match):
        key = match.group(1)
        val = match.group(2)
        # remove single quotes and use backticks, or replace newlines with \n
        val_clean = val.replace('\\', '\\\\').replace('`', '\\`').replace('\r\n', '\\n').replace('\n', '\\n')
        return f"{key}: '{val_clean}'"

    # More safely, let's replace any physical newline inside '...' for sanskrit/hindi/english/title/tattva
    # Or simply: change sanskrit: '...' to sanskrit: `...`
    # Let's see if we can convert sanskrit: '...' to sanskrit: `...`
    pattern = r"(sanskrit|hindi|english|tattvaBodhaHi|tattvaBodhaEn|sectionTitleHi|sectionTitleEn|descriptionHi|descriptionEn):\s*'([^']*(?:\n[^']*)+)'"
    
    # Let's iteratively fix any single-quoted string containing literal newlines
    lines = text.splitlines(True)
    fixed_lines = []
    in_single_quote = False
    buffer = []
    
    i = 0
    while i < len(lines):
        line = lines[i]
        # Check if line has unclosed single quote (odd number of unescaped ')
        # But even simpler: regex to find multi-line string in property:
        fixed_lines.append(line)
        i += 1

    # Let's write a targeted regex replacement for:
    # sanskrit: '...
    # ...'
    # -> sanskrit: `...
    # ...`
    new_text = re.sub(
        r"(sanskrit):\s*'([^']*)'",
        lambda m: f"{m.group(1)}: `{m.group(2)}`",
        text,
        flags=re.DOTALL
    )

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print(f"Sanitized {fname}")
