import google.generativeai as genai

genai.configure(api_key='AIzaSyBxYuJ5wtcsaDaTrNj5KnyzlsxAHRTYr-M')

def ask_gemini(prompt):
    try:
        model = genai.GenerativeModel('gemini-1.5-pro-latest')
        
        response = model.generate_content(prompt)
        
        return response.text
    except Exception as e:
        return f"An error occurred: {e}"

prompt = "King Dhṛtarāṣṭra said in the place of pilgrimage in the place named Kurukṣetra assembled desiring to fight my party (sons) pāṇḍavāś caiva what to speak of did they do Sañjaya"
response = ask_gemini(prompt)
print(response)
