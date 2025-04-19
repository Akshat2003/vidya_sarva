import json

# Assuming 'corpus' is your list of shlokas like the one you've provided
with open("sanskrit_corpus.json", "r", encoding="utf-8") as f:
    corpus = json.load(f)

def build_token_dictionary(corpus):
    """Creates a flat dictionary from token to meaning from the full corpus."""
    token_meaning_dict = {}
    for shloka_entry in corpus:
        for token_entry in shloka_entry.get("tokens", []):
            token = token_entry["token"].strip().lower()
            meaning = token_entry["meaning"].strip()
            token_meaning_dict[token] = meaning
    return token_meaning_dict

def get_meanings_for_input(input_sentence, token_dict):
    """Finds English meanings for each word in input Sanskrit sentence."""
    input_tokens = input_sentence.strip().lower().split()
    translated = []

    for token in input_tokens:
        meaning = token_dict.get(token, "[?]")
        translated.append(f"{token} ({meaning})")

    return " ".join(translated)

# --- Usage ---
input_sentence = input()

token_dict = build_token_dictionary(corpus)
as_it_is_sentence = get_meanings_for_input(input_sentence, token_dict)

print("🔍 Word-by-word Meaning:")
print(as_it_is_sentence)
