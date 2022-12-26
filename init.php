<?php
// Temporary insert company's info.
function insert_company_data() {
  
  $temporary_data = array(
    array ( 'company_id' => '8dd0def9-97a4-4518-af62-5ea629f4bd30', 'name' => 'KnowmeQ'),
    array ( 'company_id' => '8dcc47f3-3f91-4e4a-8d7e-0767c1ab11a9', 'name' => 'Company_A' ),
    array ( 'company_id' => '384a6716-e25a-412a-8996-ceaa208d9e9f', 'name' => 'Company_B' ),
    array ( 'company_id' => '8db33fb1-643b-4bcd-ad69-5c138ae5c301', 'name' => 'Company_C' ),
    array ( 'company_id' => '6a84c80b-bfad-4018-a04f-98188871ec5b', 'name' => 'Company_D' ),
    array ( 'company_id' => '5e19650a-a364-4804-87cd-c00e9a4ae115', 'name' => 'Company_E' ),
    array ( 'company_id' => '0b67c95a-d02c-4de4-b46e-59d1288b41e7', 'name' => 'Company_F' ),
    array ( 'company_id' => '65784794-e523-4b95-8bf5-f59c0b7d768b', 'name' => 'Company_G' ),
    array ( 'company_id' => '71694405-0680-4961-9b19-5159b5504475', 'name' => 'Company_H' ),
    array ( 'company_id' => '72a2e250-5b6f-4ae3-afbc-ccf0685d8822', 'name' => 'Company_I' ),
    array ( 'company_id' => '43348ff7-9f9b-4416-a0cd-1a920e2f2ddc', 'name' => 'Company_J' ),
    array ( 'company_id' => 'e8e15d23-2abc-482f-8c58-1e41dc79351d', 'name' => 'Company_K' ),
    array ( 'company_id' => '03a30db6-2797-4a6c-a216-6a790e29b78e', 'name' => 'Company_L' ),
    array ( 'company_id' => 'ccc20489-c9cc-4429-9588-8caaab7d113a', 'name' => 'Company_M' ),
    array ( 'company_id' => '3905b61a-7007-4c5d-8f05-501acecc979c', 'name' => 'Company_N' ),
    array ( 'company_id' => '368f4feb-ecef-44dd-b2ab-19334575d2c5', 'name' => 'Company_O' ),
    array ( 'company_id' => '70c46fab-84e0-46e5-b0d2-4b353d70d9f6', 'name' => 'Company_P' ),
    array ( 'company_id' => '8e8cdde7-ad21-464c-a6c5-4359e1fb87ee', 'name' => 'Company_Q' ),
    array ( 'company_id' => 'b29c9051-fdc7-427c-a759-e3bae1bc447b', 'name' => 'Company_R' ),
    array ( 'company_id' => '6e688313-1ffd-4a7c-8ccf-b65db96246a8', 'name' => 'Company_S' ),
  );

  global $wpdb;
  $table_name = $wpdb->prefix . 'kmq_companies';
  $wpdb->query("DELETE FROM $table_name;");
  foreach($temporary_data as $company) {
    $columns = implode(", ",array_keys($company));
    $escaped_values = array_values($company);
    $values  = implode("', '", $escaped_values);
    $sql = "INSERT INTO `$table_name`($columns) VALUES ('$values')";
    $wpdb->query($sql);
  }
}

add_action("after_switch_theme", "kmq_init");

function kmq_init_table(){
  global $wpdb;
  global $jal_db_version;

  $table_name = $wpdb->prefix . 'kmq_finish_later';
  $table_name_two = $wpdb->prefix . 'kmq_companies';
  
  $charset_collate = $wpdb->get_charset_collate();

  $check_table = "SHOW TABLES LIKE '$table_name';";
  $check_table_companies = "SHOW TABLES LIKE '$table_name_two';";

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
    company_id TEXT NOT NULL ,
    PRIMARY KEY (id)
  ) $charset_collate;";
  

  require_once ABSPATH . 'wp-admin/includes/upgrade.php';
  $check = $wpdb->query($check_table);
  if($check == 0)
    dbDelta( $sql );
  $check_companies = $wpdb->query($check_table_companies);
  if($check_companies == 0) {
    dbDelta( $sql_companies );
  }
  insert_company_data();
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
      <tr class="form-required">
          <th><label for="company"><?php _e("Company Name",'KnowMeQ'); ?> <span class="description"><?php _e('(required)'); ?></span></label></th>
          <td>
          <select id="company" name="company" class="wpcf7-form-control wpcf7-select wpcf7-validates-as-required fill_inited wpcf7-not-valid" aria-required="true" aria-invalid="true" aria-describedby="wpcf7-f676-p73-o1-ve-text-anruf">
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

?>