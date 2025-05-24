# Valsewa Backend

This is the backend for Valsewa Website.

## 🔧 How to Run the Project Locally

If you'd like to run this website on your own computer, here are the steps:

1. **Install [Node.js](https://nodejs.org/)**  
   Make sure Node.js is installed on your computer. You can download it from the link above.

2. **Clone the Project**  
   Open a command prompt and run

   ```
   git clone https://github.com/YakobusIP/valsewa-website.git
   ```

3. **Open the Project Folder**  
   Open the project folder and navigate to the **backend** folder

4. **Install Required Files**  
   Double-click inside the folder and open a terminal or command prompt. Then type:

   ```
   npm install
   ```

5. **Set Up Environment Variables**  
   Create a `.env` file in the root folder and copy the contents from `.env.example`. Fill in the required values.

   Example:

   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/valsewa?schema=public"
   DIRECT_URL="postgresql://postgres:postgres@localhost:5432/valsewa?schema=public"

   PORT=5000
   NODE_ENV=development
   ACCESS_TOKEN_SECRET=secret
   REFRESH_TOKEN_SECRET=secret
   ACCESS_TOKEN_DURATION=10s
   REFRESH_TOKEN_DURATION=15s

   HENRIKDEV_API_KEY=secret_api_key

   ADMIN_APP_URL=http://localhost:5173
   CANONICAL_PUBLIC_APP_URL=http://localhost:3000
   PUBLIC_APP_URL=http://localhost:3000
   BACKEND_BASE_URL=http://localhost:5000

   BULL_REDIS_IP=localhost
   BULL_REDIS_PORT=6379

   SCHEDULER_API_KEY=secret_api_key
   ```

6. **Start the Project**  
   After it's finished installing, start the project with:

   ```
   npm run dev
   ```

7. **View the OpenAPI Swagger**  
   Backend is up and running at http://localhost:5000, you can check the OpenAPI docs at http://localhost:5000/docs
