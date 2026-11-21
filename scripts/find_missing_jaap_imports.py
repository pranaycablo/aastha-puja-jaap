import re

with open('src/components/JaapPage.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Extract all JSX tags like <SomeIcon ...>
jsx_tags = set(re.findall(r'<([A-Z][A-Za-z0-9_]+)', code))
print("All JSX tags found in JaapPage.tsx:", jsx_tags)

# Standard React or HTML components or components defined in imports
standard = {'React', 'Fragment'}

# Check which tags are imported or declared in JaapPage.tsx
missing = []
for tag in jsx_tags:
    pattern = rf'\b{tag}\b'
    # Count occurrences in imports section (first 100 lines)
    import_section = '\n'.join(code.split('\n')[:100])
    if tag not in standard and not re.search(pattern, import_section):
        missing.append(tag)

print("Missing imports in JaapPage.tsx:", missing)
