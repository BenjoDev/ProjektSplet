import requests
import json
import random
import time

# Define geographical boundaries of Maribor
maribor_latitude_range = (46.5350, 46.6774)
maribor_longitude_range = (15.6486, 15.6691)

def generate_random_data():
    return {
        "capturedBy": "zseni",
         "latitude_start": random.uniform(*maribor_latitude_range),
        "longitude_start": random.uniform(*maribor_longitude_range),
        "latitude_end": random.uniform(*maribor_latitude_range),
        "longitude_end": random.uniform(*maribor_longitude_range),
        "accelerometerX":[random.uniform(-1, 1), random.uniform(-1, 1), random.uniform(-1, 1)],
        "accelerometerY":[random.uniform(-1, 1), random.uniform(-1, 1), random.uniform(-1, 1)],
        "accelerometerZ":[random.uniform(-1, 1), random.uniform(-1, 1), random.uniform(-1, 1)],
        "userAccelerometerX": random.uniform(-1, 1),
        "userAccelerometerY": random.uniform(-1, 1),
        "userAccelerometerZ": random.uniform(-1, 1),
        "gyroscopeX":[random.uniform(-1, 1), random.uniform(-1, 1), random.uniform(-1, 1)],
        "gyroscopeY":[random.uniform(-1, 1), random.uniform(-1, 1), random.uniform(-1, 1)],
        "gyroscopeZ":[random.uniform(-1, 1), random.uniform(-1, 1), random.uniform(-1, 1)],
        "lightIntensity": random.randint(0, 100),
        # Add any additional properties as needed
    }

def send_post_request(data):
    url = 'http://127.0.0.1:3001/phoneData'
    headers = {'Content-Type': 'application/json'}

    try:
        response = requests.post(url, headers=headers, data=json.dumps(data))
        response.raise_for_status()
        print('POST request successful:', response.json())
    except requests.exceptions.RequestException as e:
        print('Error sending POST request:', e)
        print('Response content:', response.content)




if __name__ == "__main__":
    while True:
        random_data = generate_random_data()
        send_post_request(random_data)
        time.sleep(1)  # Wait for one second before sending the next request
