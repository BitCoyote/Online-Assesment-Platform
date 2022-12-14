<?php
add_action("after_switch_theme", "kmq_init_table");

function kmq_init_table(){
  global $wpdb;
  global $jal_db_version;

  $table_name = $wpdb->prefix . 'kmq_finish_later';
  $table_name_two = $wpdb->prefix . 'kmq_recommender_tool';
  
  $charset_collate = $wpdb->get_charset_collate();

  $check_table = "SHOW TABLES LIKE '$table_name';";

  $sql = "CREATE TABLE $table_name (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    user_id TEXT NOT NULL ,
    quiz_id TEXT NOT NULL ,
    quiz_title TEXT NOT NULL ,
    answers_obj JSON NOT NULL ,
    quiz_finished boolean not null default false ,
    PRIMARY KEY (id)
  ) $charset_collate;";

  require_once ABSPATH . 'wp-admin/includes/upgrade.php';
  $check = $wpdb->query($check_table);
  if($check == 0)
    dbDelta( $sql );
  add_option( 'jal_db_version', $jal_db_version );
}
?>