import re 
import json
import os
from datetime import datetime

# Function to fill the message
def fill_message(city, name):
    with open('message.txt', 'r', encoding='utf-8') as file:
        content = file.read()
        filled_content = content.replace("{name}", name)
        filled_content = filled_content.replace("{city}", city)
        return filled_content

def extract_ad_id(url: str) -> str:
    # Use regex to find the ad ID which is a series of digits at the end of the URL
    match = re.search(r'/(\d+)-', url)
    if match:
        return match.group(1)
    else:
        return None

def load_processed_ads():
    # Check if the JSON file exists
    if not os.path.exists('ad_id.json'):
        # Create empty JSON structure if file doesn't exist
        with open('ad_id.json', 'w', encoding='utf-8') as file:
            json.dump({"ad_id": {}}, file, indent=4)
        return {"ad_id": {}}
    
    # Load existing data
    try:
        with open('ad_id.json', 'r', encoding='utf-8') as file:
            return json.load(file)
    except json.JSONDecodeError:
        # If file is corrupted, create a new one
        with open('ad_id.json', 'w', encoding='utf-8') as file:
            json.dump({"ad_id": {}}, file, indent=4)
        return {"ad_id": {}}

def is_ad_processed(ad_id, processed_ads):
    return ad_id in processed_ads.get("ad_id", {})

def save_ad_data(ad_id, name, url, city):
    # Load current data
    processed_ads = load_processed_ads()
    
    # Add new ad data
    current_date = datetime.now().strftime("%Y-%m-%d")
    processed_ads["ad_id"][ad_id] = {
        "name": name,
        "url": url,
        "date": current_date,
        "city": city
    }
    
    # Save updated data
    with open('ad_id.json', 'w', encoding='utf-8') as file:
        json.dump(processed_ads, file, indent=4)