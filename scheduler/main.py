import requests
import os
from dotenv import load_dotenv

load_dotenv()

base_url = os.getenv("BACKEND_BASE_URL")
api_key = os.getenv("SCHEDULER_API_KEY")


def hit_endpoints():
    try:
        response = requests.post(
            base_url + "/api/accounts/update-rank", headers={"api-key": api_key}
        )
        print(f"Request sent, status: {response.status_code}")
    except Exception as e:
        print(f"Error sending request: {e}")


if __name__ == "__main__":
    hit_endpoints()
