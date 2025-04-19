import streamlit as st
import json
from fuzzywuzzy import fuzz
import pandas as pd
import io
import base64
import requests
import os

class SanskritAnalyzer:
    def __init__(self, corpus_data=None, corpus_file=None):
        """Initialize with either direct corpus data or a file path."""
        self.corpus = corpus_data if corpus_data else self._load_corpus(corpus_file)
        self.token_dict = self._build_token_dictionary()
        
    def _load_corpus(self, corpus_file):
        """Load corpus from a JSON file."""
        try:
            with open(corpus_file, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            st.error(f"Error loading corpus: {e}")
            return []
            
    def _build_token_dictionary(self):
        """Creates a flat dictionary mapping tokens to meanings from the corpus."""
        token_meaning_dict = {}
        for shloka_entry in self.corpus:
            for token_entry in shloka_entry.get("tokens", []):
                token = token_entry["token"].strip().lower()
                meaning = token_entry["meaning"].strip()
                
                # If token appears multiple times with different meanings,
                # combine the meanings to provide more context
                if token in token_meaning_dict:
                    existing_meaning = token_meaning_dict[token]
                    if meaning not in existing_meaning:  # Avoid duplicates
                        token_meaning_dict[token] = f"{existing_meaning}; {meaning}"
                else:
                    token_meaning_dict[token] = meaning
        return token_meaning_dict
    
    def get_most_similar_token(self, input_token, threshold=75):
        """Find the most similar token from the corpus with similarity ≥ threshold."""
        input_token = input_token.strip().lower()
        best_match = None
        best_score = 0

        for token in self.token_dict.keys():
            score = fuzz.ratio(input_token, token)
            if score > best_score and score >= threshold:
                best_match = token
                best_score = score

        return best_match, best_score

    def get_meanings_for_input(self, input_sentence, threshold=75):
        """Finds English meanings for each word in input Sanskrit sentence."""
        input_tokens = input_sentence.strip().lower().split()
        results = []

        for token in input_tokens:
            if token in self.token_dict:
                meaning = self.token_dict[token]
                results.append({
                    "token": token,
                    "meaning": meaning,
                    "match_type": "exact",
                    "similar_token": None,
                    "similarity": 100
                })
            else:
                similar_token, similarity = self.get_most_similar_token(token, threshold)
                if similar_token:
                    meaning = self.token_dict[similar_token]
                    results.append({
                        "token": token,
                        "meaning": meaning,
                        "match_type": "fuzzy",
                        "similar_token": similar_token,
                        "similarity": similarity
                    })
                else:
                    results.append({
                        "token": token,
                        "meaning": "Unknown",
                        "match_type": "none",
                        "similar_token": None,
                        "similarity": 0
                    })

        return results
        
    def analyze_shloka(self, shloka_text, threshold=75):
        """Analyzes a complete shloka and returns structured results."""
        words = shloka_text.strip().lower().split()
        return self.get_meanings_for_input(" ".join(words), threshold)
        
    def get_corpus_stats(self):
        """Return basic statistics about the corpus."""
        total_shlokas = len(self.corpus)
        total_tokens = len(self.token_dict)
        return {
            "total_shlokas": total_shlokas,
            "total_tokens": total_tokens
        }

def get_gemini_translation(word_meanings, api_key):
    """Use Gemini API to generate a cohesive translation from word meanings."""
    try:
        # Prepare the context and prompt for Gemini
        context = " ".join(word_meanings)
        prompt = f"""I have analyzed a Sanskrit shloka, with the following word-by-word translation:
        
{context}

Please create a coherent, meaningful English sentence or paragraph that captures the essence of this shloka.
Maintain the same meaning but make it flow naturally in English. Don't be overly literal - focus on the overall message.
"""

        # Updated Gemini API endpoint for gemini-1.5-pro
        url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent"
        
        # Request parameters
        params = {
            "key": api_key
        }
        
        # Request body
        data = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.2,
                "topP": 0.8,
                "topK": 40,
                "maxOutputTokens": 200
            }
        }
        
        # Make the request
        response = requests.post(url, params=params, json=data)
        
        # Check if the request was successful
        if response.status_code == 200:
            # Parse the response
            result = response.json()
            # Extract the generated text from the response
            if "candidates" in result and len(result["candidates"]) > 0:
                generated_text = result["candidates"][0]["content"]["parts"][0]["text"]
                return generated_text
            else:
                return "No response text was generated by the API."
        else:
            error_message = f"Error with Gemini API: {response.status_code}"
            try:
                error_details = response.json()
                error_message += f" - {error_details}"
            except:
                error_message += f" - {response.text}"
            return error_message
    
    except Exception as e:
        return f"Error connecting to Gemini API: {str(e)}"

# UI Functions
def get_table_download_link(df, filename="data.csv", text="Download CSV"):
    """Generates a link allowing the data in a dataframe to be downloaded"""
    csv = df.to_csv(index=False)
    b64 = base64.b64encode(csv.encode()).decode()
    href = f'<a href="data:file/csv;base64,{b64}" download="{filename}">{text}</a>'
    return href

def main():
    st.set_page_config(
        page_title="Sanskrit Analyzer",
        page_icon="🕉️",
        layout="wide",
        initial_sidebar_state="expanded"
    )
    
    st.title("Sanskrit Text Analyzer")
    st.write("Analyze Sanskrit text and get word-by-word meanings with AI-powered translations")
    
    # Initialize session state variables if they don't exist
    if 'gemini_api_key' not in st.session_state:
        st.session_state.gemini_api_key = "AIzaSyD3yVMweiycLmG6YUQnqbnRwu0OUgi9ycg"  # Updated API key
    
    # Sidebar for configuration
    st.sidebar.title("Configuration")
    
    # API Key input
    st.sidebar.subheader("Gemini API")
    gemini_api_key = st.sidebar.text_input(
        "Gemini API Key",
        value=st.session_state.gemini_api_key,
        type="password"
    )
    st.session_state.gemini_api_key = gemini_api_key
    
    # Option to use uploaded corpus or default
    corpus_source = st.sidebar.radio(
        "Corpus Source",
        ["Upload JSON Corpus", "Use Example Corpus"]
    )
    
    analyzer = None
    
    if corpus_source == "Upload JSON Corpus":
        uploaded_file = st.sidebar.file_uploader("Upload Sanskrit corpus (JSON format)", type=["json"])
        if uploaded_file is not None:
            try:
                corpus_data = json.load(uploaded_file)
                analyzer = SanskritAnalyzer(corpus_data=corpus_data)
                st.sidebar.success("Corpus loaded successfully!")
            except Exception as e:
                st.sidebar.error(f"Error loading corpus: {e}")
    else:
        # Use the example corpus from paste.txt
        example_corpus = json.loads(
            '''[
                {
                    "shloka_number": "3.1",
                    "shloka": "arjuna uvāca jyāyasī cet karmaṇas te matā buddhir janārdana tat kiṁ karmaṇi ghore māṁ niyojayasi keśava",
                    "tokens": [
                        {
                            "token": "arjunaḥ",
                            "meaning": "Arjuna"
                        },
                        {
                            "token": "uvāca",
                            "meaning": "said"
                        },
                        {
                            "token": "jyāyasī",
                            "meaning": "speaking very highly"
                        },
                        {
                            "token": "cet",
                            "meaning": "although"
                        },
                        {
                            "token": "karmaṇaḥ",
                            "meaning": "than fruitive action"
                        },
                        {
                            "token": "te",
                            "meaning": "your"
                        },
                        {
                            "token": "matā",
                            "meaning": "opinion"
                        },
                        {
                            "token": "buddhiḥ",
                            "meaning": "intelligence"
                        },
                        {
                            "token": "janārdana",
                            "meaning": "O Kṛṣṇa"
                        },
                        {
                            "token": "tat",
                            "meaning": "therefore"
                        },
                        {
                            "token": "kim",
                            "meaning": "why"
                        },
                        {
                            "token": "karmaṇi",
                            "meaning": "in action"
                        },
                        {
                            "token": "ghore",
                            "meaning": "ghastly"
                        },
                        {
                            "token": "mām",
                            "meaning": "me"
                        },
                        {
                            "token": "niyojayasi",
                            "meaning": "engaging me"
                        },
                        {
                            "token": "keśava",
                            "meaning": "O Kṛṣṇa"
                        }
                    ]
                },
                {
                    "shloka_number": "3.2",
                    "shloka": "vyāmiśreṇeva vākyena buddhiṁ mohayasīva me tad ekaṁ vada niścitya yena śreyo 'ham āpnuyām",
                    "tokens": [
                        {
                            "token": "vyāmiśreṇa",
                            "meaning": "by equivocal"
                        },
                        {
                            "token": "iva",
                            "meaning": "as"
                        },
                        {
                            "token": "vākyena",
                            "meaning": "words"
                        },
                        {
                            "token": "buddhim",
                            "meaning": "intelligence"
                        },
                        {
                            "token": "mohayasi",
                            "meaning": "bewildering"
                        },
                        {
                            "token": "iva",
                            "meaning": "as"
                        },
                        {
                            "token": "me",
                            "meaning": "my"
                        },
                        {
                            "token": "tat",
                            "meaning": "therefore"
                        },
                        {
                            "token": "ekam",
                            "meaning": "only one"
                        },
                        {
                            "token": "vada",
                            "meaning": "please tell"
                        },
                        {
                            "token": "niścitya",
                            "meaning": "ascertaining"
                        },
                        {
                            "token": "yena",
                            "meaning": "by which"
                        },
                        {
                            "token": "śreyaḥ",
                            "meaning": "real benefit"
                        },
                        {
                            "token": "aham",
                            "meaning": "I"
                        },
                        {
                            "token": "āpnuyām",
                            "meaning": "may have it"
                        }
                    ]
                },
                {
                    "shloka_number": "3.3",
                    "shloka": "śrī-bhagavān uvāca loke 'smin dvi-vidhā niṣṭhā purā proktā mayānagha jñāna-yogena sāṅkhyānāṁ karma-yogena yoginām",
                    "tokens": [
                        {
                            "token": "śrī bhagavān uvāca",
                            "meaning": "the Supreme Personality of Godhead said"
                        },
                        {
                            "token": "loke",
                            "meaning": "in the world"
                        },
                        {
                            "token": "asmin",
                            "meaning": "this"
                        },
                        {
                            "token": "dvi-vidhā",
                            "meaning": "two kinds of"
                        },
                        {
                            "token": "niṣṭhā",
                            "meaning": "faith"
                        },
                        {
                            "token": "purā",
                            "meaning": "formerly"
                        },
                        {
                            "token": "proktā",
                            "meaning": "was said"
                        },
                        {
                            "token": "mayā",
                            "meaning": "by Me"
                        },
                        {
                            "token": "anagha",
                            "meaning": "O sinless one"
                        },
                        {
                            "token": "jñānayogena",
                            "meaning": "by the linking process of knowledge"
                        },
                        {
                            "token": "sāṅkhyānām",
                            "meaning": "of the empiric philosophers"
                        },
                        {
                            "token": "karma-yogena",
                            "meaning": "by the linking process of devotion"
                        },
                        {
                            "token": "yoginām",
                            "meaning": "of the devotees"
                        }
                    ]
                }
            ]'''
        )
        analyzer = SanskritAnalyzer(corpus_data=example_corpus)
        st.sidebar.success("Example corpus loaded!")
    
    # Show corpus stats if analyzer is initialized
    if analyzer:
        stats = analyzer.get_corpus_stats()
        st.sidebar.subheader("Corpus Statistics")
        st.sidebar.info(f"Shlokas: {stats['total_shlokas']} | Unique tokens: {stats['total_tokens']}")
        
        # Fuzzy matching threshold
        threshold = st.sidebar.slider(
            "Fuzzy Matching Threshold", 
            min_value=50, 
            max_value=95, 
            value=75,
            help="Minimum similarity score (0-100) required for fuzzy matching"
        )
        
        # Main content
        tab1, tab2, tab3 = st.tabs(["Analyze Text", "Browse Corpus", "About"])
        
        with tab1:
            st.subheader("Enter Sanskrit Text")
            
            input_type = st.radio(
                "Input Type",
                ["Single Line", "Multi-line Shloka"]
            )
            
            if input_type == "Single Line":
                input_text = st.text_input("Enter Sanskrit words or phrase")
            else:
                input_text = st.text_area("Enter Sanskrit shloka", height=150)
            
            # Analysis options
            st.subheader("Analysis Options")
            use_gemini = st.checkbox("Generate cohesive translation with Gemini AI", value=True)
            
            if st.button("Analyze"):
                if input_text:
                    analysis_results = analyzer.get_meanings_for_input(input_text, threshold)
                    
                    # Display results in a table
                    results_df = pd.DataFrame(analysis_results)
                    
                    # Style the results based on match type
                    def highlight_match_type(s):
                        if s == 'exact':
                            return 'background-color: #d4edda; color: #155724'
                        elif s == 'fuzzy':
                            return 'background-color: #fff3cd; color: #856404'
                        else:
                            return 'background-color: #f8d7da; color: #721c24'
                    
                    # Apply styling
                    st.subheader("Analysis Results")
                    
                    styled_df = results_df.style.applymap(
                        highlight_match_type, 
                        subset=['match_type']
                    )
                    
                    st.dataframe(styled_df)
                    
                    # Provide a download link for the results
                    st.markdown(
                        get_table_download_link(results_df, "sanskrit_analysis.csv", "Download Results as CSV"),
                        unsafe_allow_html=True
                    )
                    
                    # Word-by-word translation
                    st.subheader("Word-by-Word Translation:")
                    word_by_word = []
                    word_meanings = []  # Store just the meanings for Gemini
                    
                    for result in analysis_results:
                        if result["match_type"] == "exact":
                            word_by_word.append(f"{result['token']} ({result['meaning']})")
                            word_meanings.append(result['meaning'])
                        elif result["match_type"] == "fuzzy":
                            word_by_word.append(f"{result['token']} ({result['meaning']}) ~{result['similar_token']} [{result['similarity']}%]")
                            word_meanings.append(result['meaning'])
                        else:
                            word_by_word.append(f"{result['token']} ([?])")
                            word_meanings.append("[unknown]")
                    
                    st.write(" ".join(word_by_word))
                    
                    # Get Gemini translation if selected
                    if use_gemini and st.session_state.gemini_api_key:
                        with st.spinner("Generating coherent translation with Gemini AI..."):
                            gemini_translation = get_gemini_translation(word_meanings, st.session_state.gemini_api_key)
                            
                            st.subheader("AI-Generated Translation:")
                            st.markdown(f"""
                            <div style="padding: 1rem; border-radius: 0.5rem; background-color: #f0f0f8; border: 1px solid #6060a0; margin: 1rem 0;">
                                <p style="font-size: 1.1rem; font-style: italic; color: #303030;">{gemini_translation}</p>
                            </div>
                            """, unsafe_allow_html=True)
                    elif use_gemini and not st.session_state.gemini_api_key:
                        st.warning("Please provide a valid Gemini API key in the sidebar to use the AI translation feature.")
                    
                    # Show original input for reference
                    st.subheader("Original Input:")
                    st.write(input_text)
                else:
                    st.warning("Please enter some Sanskrit text to analyze")
        
        with tab2:
            st.subheader("Browse Corpus")
            
            # Show corpus as an expandable tree
            st.json(analyzer.corpus)
            
            # Option to export corpus
            if st.button("Export Corpus as JSON"):
                corpus_json = json.dumps(analyzer.corpus, indent=2)
                b64 = base64.b64encode(corpus_json.encode()).decode()
                href = f'<a href="data:file/json;base64,{b64}" download="sanskrit_corpus.json">Download Corpus JSON</a>'
                st.markdown(href, unsafe_allow_html=True)
                
            # Search within corpus
            st.subheader("Search Corpus")
            search_term = st.text_input("Enter Sanskrit word to search")
            
            if search_term:
                exact_match = search_term.lower() in analyzer.token_dict
                
                if exact_match:
                    st.success(f"Exact match found: {search_term} - {analyzer.token_dict[search_term.lower()]}")
                else:
                    similar_token, similarity = analyzer.get_most_similar_token(search_term, threshold)
                    if similar_token:
                        st.warning(f"No exact match. Similar word: {similar_token} ({analyzer.token_dict[similar_token]}) - {similarity}% similar")
                    else:
                        st.error(f"No matches found for '{search_term}' with threshold {threshold}%")
        
        with tab3:
            st.subheader("About Sanskrit Analyzer")
            st.write("""
            This tool helps analyze Sanskrit text by providing word-by-word meanings based on a corpus of known Sanskrit words.
            
            ### Features:
            - Analyze Sanskrit text and get word-by-word meanings
            - Generate coherent translations using Gemini AI
            - Support for exact and fuzzy matching of Sanskrit words
            - Browse and search the Sanskrit corpus
            - Export analysis results and corpus data
            
            ### How it works:
            1. The tool loads a corpus of Sanskrit shlokas with token-by-token meanings
            2. It uses exact matching when possible for Sanskrit words
            3. For words not found in the corpus, it uses fuzzy matching to find similar words
            4. Results show both the meaning and match confidence
            5. When AI translation is enabled, word meanings are sent to Gemini to create a natural-sounding translation
            
            ### Dependencies:
            - Streamlit
            - FuzzyWuzzy for fuzzy string matching
            - Pandas for data handling
            - Requests for API communication
            """)
            
            st.subheader("Privacy Note")
            st.info("""
            When using the Gemini AI translation feature, the word meanings from your Sanskrit text are sent to Google's Gemini API.
            No personal information is collected or stored during this process.
            """)

if __name__ == "__main__":
    main()