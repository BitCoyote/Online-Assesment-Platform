<?php
include "db_init.php";
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
}

add_action( 'rest_api_init', 'my_rest_api_init', 10, 1 );

function kmq_function_finish_later ($request) {
  global $wpdb;
  $table_name = $wpdb->prefix . 'kmq_finish_later';
  $user_id = $request["user_id"];
  $quiz_id = $request["quiz_id"];
  $quiz_title = $request["quiz_title"];
  $answer_ids = $request["answer_ids"];
  $completed = $request["completed"];
  $data = array(
    'user_id'=>$user_id,
    'quiz_id'=>$quiz_id,
    'quiz_title'=>$quiz_title,
    'answers_obj'=>$answer_ids,
    'quiz_finished'=>$completed
  );
  $fields = '`' . implode('`,`', array_keys($data)) . '`';
  $format = "'" . implode("', '", $data) . "'";
  $int_user_id = intval($user_id);
  $int_quiz_id = intval($quiz_id);
  $sql_one = "SELECT * from `$table_name` WHERE user_id = $int_user_id AND quiz_id = $int_quiz_id";
  $check = $wpdb->query($sql_one);
  $res = 0;
  if($check == 1) {
    $wpdb->query( $wpdb->prepare("UPDATE $table_name 
                SET answers_obj = '".$answer_ids."', quiz_finished = '%s' 
            WHERE user_id = %s AND quiz_id = %s", $completed, $user_id, $quiz_id));
  }
  if($check == 0) {
    $wpdb->query("INSERT INTO `$table_name`($fields) VALUES ($format)");
  }
}

function kmq_function_get_draft ($request) {
  global $wpdb;
  $table_name = $wpdb->prefix . 'kmq_finish_later';
  $user_id = $request["user_id"];
  $quiz_id = $request["quiz_id"];
  $int_user_id = intval($user_id);
  $int_quiz_id = intval($quiz_id);
  $sql_one = "SELECT * from `$table_name` WHERE user_id = $int_user_id AND quiz_id = $int_quiz_id";
  $results = $wpdb->get_results($sql_one);
  return $results;
}

function kmq_function_get_status ($request) {
  global $wpdb;
  $table_name = $wpdb->prefix . 'kmq_finish_later';
  $user_id = $request["user_id"];
  $int_user_id = intval($user_id);
  $sql_one = "SELECT quiz_id, quiz_finished, answers_obj from `$table_name` WHERE user_id = $int_user_id";
  $results = $wpdb->get_results($sql_one);
  return json_encode($results);
}