<?php

add_action("after_switch_theme", "kmq_init");

function kmq_init_table(){
  global $wpdb;
  global $jal_db_version;

  $table_name = $wpdb->prefix . 'kmq_finish_later';
  $table_name_two = $wpdb->prefix . 'kmq_companies';
  
  $charset_collate = $wpdb->get_charset_collate();

  $check_table = "SHOW TABLES LIKE '$table_name';";
  $check_table_companies = "SHOW TABLES LIKE '$table_name_two';";
  $check_view_users = "SHOW TABLES LIKE 'get_all_participants';";

  $sql = "CREATE TABLE $table_name (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    user_id TEXT NOT NULL ,
    quiz_id TEXT NOT NULL ,
    quiz_title TEXT NOT NULL ,
    answers_obj JSON NOT NULL ,
    quiz_finished boolean not null default false ,
    PRIMARY KEY (id)
  ) $charset_collate;";

  $sql_companies = "CREATE TABLE $table_name_two (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL ,
    company_id char(36) NOT NULL ,
    is_company_active boolean not null default true ,
    PRIMARY KEY (id)
  ) $charset_collate;";
  
  $sql_users = "CREATE OR REPLACE algorithm = UNDEFINED view `local`.`get_all_participants` as
  select
      `local`.`wp_users`.`ID` as `ID`,
      `local`.`wp_users`.`user_login` as `user_login`,
      `local`.`wp_users`.`user_nicename` as `user_nicename`,
      `local`.`wp_users`.`user_email` as `user_email`,
      `local`.`wp_users`.`user_url` as `user_url`,
      `local`.`wp_users`.`user_registered` as `user_registered`,
      `local`.`wp_users`.`user_activation_key` as `user_activation_key`,
      `local`.`wp_users`.`user_status` as `user_status`,
      `local`.`wp_users`.`display_name` as `display_name`,
      `local`.`wp_usermeta`.`meta_value` as `company_id`
  from
      ((`local`.`wp_users`
  join `local`.`wp_usermeta`)
  join (
      select
          `local`.`wp_usermeta`.`user_id` as `user_id`,
          `local`.`wp_usermeta`.`meta_value` as `meta_value`
      from
          `local`.`wp_usermeta`
      where
          ((`local`.`wp_usermeta`.`meta_key` = 'wp_capabilities')
              and (substring_index(substring_index(`local`.`wp_usermeta`.`meta_value`, '\"', 2), '\"',-(1)) = 'Participant'))) `t`)
  where
      ((`local`.`wp_users`.`ID` = `local`.`wp_usermeta`.`user_id`)
          and (`local`.`wp_usermeta`.`user_id` = `t`.`user_id`)
              and (`local`.`wp_usermeta`.`meta_key` = 'company'));";

  require_once ABSPATH . 'wp-admin/includes/upgrade.php';
  $check = $wpdb->query($check_table);
  if($check == 0)
    dbDelta( $sql );
  $check_companies = $wpdb->query($check_table_companies);
  if($check_companies == 0) {
    dbDelta( $sql_companies );
  }
  $check_users = $wpdb->query($check_view_users);
  if($check_users == 0) {
    $wpdb->query( $sql_users );
  }
  // insert_company_data();
  add_option( 'jal_db_version', $jal_db_version );
}

function role_exists( $role ) {

  if( ! empty( $role ) ) {
    return $GLOBALS['wp_roles']->is_role( $role );
  }
  
  return false;
}

function kmq_init_user_role() {  
  $roles = ['NGen_Admin', 'Company_Admin', 'Participant'];
  foreach ($roles as $role) {
    if ( !role_exists( $role ) ) {
      add_role(
          $role,
          __( $role ),
          array(
              'read'         => true,  // true allows this capability
              'create_posts'   => false,
              'edit_posts'   => false,
              'edit_others_posts'   => false,
              'delete_posts' => false, // Use false to explicitly deny
              'publish_posts'   => false,
              'manage_categories'   => false,
          )
      );
    }
    remove_role( 'subscriber' );
    remove_role( 'author' );
    remove_role( 'contributor' );
    remove_role( 'editor' );
  }
}

function kmq_init() {
  kmq_init_table();
  kmq_init_user_role();
}

function custom_user_profile_fields($user){
  $temporary_data = get_company_list();
  
  if(is_object($user))
      $my_company = esc_attr( get_the_author_meta( 'company', $user->ID ) );
  else
      $my_company = '';
  ?>
  <table class="form-table">
      <tr class="form-field form-required">
          <th><label for="company"><?php _e("Company Name",'KnowMeQ'); ?> <span class="description"><?php _e('(required)'); ?></span></label></th>
          <td>
          <select id="company" name="company" class="form-select" aria-required="true" aria-invalid="true" aria-describedby="wpcf7-f676-p73-o1-ve-text-anruf" required>
            <option value="">Choose a Company</option>
            <?php 
              foreach($temporary_data as $company) {
            ?>
              <option value="<?php echo $company->company_id ?>" <?php if($company->company_id == $my_company): ?> selected="selected"<?php endif; ?>><?php echo $company->name ?></option>
            <?php    
              }
            ?>
          </select>
          <span class="wpcf7-not-valid-tip" aria-hidden="true"></span>
          </td>
      </tr>
  </table>
<?php
}
add_action( 'show_user_profile', 'custom_user_profile_fields' );
add_action( 'edit_user_profile', 'custom_user_profile_fields' );
add_action( "user_new_form", "custom_user_profile_fields" );

function save_custom_user_profile_fields($user_id){
  # again do this only if you can
  if(!current_user_can('manage_options'))
      return false;

  # save my custom field
  update_user_meta($user_id, 'company', $_POST['company']);

}
add_action('user_register', 'save_custom_user_profile_fields');
add_action('profile_update', 'save_custom_user_profile_fields');


add_action( 'user_profile_update_errors', 'crf_user_profile_update_errors', 10, 3 );
function crf_user_profile_update_errors( $errors, $update, $user ) {
	
	if ( empty( $_POST['company'] ) ) {
		$errors->add( 'Company information error', __( '<strong>ERROR</strong>: You must select company.', 'crf' ) );
	}
}

?>

