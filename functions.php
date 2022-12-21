<?php
include "init.php";
include "controller.php";
function kmq_load_assets() {
  wp_enqueue_script('ourmainjs', get_theme_file_uri('/build/index.js'), array('wp-element'), '1.0', true);
  wp_enqueue_style('ourmaincss', get_theme_file_uri('/build/index.css'));
}

add_action('wp_enqueue_scripts', 'kmq_load_assets');

function kmq_add_support() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
}

add_action('after_setup_theme', 'kmq_add_support');

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
      // add meta data (ex: company id for user/ endpoint)
    register_rest_field( 'user', 'company_id', array(
      'get_callback'        => 'user_meta_callback',
      'update_callback'     => null,
      'schema'              => null,
    ) );
}

add_action( 'rest_api_init', 'my_rest_api_init', 10, 1 );

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
