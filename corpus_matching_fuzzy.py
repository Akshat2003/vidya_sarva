import json
from fuzzywuzzy import fuzz

# Load the corpus
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

def get_most_similar_token(input_token, token_dict, threshold=75):
    """Find the most similar token from the corpus with similarity ≥ threshold."""
    input_token = input_token.strip().lower()
    best_match = None
    best_score = 0

    for token in token_dict.keys():
        score = fuzz.ratio(input_token, token)
        if score > best_score and score >= threshold:
            best_match = token
            best_score = score

    return best_match, best_score

def get_meanings_for_input(input_sentence, token_dict):
    """Finds English meanings for each word in input Sanskrit sentence."""
    input_tokens = input_sentence.strip().lower().split()
    translated = []

    for token in input_tokens:
        if token in token_dict:
            meaning = token_dict[token]
            translated.append(f"{token} ({meaning})")
        else:
            similar_token, similarity = get_most_similar_token(token, token_dict)
            if similar_token:
                meaning = token_dict[similar_token]
                translated.append(f"{token} ({meaning}) ~{similar_token} [{similarity}%]")
            else:
                translated.append(f"{token} ([?])")

    return " ".join(translated)

# --- Usage ---
input_sentence = input("Enter a Sanskrit sentence:\n")

token_dict = build_token_dictionary(corpus)
as_it_is_sentence = get_meanings_for_input(input_sentence, token_dict)

print("\n🔍 Word-by-word Meaning (with fuzzy matching):")
print(as_it_is_sentence)
