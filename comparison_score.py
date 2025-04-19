from fuzzywuzzy import fuzz
import json

# Load your corpus
with open("sanskrit_corpus.json", "r", encoding="utf-8") as f:
    corpus = json.load(f)

def flatten_tokens_from_corpus(corpus):
    """Extract all unique Sanskrit tokens from the corpus."""
    token_list = set()
    for shloka in corpus:
        for token_entry in shloka.get("tokens", []):
            token = token_entry["token"].strip().lower()
            token_list.add(token)
    return list(token_list)

def get_most_similar_word(input_word, corpus_tokens):
    input_word = input_word.strip().lower()
    best_match = ""
    highest_score = 0

    for token in corpus_tokens:
        score = fuzz.ratio(input_word, token)
        if score > highest_score:
            highest_score = score
            best_match = token

    return best_match, highest_score

# Example usage
input_word = input("Enter a Sanskrit word: ")
corpus_tokens = flatten_tokens_from_corpus(corpus)
matched_word, similarity = get_most_similar_word(input_word, corpus_tokens)

print(f"\n🔍 Best Match: '{matched_word}'")
print(f"✅ Similarity Score: {similarity}%")
