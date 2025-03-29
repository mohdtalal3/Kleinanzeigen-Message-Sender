import streamlit as st
import pandas as pd
import time
import os
import sys
from datetime import datetime
from seleniumbase import SB
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from utils import *

# Set page configuration
st.set_page_config(
    page_title="Kleinanzeigen Message Sender",
    page_icon="📨",
    layout="wide"
)

def wait_for_login(sb):
    """Open login page and wait for manual login"""
    sb.open("https://www.kleinanzeigen.de/")
    print("\n" + "="*50)
    print("MANUAL LOGIN REQUIRED")
    print("="*50)
    print("1. Please log in to your Kleinanzeigen account in the browser window")
    print("2. After you have successfully logged in, press Enter in this terminal")
    print("="*50)
    
    # Wait for user to press Enter in terminal
    input("Press Enter after you have logged in...")

    return True

def run_scraper(urls_and_cities):
    """Run the scraper for multiple URLs and cities"""
    if not urls_and_cities:
        st.error("No URLs provided!")
        return
    
    results = []
    
    # Load processed ads
    processed_ads = load_processed_ads()
    st.info(f"Found {len(processed_ads['ad_id'])} previously processed ads")
    
    # Progress bar
    progress_bar = st.progress(0)
    status_placeholder = st.empty()
    
    # Set up browser
    full_path = os.path.abspath("chromedata1")
    extension_dir = os.path.join(os.getcwd(), 'extension')
    try:
        with SB(uc=True, user_data_dir=full_path, headless=False, extension_dir=extension_dir) as sb:
            # Handle login first
            status_placeholder.info("Waiting for manual login. Please check your terminal...")
            login_success = wait_for_login(sb)
            
            if not login_success:
                status_placeholder.error("Login failed. Please try again.")
                return
            
            status_placeholder.success("Login successful! Starting scraping process...")
            time.sleep(2)  # Short pause to let user see the message
            
            for idx, (url, city) in enumerate(urls_and_cities):
                if not url or not city:
                    continue
                    
                status_placeholder.info(f"Processing URL {idx+1}/{len(urls_and_cities)}: {url}")
                
                # Open URL
                sb.open(url)
                time.sleep(4)
                
                total_processed = 0
                total_skipped = 0
                page_num = 1
                
                while True:
                    status_placeholder.info(f"Processing URL {idx+1}/{len(urls_and_cities)}: Page {page_num}")
                    processed, skipped = process_page(sb, city, processed_ads, status_placeholder)
                    total_processed += processed
                    total_skipped += skipped
                    
                    # Try to go to next page
                    try:
                        sb.click("a.pagination-next")
                        time.sleep(4)
                        page_num += 1
                    except:
                        status_placeholder.info("No more pages available")
                        break
                
                results.append({
                    "url": url,
                    "city": city,
                    "pages_processed": page_num,
                    "ads_processed": total_processed,
                    "ads_skipped": total_skipped
                })
                
                # Update progress
                progress_bar.progress((idx + 1) / len(urls_and_cities))
    
    except Exception as e:
        st.error(f"Error: {str(e)}")
    finally:
        # Display results
        if results:
            st.success("Scraping completed!")
            results_df = pd.DataFrame(results)
            st.dataframe(results_df)
        else:
            st.warning("No results were processed")
            
    return results
            
def process_page(sb, city, processed_ads, status_placeholder):
    """Process a single page of ads"""
    processed_count = 0
    skipped_count = 0
    
    # Use both selectors to handle potential changes in the website
    ad_selectors = [
        "#srchrslt-adtable a.ellipsis"
    ]
    
    ads = []
    for selector in ad_selectors:
        try:
            ads = sb.find_elements(selector, by="css selector")
            if ads:
                break
        except:
            continue
    
    if not ads:
        status_placeholder.warning("No ads found on this page!")
        return 0, 0
    
    status_placeholder.info(f"Found {len(ads)} ads on current page")
    
    for i, ad in enumerate(ads):
        try:
            href = ad.get_attribute("href")
            status_placeholder.info(f"Processing ad {i+1}/{len(ads)}: {href}")
            
            ad_id = extract_ad_id(href)
            if not ad_id:
                status_placeholder.warning(f"Could not extract ad_id from {href}, skipping")
                continue
                
            # Check if ad is already processed
            if is_ad_processed(ad_id, processed_ads):
                status_placeholder.info(f"Ad {ad_id} already processed, skipping")
                skipped_count += 1
                continue
            
            # Process new ad
            try:
                ActionChains(sb.driver).key_down(Keys.CONTROL).click(ad).key_up(Keys.CONTROL).perform()
                sb.switch_to_window(-1)
                time.sleep(4)
                
                try:
                    sb.click("//button[@id='viewad-contact-button']")
                    time.sleep(3)
                    
                    name = sb.get_text("//div[contains(@class, 'usercard--info--collumn')]//h2")
                    status_placeholder.info(f"Contacting: {name}")
                    
                    # Fill and send message
                    message = fill_message(city, name)
                    time.sleep(2)
                    sb.type("//textarea[@name='message']", message)
                    time.sleep(2)
                    sb.click("//button[contains(@class, 'viewad-contact-submit')]")
                    time.sleep(3)
                    
                    # Save the processed ad data
                    save_ad_data(ad_id, name, href, city)
                    processed_count += 1
                    
                except Exception as e:
                    status_placeholder.error(f"Error contacting ad: {str(e)}")
                
                sb.driver.close()
                sb.switch_to_window(0)
            except Exception as e:
                status_placeholder.error(f"Error processing ad {ad_id}: {str(e)}")
                # Try to return to main window if there was an error
                try:
                    sb.driver.close()
                    sb.switch_to_window(0)
                except:
                    pass
        except Exception as e:
            status_placeholder.error(f"Error with ad {i}: {str(e)}")
    
    return processed_count, skipped_count

def display_info_view():
    """Display the information view with filtering options"""
    st.header("📊 Ad Information")
    
    # Load processed ads
    processed_ads = load_processed_ads()
    if not processed_ads or not processed_ads.get("ad_id"):
        st.warning("No processed ads found!")
        return
    
    # Convert to DataFrame for easier handling
    data = []
    for ad_id, info in processed_ads["ad_id"].items():
        data.append({
            "ad_id": ad_id,
            "name": info.get("name", "Unknown"),
            "url": info.get("url", ""),
            "date": info.get("date", ""),
            "city": info.get("city", "Unknown")
        })
    
    df = pd.DataFrame(data)
    
    # Convert date strings to datetime objects for proper filtering
    if 'date' in df.columns and len(df) > 0:
        df['date'] = pd.to_datetime(df['date'])
    
    # Sidebar filters
    st.sidebar.subheader("Filter Options")
    
    # Date range filter with calendar
    if 'date' in df.columns and len(df) > 0:
        min_date = df['date'].min().date()
        max_date = df['date'].max().date()
        
        st.sidebar.subheader("Date Range")
        start_date = st.sidebar.date_input(
            "Start date",
            min_date,
            min_value=min_date,
            max_value=max_date
        )
        
        end_date = st.sidebar.date_input(
            "End date",
            max_date,
            min_value=start_date,
            max_value=max_date
        )
        
        # Convert to pandas datetime for filtering
        start_datetime = pd.to_datetime(start_date)
        end_datetime = pd.to_datetime(end_date) + pd.Timedelta(days=1) - pd.Timedelta(seconds=1)
    else:
        start_datetime = None
        end_datetime = None
    
    # City filter
    all_cities = sorted(df["city"].unique().tolist())
    if all_cities:
        selected_cities = st.sidebar.multiselect(
            "Select Cities",
            all_cities,
            default=all_cities
        )
    else:
        selected_cities = []
    
    # Apply filters
    filtered_df = df
    
    # Apply date filter if dates are available
    if start_datetime is not None and end_datetime is not None:
        filtered_df = filtered_df[(filtered_df["date"] >= start_datetime) & 
                                 (filtered_df["date"] <= end_datetime)]
    
    # Apply city filter
    if selected_cities:
        filtered_df = filtered_df[filtered_df["city"].isin(selected_cities)]
    
    # Display stats
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Total Ads", len(df))
    with col2:
        st.metric("Cities", len(df["city"].unique()))
    with col3:
        st.metric("Filtered Ads", len(filtered_df))
    
    # Format dates for display
    if 'date' in filtered_df.columns and len(filtered_df) > 0:
        filtered_df['date'] = filtered_df['date'].dt.strftime('%Y-%m-%d')
    
    # Display data
    st.subheader("Processed Ads")
    
    # Make URLs clickable
    def make_clickable(url):
        return f'<a href="{url}" target="_blank">{url}</a>'
    
    filtered_df["url"] = filtered_df["url"].apply(make_clickable)
    st.write(filtered_df.to_html(escape=False), unsafe_allow_html=True)
    
    # Download option
    csv = filtered_df.to_csv(index=False).encode('utf-8')
    st.download_button(
        "Download filtered data as CSV",
        csv,
        "filtered_ads.csv",
        "text/csv",
        key='download-csv'
    )

def display_bulk_message():
    """Display the bulk message interface"""
    st.header("📨 Bulk Message Sender")
    
    # Instructions
    st.markdown("""
    Add URLs and city names for bulk processing. 
    The system will send messages to all ads in these URLs and track which ones have been processed.
    """)
    
    # Initialize session state for URL fields
    if "url_fields" not in st.session_state:
        st.session_state.url_fields = [{"url": "", "city": ""}]
    
    # Function to add new URL field
    def add_url_field():
        st.session_state.url_fields.append({"url": "", "city": ""})
    
    # Function to remove URL field
    def remove_url_field(index):
        st.session_state.url_fields.pop(index)
    
    # Display URL fields
    for i, field in enumerate(st.session_state.url_fields):
        col1, col2, col3 = st.columns([3, 2, 1])
        with col1:
            st.session_state.url_fields[i]["url"] = st.text_input(
                f"URL {i+1}", 
                value=field["url"],
                key=f"url_{i}"
            )
        with col2:
            st.session_state.url_fields[i]["city"] = st.text_input(
                f"City {i+1}", 
                value=field["city"],
                key=f"city_{i}"
            )
        with col3:
            st.button("➖", key=f"remove_{i}", on_click=remove_url_field, args=(i,))
    
    # Add new URL field button
    st.button("➕ Add URL", on_click=add_url_field)
    
    # Run scraper button
    if st.button("🚀 Run Scraper", type="primary"):
        urls_and_cities = [(field["url"], field["city"]) for field in st.session_state.url_fields if field["url"]]
        if urls_and_cities:
            with st.spinner("Running scraper..."):
                run_scraper(urls_and_cities)
        else:
            st.error("No URLs provided!")

def main():
    """Main Streamlit app"""
    st.title("Kleinanzeigen Message Sender")
    
    # Sidebar navigation
    st.sidebar.title("Navigation")
    page = st.sidebar.radio("Select Page", ["Bulk Message", "View Information"])
    
    if page == "Bulk Message":
        display_bulk_message()
    else:
        display_info_view()

if __name__ == "__main__":
    main() 