# Use a lightweight Python image.
FROM python:3.13-slim

# Set the working directory.
WORKDIR /app

# Copy requirements and install dependencies.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the script into the container.
COPY main.py .

# Run the scheduler script.
CMD ["python", "main.py"]