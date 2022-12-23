<?php
include "init.php";
include "controller.php";
/* Import React components into WordPress */
function kmq_load_assets() {
  wp_enqueue_script('ourmainjs', get_theme_file_uri('/build/index.js'), array('wp-element'), '1.0', true);
  wp_enqueue_style('ourmaincss', get_theme_file_uri('/build/index.css'));
}
add_action('wp_enqueue_scripts', 'kmq_load_assets');

/*  */
function kmq_add_support() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
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
    return wp_logout_url('/kmq-login');
}