# webpack_rehome

webpack_rehome/
├── dist/
│ ├── bundle.js
│ ├── index.html
├── src/
│ ├── assets/
│ │ ├── images/
│ │ │ ├── house-1.jpg
│ │ │ ├── house-2.jpg
│ │ ├── styles/
│ │ │ ├── style.css
│ ├── components/
│ │ ├── Home.js
│ │ ├── HomeList.js
│ ├── index.js
├── package.json
├── webpack.config.js


This is a project that demonstrates how to use Webpack to bundle and optimize a web application. The application is a simple home rental website that displays a list of homes for rent and allows users to filter homes based on their preferences.

## Project Structure


## Technologies Used

- HTML
- CSS
- JavaScript
- Webpack
- Babel

## Plugins and Libraries

- `webpack` - A module bundler that is used to bundle all the necessary files for the application.
- `webpack-dev-server` - A development server that provides live reloading and other features.
- `babel-loader` - A loader that transpiles JavaScript using Babel.
- `style-loader` - A loader that injects CSS into the document.
- `css-loader` - A loader that resolves CSS imports.
- `html-webpack-plugin` - A plugin that generates an HTML file with the bundle automatically injected.
- `clean-webpack-plugin` - A plugin that cleans the output directory before each build.

## Installation

1. Clone the repository:git clone https://github.com/Reiracode/webpack_rehome.git

2. Install the dependencies: npm install

## Usage

1. Run the development server: npm start

2. Open `http://localhost:8080` in your browser.

3. To build the production bundle:


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


