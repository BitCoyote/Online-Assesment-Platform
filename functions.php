<?php
include "init.php";
include "controller.php";
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
//  add_filter( 'rest_authentication_errors', function ( $errors ) {
//   if ( ! is_wp_error( $errors ) ) { // do nothing if there's already an error
//       if ( $can_access = is_user_logged_in() ) {
//           $roles      = (array) wp_get_current_user()->roles;
//           $can_access = in_array( 'administrator', $roles ); // allows only the Administrator role
//       }

//       if ( ! $can_access ) {
//           return new WP_Error( 'user_not_allowed',
//               'Sorry, you are not allowed to access the REST API.',
//               array( 'status' => rest_authorization_required_code() )
//           );
//       }
//   }

//   return $errors;
// } );

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
    register_rest_route( 'knowmeq/wp-api', '/finish-later', array(
        'methods'             => 'POST',
        'callback'            => 'kmq_function_finish_later'
    ) );
    register_rest_route( 'knowmeq/wp-api', '/get-draft', array(
        'methods'             => 'GET',
        'callback'            => 'kmq_function_get_draft'
    ) );
    register_rest_route( 'knowmeq/wp-api', '/get-assessments-status', array(
        'methods'             => 'GET',
        'callback'            => 'kmq_function_get_status'
    ) );
    register_rest_route( 'knowmeq/wp-api', '/retake-assessment', array(
      'methods'             => 'POST',
      'callback'            => 'kmq_function_retake_assessment'
    ) );

    register_rest_route( 'knowmeq/wp-api', '/get-company-list', array(
      'methods'             => 'GET',
      'callback'            => 'kmq_function_get_company_list'
    ) );
      // add meta data (ex: company id for user/ endpoint)
    register_rest_field( 'user', 'company_id', array(
      'get_callback'        => 'user_meta_callback',
      'update_callback'     => null,
      'schema'              => null,
    ) );
    register_rest_field( 'user', 'role', array(
      'get_callback'        => 'user_role_callback',
      'update_callback'     => null,
      'schema'              => null,
    ) );
}

add_action( 'rest_api_init', 'my_rest_api_init', 10, 1 );

/* Dynamically create WP page for React. */
function kmq_pages_creator() {
  $pages = array(
        "Welcome" => "/",
        "Main page" => "main-page",
        "Login" => "user-login",
        "Assessment" => "assessment",
        "Results" => "get-results"
  );

  $pages_with_children = array(
        'Assessment',
        'Results'
  );

  $children_count = 20;

  foreach($pages as $name => $url) {
      if (get_page_by_title($name) == NULL) {
          $page_config = array(
               'post_title'         => $name,
               'post_status'        => 'publish',
               'post_type'          => 'page',
               'post_name'          => $url
          );
          $inserted_page_id = wp_insert_post($page_config);
          if (in_array($name, $pages_with_children)) {
              for ($i = 1; $i <= $children_count; $i++) {
                  $page_config_child = array(
                       'post_title'         => "",
                       'post_name'          => "id-{$i}",
                       'post_status'        => 'publish',
                       'post_type'          => 'page',
                       'post_parent'        => $inserted_page_id
                  );
                  $child_id = wp_insert_post($page_config_child);
              }
          }
      }
  }

}

kmq_pages_creator();

add_action( 'rest_api_init', 'kmq_register_api_hooks' );

function kmq_register_api_hooks() {
  register_rest_route(
    'kmq-user', '/login/',
    array(
      'methods'  => 'POST',
      'callback' => 'kmq_login_callback',
    )
  );

  register_rest_route(
    'kmq-user', '/logout/',
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

    if ( is_wp_error($user) )
      echo $user->get_error_message();

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