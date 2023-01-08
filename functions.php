<?php
include "init.php";
include "controller.php";
include "company-menu.php";
/* Import React components into WordPress */
function kmq_load_assets() {
  wp_enqueue_script('ourmainjs', get_theme_file_uri('/build/index.js'), array('wp-element'), '1.0', true);
  wp_enqueue_style('ourmaincss', get_theme_file_uri('/build/index.css'));
}
add_action('wp_enqueue_scripts', 'kmq_load_assets');

//disable wpadmin page for non admin users
add_action( 'admin_init', 'kmq_allow_admin_area_to_admins_only');
function kmq_allow_admin_area_to_admins_only() {

      if( defined('DOING_AJAX') && DOING_AJAX ) {
            //Allow ajax calls
            return;
      }

      $user = wp_get_current_user();

      if( empty( $user ) || !in_array( "administrator", (array) $user->roles ) ) {
           //Redirect to main page if no user or if the user has no "administrator" role assigned
           wp_redirect( get_site_url( ) );
           exit();
      }

 }
//below code disables all users except admins to access rest api -- including auth rest route. this needs to be changed to allow specific routes to specific users
 add_filter( 'rest_authentication_errors', function ( $errors ) {
  $uri = $_SERVER['REQUEST_URI'];
  $is_login_uri = str_starts_with($uri, '/wp-json/knowmeq-api/login');
  $is_default_uri = str_starts_with($uri, '/wp-json/wp/v2/');
  if ( ! is_wp_error( $errors ) ) { // do nothing if there's already an error
      if ( !is_user_logged_in()) {
        if(!$is_login_uri)
          return new WP_Error( 'api_not_allowed',
              'Sorry, you have to login to the website.',
              array( 'status' => rest_authorization_required_code() )
          );   
      }
      else {
        $roles = (array) wp_get_current_user()->roles;
        $can_access = in_array( 'administrator', $roles ); // allows only the Administrator role
        if ( !$can_access && $is_default_uri ) {
            return new WP_Error( 'user_not_allowed',
                'Sorry, you are not allowed to access the REST API.',
                array( 'status' => 403 )
            );
        } 
      }
  }
  return $errors;
} );

function kmq_add_support() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  //will remove the top wp admin bar
  if (!current_user_can('administrator') && !is_admin()) {
    show_admin_bar(false);
  }
}
add_action('after_setup_theme', 'kmq_add_support');

/* Rest API initialization. */
function my_rest_api_init() {
    register_rest_route( 'knowmeq-api', '/finish-later', array(
        'methods'             => 'POST',
        'callback'            => 'kmq_function_finish_later'
    ) );
    register_rest_route( 'knowmeq-api', '/get-draft', array(
        'methods'             => 'GET',
        'callback'            => 'kmq_function_get_draft'
    ) );
    register_rest_route( 'knowmeq-api', '/get-assessments-status', array(
        'methods'             => 'GET',
        'callback'            => 'kmq_function_get_status'
    ) );
    register_rest_route( 'knowmeq-api', '/retake-assessment', array(
      'methods'             => 'POST',
      'callback'            => 'kmq_function_retake_assessment'
    ) );

    register_rest_route( 'knowmeq-api', '/get-company-list', array(
      'methods'             => 'GET',
      'callback'            => 'kmq_function_get_company_list'
    ) );

    //Custom rest api for get user account
    register_rest_route( 'knowmeq-api', '/participants/(?P<id>[\d]+)', array(
      'methods'             => 'GET',
      'callback'            => 'kmq_function_get_participants'
    ) );
    register_rest_route( 'knowmeq-api', 'users/me', array(
      'methods'             => 'GET',
      'callback'            => 'kmq_function_get_me'
    ) );
    register_rest_route( 'knowmeq-api', 'users/(?P<id>[\d]+)', array(
      'methods'             => 'GET',
      'callback'            => 'kmq_function_get_user'
    ) );
    register_rest_route( 'knowmeq-api', '/get-company-name', array(
      'methods'             => 'GET',
      'callback'            => 'kmq_function_get_print_info'
    ) );
}

add_action( 'rest_api_init', 'my_rest_api_init', 10, 1 );

/* Dynamically create WP page for React. */
// function kmq_pages_creator() {
//   $pages = array(
//         "Welcome" => "/",
//         "Login" => "user-login",
//         "Assessment" => "assessment",
//         "Results" => "get-results",
//         "Company_Dashboard" => "admin-page/companies",
//         "Company_Results" => "admin-page/company-results",
//   );

//   $pages_with_children = array(
//         'Assessment',
//         'Results'
//   );

//   $children_count = 20;

//   foreach($pages as $name => $url) {
//       if (get_page_by_title($name) == NULL) {
//           $page_config = array(
//                'post_title'         => $name,
//                'post_status'        => 'publish',
//                'post_type'          => 'page',
//                'post_name'          => $url
//           );
//           $inserted_page_id = wp_insert_post($page_config);
//           if (in_array($name, $pages_with_children)) {
//               for ($i = 1; $i <= $children_count; $i++) {
//                   $page_config_child = array(
//                        'post_title'         => "",
//                        'post_name'          => "id-{$i}",
//                        'post_status'        => 'publish',
//                        'post_type'          => 'page',
//                        'post_parent'        => $inserted_page_id
//                   );
//                   $child_id = wp_insert_post($page_config_child);
//               }
//           }
//       }
//   }

// }

// kmq_pages_creator();

add_action( 'rest_api_init', 'kmq_register_api_hooks' );

function kmq_register_api_hooks() {
  register_rest_route(
    'knowmeq-api', '/login',
    array(
      'methods'  => 'POST',
      'callback' => 'kmq_login_callback',
    )
  );

  register_rest_route(
    'knowmeq-api', '/logout',
    array(
      'methods'  => 'GET',
      'callback' => 'kmq_logout_callback',
    )
  );
}

function kmq_login_callback($request){
    $creds = array();
    $creds['user_login'] = $request["username"];
    $creds['user_password'] =  $request["password"];
    $creds['remember'] = true;
    $user = wp_signon( $creds, false );
    
    if ( is_wp_error($user) ) {
      echo $user->get_error_message();
    }

    return $user;
}

function kmq_logout_callback(){
    return wp_logout_url('/user-login');
}

function kmq_disable_login_page() {
    $new_login_page_url = home_url( '/user-login/' ); // new login page
    global $pagenow;
    //echo "<script> console.log('" . $_SERVER['REQUEST_URI'] . "') </script>";
    if( $pagenow == "wp-login.php" && $_SERVER['REQUEST_METHOD'] == 'GET' && !str_contains($_SERVER['REQUEST_URI'], 'action=logout')) {
        wp_redirect($new_login_page_url);
        exit;
    }
}

add_action('init','kmq_disable_login_page');

function kmq_remove_admin_bar() {
  if (!current_user_can('administrator') && !is_admin()) {
    show_admin_bar(false);
  }
}

add_action ('init', 'kmq_remove_admin_bar');

// add company name to user in admin panel
function new_modify_user_table( $column ) {
  $column['company'] = 'company';
  unset( $column['posts'] );
  return $column;
}
add_filter( 'manage_users_columns', 'new_modify_user_table' );

function new_modify_user_table_row( $val, $column_name, $user_id ) {
  switch ($column_name) {
      case 'company' :
          return get_the_author_meta( 'company', $user_id );
  }
  return $val;
}
add_filter( 'manage_users_custom_column', 'new_modify_user_table_row', 10, 3 );

//add action to rewrite rules to include candidate/candidate_id list, ([0-9]+) is regex for numbers assuming candidate id is a number
add_action('init', function(){
  // We are redirecting all endpoints into the /index.php...
  add_rewrite_rule( 'user-login', 'index.php?type=user-login', 'top' );
  add_rewrite_rule( 'main-page', 'index.php?type=main-page', 'top' );
  add_rewrite_rule( 'assessment/?', 'index.php?type=assessment', 'top' );
  add_rewrite_rule( 'my-results', 'index.php?type=individual-results-list', 'top' );
  add_rewrite_rule( 'get-results', 'index.php?type=individual-results', 'top' );
  add_rewrite_rule( 'admin-page/company-results/?', 'index.php?type=CompanyAdmin&term=company-result', 'top' );
  add_rewrite_rule( 'admin-page/companies-list/?', 'index.php?type=NGenAdmin', 'top' );
  
  flush_rewrite_rules();
});

add_filter( 'query_vars', function( $query_vars ) {
  $query_vars[] = 'type';
  return $query_vars;
} );

add_action( 'template_include', function( $template ) {
  return ABSPATH . 'wp-content/themes/knowmeq-ngen-tlp/template-knowmeq.php';
} );

//send email to user

function kmq_wp_new_user_notification_email($wp_new_user_notification_email, $user, $blogname) {
 
  // $user_login = $user->user_login;
  $user_email = $user->user_email;
  $user_id = $user->ID;
  $new_password = wp_generate_password( 24, true, true );
  wp_set_password( $new_password, $user_id );
  // The blogname option is escaped with esc_html on the way into the database in sanitize_option
  // we want to reverse this for the plain text arena of emails.
  $blogname = wp_specialchars_decode(get_option('blogname'), ENT_QUOTES);

  $message  = sprintf(__('New user registration on your site %s:'), $blogname) . "\r\n\r\n";
  // $message .= sprintf(__('Username: %s'), $user_login) . "\r\n\r\n";
  $message .= sprintf(__('E-mail: %s'), $user_email) . "\r\n\r\n";
  $message .= sprintf(__('Password: %s'), $new_password) . "\r\n\r\n";

  $wp_new_user_notification_email['subject'] = sprintf(__('[%s] Your username and password'), $blogname);
  $wp_new_user_notification_email['message'] = $message;

  return $wp_new_user_notification_email;
}
add_filter('wp_new_user_notification_email', 'kmq_wp_new_user_notification_email', 10, 3);