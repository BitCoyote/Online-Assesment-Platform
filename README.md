# Wordpress React theme for TLP Project

# node version 16.15.0

# react-dom: 18.2.0

# react version : 18.2.0

# dotenv
We have to rename .env.local as .env before starting the project.

In terms of WordPress, we have to install composer.
in [Wordpress Root Directory]/app/public/ folder, please enter this command in console.
    
    [composer init]

Please edit the generated file [composer.json] and please append this code.

    "require": {
        "vlucas/phpdotenv": "^2.2"
    }

Then please install phpdotenv using [composer install]

in wp-config.php file, please add this code.

    require_once(__DIR__ . '.'.DIRECTORY_SEPARATOR.'vendor'.DIRECTORY_SEPARATOR.'autoload.php');
# We can change the name [knowmeq-ngen-tlp] as real directory name of project folder.
    (new \Dotenv\Dotenv(__DIR__.'.'.DIRECTORY_SEPARATOR.'wp-content'.DIRECTORY_SEPARATOR.'themes'.DIRECTORY_SEPARATOR.'knowmeq-ngen-tlp'))->load();

    define('JWT_SECRET', getenv('REACT_APP_JWT_SECRET'));

    define('WORDPRESS_DJANGO_API_BASE_URL', getenv('WORDPRESS_DJANGO_API_BASE_URL'));

    define('WORDPRESS_CREATE_COMPANY', getenv('WORDPRESS_CREATE_COMPANY'));

