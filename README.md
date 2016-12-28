# SmarthomeGUI
A non-functional web interface for a SmartHome system. Project work for the User Experience Engineering course at AAU.

# Development
As it basically a non-functional GUI prototype, I decided to keep the technoligy fingerprint small. As we need some reactions for user actions, this is going to be more than a static html page however. 
For the mobile version, I included jquery and simple templates for generating lists. See below for more information. If you prefer multiple HTML-pages displaying different states and results, that's fine too!  You can ignore the **Function** and **Tools** info points below in this case! ;)

## Technologies
* **Design**: Due to the requirement of a responsive and consistent design for both mobile and desktop versions, Kruemelkatze included **Material Design Late** as style library.
+ **Function**: JQuery and the [Nano Templating Engine](https://github.com/trix/nano) are used in the mobile version. Data (devices and routines) are stored in *.json* files, which in turn are read in and get templates rendered for.
* **Tools**: (This only applies if you want to use *.json* files for data, as AJAX needs a web server. Serving html files only does not.). A *package.json* file is included **for npm-users**, using *lite-server* as an HTTP-server. Simply execute *npm install* followed by *npm start* to start the server.  **Non-npm-users** can use any HTTP-server they like. E.g. WebStorm integrated or Apache.


Seems like an overkill? Maybe, but in my opinion it's better than wasting hours for changing static HTML pages again and again. And it makes parallel work easier!

## Templates
(Still to be done)
Data, such as device lists, is stored in **.json** files, so that it can be easily changed and kept consistent between different pages and mobile/desktop version. These files are read in. For each list, an HTML-template has to be defined (see */mobile/overview.html* for an example). For each entry in the data, a copy of the template-element is created and filled and added to the list. For information about the template syntax, see the [Nano Templating Engine](https://github.com/trix/nano).

## Folder and File Structure
Mobile stuff into /mobile, desktop stuff into /desktop. :)
Please use the respective .css file for your styles!

