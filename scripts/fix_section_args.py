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

    # Look for createSectionBlock call
    # createSectionBlock(\s*\d+,\s*\d+,\s*\d+,\s*
    # arg4,
    # arg5,
    # arg6,
    # arg7,
    # [
    def fix_section_block(match):
        full = match.group(0)
        # In this block, replace single-quoted strings with backtick strings
        # e.g. 'something' -> `something`
        # But carefully:
        lines = full.splitlines(True)
        new_lines = []
        for l in lines:
            trimmed = l.strip()
            # If line is '...', or '...'
            if trimmed.startswith("'") and (trimmed.endswith("',") or trimmed.endswith("'")):
                # extract string
                comma = trimmed.endswith("',")
                content = trimmed[1:-2] if comma else trimmed[1:-1]
                content = content.replace('\\`', '`').replace('`', '\\`')
                indent = l[:len(l) - len(l.lstrip())]
                new_l = f"{indent}`{content}`{',' if comma else ''}\n"
                new_lines.append(new_l)
            else:
                new_lines.append(l)
        return "".join(new_lines)

    text_fixed = re.sub(
        r"createSectionBlock\([^\)]*?\[",
        fix_section_block,
        text,
        flags=re.DOTALL
    )

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(text_fixed)
    print(f"Fixed section blocks in {fname}")
