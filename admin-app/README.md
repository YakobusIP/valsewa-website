# Valsewa Admin App

This is the admin side for Valsewa Website.

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
   Open the project folder and navigate to the **admin-app** folder

4. **Install Required Files**  
   Double-click inside the folder and open a terminal or command prompt. Then type:

   ```
   npm install
   ```

5. **Set Up Environment Variables**  
   Create a `.env` file in the root folder and copy the contents from `.env.example`. Fill in the required values.

   Example:

   ```
   VITE_AXIOS_BASE_URL=http://localhost:5000
   ```

6. **Start the Project**  
   After it's finished installing, start the project with:

   ```
   npm run dev
   ```

7. **View the Website**  
   To view the website, open http://localhost:5173
