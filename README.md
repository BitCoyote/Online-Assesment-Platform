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
# We can change the name [knowmeq-ngen-tlp] as real directory name of project folder in wp-config.php.
    (new \Dotenv\Dotenv(__DIR__.'.'.DIRECTORY_SEPARATOR.'wp-content'.DIRECTORY_SEPARATOR.'themes'.DIRECTORY_SEPARATOR.'knowmeq-ngen-tlp'))->load();

    define('JWT_SECRET', getenv('REACT_APP_JWT_SECRET'));

    define('WORDPRESS_DJANGO_API_BASE_URL', getenv('WORDPRESS_DJANGO_API_BASE_URL'));

    define('WORDPRESS_CREATE_COMPANY', getenv('WORDPRESS_CREATE_COMPANY'));

# If the dashboard is not opening after login,
    please add this one in login function

    wp_set_auth_cookie( $user->ID );

# If the wordpress is not working, we can use var_export() function to console it... similar with console.log()
# Those are wordpress hooks that used in this project.
# loading React build result into wordpress...
add_action('wp_enqueue_scripts', 'kmq_load_assets');
# Create tables if not exist, make user roles; NGen_Admin, Company_Admin, Participant
add_action("after_switch_theme", "kmq_init");
# Add company dropdown into user register, update form.
add_action('user_register', 'kmq_save_company_info');
add_action('profile_update', 'kmq_save_company_info');
add_action( 'show_user_profile', 'kmq_add_company_to_user_profile' );
add_action( 'edit_user_profile', 'kmq_add_company_to_user_profile' );
add_action( "user_new_form", "kmq_add_company_to_user_profile" );
# Make company dropdown as required field, users cannot register without company
add_action( 'user_profile_update_errors', 'crf_user_profile_update_errors', 10, 3 );
# Make only administrator can access the admin area.
add_action( 'admin_init', 'kmq_allow_admin_area_to_admins_only');
# Disable default rest api for not-administrator role in wordpress.
add_filter( 'rest_authentication_errors', function ( $errors ) {})
# Remove Wordpress dashboard top-bar(always shown in default) in not-administrator role.
add_action('after_setup_theme', 'kmq_add_support');
# Disable wp-login page for custom login
add_action('init','kmq_disable_login_page');
# Add company column into the user table in wordpress dashboard->users
add_filter( 'manage_users_columns', 'kmq_new_modify_user_table' );
add_filter( 'manage_users_custom_column', 'kmq_new_modify_user_table_row', 10, 3 );
# Sending Email
add_filter( 'wp_mail_content_type', 'set_html_content_type' );
add_filter('wp_new_user_notification_email', 'kmq_wp_new_user_notification_email', 10, 3);
# Add company menu in 
add_action('admin_menu', 'kmq_company_submenu_page');
add_action('init', 'kmq_rewrite_rule');
    add_filter( 'query_vars', function( $query_vars ) {})
    add_action( 'template_include', function( $template ) {})
add_action( 'rest_api_init', 'kmq_register_api_hooks', 10, 1 );