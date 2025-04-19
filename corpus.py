import json
import os

# Function to parse tokens and meanings from a string
def parse_tokens_meanings(input_str):
    pairs = input_str.split(';')
    tokens_meanings = []
    for pair in pairs:
        # Only process if '—' is present
        if '—' in pair:
            token, meaning = pair.split('—', 1)
            tokens_meanings.append({
                "token": token.strip(),
                "meaning": meaning.strip()
            })
    return tokens_meanings

# Modify these file names if you wish to use a different chapter.
shlokas_file = "chapter18.txt"     # File with transliterated shlokas (one per line)
meanings_file = "chapter18_meaning.txt"   # File with corresponding tokens-meanings (one per line)
corpus_file = "sanskrit_corpus.json"

# Load existing corpus from JSON if it exists
if os.path.exists(corpus_file):
    try:
        with open(corpus_file, 'r', encoding='utf-8') as file:
            corpus = json.load(file)
            if not isinstance(corpus, list):
                corpus = []
    except json.JSONDecodeError:
        corpus = []
else:
    corpus = []

# Input the chapter number (this will be used to generate shloka numbers)
chapter = input("Enter Chapter number: ").strip()

# Read all shlokas from the first text file
with open(shlokas_file, 'r', encoding='utf-8') as file:
    shloka_lines = [line.strip() for line in file.readlines()]

# Read all corresponding token-meanings from the second text file
with open(meanings_file, 'r', encoding='utf-8') as file:
    meaning_lines = [line.strip() for line in file.readlines()]

# Debug prints: check number of lines read from each file
print(f"Number of shlokas read: {len(shloka_lines)}")
print(f"Number of meanings read: {len(meaning_lines)}")

# Determine the number of shlokas to process (in case of mismatch)
num_shlokas = min(len(shloka_lines), len(meaning_lines))
if len(shloka_lines) != len(meaning_lines):
    print("Warning: The number of shlokas and meanings do not match!")
    print(f"Processing {num_shlokas} pairs.")

# Process each pair and append to the corpus
for index in range(num_shlokas):
    shloka = shloka_lines[index]
    meaning_line = meaning_lines[index]
    shloka_number = f"{chapter}.{index + 1}"  # Creating shloka number as chapter.line_number
    tokens_meanings = parse_tokens_meanings(meaning_line)
    shloka_entry = {
        "shloka_number": shloka_number,
        "shloka": shloka,
        "tokens": tokens_meanings
    }
    corpus.append(shloka_entry)

# Save the updated corpus to the JSON file
with open(corpus_file, 'w', encoding='utf-8') as file:
    json.dump(corpus, file, ensure_ascii=False, indent=4)

print(f"Chapter {chapter} added successfully with {num_shlokas} shlokas!")