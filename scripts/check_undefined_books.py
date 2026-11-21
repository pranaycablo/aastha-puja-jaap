import re

with open('src/data/grandScriptureCanonData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all books: [ ... ]
books_matches = re.findall(r'books:\s*\[([\s\S]*?)\]', text)
all_book_names = []
for bm in books_matches:
    names = [n.strip() for n in bm.split(',') if n.strip()]
    all_book_names.extend(names)

print("Total book identifiers in categories:", len(all_book_names))

# Check which ones are imported or defined in the file
undefined_books = []
for b in all_book_names:
    pattern = rf'\b{b}\b'
    # Count occurrences: should appear at least twice (import/const + books array)
    count = len(re.findall(pattern, text))
    if count < 2:
        undefined_books.append(b)

print("Undefined book identifiers:", undefined_books)
