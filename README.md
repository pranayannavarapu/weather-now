Weather Now

->This project is a simple weather app built with React. It allows anyone to search for the current weather in a city using real data from the Open-Meteo public API.

Features

->Search for any city and get the current temperature, weather description, wind speed, and last updated time.
->Error handling for invalid city names or network problems
->Clear and minimal user interface.

How to Run This Project

1.Clone the repository
Download or clone the project code to your computer
2.Install dependencies
Open a terminal and in the project folder run:
	npm install
3.Start the app locally
	npm start

	This will run the project and open it in your browser at http://localhost:5173.

How It Works

->The user enters a city name and presses "Search".
->The app first finds the city's coordinates using the Open-Meteo geocoding API.
->Then, it requests the weather for those coordinates from the Open-Meteo weather API.
->The current temperature, weather condition, wind speed, and update time are displayed.

Technologies Used

->React (JavaScript library for building user interfaces).
->CSS for styling.
->Open-Meteo API for free, no-authentication weather data.

Project Structure/src
  App.js      // Main component with logic and UI
  App.css     // Styles for the app