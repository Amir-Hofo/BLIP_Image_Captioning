from utils import *

def call_model(token_file: str, image_data: bytes):
    try:
        with open(token_file, "r") as file:
            API_TOKEN= file.read().strip()
    except FileNotFoundError:
        print(f"Error: {token_file} not found. Please create it and add your Hugging Face token.")
        exit(1)

    API_URL= "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"
    headers= {"Authorization": f"Bearer {API_TOKEN}"}

    img_base64= base64.b64encode(image_data).decode("utf-8")
    payload= {"inputs": img_base64}

    max_retries, retry_delay= 3, 10

    for attempt in range(max_retries):
        response = requests.post(API_URL, headers=headers, json=payload)

        if response.status_code == 200:
            caption = response.json()[0]["generated_text"]
            print("Generated Caption:", caption)
            return caption
        elif response.status_code == 503:
            print(f"503 Error: Model is loading. Waiting {retry_delay} seconds...")
            time.sleep(retry_delay)
        else:
            print(f"Error: {response.status_code} - {response.text}")
            return f"Error: {response.status_code} - {response.text}"
    else:
        return "All attempts failed. Please try again later!"