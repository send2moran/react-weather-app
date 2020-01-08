
**OVERVIEW**

write a simple, responsive, web app in angular/react that shows the weather of some city. The
user should be able to search for a city and save it to favorites (locally, a server is not required).
We expect to see 2 pages in this app. (weather page and favorites page).
We recommend you to use a 3rd party UI library (material, prime, bootstrap, etc)

**API**

The API that you’ll use for this app is AccuWeather API. Please signup and create a new app in
order to get an API key.
You will use 3 endpoints: location autocomplete for the search field, get current weather and
5-day daily forecast. Please read those API docs.
NOTE: this API is limited to 50 requests per day. our recommendation is to save the responses
and use them locally during development.

**GOALS**

1. Show us your coding skills - We want to see your strengths, don’t be afraid to go wild, add
features and customize the design.
2. Readability - Your code should be readable and self-explanatory with minimum
comments. Remove any unused code, console logs, and files. Use logical project
structure and code separation.

**SPECS**

3. Create a header with navigation icons/links/buttons for main and favorites screen.
4. The main screen (weather details) will be composed of a search field to search a
location’s weather by city name. And below it, the current weather and a 5-day forecast of
the searched location. A location should have an indication if it’s already saved in
favorites, and a button to add/remove from favorites (it can be the same button).
5. Display Tel Aviv weather by default.
6. Favorites screen will be composed of a list of favorite locations. Each location should
have an ID, name and current weather. Clicking on a favorite will navigate to the main
screen showing the details of that location.
7. Searching should be done in English letters only
8. State management is a must!
9. Responsive design is a must! (flexbox/grid will give you extra points 😉).
10. Error handling is a must! (can be done with toast, modal).

**BONUSES**

12. Set the default location by using the Geolocation API. you will need another API
endpoint for this: get location key by lat/lon.
13. Add dark/light theme support (add toggle button in the header).
14. Add Celsius/Fahrenheit toggle button.
15. Add animations (with good taste).
