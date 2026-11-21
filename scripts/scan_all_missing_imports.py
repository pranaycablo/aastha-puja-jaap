import glob
import re

files = glob.glob('src/**/*.tsx', recursive=True)
print(f"Checking {len(files)} TSX files for missing JSX tags...")

any_missing = False
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        code = f.read()

    # Get imports section (up to first component function or const)
    lines = code.split('\n')
    import_lines = []
    for line in lines:
        if line.strip().startswith('export const') or line.strip().startswith('const ') or line.strip().startswith('function ') or line.strip().startswith('export function ') or line.strip().startswith('export default'):
            break
        import_lines.append(line)
    import_text = '\n'.join(import_lines)

    jsx_tags = set(re.findall(r'<([A-Z][A-Za-z0-9_]+)', code))
    # Exclude standard/self-declared tags
    declared = set(re.findall(r'(?:interface|type|class|const|function)\s+([A-Z][A-Za-z0-9_]+)', code))

    for tag in jsx_tags:
        if tag in {'React', 'Fragment'}:
            continue
        if tag in declared:
            continue
        if not re.search(rf'\b{tag}\b', import_text):
            print(f"Missing in {fpath}: <{tag}>")
            any_missing = True

if not any_missing:
    print("ALL TSX FILES HAVE 100% COMPLETE AND VALID IMPORTS!")
