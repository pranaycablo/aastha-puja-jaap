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

    # For english: and hindi: and tattva:
    # If the property starts with key: ' and ends with ',
    # let's extract the inside and wrap with `...` (escaping any backticks)
    lines = text.splitlines(True)
    fixed = []
    for line in lines:
        for key in ['hindi', 'english', 'tattvaBodhaHi', 'tattvaBodhaEn', 'sectionTitleHi', 'sectionTitleEn', 'descriptionHi', 'descriptionEn', 'chapterTitleHi', 'chapterTitleEn']:
            prefix = f"{key}: '"
            if line.strip().startswith(prefix):
                # find leading indent
                indent_len = len(line) - len(line.lstrip())
                indent = line[:indent_len]
                stripped = line.strip()
                # remove prefix
                rest = stripped[len(prefix):]
                # remove trailing ', or '
                if rest.endswith("',"):
                    inner = rest[:-2]
                    # unescape escaped quotes if any, then escape backticks
                    inner = inner.replace('\\`', '`').replace('`', '\\`')
                    line = f"{indent}{key}: `{inner}`,\n"
                elif rest.endswith("'"):
                    inner = rest[:-1]
                    inner = inner.replace('\\`', '`').replace('`', '\\`')
                    line = f"{indent}{key}: `{inner}`\n"
        fixed.append(line)

    with open(fpath, 'w', encoding='utf-8') as f:
        f.writelines(fixed)
    print(f"Fixed quotes in {fname}")
