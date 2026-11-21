# -*- coding: utf-8 -*-
with open('src/data/chalisaSundarkandData.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    # Check if a property line has unescaped quotes like: niyam: '... '...' ...',
    if (line.strip().startswith('niyam:') or 
        line.strip().startswith('meaning:') or 
        line.strip().startswith('benefits:') or 
        line.strip().startswith('siddhiVidhi:') or
        line.strip().startswith('samagri:') or
        line.strip().startswith('targetCountSiddhi:')):
        
        # split by ': '
        parts = line.split(': ', 1)
        if len(parts) == 2:
            key, val = parts
            val = val.rstrip()
            if val.endswith(','):
                val = val[:-1]
            val = val.strip()
            if val.startswith("'") and val.endswith("'"):
                inner = val[1:-1]
                # Replace unescaped single quotes inside
                inner_fixed = inner.replace("'", "\\'")
                new_line = f"{key}: '{inner_fixed}',\n"
                new_lines.append(new_line)
                continue
    new_lines.append(line)

with open('src/data/chalisaSundarkandData.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Checked and fixed all property lines in chalisaSundarkandData.ts")
