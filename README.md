<p align="center">
    <a href="https://laravel.com" target="_blank">
        <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
    </a>
</p>

<p align="center">
    <a href="https://reactjs.org" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="100" alt="React Logo">
    </a>
</p>


<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

<h1 align="center">Restaurant Mapping Application</h1>

This project is a full-stack web application developed with Laravel Breeze for the backend and React for the frontend. The application features a back office for managing restaurants and their menus, as well as a front office where clients can interact with a map to find nearby restaurants.

## Features

### Back Office

1. **Add Restaurants using Google Maps**
    - Click on the map to select a location.
    - Retrieve the coordinates of the selected point.
    - Add a name and an image for the restaurant.
    - Upload an image for the restaurant.
    - Save the restaurant to the database.

2. **Manage Restaurants**
    - View a list of all restaurants.
    - Perform basic CRUD operations (Create, Read, Update, Delete) on restaurants.

3. **Manage Restaurant Menus**
    - Each restaurant can have its own menu.
    - Perform CRUD operations on the menu items.
    - Example: Restaurant A may offer Pizza, Ice Cream, Cake, etc.

### Front Office

1. **Client Position Registration**
    - Clients can register their current position using the map.
    - Click on the map to select their current location.

2. **View Restaurants on the Map**
    - Only the restaurants near the current position are displayed on the map.
    - Hovering over an icon displays details about the restaurant.
    - Clicking on an icon shows further details about the restaurant.

## Getting Started

### Prerequisites

- PHP
- Laravel
- Node.js
- MySQL (or another database supported by Laravel)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ny-haritina10/resto-app.git
    cd your-repo-name
    ```

2. Install backend dependencies:
    ```bash
    composer install
    ```

3. Install frontend dependencies:
    ```bash
    npm install
    ```

4. Set up your `.env` file by copying the example:
    ```bash
    cp .env.example .env
    ```

5. Generate an application key:
    ```bash
    php artisan key:generate
    ```

6. Set up your database and run migrations:
    ```bash
    php artisan migrate
    ```

7. Start the Laravel development server:
    ```bash
    php artisan serve
    ```

8. Start the React development server:
    ```bash
    npm run dev
    ```

### Usage

- Access the back office to manage restaurants and their menus.
- Use the front office to register client positions and view nearby restaurants.

## Contributing

Feel free to contribute by creating a pull request or opening an issue.

## License

This project is licensed under the MIT License.