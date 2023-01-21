<?php

/* Import React components into WordPress */
function kmq_load_assets() {
  wp_enqueue_script('ourmainjs', get_theme_file_uri('/build/index.js'), array('wp-element'), '1.0', true);
  wp_enqueue_style('ourmaincss', get_theme_file_uri('/build/index.css'));
}
add_action('wp_enqueue_scripts', 'kmq_load_assets');

// Database creation when theme is activating.
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
  
  $sql_users = "CREATE OR REPLACE algorithm = UNDEFINED view `get_all_participants` as
   select `wp_users`.`ID` AS `ID`,
    `wp_users`.`user_login` AS `user_login`,
    `wp_users`.`user_nicename` AS `user_nicename`,
    `wp_users`.`user_email` AS `user_email`,
    `wp_users`.`user_url` AS `user_url`,
    `wp_users`.`user_registered` AS `user_registered`,
    `wp_users`.`user_activation_key` AS `user_activation_key`,
    `wp_users`.`user_status` AS `user_status`,
    `wp_users`.`display_name` AS `display_name`,
    `wp_usermeta`.`meta_value` AS `job_title`,
    `wp_usermeta`.`meta_value` AS `company_id`
  from ((`wp_users` join `wp_usermeta`) join (select `wp_usermeta`.`user_id` AS `user_id`,`wp_usermeta`.`meta_value` AS `meta_value` from `wp_usermeta` where ((`wp_usermeta`.`meta_key` = 'wp_capabilities') 
   and (substring_index(substring_index(`wp_usermeta`.`meta_value`,'\"',2),'\"',-(1)) = 'Participant'))) `t`) 
   where ((`wp_users`.`ID` = `wp_usermeta`.`user_id`) 
   and (`wp_usermeta`.`user_id` = `t`.`user_id`) 
   and (`wp_usermeta`.`meta_key` = 'job_title')
   and (`wp_usermeta`.`meta_key` = 'company'));";

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

// Add custom company profile to the user.
add_action( 'show_user_profile', 'kmq_add_company_to_user_profile' );
add_action( 'edit_user_profile', 'kmq_add_company_to_user_profile' );
add_action( "user_new_form", "kmq_add_company_to_user_profile" );
function kmq_add_company_to_user_profile($user) {
  $temporary_data = get_company_list();
  
  if(is_object($user)) {
      $my_company = esc_attr( get_the_author_meta( 'company', $user->ID ) );
      $my_job = esc_attr( get_the_author_meta( 'job_title', $user->ID ) );
  }
  else {
      $my_company = '';
      $my_job = '';
  }
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
      <tr class="form-field form-required">
          <th><label for="job_title"><?php _e("Job Title",'KnowMeQ'); ?> <span class="description"><?php _e('(required)'); ?></span></label></th>
          <td>
          <input id='job_title' name='job_title' type="text" value="<?php echo $my_job ?>">
          </input>
          <span class="wpcf7-not-valid-tip" aria-hidden="true"></span>
          </td>
      </tr>
  </table>
<?php
}

add_action('user_register', 'kmq_save_company_info');
add_action('profile_update', 'kmq_save_company_info');
function kmq_save_company_info($user_id){
  # again do this only if you can
  if(!current_user_can('manage_options'))
      return false;

  # save my custom field
  update_user_meta($user_id, 'company', $_POST['company']);
  update_user_meta($user_id, 'job_title', $_POST['job_title']);
}

// Make company dropdown menu as required field.
add_action( 'user_profile_update_errors', 'crf_user_profile_update_errors', 10, 3 );
function crf_user_profile_update_errors( $errors, $update, $user ) {
	
	if ( empty( $_POST['company'] ) ) {
		$errors->add( 'Company information error', __( '<strong>ERROR</strong>: You must select company.', 'crf' ) );
	}
}

// add_action('init', 'remove_default_redirect');
// add_filter('auth_redirect_scheme', 'stop_redirect', 9999);

// function stop_redirect($scheme)
// {
//     if ( $user_id = wp_validate_auth_cookie( '',  $scheme) ) {
//         return $scheme;
//     }

//     // global $wp_query;
//     // $wp_query->set_404();
//     // get_template_part( 404 );
//     // exit();
// }

// function remove_default_redirect()
// {
//     remove_action('template_redirect', 'wp_redirect_admin_locations', 1000);
// }

//disable wpadmin page for non admin users
add_action( 'admin_init', 'kmq_allow_admin_area_to_admins_only');
function kmq_allow_admin_area_to_admins_only() {

      if( defined('DOING_AJAX') && DOING_AJAX ) {
            //Allow ajax calls
            return;
      }

      $user = wp_get_current_user();

      if( empty( $user ) || !in_array( "administrator", (array) $user->roles ) ) {
        echo "<script> alert('" . $_SERVER['REQUEST_URI'] . "') </script>";
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

add_action('after_setup_theme', 'kmq_add_support');
function kmq_add_support() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  //will remove the top wp admin bar
  if (!current_user_can('administrator') && !is_admin()) {
    show_admin_bar(false);
  }
}

//Disable default wordpress login page.
add_action('init','kmq_disable_login_page');
function kmq_disable_login_page() {
    $new_login_page_url = home_url( '/user-login/' ); // new login page
    global $pagenow;
    if( $pagenow == "wp-login.php" && $_SERVER['REQUEST_METHOD'] == 'GET' && !str_contains($_SERVER['REQUEST_URI'], 'action=logout')) {
        wp_redirect($new_login_page_url);
        exit;
    }
}

// add company name to user in admin panel
add_filter( 'manage_users_columns', 'kmq_new_modify_user_table' );
function kmq_new_modify_user_table( $column ) {
  $column['company'] = 'company';
  unset( $column['posts'] );
  return $column;
}

add_filter( 'manage_users_custom_column', 'kmq_new_modify_user_table_row', 10, 3 );
function kmq_new_modify_user_table_row( $val, $column_name, $user_id ) {
  switch ($column_name) {
      case 'company' :
          return get_the_author_meta( 'company', $user_id );
  }
  return $val;
}

//change mail type to html
add_filter( 'wp_mail_content_type', 'set_html_content_type' );
function set_html_content_type() {
    return 'text/html';
}

//send email to user
add_filter('wp_new_user_notification_email', 'kmq_wp_new_user_notification_email', 10, 3);
function kmq_wp_new_user_notification_email($wp_new_user_notification_email, $user, $blogname) {
 
  // $user_login = $user->user_login;
  $user_email = $user->user_email;
  $user_id = $user->ID;
  $new_password = wp_generate_password( 24, true, true );
  wp_set_password( $new_password, $user_id );
  // The blogname option is escaped with esc_html on the way into the database in sanitize_option
  // we want to reverse this for the plain text arena of emails.
  $blogname = wp_specialchars_decode(get_option('blogname'), ENT_QUOTES);

  $thanks_message = '<br/><p><strong>Thank you for registering!</strong></p>';
  $text = '<p>Thank you for registering in NGen’s Transformation Leadership Program as a part of the DAIR Supplier Development Initiative. The following is your username and password to get into the system. The content will be accessible when we begin at 8am Tuesday January 24th. Please log in before this time to ensure that any access issues may be resolved. You will need a computer to access the Strategic Assessment Tools (SATs). We ask that you not complete any SAT before you have attended the corresponding module. The Zoom links for the program sessions will be sent separately.</p><br/>';
  $button = '<p style="cursor: pointer"><a href="https://tlp.digital/user-login" target="_blank"><button style="cursor: pointer; border-radius: 1.875rem; border-width: 2px; border-style: solid; border-color: rgb(237 78 29); background-color: rgb(237 78 29); margin-bottom: 30px; margin-top: 20px; padding-bottom: .375rem; padding-top: .375rem; padding-left: 3.75rem; padding-right: 3.75rem; font-family: Avenir Next; font-size: 1.125rem; line-height: 1.75rem; font-weight: 700; color: rgb(255 255 255)">Login To Your Account</button></a></p>';
  $email_message = "<p>Email: {$user_email}</p>";
  $password_message = "<p>Password: {$new_password}</p>";
  $contact = "<p>For technical issues and questions about the Transformation Leadership Program please email <strong>tlp@ngen.ca</strong></p><br/>";
  $contact_img = '<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjY0IiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgMjY0IDM2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPHJlY3Qgd2lkdGg9IjI2NCIgaGVpZ2h0PSIzNiIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfNDMyXzM1MyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMC4wMDc5MDEyMykgc2NhbGUoMC4wMDA3NDA3NDEgMC4wMDU0MzIxKSIvPgo8L3BhdHRlcm4+CjxpbWFnZSBpZD0iaW1hZ2UwXzQzMl8zNTMiIHdpZHRoPSIxMzUwIiBoZWlnaHQ9IjE4NyIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUJVWUFBQUM3Q0FZQUFBQ3BkVVFCQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQVd5RkpSRUZVZU5yc3ZUMXkzTWdXdHBsWG8xQU1yVnQzQlYxY2dZcmVmSmFLQzJDSTlNWlQxUXBJeWh1THhRMkk1QXBZc3Naa0tlU01SOGo2eG1QSm12R0VYa0hYdFJSQnB6OGM4cUFiWWhjU1FHWUNoWi9uaWNCVlg1S0ZTcHc4K2ZmaTVFbGpBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUhyRnZ6QUJRUGQ1UE5vYkovK01LM3drZnZQMVo0emxBQUFBQUFBQUFHQ29JSXdDZElESG83MXA4czhvdVNiSjladDVGa0hULys5TG5MbCtULy83emRlZkVaWUhBQUFBQUFBQWdMNkNNQXJRTWg2UDlrVHNuQ2JYVy9Nc2ZFNTJXSnkxZVJaS3Y4bC9JNVlDQUFBQUFBQUFRRjlBR0FYWU1Sa2g5TDMrMjNZaTh5eVVydDU4L2JtbUJnRUFBQUFBQUFDZ2l5Q01BdXlBeDZPOVkvTXNoTXEvb3c0L3lpYTVWc24xSmJtaU4xOS9icWhkQUFBQUFBQUFBT2dDbFlYUng2TzkrMERmL2ZuTjE1OUxxcUE5YU9UaWxjTkh6NGtjTEdYZnZvaWhObGJhdGxmVU9BQUFBQUFBQUFDMG1kY09uNWtHK3U3SjQ5SGVHa0d0Vll3YzYzZUU2YmFqcDhXZm1tY3hkRHlBUjViblBFNmVXeUpIbCtaWkpLV05Bd0FBQUFBQUFFRHJlTFhEN3hZeDdaWXFnRDRpMGFFYVhmMGp1YzdNTUVUUmwrMWJudnRCN0pCY003d0NBQUFBQUFBQUFOckVxeDEvdjBTTkxxZ0c2QXNpQUNhWGlLRjNwaHNIS1RXQjJPRlc3SkpjWjhsRmhERUFBQUFBQUFBQTdKeFhMU2pEaGVhMkJPZ3NHVUZVb3FESFdHUXJZaGZKWVNzQzZRS0JGQUFBQUFBQUFBQjJ5YXVXbE9NT2tRUzZDSUtvRTlMV0x3d0NLUUFBQUFBQUFBRHNrTFlJbzJQekxKUUFkQUxOSVlvZzZrY3FrRDZRZ3hRQUFBQUFBQUFBbXVaVmk4b2l1UWVQcVJKb00zTEt2QjZxSkRsRXgxZ2tDR0pIeVVFcUF1a1Vjd0FBQUFBQUFBQkFFN3h1V1hsRUhJbmVmUDI1b1dxZ1RlaDJiemxsdlMyUnpkSkcxdnJ2ZC8xWnJGY1JZL08zcVB2V1BFZHVabisyS3lUWHNKeGd2MHorUGFjZkFBQUFBQUFBQUlBNmFac3dLZ0tOYkUwK29XcWdMV2dVNHk2M3pFZm1XUVFWQVRSKzgvVm5WUE96eW5PS1lDcEM1WFFIenp0TExrbFZNRStlZFlVSEFnQUFBQUFBQUVBZHZHNWhtVVFRbWIzNStuTko5Y0F1MFNoUmlSQTlhL2lybytUNkp2L1dLWUp1WTl2M3FWZ3FJdWs3YVo4TkZVVnNMNGV5aVRBNkozb1VBQUFBQUFBQUFFTHpyNm9mZUR6YSs3T0Jjb2tJY3ZEbTY4K1lLbW9PRmNEdUhUNTYyTFNBMTRBdFJBaHNLbytvK0xzSWdGL01zeGk2YWJsdFJCeDliNTVGMGxGRDlqbnBtNDhCQUFBQUFBQUF3RzU1M2RKeXBWdnFENmtpYUpySG96MkpFTDFxNEt1V3lmV2xhOXZGdGJ4UGtad05pYVJ5WDhrOWVwMTg5emtlQ2dBQUFBQUFBQUFoYUd2RWFNcmxtNjgvRjFSVE13dzlZbFMzem9zZ1grZDI4VGk1YnBKcjJhZnQ0V283c2R1cGVkNTJYeGRyOVRlMjFnTUFBQUFBQUFDQUYyMFhSZ1haVXIrbXF1cG55TUtvYnAwWFViUXVVVS9zY3ptRTdlRHFSeC9NOHlGS2RiQlJuNk5mQUFBQUFBQUFBQUJuWG5XZ2pMZFVFOVNKYmdjWFFiZ09VWFNaWFB0dnZ2NDhIRXFPVEhuTzVKckxjK3Z6aDBhaVV4L2trRGE4RndBQUFBQUFBQUJjYVVvWTlkbjJPbms4MnJ1aXFxQU9WRnlUUTVaQzU4ZVVISndpaU02SGVvaVlQSGZOQXVrdDRpZ0FBQUFBQUFBQXVOS1VNQ281RlgyMnZaN3A5bHlBWUNRK0pkSElvU09TSS9POHpmdGtxSUxvUzE0SXBGSEFXMHVmc3NMQ0FBQUFBQUFBQU9CQ2sxdnBSUmp4aVJ5OTFRTmVBTHhSVVhRVzhKYmkyL01oYlptdmlncWtoOGwveWhWNzNvNURtQUFBQUFBQUFBREFpOGFFVVQwbzVkTGpGbU5EdmxFSVFBMmk2TFY1M2phL3hMcWwrZ0xKUWJydjBSOGdpZ0lBQUFBQUFBQ0FONDBldnZUbTYwOFJrQ0tQV3h6clFUa0FUZ1FXUldQekxOQ2RJOUk1OVFlTDVKOERVeTNOQnFJb0FBQUFBQUFBQUFSaEY2ZlNzNlVlZGtKZ1VWUkUvZ08yemZzaGtlVEpKZUpvbWVoUlJGRUFBQUFBQUFBQUNFYmp3cWdlU0RQM3VJV0lvbmRVSFZRaG9DZ3FvdHdKVWFMQis0V0ZlYzQ5bW1kVFJGRUFBQUFBQUFBQUNNb3VJa1pGQkpHVHBIMU9rNTQrSHUyZFVYMVFob0NpcUloekIrcS9FTDVmaU16Mmsrc1JSUUVBQUFBQUFBQWdPSzkyK04yK1crb3ZIby8yeGxRaDJFaDg1TXFFRVVXWDVsbWNpN0ZxZllqNHFTZlhYK3VQRUVVQkFBQUFBQUFBb0JaMkpveXEwSEhpY1F1MjFJT1Z4Nk85V2ZKUGlNaGkyVFkvUjV4cnRIODQxLzRCVVJRQUFBQUFBQUFBYW1HWEVhUHAxdGxyajF0TUhvLzJGbFFqdkNUeGkybnl6MjJBVzRrZ2VvMUZkOUkvckJCRkFRQUFBQUFBQUtBdVhyV2dESElhOWRyajg3S2xma0pWUW9xbVdQQ05KaFpCVHZLSkxuZjRISkpMOTNaWEtTT1M3eDBsMTExeUhlTlZBQUFBQUFBQUFOQTNkaTZNYWtUWTNQTTJJdDZNcUU1UVB4QlIxTWNmeENkbEMvZDZGK1dYRkFESjlTUDV2L2ZtT1QvcWJFZm1QTlpMMnRjUE9mQ01kZ1lBQUFBQUFBQUFmZUYxR3dvaEF0VGowWjVFamw0NDNtS3NuejJuU2dlUEhMYmtFMEc4RTFGVW8wTEZoMFdJZkNrK25pYlhZZ2UyUEgzUnhzUzJWMGxabDhtL256VVZCZ0FBQUVDam5IMzhPTTM4My9TL1k3MmUvdnY2MDZjWVN3RUFBRUFSLzZyNmdjZWp2VDhkdnVmeXpkZWZpeEwzZmpCK290WWhZbzA3bXBmenZxdDIxOE9XZlBLS05pNkthcGsvWkNiMWVjeWIzTmF2NlNrZUN2NU03SFNUWE9RQ0JRQUFnRm80Ky9oeGJKNWZITC9UZGNLNHdzZlhlbjJUK2NyMXAwL01Wd0FBQU9BWDJpYU15a1JIeEJqWDdib3kyZGxIcEhHank4Sm9JTjlwUkJUVnNzN01jMFJtMmZKR1Nka09HN1RuclNtL2hWOXN0MHl1bTZTTU1TMEpBQ0FjWng4L3l2ekp0cU1tdXY3MDZiRGhNc2xjWWJwdHZwZVVaVUd0UVFBZmsvblJzYzZWUXA0bHNFcXVMNG1mTHJFeXdFN2J1TFRycTh4WUl1dUpHOFlRQU5nRnI5cFVHQlZWTGoxdUlaT29XNnAxa1BqbUZUMXBNRkwwV0JlNVZjbzdiZXFRTWMwak9xdlk3czZNZXlvTUFBQndaNW9zTU04d0EvUUJFVVQxWmNBUG5kT0hudnZJSE93MitZNGZ5VFhENGdBN2FlZGo4eHlNTTMyeG5yaElmc2RhSGdBYTUxWGJDdlRtNjg5cjgvdzIxM25Dbzl1VFlTQWs5YjN3bkRqUEc0NTRYVHArN3JTaDhybTJueHU4RVFCZ0oxeHA5QTFBWjFHQlh3VFJxaStQWFJpYlo0SDBYa1VhQUdnT1d4dWZNWjRCUU5POGFtbTU1SlI2biszd1Y3cGRHWHFPUmxINlJDcGVONW03VTlCVUR5N2ZlZHpRcWZBdUFtelU5SUZWQUFEd0MwVFpRQ2NSRVNTNUpCMlNiS3NkTmZ6MTArUjZTTDcvbUpvQWFJeWlkVHJ0RVFBYXBaWENxQXBIYzQ5YnNLV2VoV0FaNU5DZzh4MlYrOGJScjJ1ZEtEd2U3UjJiYW9jYXBIekdGUUVBZHNwRXR5QURkQWJkemk1YmFxdEVpTW1MV05sZGRwbHpSYVphZ0lYTXIrN1lXZzhBQURCTVhyZTFZRysrL2x3OUh1MHRqZnUyWHNuSmVLWmI4NkdIU1AwYTl5MzBNcW1lNzlDLzEwbjUxdzdsbCtqWVpZMUYrK0R3bVUzVFViY0FBTEI5akRqNytGRU9ZNG93QmJTZEVnZUxaUkdmbHBld3BVK1cxKzI0SDNRdFVTWVNWVkpTY0hJOVFQMFV0YkVWSmdLQUpublY4dkpKTkYvczhmbXJwZzZzZ1diUkxlV3VXK2lmSXBJMU1ubVh1RVNOanBObm45WmswN0Z4aTBnbHR5Z0FRSHU0MVJPOUFWcUxIckJTWmg2M1RLNzk2MCtmRHVVaytTcWlaZkszNitTU3RjUytLVTdUSmI4N1JCUUZhQVRiWWN2eWNvLzBYQURRS0svYlhEZ1JyaDZQOW1RaWMrK3pRRWl1QTZxNmQvamtvYnBzU1Q3TWxlTnp2RGZQa1JPaGNkMm12OFFkQVFCYXcxakhsam1tNkM5NWFST3VQMzFhZEtUc3M0SS9rM25hZVlqb1p4VTdseElOYXA3RjJMTVhmNUtLb29neEFQbjlTeXd2SjBMY1g5cGE4aDBuT2xhTlg2d3B6cWtCQUdpYTEyMHZvSndXL25pMGQybmNvd01ueWVldmRwaExFZ0tqVWNBeng0K3YycEplUVlYLzVaWUplaDZ5T0xpUk5CTTFsZWRhdC9mTDRVdkhGZXdaNDVVQUFLMUNUdlg5a2l3KzJZN1lYL0xteFlzMkYxb1BPU3FhMDB0a2FIQmhYd1hTODZRTTM4eHo0RVQ2WWhwUkZLQzRmNUYxeURKZ2U1VHhhYVVwTDZRdHJvbllCb0JkOGFvTGhYeno5YWRNOG53bUxHZDFiVCtHblhEbCtEbmZRNzNxNEtaRW1VWEkzVS9hd1dGZG9taW1yY25wOHZJR1Y3YWR5UXVKMkxQOEFBQlFENUd4N3g1Z1N6MjBpc1FmeDZiNDBNeDVIYUpvRmhWa0R0TjVJYUlvd083UWxCY1JvaWdBN0pMWEhTcXJUSkllUEQ1LyszaTBkOUNDdkpMZ2dRcmNVMWNmYWx2OVM3Umw4a3pSbG1lU1NicUlqcXRkbEZtalFCZHlKZVdibWVmREMxNldNUlloRmE4RUFOajUzR2liQVBwMDByWjVGb0FBMnNDdHNhY1Btb2ZhcWx1RWlxSC9vVW9BQUFEZ1ZWY0txamtoZmJiRGo0MTdwQ0cwQjllVUNxdTZveTA5eUVaZHlvSkFJa05GeEYrV0ZVVWZqL2J1ayt2UEN0ZDloYlluNVpDRjliNldiN09sM0FBQTBERFhuejdGeHI0VFlucjI4ZU1abG9KZGsvamh6TmhmYkY4MkpZb0NBQUFBWkhuVnBjSnFic2pJNHhheng2TzlZNnE5bTNoRWl6N2xsR3F4WDYrMGZQOUovbnZlMWloTWlTS1Y4cG0vVDNkbEFRTUFzR1BTUEcyV1A3blFMY3dBdThUMllqdnF3cUZSQUFBQTBFOWVkN0RNdG0xalpaQXQ5UkZiNm5zM3FiWngwL1lEZ3RweUlGVEpzajZkN29vN0FnQzBhbTRrQjFpTXQvd3UzVkovZ0psZ0YyaTA2RGpuMTIzTS93NEFBQUFENGxYWENxd0NsODhFS2wwZ1FJZndpQmFOOWZBdUFBQ0FYcUtIVnRqbVJwT3pqeDhaQzJGWG5GcCtkNk1wSVFBQUFBQjJ3cXN1RmxxM0h2dmtpNXcrSHUyUmM2cy9rMm9ibDVnT0FBRDZqcHpxSy85WS9rUzIxRSt3RkRTSitseWUzMjBLZkJZQUFBQ2dkbDUzdU93U0dURTE3bHZxTHg2UDlsWnQzMklOVDlHaTQrUWZsOXl3YXprNENBc0NBTUJBdU5TNVVaNFFkWGYyOGVPQlJwaTJIaFhWNUhuZTZYeHYrbktjTjgvaTJyZmtXdWxKNHo3ZmxUZW4zUGpjVys4dmM1bHh6cS9qYlZHVHlXZW1EdDlUNWpQZXoxT0JENWJmM1hURkZ6M3FmYVJ6MkxmYUxsLzYyVWI5ZUsxK0hJV3dTWjYvNlF1VVBQLy9rRk5HS1Z1Y2FXZHhBM1pMNS81NWJUL09sQ25LZXk3SCt0cldmNjYzMVV1bW5PL1YzdU5NdlM2VHo1dzd0dUdwK3N5Mlo5OWs2dVM3UzUxWW50UEdxR1QvRXBjcGo2VlBYSWZzRnpKMTlGYS9MNjhOWnYwcER2ajkyOGFXM0Q0NCtmdXNQNzIwZC9TaUxaSWFFQ0FRblJWR0pjL2g0OUhlU2ZLZjk0NjNJT2RXZDNDTkZqM0hkQUFBTUJSa2taUXNxdEpjN051UWhkWkYyOGRIelVsNVdtTGhudjVlRm84U0VTc0xSdGZUemVWZXQ1WXlIWHFLTDNlVzV6blV4ZTVMWE9hNFpUNFQ2WGMyd2RUeXUyVmYyNklLU0NJMHprcXNSNlo2eVc0MmFjTXI5ZVBZb3dnenN6MDMvNzllbEZORW1DdVRMOXFuYlVPdXA3OU5QaVArYzE2SHVGNmg3WS9OMzhKUjJ2WS9TemZvS1JaTmN0clFvY2tjQUt6MWUySHg3MHJDbzRwM0YycmpVVW1mU1pFNldhdlByRHlmTThSbjVBWGR3c05IZjdGMUE3NlV0ZWRNUHl2Zi85bHhMSG5KbGRrdWNCNW15anJTOW45YVVQL1pja3E5TDdYZUVVZ0JQSG5WNWNMcjZkMCtXM0FtajBkN0M5eWc5Y3djUGhPMTlYVDNMSW4velpMcnRvdVZJdVdXOHVPZUFBRHRRY1VLV3hxWk14VkRXb2VVSzdsK21HZUIwbVhidjRnTHQzS1BxdEdXdWdDMkxZTHZkUEhxOGx4WGx1ZTVEQlh0MXNMNnRJbEQ2ejdtRmhXQks3bEVCTDkzbkwrTzlITS82c3dMTEhXajVid3pkbEYwRzlLMkhwTFBud1VzenpSQTI3OVF1eDNYWE1kWFdyOUZmVXhjMGwva21YOW92YnZ1aEp4b0gzWHYyay8xcUEzNmppT3BqenVOSlE3bGxUSStxUCtPS3ZZVlorcnpVd01BWHJ6cXdUTmNsaGw0TE1pV2VuSnV0UlFWM2x3RytNOGRlVFladERzbmptcDVuOHFQT0FvQTBDNnVQMzFhR0h2RXpXM2JGczhxRHJpSU5OdVFlOXc3Q0RjU1NidTJMRUx2SEo1cnFvdlhiYXkxcnZxS2JYNGQ5ZTFoVlpBVGdTT1VNQ2VSa0EraDI2cmU3ejVBT2ErMDNmcVdaNkhsQ2RIMm45cXBpcGQxMVBHOXBUMi81UGVDZTgzVVgwTE9vNmZhOXcxT0hQVVUrNHZHa2xyR1RQVUJYOThmYVJtUERRQTQwM2xoVkxiVUovK2NlTjVHeEowUjd0QkszanQ4Sm01N2J0R01LSnJTR1hFMEk0cG0yODhNVndVQWFCV3lwWDVqV1VpMVlzelJ4V3hvY1NDbGtuQ2oyeEZQTEhhYlZoRmJkU0dkOS8waDVxOXRaMnI1M2JjK1BhZ0tISGZHUGVJdmo2ZnR5NkZFbVl3b0dpb29aS2JQN2xvZWFSOFhkVlJKQ05GMlMxbW5nZTYxMEw2aGp2WG54RGk4eE9sNCt3c2w5dWY2dVFrc09HdWs2RlZBSDdqVmxBd0E0RUFmSWtaRkhDM2FObFptQUxuQUhkcUZ4NkZMTnkxL3Jsbk9RcW4xNHVnV1VmU3Z3Umh4RkFDZ1BlZzJaVnN1MFdNZlFTTWd0dHliS1RMUHU5YTUzbHd2K2UrbEtkNDFWRW00VWJ2TkxYOXlwUXZhVWd0Vmt4OEpOQyt4bFR5eVhDNmZTYTkxQytwOTNaZTJwdjVWTkg4VElYeWxmaXZ0OGtULys5SVVSOCs2Q0YxNTlyMnd0TGQxcGt4cCthNUwxTldWaTJDa1F1UE1zZTFmbDJ6N2kwRFZYSlF2ZHBOcFgzSEJjMHVmVU9iOGhGajd1SmMrVTZaT3BnWDkzc2FoZjltVTdGL2lodHRmRmJFL3l2ajRZWVUybUxiRGtPSm8zb3VVYkYrUmJZdEY0MTFyWG5nQ2RKSFhmWG1RTjE5L0xoNlA5dDRiOXplZ1o4bm52M1FoTCtXQWNCRkZONmJGeWZ3dG91aGZrN2prYjhTZjV5MHNlOUVFOWxiTHZzUjFBUUIyaitUTlRCWng3eTNqNmROQktydks5YWpiWGFlV1Aza1NCWXJLVitJZ2xFclBLUWVZSkg5L2FmSmZtc3RXM1FQYmdSZTZyVEhQN3RkbERrbEovdWJRY3Y4L3EzNW1CN3l6UEZ0Y2d6K1Z5ZnRZcHY3L1ZlRTdKd1h6T3R1aE9Ldk1mY1ltL3pBYVFZU3VSWVhVQzNtK2VWYWhuYTFldExFOG9UL05kYmlvWUxkRndaeFN5blJUY01EVHVkci93dExXTHJUdFJ5WHJQa3IrZnV2OGZNdlB4RjVQb3RwTDI2bDROc3J6ZlRuTXpUeUxlYU10OVNZQkhzdWNOdkxTWjY1c3o1NjNKbEs3VnUxZjFpM3JYMUtLUkZHeHFRakwyMDV4ajE3VVdkRUJTR2w3cnhMdC8yMUx2elROS2VlTjJYNkFXTGJlejdUZTgvcUphVi96VmdQVXlldWVQWTkwVWcvR1BTVDk3dkZvYjErMzU4UHUrZUR3bVZXbytrdDhRUWJhTHpLcENISFBFcUxvWDVPdnN1Sm84bmZIdXZDbytrSkFEaDZUUWZWYjhqMnJFdDlUNXEyK2dEaTZJeEs3VHpPVHRySjk0Rm9uWXBKK0lzYUtyYTdmdEY2cjFHODZNVjR6cmcyYXVTN0NSam1DeHExcDdvUnk4MEpvT2JNc1pBL0xubnF0aThESXNtQ3MvSndpUUNYM2U1ZXpnQjNiRnNjRlcraEZYRGpITFh1RExaTHpzcXlRcVNMWVFrK2t2ODlwcnlMeUxRT0t5dExPNWlWRmVtbGZCN3JPR20vNUV4R1RGaVhidm0ybjNsT0tpUXBDcHZRUkp3VlJ1OUluSEFTdWQydmRxckMxc1pWN2l6ajZGQTFhOW9SeDlZTVRTNzhuQnp0Tnl2YWpYVVFGZHRzYVNOWWo1MlZzcW44amJmQmFmU2xQY0piZEZtZkozMThIZkpTMStuMWNvcHpYeWZldjFYZnkxcytSQVlCS3ZPclR3K2pDM21kTFBTSG83UkVCeHNZdCt2Y20wUGZQZERFa0U0MC85QVQyaWVmOXF2aFc3clo2c1kyVzV3K2RrSitaNmk4RDByZWk4aklnZmI1cHp2ZVZGVVZUMkZaZmM5c1ErNHF3TGVLOTF0K2ZPa0c2VjUrOUtIbWxKK2Yra0hzazEwTnlpVThzOHZ3QkdxbGplWEZ4cHUzeVFldjN3YUYrVTUvNFErdjNYdTg1NDlEQjRaREptNW5IdE03VHIyMWpoVVVZT1hSWnpPdEM5ZHp5bkZYN05iRmJiRnNjNS96T3RrWHlCSzlzZHF0dHphTE1PT2ZYYzVlRHRUS1JmSGxDVHNqVVh5ZGxSTkVYZlVuZVMvdFJoZloxVmREMkl3ZTdMUzFsbXdRK21PWTh4S0ZwbWJxVzlpQVI2SXV5b3VpV2ZpK3ZIbnQ3SUk5R3pOcmFnN1RCZVZXYnl0OG5sL1RUUzh1ZlhRVGNVaCtyMzhjVnloaFpOQThPWVFKdzRGWGZIdWpOMTU4eU9FUWV0empXS0R6WUxTNTFFR3UrMlJDOGpGYWRpVENoSXNXc29zZ3hNMjZDK3kvaXFBaFZHc1g2UThzVGFrQWU2ZjN1VlRpWlpyNnpxaWo2MTRJWGNUUWMwaWVwb1BWRDYxL3FSUmJrVXhNMmNmOUUyOTZGK2tNcXBwM3B5d3FvcjQ0bktuWkwvVDdvd25GbXdoMlFZZFJmMHY1SStySWY2bGVNZVQxSEYxSFhCWXU4eHNSeWplN0s2MU1PZlNLY1ZDU0lTbzd0aFF0a1l4Y3kvMkUzRlV1bmxvVjZqRWYyaHJ3OGtkY3ExTG42c1BoL25zaDNIRWlRdVhRVUlDTkwrNXFXYVB0VHk5K2RlTFo5c2ZreVJOdTNFSVdNRkpUblRhNzlBRkdkZVMrRTN2VzQvVjBVK1BmU3MyN21GbjlLQTB4Q01IY1J4QzFqK3FqSjhSeWdMN3pxNlhQWlRoUXR3eTBpd001eEdjaERSWXVPTFpPMmlmckhIeXBpakF2dWRXejhvcEJuS2x6SVBZTGt6aXBBN3A4S3BLNmlhTFlkelhCbFp6K2N2b2dNdGdrSmRmdUVpSFEvOU1XQWlLU2pIdGozdnNwVlV4bEdhczlVREQxcnVJN0g2bGQzS3BJdUdQdDZqVVNYeExZK08rU0p1d1Y4c0N4bVE3emd6QldWWElRTHkvMUdXYnNWYkJHK3JoS2QxM002Mzgrb3VMK3R2Y1RHYi9kYTZuZmlLMUdPei9tK3pKSTFrbys0OXpubjUyODkydjR5VUY3RVBJSHdPTkNKM1pkdDlFZDk0UkxuckZ0NlJ5WW43emFpRUJHOUdYL0tHemRQQTR5WmthdmZxNWk2c3F4WEFhQUN2UlJHTlplYXorRTFiS25mUFM2VHZsQUxqb3VTUGlJaXhnL2RlanpOK2J2WStJbjBSZ2YrV2NQMm4rN2dPd2ZQQzZIczNvU05EQTZCVExTeTZTVzZ2TGlkVnJsQ1BxdldzMHphZjZnOTIyREhzZlo5YVJUcGlCYlpMMHBFUDA1TTJHMjZ0Z1Z0M3BoNUhlaFpaZXpkSnJDT0hMYlRGMFdpcGYyaTBibmp0clpEWHRGbWtEcVBTbDYrQXZ6N25KL2ZPRVovYlNOUGdQU05BbHg2bG5GdG1SdVhtZE51NHpKUTI3ZUpSVlBQMjBjdFA5UW1kcXlUdnEwVGc0blg2aytYRm4vM2ZVbmhHOVR6M1RLbkE0QUs5RFZpMU9pQk1rdWZSYk1JRkxoSTh6am1ObHlIT0R4R3hZQ3FnNXo4L1ljY1B5ektGZFZuNWh6Q1ZON3ZXaWlVbFZuYy9PaUJRRnFXY2FDNlB0TjZ2bWp4Z2lXdDJ3V3RzMTlvOUtOdDBYam1JaHhXblYvbC9Id1ZVRkFTdmxUOC9pSkUyTXdUaEdaNkl2cTJLSjBoNXhYOWx1dG9ZYUwzWHZxMzVINDhMSE9aL01qQ0tuTy9iWVNjOTBTQmZUamxjNEIrcERLV1BKL3J3Q2ttOHRyK3U1cnUyeGJpSEx2M1VSek5lekVSWEx6V0YyTnh4WEtVWVJOZ0YwRmtBQ0FJcjN2K2ZPYzZlWENkZk1sVzZTaGcza3J3V3pRMU1UQWNPNG9WdVcvOHhIOFNQM3A1OG1UZlFSUXRnUXJ4SXBTZGR0ZzNadVk1NVlQVTl5V24yK2ZXOVZNYUR0T2Q3VTNpanhkSnVkOXJlMlljN0FsNjJ2cDdpeS9lSmIvZkR5eFNsaEVudmdYK25qeWZmZXRvdDAxaUZ4RTRIM0w2Njd5NUMzbEZ0ek0ySFQyRXlmTHlZQjJ5M1lqZkpOK1ZaenVmKys2cVA4L3JjMElManJIRjUzeUlkdUJybzR6ZEpnVnp4YkhGN2xIUCtvOXBRNzZVc2pMYmM0cE91dVJQQUpCUHI0VlIyVktmTE9wa1M3MVBmamhaeUI3Z0tvM2k4a1kzMUVEb3NvMXdYU1FhREV3Y1JSUXRnZVpmdlREOTJlNGl6eU9IUk4wazliK2dobitwNjRWcFlJdHlqUXRaeVMxN1NiMzJDcHZBbDZZVHFpdktNYS9QZTZ1bmZJZml0NXlmTzQvQktsVEp2UEt1N0VjR25sZlVOamVhZGxnWXlCTkRSb0Y5V05oczgxa1JaeDBqNDNacDgzYzdidnRlTHlhYkVKUTFrdnBZYlRVMXd3bW9xR0tqeVE3OFc5YVpaeFhHc3pKOHB6WUIya1BmSTBaRmtJcVNCZDIxY1Q4NVRrNEtYckFnYkpScDFVbWoxSE1BOFdMcU9NRGRsUFRGSVlpamlLTEZmalpXMFdIYXc4ZnJVcFRoMnRRY3Zha1J3ZmVtSDBud3BWN2ZhcjF1YU1uZFJnVSsyVkovbGZNbmNsREpjVTJpWGw1N21MVjBqdkhTZGl1MVhkSExEdktLMm9WUkdTZTZPcmZPbThPTlRmdGZncld4L3o0Mi9ya2FmZXJOMTVlOTBjTzhUZzJINW5qVlk0M2k5ZHBTZDY0dktkaUpBOUFpWGczaElaTkYzTGxuNTNQaG1QY1NxZ3NKTG5hT0FuMzlCOGNKNXFxQ0wvWTU1eWlpYUxGL3l3dWFCOU5QVVRSTEdtWFk1anpObTVycldtendvMmVMSEZtNDNuTXdVejlJRm5MWEJlUFhiUjE1SUUwL1hneVdHZXMrNDJPNUoyVS9qUk0xK1JmWTJXV1VXcGZiZmkxekJvbCtUQzZaSzNRcDFVNWJpV3ZzeXpaZDhTa0FjT1BWZ0o1MTd2bDVUdWx0QnBkSmdYZGVNbzNpbTdrc2pxcEdUL1ZVSEVVVXRmdVhISzRrV3krdnpMQzJSVW1lNXJ1aDlaMmFKdUdocDNVdGZUVGlhTC9tUm5salVicWxIdjVKbWEzMFZ3VmJQb2RDWlBuZERQTXd4eDhxR2lVcWM0VXgxZ2hDakFrQXdKWEJDS01xUnZsc2FaSkI2d3FYcVIyWFF4RkNiRVZ3bmF6ZGVQaGpYOFJSUkZFTEdqa29FOSs2dG9uRnV2QzgxT3RFZmN0Mm5ldmZSZzFNSk5Nb3c4bEE2bHNXT3FIRkpPa3ZWbHBuNXlYcWQ2NS91NnFwZmhGSGU0Skd3ZGhlSEUrVHhmc1psdnBGekxpcU1HZTQ2K21KMEZXdzVZQS94VDZESXNZRWYvVWpaZWNLY1diOHZ5d1krNGMrRjZjdkFRQm5YZy9wWWQ5OC9YbXR1ZSttanJlUWs1ZS9KUGRaNFRxMU1YYW8xeWlBYjZ5U3V0MDN6L2w5WmlVSDE4am5CRzdOT1NvaTFuMkg2K3NjVVRRZkZjbENSNG1taytSdjZvTXU0bnIwb3B3ajdSY2wyZit4Q1IrOWtBcHBoMzArM1R5Z0tMcldPaEpCWWUyYjAxUHI5emhUdjZOUWRXbzRuTER6YU03TXBjbVAzcFBJeHloZzdyWk5qZzlLR1g3dmdKaFJSU2lXdnZST1JZc2grMWRlblkvVW5vdWVQSzZNejU4Yi9LNHUybWZiL0VMbU5JTTVpRVp5VWhiTUZjUk9Fbml4MG5RVVZlNDdaSWhJQmdCblhnL3dtU1V5d21lTG8yeXBqemg4b2phcUR1ckJSQllWT1NVYTYxd0ZqZzhGNWJuWndmTzJqYmU0N0hZQ1J3NXVWRFQ0WElld3FQM1pTcTl6amU0VS81K1pjS0x1MDBGRXliM25MWG01dEs3WS9zUW1VWTMxL2RkQ3lPZUZpNlYreFgrV1NUblB0VjVQamI4QUxvY1QzaWIzbjlQaU84KzV0b2M4bnhEZlBxaTU3WDI3L3ZScDJXSXhRL3FBdkoxREs3WGR0b1c1Uk4wdWttZGJETmkvcEcvTE81Uklva2F2YThyaFZ4ZDVaWTBIWHMrdWZCK1kzV3dIZEYxNjJHSW9jL0tOcFo4ZVZ4R1RLL1QvMHliV29nQ3dPMTRON1lFejRwZlA0cDZjV3pXZ2VUNWRGbGgxK0lua0RqM1VoZUJ5eXlBYys0bzcrcndYSGErMkdRZVRiYTNicTBEOWhQUlhJaVQrUnc2UmF5cmFVcjVIdis4LzV2bGxVcWp2bGY1VGNvNGV0NkNhL3V0UTlyejZubnJVdC9RdkVrbTdMN3NhUW91aVcrcDJvOThqRWZLWHhqK2R4NndsOVFrZWxOaFNQOUV0NUNISTgvRjNiYldQYnZlK3pla0hZclhkaWFVOVhRdzhtdXZhOUN1WGJkNll5SHpJVHQ2WkFJTjV5YTRIanVYNXliV25RRHlJcmVRRnV4ZnFhb041OTkxMDdLVU9BT1R3YW9nUHJWdC9mVVN0NDVhZnR0eFZ4ZzZmK2IxbVgxbHJOSlNJQ09lWkJWMklyVklYUGFtM1UxejNieVNDemxUYmFybDFvbVdlMHhUczd6cFZnYjRra0JjRThxSWdDblRiMjc3a0hOVVhISGNPSDVVeFNPcDNIaUlkaUdQZHlnTHNJRUM5Y2poaFB4YWI0Z2VYdGpWOUlIRXZiOHRzbXdWMlcxN1JFMWtZYTVTU1RWd2ViTDVSRlE1c3UyeU9PNWJMTmxlWVNaNkRGMFhWN1hZOG9MWXh0Y3o3TG5ld2p1cWJMMzJvNmZ2ZTUvdzhvbGtEOUlOWEEzNTIyMG1zWmJod2pIQ0VzQU42SXdQU2l5Z3I3d1RubVp4L2ZlQ1l0dkJYdmNyQ2J1WjVtMVF3dTI3VHM0bDRwMUhVMG5mR25yZEx0OVgzUVJ5OU05V2lOTVIyRWlGNlVuZDBhTWw2amJWZXJ6M3JrOE1KZTRCR0s5bWljVzREQ0JoNUw2Wkhtc096VldpWjhzcDFtWTFla255YWxyYjAxTzhOMmIwSzV0MVhiYXovbkhheXNjdy9lVm5zTm1jZlNzQkozbnc1OG9rODFFalVJYzNGOHdKVXBtcUxrR1BBMU9TL0dQdENzd2JvQjRNVlJqWG5tazlldEpGeGl4S0M2cE1GRzVzZCtFNFVRTkFJZFFCS1d4ajhRaUJ6MEpJcjRzc25LcGkxZGx1T1JyQWVHRDhoTGUxRE94MXBtSlI5WWFvbCt4ZWJIZXdxUXJTZ1hzODl4OFJaWDZLQXdmcmllT3paenhtTnJNd1RYeTlDUm83NUxwQUw4b3BHT2R0ZUx5M1AxMFJLZ2xaU0lsMkRjTnNWY2RUa0N5TFRrRkdqNHNOOWlhWlVIOGg3TVhJYXVPMjNkVHo2ZDg3UGZRK2ZhcUxkakZ0a1I5dk96OUNwT2E0Y3l3RUFIV0xJRWFOR2MwVDZMTzRudWpDR2VpY0x0anJzYXNMcnZnbUpnOTQ2NXBsajhtbUJiWjRGczA1TXNEU0NXb1MwUTgvRitjUjBOR2V6aW9CbDAyR2tvdmQ1QjBSdkgzR1VxTkVlb0JHUWx3VUxjRi9SNGNheThBN2lSeXF3L1hBVklsV2t5WXNJenhYNU1nSmdYbHMvQ3lTY3hSMzBMUm5qbGdWL0p1Sm9GK2JXUzBzZGg0aXN6dnJnZll1RnZxcmtSZm9GeXpXcnRucEkvcjF0b2FpY1Y1N2ZQUDJraVhYRnVFVjlpZlIvZVhQbWFhalVIRHArNUxXOUpmbEZBZnJESzB6d05QbjNtVnhlRUNVVGpLcDI3T1JncEJGeWZmT1o4VkRiZ1Q2M1QvUzRwR2c0Yk1PMjZxcG81S052anNxdTVtd3VLN1pJdlI1MlNQUmVHdmM4WjFNT1krc0h5V0x2dXFCZGp6enZ2N1RNdldhK1VZUDYrVlJrRVNIeXdVRWd1YlVJQVhQYnljY3FMdHNPK3J3TnZkMHo4K3h0SDR2RkxrVXZ0U1Z5K0w0dUd3VnFJN2E4cVU5cEUzeEVPZjNzdmM0WEozcS80eDcwTFN0TDI1ZGNvN2VlL2o4MWY2ZXNtSm4yaWNwNVp5UDRqSjFYSnZ3dXRIV09mZHZVSm0xemxhdEE0OGlaWlExNmFRQ2dOd3hlR05Yb25SUFAyM0R3eEc3b2FyUm9YNFdENmRBY1VOdjlyY2VFZEs2Umw1M3VRelZINWRKblV0OGxZVjNGdnpMK0xuM1VRZGNpMi9WUXBzang0eDhNOUFYZlhPdytpOXBiajBqUGhmbG41Sm4wTHovS0hoNmwwVVo1SXRTMWlqdFdWUHpOemFkcTZqdU1xZFhpbVFxS2h5WG1jRk90czZBaXNtNU5GOThLa1E3TGxqYzFGVFBIRG1WOGVuYno2MHYwMUdjV1BlbGI4cGk1Um5wcXU3MS9NU2RybTZnYzUveDg3RkxHZ2h6SVB1VDU5YXhGZmNuYTJIZCtPa1dmaSs5cEgyRVQ2VzlzTDhjQW9Ic1FNV3IrMm83dDg5YW55cFpLeUtlVDR2TGowWjRjSXZObjJjdjBOemZ0VlJVNzFIRHRZckZ3WWR5aWY5T3QxY3NlOWFOejQ3Y051K2t0OVZIRnYzLzdvdDZMa0hIbHNNMWI1MHNzWEYzS1B1TXd0bjVRNHBSMTMvdEwvMmNUR05OSXoybFpnU0M1ZmxqYXA4d3gzcGU0ankydmFOWDVvdTJ3T3R2M2xNR1dwM1ZhOEl6VEhmdFdXWEUwRldKRUlCVlI4TmhSTUpQY3JrLytaSjRGeDdNUWM4NFNlVlBUTGQyTE11WFdjc3BZZUc4cDMvdXU1eHhON0NiajczVkJuVCtVamZoVHYzaXd0Q2V4MTd1V1BMNXQ3bkZib2I4YnFhL1VOWGZLNjdkT2JSRzRXcTRtKzVmTGduNUUrc01mWlVWbjlia0hZejhNTEMrL05BQjBtTmVZNEs5Ri9TSlp6TDAzN2x1Y3o1TFBmMm5qb1JvZFloQmI2YUVmSk8zOTJMaWRvdnEwSU94d2ZseGJQN3BNN0dJY0orcFBPWnMxV3JHTmpMVGVwWjhxbXZUSHB0dWk2Tk5wOWNtelhobzM0ZWJZK0IvT0JlMFFNRmJKUW5GbDZvdENGRkZwYkJuLzAyZ3ZhVk5TanU4dkZ1elNGdC9xdjBWaWtlU0RPeThTRzR6OTVlVzhTazQ1K2R2a25pZTYwTjZHaUxuZlZDU3VpdTJ3RnJHWjNQTkxacTQwVVZzZHE1QVE3ZGkzeERhSGF1OXB5WDdsV09zcDBtZjQ3NWJuU05NVi9kdjh2UTE5VkhNYnViYk1CK1M3UmF3LzFiYjAzZndxNUVqNWZsTWJGTTJETjFWOXNNVmNGanl6OUFzaUZGNVkydjV2cHR4aHByNEJNQ0g5SmRhMk9jdnhsWHYxRThuRitvK1Q2bFdVbEdjKzNmTGNzUW1YQi9TN3haOGYydEsvYUQ4aTQ0anRaWUxZNUU3SGtTaW5EYjZ0NEVzbkJnQjZCOExvUHlmbzl4NFRxTHRrSWJuZjVjVnd4L2lPQ1dBWFpMYlF1OUJMVVRSRnhkR3hjWXVpUDAwK3UyeDV2dFdpQXc3U2FPQk5EK3J5T3FtUFU0ZUZsbndHWWJSZmM2T0pxZUhnall4d2VHZnNvcEI4dDA4dVloRkZ5MFMvM2xtZTgxeTNibFo5eG5YeWpDTEk1cjFra0Z4NGE0ZDdGd2tQTTlPaWJhOTU5Uzlqb201M3JUSm1UTTNmWXVwRkM1N2pYRVYxbTcxSG52WHhaQ3NYSDJ4cjNhc3dmbDl6MjErcjNkbzBKa3QvWUJQaHNpOEJOdm9NUmVjVHhIcmZVTHZTVnNiK1lyUTEvWXYyc1ljbDF2Qmp6ekszMFpjQUlCQnNwZjkxRWVqN1JqSFlpWW9BMEdvdWpOc0xsSG1mUmRGTVh5cUwzS1ZqSDlyYXRDUXFpQjhQckk1ZHhzUXhoeEwyaHhMYmhYM3ZMd3Y2c3R1cVhTZ2xpcW80TjgwVENmUkFLdGRudEIxbTVaUnZWTzIyN0ltUGllMTlEL0lMNGl2SnRlLzRESE5UWDFSaUtzaXNlOWkzU050ZjFWaWZyUk95TXM5ZHBsd2pVeHhObko2WHNRbFl4cmpHZXFuRHBtdHR1M1cxa2NnZ2lnTDBHb1RSZnk3b2kwNWlMZUpZdDlnQ1FBL1JnM2Rjb2hjdSs1UlR0RVJmT25lY29NNWFMS3JOakYwUXYrN0s2Zk1WNmxGOE5uYjQ2SlRlb2orVXlBbm9MUlFrbHdoamx3RVg5MDlpUVVsUlZQejF3bktmRU1Ld1RiZ1lHN2NYNjJWT2VPOUUreFJoSTdrT2pUMHZheDFzMUxmM3hWZDhEbFJSZ2Zjd2NQbWxiTDBUUlYrMC9SUDE1WkJ0LzF6cmM5UFM1MTRIOHBXMSt1NjZodlplOXdGOFhSbEh4SmNRUlFGNkRzSm85Y2xyR1c0NWZBS2d0N2hFTkVZdHpwMVpKMlVqSWtMWTJHVXhVUlhiTnZyWXRDU0hXUTNjT0h6bXZZRmVvZms1MXpWL2gvU1RzckJkZXN6RHBDMmVxMWhRK0tLaVJGN1JreEFMWXIySExUZmRzWjZxWGZXZTBzOUdQZkl6aWZEZFYxdlY5YUpwby9jVzRldy80dHVoVHBpV2x3aGFmaCtCZDZOdFlGL0x0aGxBLy9Ja1Rocy9VU3NkaC9kOUlyd2JmT2ExOW5jdXp5eC9meWxDWU1ZLzFvSEx0OUh5VmIzdlpNZDJYV1I4S1I2Q0x3R0FQK1FZM1lMa2huczgycHNiOXp3dDZaYjZRNndKMEI4MEduenFNSGtkWktKMmo3NVVJdS9IZGVZYTFiSlZuZWpib2tYblBjNHZMUXYwcW9jd1Rla3hndG8veXVsYm1rYjZzbkhCWXRKM1VTdjNtR3RlVHVsejM1bS9EOUhKKzA1WnVFdmU4WlZEWk4zSTBrZHZRa2JxaVdpV1BOZUJwUy9aT053enpkTXB0dnBnOHZQQnJ0VlczMHdIdHVDcnFMMVM0VHIxZzZseHkzV2I5WkZJSTZEckxyL1llSms1TE9lZFpSeEo4MGl1dFg2aUFHTG9PbWNkRW1wY1BRemRKK2t6TCtSU2YzNnY5VDIxMUd2cTA2dUFiVFg0czFWODVyeitMdlhqTC9xOG01ZjMwbHlid2NxdS9mR0JudGIrdmtULzhsUTJ6N0Z0SGRpdVUvV2hNbTB3dEMvVitwd050SE9Bd2ZBdkIySGdUNGZ2dWV4aXRGVHlySGZHN3lUV2M5MmEzNVhubFVIajNtVUNrVHhuRk9ENy8reWlYeVhsdmtjRWFBVzErME5TMXo4Y0ZtVW5mZHRlM1ZCZnV0VHQrSFdXNjg5QXQ2cTlyQjJ0d3lCakF3QkFGaFU2akdYdWxZb2NwZ2tSRkFBQUFMb05FYU4yZkU5aXZVZ1drOUVRRGxzQjZEdEpXNTQ1OUFXcm9ZdWltYjVVRnJCVkRoZVJYS1BuSFluQ3ZCeEFIVW9VU0ZWaFZNYlBDUGNIZ0pCa3hFNzZGd0FBQVBDR0hLTVdkRUh1RXdYRUtmVUEvZUcwNHQvWGVwSnpCL3RTbHp5VnN3NDgzckxPTGY4dEluTDR6Rzk0UHdBQUFBQUF0Qm1FMGVJRnZTd0dmYmJEVHg2UDloWllzaGIralFtZ0NUVE5STlZrOHBjOXpqbnAwcGRLUHhoWC9OaUhEanphNVVEcVQrcXVVd2N3QUFBQUFBQUFGSUV3V201QjZIc1M2NFVLSzJDbnFvakVvaHVhb3FwQUYzY3B2M0NEVkJVUjVjWFN1TVhQTTVSbzBSU0VVUUFBQUFBQTZCWGtHQzJQYklsOThQajhiYkxBUHlDQ3JIRFJQZTFndVQrYjUxTU15L0xPOVBPd3BxaWlIWXE0YU1OREplMVdVbUxNS243c2t1YjhUNUwrYjVuWVUwNDNyNUpyVlBKYXRsVmt2aGxZRlg2cjJCWkcwbjRZOXdBQUFBQUFvSzBnakpaZjBLK1RCWjZJSGE1aXpWZy9lNDQxZ3pGcWlXOHNxL3g5NGtjU1JmWFF3L3I0WE5VV0JYYTZhTWx6elNyK2ZSelNEajFFYkhOVzRlOGxXcmVOd3VoNmdBZnJ4UTZmNFFBbUFBQUFBQUJvTFd5bHI0RG15UE5aNEowOUh1MGRZOGxjQnJHVlhzV1VQa1pROWZYMDlhcmI2SWtXdFZNMXluS2lVYnRkZjQ0K2pJRXU0OThJbHdjQUFBQUFnTGFDTUZvZDJWTHZJMnJkdG5TUjN3YStEK2haK3lZaXJ2cTRYVmJ6VzFZUjREZEVpOXB4UE1SblNodHVEZVNDQmdBQUFBQ0Ezb0F3NnJhbzk5a09MNkxvTFpZTVE0Y1B0ZnJjczZyNDBsTVhxeHJodmFSVjF1SXY3MXBXL3RXQTgyYXVjVjhBQUFBQUFPZ0xDS01PYUVTWVQ3VFE4ZVBSM2htVy9BZVJ3MmZHVFJaUVVpRWsxNTJ2SUt0YlV1T2UxRnVmb3lTckNuS2ZhY2ExdFBWcHk4ci9aY0IxVjFVUWZvdTdBd0FBQUFCQVcwRVlkY2QzUy8yRmJ0TUZQMnEzb2FRK0VDRTd1WDRrLy9mT1BFY1JmZ2h3Njc3a291eHpyc1VxRWFQeEFBL2pjY0loVjJYYnRtTkhBNjYrcWlsUFNCMERBQUFBQUFDdEJXSFVmV0V2b3VqYzR4WnNxZituVFNPSGo5VzJ4VlpPajA4dXFhTS9rdXZLL0NyQ3pueUZiWTJ5akR0ZWJkSU9ydnZvanc1UndTdGFjU1dpcXUyeEplV09OYVVLQUFBQUFBQUFkQnlFVVErU3hiRUlJVDZpMERSWjdDK3c1Qy9FRmY5K0hMb0FTWjJJNlBtUS9LZGNNOHVmemdKODNiemo5WFhaNDF5TDA0cC8vNFhtVzRuMXJ0dTZJOUhBNjIyRDZ3SUFBQUFBUUY5QUdQVkh0a1BISHArL2FGRWtWQnVvYXN1eGJIWDMvVktKL2t5dXErU1M2RkNKRWkxVEp5RzIwMy9vZUgzMU9YOWdwV2R6akhnZU12K3QrUGR0NlNlL0Q3emV1aXBvQXdBQUFBQUEvQU9FVVU4Q2JLa1hia09JZXozaG04Tm5wZ0crVjBRWE9SQ3JTajJJbURwei9VTGRwai9yZUgzTjlEbjZTQlVoTHFMcFZxYXF3UFpiUjhzOWRNYVlBQUFBQUFBQTJnckNhQUEwVXN6bklCMFJZQzZ3NUJNdW9zTzdBSFVvYVJGaWg0ODZSWHoyUkJSTjZhczRPcTd3dDk5b3VwWFoxRmdmYmV1akFBQUFBQUFBb0lVZ2pBYml6ZGVmQzg4Rjg1bkRZUzk5eE1XR29lejIyZVc3cXg3QzFETlJOS1ZYNHFoRFcwUXNHd2FiSHVmVUJRQUFBQUFBR0J3SW8yR1JMZlUraStiQmI2blgwNTdqaWgrYkJMS2I2MEZhcDJYL3NLZWlhRXFmeE5GeHhiOUhMR3RmbmRRQkFqZ0FBQUFBQUVDUGVJMEp3dkhtNjgvMTQ5R2ViS20vOGxqNGk3QjBNbkJUcmsxMUVlUTR1WmFlOWJkSjZrL3VNYXY0VVJFRUMwOW43N2tvbXJXRjJITGU4ZWVvNm44ZmlQaXV6RzgxMTBrZElJQURBQUFBQUFEMENJVFJ3THo1K3ZQNjhXanZ2WEhmM24yY2ZQNVljMTRPRmNuWGVGenhNNUpuZEJuZ3UyVTcvYXppWjBhbVFKZ2RpQ2lhMGdkeDlOOVZuNW5lYnhCOHh3UUFBQUFBQUFEOWdhMzA5UkJpUy8xNHdQWnpFWVdQUTN5eEhxUVZPM3owZmQ0dkJpYUtwblI5Vy8zRUFBQUFBQUFBQUVDdlFSaXRBYzJUNlJNdEp4R0l0d08zWDF6VlpoSnBHNmdJbHhYK1ZrVGNrNlRNVzlNZkpHVTZNOE9OSmhSeDlJb2VBWHBFakFrQUFBQUFBQUQ2QThKb1RlaFdlSi90OEZNVjFZYUtpKzNlQi94dVc4U3YvRTdFMDMwUlJBdlNIaXlOLzRFdElySWZKbGZVa08xai9iNEQ0eGY1TEovOVRHOEFQU0xHQkFBQUFBQUFBUDBCWWJSZTVwNEw2WXZIbzcyaGJ1bjk1dkNaNHhDbjArc2hTdHZFemtqcU5QbjlmNUpyb1pHdFplNGxJcU9yT0NyZnQ1UXQvc2wxYU9vVlNOZjZmZnY2Zld2OVBoZHg5T201OVI1ZGhLMzBBQUFBQUFBQUFEMkh3NWRxUkU4NUYzSDAzdkVXNlpiNmd3SGFicFhZYnFNMnFHSXY3OVBwRllrSW5abG5nVTlFMGh0WGtVLzk0RkQ5b0lyZzlpU0t2cmhYbFB3VGFRN2FVL044eUplUGlCZnI4MzNlOW56eXMwelp5OVpGMTBWUlU5SHZBQUFBSURCbkh6L0tIR2VzVjRyTUxkYlhuejdGV0FnQUFBQkNnREJhTXlKa1BSN3RYY3Y4enZFV2srVHpFcDI0R0tENVJMQ2JWZnlNaUlYTEFQVVdKM2FYdktHUlJuMzYzcStxT1BvUFVmUmwrWkovenVXL1ZTUzlNOVVFVWxsWW5KU01lcTBpanZaQkZBVUFBSUFkb0dLb3pPV09DLzR1dnY3MGFSK0xBUUFBTkRJK2o4MTJiU1pLeHVPbzY4K0hNTm9NRW4wb0V6M1h5RDdaVXI4YW9OajB4VlFYUmtWSW5vU3dWVUh1VUpmN2xSVkhyYUxvbHZ2R0dsMWJoVTBaVVRUekhXWEVVVVJSQUFBQWNGbHd5ZHppVHVmTFpZaXhHZ0FBUUdPTWsrc2k1M2RSMXg4T1liUUJNbHZxSHp4dWM1ZmM0eUJFOUdLSDdPYXluVjZRU0lONWkzM0JKbzVXRWtVYkxydE5IRVVVQlFBQWdNcG9GTXE5K1hYTGZCRXhsZ09BanZkOVUvM1BhVTRmOTNTUk9nU2dmaEJHRzBKRkpZa2N2WEM4eFZnL2V6NHcweTFOOVRRRU03RjFsWWpJaG4waFR4eHRyU2o2d285ZmlxT0lvZ0FBOVMyY3hxWllNTm9rQzZkMVI4cktJZyt5UHBOR2lvNHJmdlIzckFjZDhPMUpXL3BuYUlWUFNJcVFkNmJpVHRMa2M3TFdpc3p6YnNxSU1SUWdQQWlqRFNKNVFoK1A5dExPMEtrL1RUNy9MZlFXNzViejJiamxaNTBsMTZMRnZ2QlNIRzI5S0pvcGUxWWNGUkJGbjE5WU1Pa0ZnRHFROGF6b3Blb21XVGp0SjR1bFhlOHF1VERGS1hBdTJ6dytRL05hUVVtQlFJU0FjZWIvTStaQ2U1MzY0OGVyN1BwRmN1TEtYREhwbzFkWVozQytNRkpmK0dDcXZ3QktTUThZUHRaN1BoMmNpejhCaEFOaHRIblNMZld1cDE3ZlBoN3RSVVBaVXE4aTNOcFV6ODk2S29kZXRkbE9HWEYwMmpXeE95T09tcDZLb3BHcDlnSmpMUWV0MGIwQndJNUlGMDNMSFM3K1pNRTNveXFnb21Cd212TnJtYi9KUzhkVlZ2QlBQalBSOFJsaEZOcnExNytJb29yMGozZko3dzc3Y0VnSmxPN2Z6clNQR3dXKy9aTklxb0w3SEo4QzhBZGh0R0gwb0J5SmxyanlXUHpjSnRmSmdNeDJvODljMVU0eUdDMWE3Zzh5MlY5MTFKZFpsQUFBdEFlSjFsenU4UHRuVkFFNExPNjNDUVpQS1hxMmJUL1duekgvZ0ZhaUw0aHNPOTFFSkl1d1ZPLzk0RmpYcnFPYXYwcjg3VDc1dnV2azM4c1c3Qm9CNkN5dk1FSHp2UG42VXpvdkh6SHMrUEZvYnpZZ2V5MTFrbHdWaVJvZDRYRUFBREFBeHBtREhKcGVCTm9pL3dEeWVKL3o4M055TWtKWCsrR2lOUndtNmk4eUZpYVg1RXlXcThrMXFJang5em9XQTRBRENLTzdRN2JVKzd6VnVYbzgyaHNQeUY0M0RwK1J3ZUVLVndNSDRvcC9QOFZrQU5BQ2RpVk9IamU4Q0lSK3NHM3NsSU5xbHBnR0FMcUVSZ3ZmbTJyaXQ3d0Frb0FwU1J0eW1MbEVKNUFkcGxHRmUwbWFFY1JSQUVmWVNyOGpOTCtrZEhwM2pyZEl0OVFmRHNSazE4WXRSMHVyVDZpSDFzSnB0d0RRUlNUbjJIZ0hKOVplWUhwd25NdHVFd29BdWtwUjM4dGhPVDFFY3gvZmwxeW5pbytJNkxrcXUvVTl1Zi9NUEIvZU5DMzQwMVFjUFdSYlBVQTFpQmpkSVhyZ3pyWEhMYWFQUjN1TGdkaktKeGZuTGQ0R0ZhazZtWGlIeVFDZ0pUUWFOYXJiOThlWUhSejhaaHZmc0E1MEZYMHBaVnZiM1dDbDN2VmxaVVZSOFEwNUtHbGZvdUtyQ0pmNjkyazBhVnp3NTFLZUdUVURVQTBpUm5lUHZERTY5bGhVWER3ZTdhMEdjaERPcFdOSEx3THljVnRQZnRlVUNES2dmcGF4VDBWZzA5S3lqclFPWk9GOTBtTy9xL3BjaUFJQTBCWm15VUt0eVVNWXlDMEswREZVek5tV2J1b3pxUXo4U094M250ajN2K2JYblc0eXJ6em45UERldGFOMEIyZVJLQnJrY0NUMW4vM2tlMjl6MXNRYjlUUGFNRUJGRUVaM1RHWkwvYjNIYmFSelBCaUFyZUxFVmpLd25MbllLUGxzMUZMUlVRYTJzWG5laWloQ3R3eG1uNU95VnBrOGlhaGFKY29pcmxMQXBFd1RuZUJsODhqSi81LzMxTjNpaW44L3BqY0RnSWJaNUN6R1J0cFgxNzR3MHB4cUhDWUMwRDJrbjVodStUa1J1d0c0L3ZScGtmeXp3Qks5UjliZ2s0SnhXcUpFVjRIOWE1Nk12OS9NcjdzaTEvcGRwQ01CY0FCaHRBV0lBQ1o1TUkxN2pxNUo4dm1yNUQ3bkF6QlhHalZhTmRkb2VoQlRHNFc4RHkvK3Z6eWY1RWFOOVhsWFJZSnU4dnRhRnNCSkdXWW1QNmVObFBHOHpSR3VIbTFTUlBpcXRwcFdGTE1CQUh4SUZ6L2IrbWVaVHl3YktFUGV2Q1hXYTBvMUFRQkEzemo3K0ZFQ2RXd3ZCbVY5ZEZpWFVDbFJvVWtaM3BybmdLRnJpVlNtVmdEY0ljZG9TM2p6OWVmQytDV2NQeE5oWmdCMmtrSEdOVCtQQ0htdGlteFI0WEdjODJ2NXVid0ovSkg4M2ExdXVXK2lUR01SMnBQckQvMSttMS9OZXV4dVVjVy9Sd0FBZ0tiNW5EZCtKQXVtV3NjNzNVS1k5eDNrMFFNQWdGNmk0NTh0b0tsV1VUUkZ4ZEFEUkZFQWZ4QkcyNFZ2Tk9PdDVvRHNPN0tkUHU2SmpUNlUrSnMwcjZjSXBQZDFpYnV5WFQ2NTd1Ujd6UFBieHpKMjZuTnV1YW8rOXBZdURBQWFIUXlmODRqRk8rcWZaem5qaEN3SWw5UU9BQUQwbEt1Q2RkSjVVMXZhMlRvUEVBYUUwUmFoQjluNHZQRVptd0djd0s1Um81ZU9INWRCN0s0Tno2RVJvTk9LSDVPL245UlVKTGx2VmRGMTNMWW8zSUI4YzZnYkFJQ215WXNhbldvTzBMcklFMTVYRFI3OEJBQUEwQmc2cnM0c2YzTE40VWNBM1FOaHRHVzgrZnBUb2lFamoxc2M5MWlveXRwcDZXRW5PYVYrMFlMSGNJM211YTdScGk2TDJRODlkYk9xYjJCSGVrZ1ZBRUNUMk1hRWl6cStNRmtZeXFKd25QUHJTNm9FQUFCNmltMzk1aE84QXdBN0JHRzBuY3lObTBDVk1wUXQ5VDdSdFJlN3pNbXE5VE56K09peTVzT09YUExDSFRlVi83UkpOSUs3cXEwL0dBQ0FCdEhvekdWZS82eTUwRUtUMTlkRlNYbGlhZ1VBQVBxR2pxZTI5ZHM1T3lZQXVnbkNhQXVSRTdHTlg3N1IxbXdYcjlsT0lsejV2Slc3MjZHZ2Qyeks1ZkI4eWVlYXk3VjAvTnlzcDI2MmNxaFhBSUNtdWJITUI0TDJ6OG5DVUNManB4WExBUUFBMEhWczY3ZVlMZlFBM2VVMUptZ25iNzcrWEQwZTdhMk11OUFpMjhYUGRHdCtuKzIwU0o3enZYSEx1L2trSUNlZlA2dzVDbk1iTHR2bzQ2U2NVYzMyakIzOVRwNW4wVU1YKzFaUlZKQ2NxeE1WN1FFQUdrRU9Yemo3K0ZIR2gybE8veHh5TG5CcVdSU3VtbnJtNUhtbityenZkQTZRdDFnVnU4VEo5Y1U4UjdSdVBMOTMyM2R0dGgyQW9kRkZNcDZtODVSeFR2bmtzNTk5RDlIUTNIZmJ2bU1kNExsSE9YT3RPQzlLMkZJZVk1bTMvYVoxYXl4K0ZqdVVYZXJoclg1djN2MDNXaGZmMUZlaUJ2ejRPT1BEZWVWYXF3OUx1Vlpsbjc4bSt4ZjZWTTduTnlFT2lmSHhjWXNQYi8yc3R2VVBabnQrZjZtSGs0TCt5ZGtHZWMrWjU1UHFSKysxck9NY0g1TFBmbW5JcjhmYTV0NXBlU2FXOXZZbHo2OWQrcDJhZVcvNVhXOWVER3I5VFRQMWw5Y254Qy82cGhCdDNIV01uZWJNQXlJdDM3Sk9uOUZ5WjMxK1hEQW5TVzIyYWJnK0o1YjJHRlVkWjJxdzMxdkxmQ2s3SHFaenVtRGxSQmh0TjNOTEl5K0RiQmVQQmlEU2lKMGVIRDhyRFUraWF3K2JLcXh1NFhjUmNwdktXWE5qcWd1amtsOXpwbmxLKzRRczhxc2VhSFpxL0NLK0FRQmMrSnl6ZUJuTG9qbUVhRm13amJEMlJhRk83aTlNdFYwWHFVMmszSnZrSGxMT2E0L0Z5TlVXTzBjdjV4SEo5eXgwUEJpVktKOWNaeXB1WDNvSUZ6T3pQYS9zb2ZITFg1L09sKzV6NWlhTGl1VXBlb1pad1Z4b1VkSmZwbG9IWmVjMG8weDlYQ1NmajdVK2xvSDlXTDducktSL21NeENWcDdqcW9LZjFHSC9NajUxbnlNR2hKaHIrL2g0bmcvLzhsbjFtd3RqUDFTenFONThiWkQzblA5NjRVdnAzNDFMK3RDWit2VjVIUyt5dER5bkpkYzUyZlltZnIxVXY0NDkrNTA2c2ZsRTU5ZEFXbjhmVFBrRFpjZm1iK0UwVko5Wk9NWlc3RU96Zlhxa3ZyOE9aSzl4Wm93WlYvUWhzZlZ0anQrSHFzOHFZMkFxTWg5YjJtUG84cVgxK0tHQy9iTGpvUWxaVHJiU3R4aU5Zanp4dU1YSURPT1VldDh0OVJKZDI2U2R4ZzZmRVY5WU5XUlBHVFJjT3BlM1BXMkRWZTArRzBpT1h3Qm9FYm9ReWV1N1R3Tjl6WmxsaktwdFVTaVQ1K1NTY2ZxSExpWmMrOWlSaWdnL1NrYkZiV050RzljbDZpRzVIdlI3cXBaVHluU3ZvaXE0KzR2VWdZZ3A5OFl2eGMxWUY2NFBvWEwxSnZjNVV6Kys4UERqMUUvdWRXRU80WHpuU3YxbTJ2SnlqdFRIYngzV0ZmTDNkOXFuaGlxUDVMUCtvZVZ4UFloMHBuM3pvcTM5aXFYTnJycWNXMVRHdzB6OStmaCsybWZlMTVUZlBLMEhuekgyUVFWZzMvYTMwTDc4ekhGdG4vVjc3eks5S044NHdCaFlhM3ZNMk84aWdQMSs2TmpxQmNKb3kxR1J5bWNMM0tRbEo3RFhiYWVGcVg2SytDK05xaWx4VktNcTk4MnptQnVYL05pcTRlMytaU04vTnVxZiswbjV6bnZxWGw4Q2lnY0FBSFdTbDRkNnFvc0pYMDZiWGhTcWdKa0tvcUdReGRTOWJqK3R5bjl6Rm9QcGd1M2VReGhJdVFncFdnd0pYUnc5bUxEQzFrUVhYaU9QY3NsQ1duWW9YUmwzUWJTV1JUNzhWVDhQRmVadjhRN0xPdEUrMGRmSFp5SDZHYjNIbmFlNDBZWCt6OWF2Zit1dzc2Y3ZBOFlCYnp2Vk1YWVV1S3d6N2Q5OXkzcnIybSsrRUdaRHprbHVRL1RsR1J0TkE3YkhrQzhIeHg0dmoyMWNxUzg3Z3pEYURVUkE4eEg5WkV2OVpBQjJrdWhhbjRWWmsrS281QXRkSk5lK2xqc3E0UU5Oc2l6NHZmampQQ24vZjBRUTFRUEQrb3BMcE80cFVhTUFzQU5zTDFLOW9rWjFzajFxY296Uzc3d1BQSGwrdVRnYUJ5cnJPSEJaWndoZWxldEE1bkJYTmQzZStXQlRYVkQ2UnEvV3ZxQWVBTGE1cXZoTmxiWFM3N3NvcS9yU2JlQitadUhxMXlwdzFPRjdzeGFLbytPQ2RWSFgrc3YwWlUxZHdSd1Q0N1p6TmMvM0o0SDc5OXVxTzBjeUx6L0hOZG5zMXVjbHRvNERJZnVIYkYxNnoyOHlvbkpkdXRTWjR3dnZKOGd4MmdFa1V2RHhhTThuajZZZ2h3d2Q3T0NRb1NidEZLdWQ3anh1SStLbzNHdmVZTGxGZUpQRHRzYTZjSDI1K0l5YUZoN1Y1NVpiSmp2eXM1c2hIUzVrc1VYUlFrVW1HZ3NEQU5BUUVyV3ArWlptT1F2TmM0L0l6anhoTmFveEIxV1pGQzNwb1NLL3YxaWNUdlR6dG55azZkYjZFR04rM21Ja1RjbnkvVVg1WkVIMnp0aWpPaVFDb3N0Yk5HT1QvK0kzOTFBVll4ZXc4aGJObzVLTExTblB0eTNmTTgzNFN4NFNlVDJya2o4dkk0cE9TdnJ4OTB5NTBtY3FjOGpvcWZublMrMDY3Si8xNjY3MWozRlNIOXQrOWI1Z2pyZCs4YnlUaHRyT05pNHMzNS8yTTlHTHNyNHI4R3VKQ0hNNW1PYXVwQzNTQTViaUxiNXQ2d05uTGZPemR4YmZpanJZUDQ5TWNWVGhKdE12dld3SFpmcE1TYkV3cldpZmJTOGR4bzVqYkZIZktmZmNyMUMyRDZaWUhJeGYyQ3o3REttOXhyWngzemprWTg2SW9tWG5UTjhyam9HdVF2ZkxlaXhydjk5ZjlHVlY3T2VVZmhCaHREdml6UHJ4YU8vU3VJZHRqL1d6NXoyMzA4clRUazhEY2RQaXFKWmRPb0p6TGYreCtUdDUrZWNkbWZOR0p5V3gvdmV5ejhKNlNWdFVRU0sxbHoyUHBnV0FidlZYVGk5c05LcGlZdm0rdW9TTTg1d0RuemJwdUdSWnpLY1Q2cmx1cjg3YnRpV0NjWWpFL2RPY011WWQ5QlJsYkp1WEo3RFRMOWxVUUZ4YWZHcmJvU3Fmazg4dEhMNUxYZ29jbXUwaXBOU3R6SzFzSW5OYUg2bFluaGRGZFdHcTVkTXR5cmtvMzJzN0RFUVdlQXVOU0w3S1diU3V0eTJrbTdSL3h6bkxxWmZQcG4yNUk3ZVY5YktnbjdsVy83RUptWlZlRUdtVTZiVGd6OFQzYkgzckt0UG04ZzdTNlVKcXFrNnVqZlJGUWRwbmpyYjVmOEZMb0xUUHRQVk5xVzlGbnNVZDU5ajkzRkxHU1B2T3Fmcit0dkYvWE9WbFY4R2NSTzV4VTJJdWNhNGlabDVhbFdsVk1Wa2pNWXRFeTVXMngzV0pNVEN2UFk0OGZXNlYzSCtlVTliVWZ1c1M5clBObThaVlgyQ21zSlcrUXdUSW8zbjJlTFIzUEJBNytSNVVOR3Y0UUtacytUZVNoelM1RHBML2U3Q3JrOTQxS2xTK1gvS0hYZzlZRkUxdDRUS29YeG5ZQ3FrR0FHcGI3Tmo2cXcrT3Q4MkxGbzNyT05uNHhmUE16YS9pemxOZWF4RnZ5b3FaeWQvSlp3NHRDOWdxYVFiS3pNUGtldzYxakp1Q3NrbGR5WGdmQjY2eklmcitSdXM1ZnJGd0ZuOVpsaEc0NUc5azhXdnlSYUp4MmEyT3VxWFBOdStlSjk5MVdPYUVaUEgxNURyWlVxNmwrdG9HRHdqR3VkYkxzdVYybGJJZGxPeG5ZbTBiZWI0Mks1dERVUDMvb2tUL055L1RSMnViazdYYnZ2RVgwSFpCWjNmUmFkK1RIUnVmRG41Ty9iL2tQZEsrS1MrbHpyU0dRK0xXT2c5WWxpaGZGSEQ4M3pZbldXbFp6aXZNU1picTc5N2p2cmJidTRMMktIVjZVbktzU2R2alFSMityYytlSGNjaXRkKzhUUGxlekp2V0llbzBCV0cwZS9qbTBid2RpQ0F4RDlDWVJSeDkyS1c5ZHIxbGZVaGI1a3ZnRWhWMVBJU1hFVlhSTmlWdEMrRVlvQjd5ZGhxTXErWWkxQVhOY2NCKzBXVWlQZGZGeDRrdVBqWU85MWliZkxGcldsR01LUHI5WWRrSmZyb1FNUUdFT1BqTGxpZnFMNGNxaXJzdTNwYXVpMVpkck5yR3VMbExSTXVMUmVWU0Y1T0lvdUU0ZC9XWkhSQ3luNm5TRDE2VjZQOGlsN1lyZ3B5cEZwRU4vbjFtS282bUF0L0s4VDRMa3k5c2gxd0xwVDYycWZpTWVidG1KMVVQRnRJNXliWDI0eWVPY3hKYmU2eGlMNG51SEJmWWF1VlFQaEc4RCtwb2p6cU9pWkIrcVNKODdESFdiMExVcVlBdzJqRjBXNjdQSVFkcDB1NisyeW1OR3ZDZExENGxHeDdJNFZXdG9ZM2l2ZWFDalIwK2VrdDA1TlpKdFF6aUVzV09mUURxbVhUbTlWZFZJeEJQTFJQdVpZUFBkT0libmFxZmozUEcrbEJjVmhFck1tV1RCZVhhVTdBQVhRU1hqWTRwcWt2TDNMQUlXeDYwU3hkUjlFWDdQdERGT1lRajZwQW82dHJQckMzOWRxRmY2MHVhcVdWTU9QUnRkK3JYQkdic3BzLzBYVGZuOVpsdkF4YlhWWWkwellzbUR2Yzc5K25ITStOK3RPVlhvekl2UkZYOHMwVkh0clk5YXFUN3d2TWVVcCtyVUhXS01OcEJaRnV6OGRzcUxsRnNzd0hZS2JRNFN1UmZBNmdJL2REUzRybms2QjNFeTRnSzlTdDlUN2IvbVduN1Fod0ZDRXRlMU9pMHdsYmdiYm0wVXJwNktOQXE1MW1uQWU0ZGV3b3JueTNqQ0RRdkZzUTVDOEl5N2VmQzRpT0xBR1ZET0FyUFpVZktLZjJ1VHovekplZm43MHA4MWliQ1hBYjBTOThka3JDYlBqUEsrZFU0MEZkRW5nZGQ1ZWtuMHgyYTdZdkh1Rzg3WEhJbzdmRkxxRHBGR08wdWMwOEh2ZEpUMEh1TmJnVVBJWTQrNWU5SWJMYkE5ZXBEUmJQN2dBTm9hSCtTQWRWbFFKYVhFV2ZVNzE1ZWNuRDUrUThpc3dIQ3JsRWNGN2VsSjkwZHRjdC9hN3kzYjJxQnZFWE1POXg1WjJ5cUxsajF4Y080WisybTc2dzdkTEs0Yis1VG4rZk1DeEtKUTBiYjZrdUptNDdVQjNQWFl2K2F0bVNNL2RiR3ZpZm41MlZzWnN2L3ZoaElld3dtMkNLTWRoU05odlRaUWpPWUtEWVZSODhEM1U1T0dyOGZncWpjSkJJdG1GeDM2cE50ajR4eDlhV3JJVWNkcStoNVg5QW4zUThobWgyZ0NYVGh2TXo1OWF6a1lRaDVVVzlSZ0ZQYzI3Um9FMEtNNjc0SFVSRUYyQS95RnJRYjM2MlhVQnVmTzFUV0x3SEdobTFZQlQ0Vi9QUG02SFdJSmwxcEswVDBOemV2OFIxajgzeS9jeThmZFVmUFpPanQwZkpDNjdlcTkzcE5FK3N1RXIzMmVMUW5UdW9xSkV3bGlrMjM1dmZkVnN2a1dlVS9RNGpCTXVHVmcyUG1Ha0VJSGlSMm5HcTlqRHZpUyt1a3pOSm1YQ0pBSlo5bVBMUkRyVEtpYU5Ia2NhUTJHaWMyV3RBNkFMeTVzY3dSNU9jTHk2VGJsaU94VlpFRG1RWDd5NFg3dXdxTFdOOHhLUFlWaTBXd1NKNEZyNjNmWDZhWitWekt2M01XbVpPOGUxZ1daSG1MN0FqcnQ1Yk96TXNDUmJadXR2U0ZSWE0wbTNDNnJPRTU0NlNkclUxN0lqSy9tWnlYSGdYOVFWLzZ6SmRDM0c4NTQyWmQ5UlhDdm5GRDlocXJiWHptSk1halBhNXFhbytSYVNEdFFNWis0eGMrOXJhQ3ZTclA2UkJHdTgrNU9xanJoRjZpMktJaENEV0J4ZEYwYTcxMFBIT040SVVLYUU1SmlVYnE0aGJ6U3hVVlJnNStJMUdSaDBNUlJ5dUlvbGtrTXZ1M3hFWWNMQUhnTjVGZFd5YXlzZ1ZyWWZtNGJZdldUbDhLWmc0QWVXL2FjekFSMFo3dFhkUWY2NEowYXBvUldmTG01TitwamRiMmxWRkhpaHFxbkd1SHZqUFByOWMxNXB2K1l0b2pqTWFXMzAxTWoxNThhSi81WHArckxmWmZCMmpuY1IwdkgxWEl5NDR6VFVRUlR5MXp0TGltNy94V3g1eEw3WmVkMCswa0NodGh0T09JSUNlUmk4YStSYlVJRVFvUEJtSXZFVWMzSnR5V2Jla0VKZkwyY2dpUnQ2SFFMZVZYSm15VTZIb0g3ZTdPNGVPREVVY2RSZEdVV2ZMNXo0bU5JbG9NZ0JlZmN5YXljdXJwYk52VzNzd2tkUnM3aXhhVjhwcG53YmFOT2QwUXZkcTFzSmR4UjE2OGZqRE43MGpKODAvR00rZ3l2KzFnL2gyMzZQbHR6eW1DV0tmWGdaays4OVMwTXozQWYxdG9NNWtuWFpqMnZLQ3R1ODJzYTdDZitGc3JVczJSWTdRSHFIRGcweGxQaG5Tb2tHNS9EM0VnMDErTFMvTWNlWHV2MjhJaEI5a2lMWFl5ejRKaXlJVks0MmtOOVB1dVBYeW0xLzZpdVVJZlBDWlgxNGlpQVA2bzhKazNVYzZMQ3MzTExXckxXMXJuNG1PU1hOS2Z5RXRORHJxQUluK1JSZFlQOWVNeEZvRUN1alRYMk9YaE1YbHQ2ZmNhdnpOdTBWaTZ0cXdkcHlvc2RyWFBQTXYwbVNQYWFhRzl4c2tsNjFtNWRyV1crMjBIZmNRbWtQM2t4ZnlkMnE4MTUyOGdqUGFFTjE5L3lwWjZIeFcvYlc4NzZyWlhxTlBxZnhrVXpiUFlkY3ZoVEwraWh5dGQ2YUFiMHMray9pVHljcm1qUjd2MGFIZTlQR3hJNi9yVytLV3NXQnRPN2dVSVNkN0JJcE5NdnNXL0pxd21QeS9wcXNZdGsza1Q2R09kUENPSVFobC9rYm5HbmVGQWxMN3lHeWFBSGJLeXpPazdlY0JxMG1mS2ZQMktQck8wdldRdThtQjJyNXVNTzJ5Lyt6YTJGN2JTOTR1NU5sUlhUb2RrTEQxRVo3K0dCWmNzS0dkNk1KWnNzWStINnBDYVI3U3ViUm1wS0xyZW9RL0psdm9UNHhjWktVSzZiTUU1NzNxdTJrQUhhWWtOVHNqYkN4QVVpVzdQaXdLVnJjWlJkdDVxdVUrakx5eFVGQzJUc21TdDErK21PS3Brb290QTZOK0M5Y3FVeTFzdVB2Sk54NXVpT2NTVlFaUnZFMk5NQUR2a204bC9jU2hybldYSCtzeGJVM3lJYzlwUERyN1B6SWg2Uld1K1dNZVozOVZlbXhybUpIbjZ3cjliYkw5eEJmdUozYjZYc0o4eGZpa2wvd0podEVlbzBIZnVNZUVmRGRCbUltd2RxczFtZ1c4djl4dWtRS29Sc3pOVFg1NmFwNGpmTm9oblVxOHFqdDU3K29xa3RKaDNNZTlvNElPMFRvYjhNZ0dnRHZTMDgyWE9PRGRMZm5lWlNkYi9JZWMyVVkwSi9iZE5vS1ZmdVMyWU9FdSswMVdWY25IcXV6T3RuaU9xaUc0YmcyU1IrbmxiVHQyQysyNkdZa09BRW5QdjZaYWZ2NjN4TzZjdEcwdVgrZ0ptVzF1ZWRPbDBldDArUHl2b00yK3FIcllZdU05c0c3YmRDQnVka3l3Ym1wUGtwYkNvVTVUMkhjTnVDK3kzMUhGNlhkSG5nandjd21qUGtBT0FIby8yMm5SS2F4ZHNKZzF4bnRoTk9waUxHcjVDQnAyWm5tQi8wK2U4aVJveCtNR0VGNW16TE50MldyblVxUjdHNUxOOS9HbHJoaDdrdGVoUW5aK1pjRG1KNXVRVkJhaU5HMHZmTEQ5ZjZPRkdZOHZuRzEyM1dmb1ZtVHlmTzI3ckgrTUt6bU5VbTdFRkJZaXZOSGt3eWpySFh2S3pGYTdrQmUxM2QveDNCMzFERzFNbjNGaldpN0lPMk85SWZkcHlpYytyQ3FKOXAyQitKR3VYazZaVERlMmdqNXg0MkU4MGdxbGx6RHh4ZWZtdVVhaEJJTWRvUDVtYnNMa3pCNEdLVVljMTJ1NHBUOXJqMGQ0UEVaUDZrb2RVYzBySzg4aDI4bnRUbnlqNk5GQzNUUlROK005UzI1NzNSRVZzMmZhRG1TUTNxdml5Q1plWDZIcUh1V0lCZW8rK2dZOXlmbjJxRVpwNTBhTHhEaFpKdHNqVnVjY0NaSXczT1BHMnJRWFQ3WTE1OWRxMEtQclVYbkorL2g0Mzhxcm5FZTEzcCtSRmNZMjFEZGExZG1vYnRybXEyR0xSZ2JaMGJKbTcrNHFpZlcyanA1WjI0U09LdXE2aElvc1AxbFVIUG1QWUI4djYvdEJqUjFLd1owVVk3U0c2RGZVY1N6alpUanFaZlZQdnlYZlNnSjhPSW5vODJydFRnYWxUMjZ0VURKVnl5NWFDUDB6OStXVFNyZlBMbHZ1UGxDK0VPUHFVd3lheGI2dE9ydGQ2WDZnZzZwdEw5SmRKcGg0Z0J3RDE4dGt5TVpkK1BLKy9hVFJhdEVqbzhyejlXOXpBaVdrSHl4WUhFRVZkNWpaNXB3SlBhbHl3dHAwUWM4UmptdUZPc2EyTmdwOVRvUkY2clZzZnFZQmp5N2Q5VWFOUVhEUnUrcmJIdFk4bzJ2T1hGM2sydS9TTUZKMDQrcUd0UGM1cThLK3haejkrM0NiN2JRTmh0S2VvUUVNSXZKdnROc2wxYUpvUmw2V1RFSUhwRHhYQkpQS3lsZHZWSk1KVnk1ZUtvYmNOVFZKbFVYUFlsZHliQWNYUmRMR1hDcVN6SGRiOXNaNDBML1YrRVhqU3MyeHJGREJBMzlEOGluSEZpWFNhOTZsSmNuTlFWYzA5bGRPdkRnMnZaeTZJTG1vRGVXVmJlejczeFBHNWJRdldpd0g0MjdZK1pxU2lpUTlFM081Mi9OaFlmSHRXZ3hqWTVyWnliZXc3RE8rYmZBbWloeWc5cUpoY2huYzVQLy9DK0xyVnZsTkx1L0RWVzN6NnRienZQZzNRMzRadWp5T0g4ZExIbHl1RE1OcHYyRkx2Z2VSclRmNDU4SjFZVnh4TUpHSkh0bEgvb2RHa1o3dUtHQlNCVnIvL1ZpTUUwMjNUVGIyeGw0bTFDS0tkTzYwOXNEaWErc2F0K3NXdENwV2pHdXMralFoKytrN3puR3g4VnNOWFhTS0tBalRPNTZvVDc1Ymt6VExHWCtocXU4QVhZdHpjaG0rVTdHbkxuenZ2K2I1NzN2ZUR5NGRVdk0vejFka0Fva1pqeTF6R3RlMk9EUkdqYlI4L2JrTjlpVzVIYjIwNzBUSFJObitWY2VhdWliYis0bVQ1Vy8zL3U0S1hGOVg3Tlo4WENsOHMvbmNXc0p5VG10YUJ4dWRsdDRxL3djWUZoTkVlbzJMU0NaYndzdUU2dVVRY2xTMFRUUzRNMDRZdVFxUkVDLzZwZVNmdmRDdXpDR1BURU9LWTN1ZFk3M3VyMFlsL0pyOTYwTytmN1dCeThpUktkL2tnSGhWSER3TDd6VWpyNHlscVYzM2lOaFhRWGZMV3FnZzZ6WWpnVXU5cFJQQ3NSaEZoM3FWRHBnQjZ4TExpMzErMnFPeStFVW1uUGEvYnZBWEdzV3YwU01HQkNXM0hXUkJXZS9rc0JHM3BKKzRDTEZTbk5VUUVDYi9WNkljK29za1ZYZmZ1S2RoMU1Ba2h5dWtMcklzTzJHSlZNSjQrSGFwYTU3YjZGNkpvaXJ4OHVhK3BmN0NWcFRieHJNZGNCR2lQZWV2TUMxdWthOFd4OExabXYzSCtlTWl5SUl6MkhCV1dyckdFdHgwWDVsbmtpbmE4SUV3bkN6S3Bsb09PL2xEUk5OMktYL2I2b1ovN1UrOXpwL2VkN1hnQkpKUHBneTVHaWViNGpUelB2cWt2NmppZGhGeHBQZjZvNEE4L3RQNy8wTSttSW5qZHFSdzJXc2RMZWhhQW5Tem1ZbE5lSEkwOEV1TFh3Y2cxQWlmNTNKbnArVFo2amJ6WWhGcEExTDBnQ3NoM3l4anBpanozeUtNdXBJM2x0UjB2QVVtM3k4cTRYWWY0TWFteFBweTJXK3Z6RWkzYUhtd3Z5NlNPYnoxZXhNeE1nQmNIRFhKZU1NY1hPenlFUHBCSnhzSGtlakQ1UXVTMG9PL09HeWQ4WGw3Yzl0am5ONWE2T0hhc3cyTVRSa2kydGNjN0grRlIyL0Y5eld2RGlXUFpKaWJ3Q3hTRTBlRU1ZREZtOEVNT3RkTGNvNGN0dE9kSUI4R3kxN2hsNVU5UG5EL29TaTdSQ242enlVUWR0OGtmZHVFRDhuWjl2MjkxRE5CQnltNm52OWxSK1d4OVJPWElNVjFzRHlYaUxDL25XS1hvRVJXZzcwMDNEdExJbTVPTlZSQ3Y2aStoY3FqYmN0VTdSWFdwTDk5bUZwUk80cWpsNEk1SmdBZzNXODY5U3FMWmkrZUZGcUNpZjJUemJmTXNCbGJwYjBiYTdtNDdab3VOcmd1TDVyWFMvLzd3amVCVE95M01jM3F6U2NHNnlyYnUrRzVwLzFPSGN0MmErZ01yZGxuUHRwZU9wdzcybW9UeWRUMWdjRzFaRHo0NGpvTVRFMVlVWFZ2YXhzaXhiRUZCR0IwQWJLa1BiczhvdWZaMXdrc09Wei9TZ1h1Lzd4R0VtYWpqOVVEcldhS0FUL29RQ1F6UWcwbCtWS0l2aWdNY0t1Q3oyTXhiZUIrWGpiYkxMQ0tISkt6WVJPLzdvZ1ZTeG1ZUEhWcm9yZ29FaVZsSmZ4RWhWUlpiczBCK3ZDb29td2dRSXBhY0ZTME1aU0dZWEhkYmZObFpITFZ3YTR2TTFtMzg0NEwybXplblM4czdMVkVYZHdaUnRLM0l1aksyL0g2czlTelhMTTgvMVpla2puL2t0THZXenhrcmlLT3BUZEkyUHk3N0hkcityOVJPWmFMa3pndHlOOXJXWEhkbHhWRXQxNE1aeGhiNnZMNThXaVZLV3NkZ3NWbklQcnZvWEprcmJZdkhKY28zVGcvejJqSUg4R21QWHdyYVJWbjdpYS9kbXhwU3ZiMm1YeDhHRXFIMWVMUjNhWVp4R21aVE5yMU9iQ29EaTNSd3A2YmZCenJVZ2RqdWZFaENtVVpLSGtnKzF3SDV6RXJyT2NibEFWckZUWUhvY05PQzh1VXR6bWE2Y0JNUk1Ib1ovYWEvZTIrMjUwbU9UVGVpSUYwWDZWSHkvSkhGZHJKQWt2RkgvdVozWGN5UDFVNXY5WFBieHFaWXI1ZjNmZGVDWjk0a3ozUnR0cWNMZUVvSGtQeitnL3JMT2lzWTZHSXM2eTh2V1JzL2dYaXU5czI3aDN5L0NCNFhXbS9mZGZFWjYyZityZVd6bFNHTlBxb2FCSkhuSjJsdXhGWEdSK1JudjVtL2Q1ek1DOFNWUzR0WWtvcWphMTBzVjNsZW0yOURzMjN1cElSQU1kVkwydURHL0MwZWprdjB3MDh2MVUwSHhIRzF4NkVwRjJFMzFqWi9wVzFncmUwczllK3NiZDdwL2Fxc0YrWWExV3NyYjJ3WkowYmFQcVBNR0J0WDZETTNQVjNmM0ZqNk5QbTV2TFFWdTMvWk1pZVpxTTFPdC9qOUptTjNWLzliSjk5UjFGYWUycUsydzdSdmovWDd5L1M5YVRDVDYrNmJwV1h0SzkvNVE4ZWNkSnplbExSZnNIa2R3dWlBa0lpMXg2Tzk5NmJIb2U0N3NLazBXckZyT2lGSElDMmU1RWpIZUROa29VemJvdGpod3ZUM0xhdE1DaTY3ZklBV1FNOFh0a3VOUUJsWkpyRzdMTjlLSjhuSGxzV2w5S0VpS0ZVWmcyUXgvOUR6NnAwYmUwVEt1T0xZazlxdHpla0lMdFZYeHJaRm9TNnl5dDV6cmZlOTgvRGpzb0pKZXVpbXl4YitvbTJ6ZVh3eCtTSmowZUZUNHhMQ1MxRkF4cVRpbWlUUzU1elNnN2RpREZtcmI1ZmRSajJxV0hjbkhiUEhVdzU5SFZmTGJsMSsyUVo4QXBpZUlsY3JuUEpkTkU2NDlKbVI5aXYvR0Nza0VyRmxPY3RkL1AzYVVyZnBTZkJuRmV5Vit2bkZscmJ4VzhYeUxmVjdiMHUwUTVlMVoxRlVhbEg1MGpIaHFxQmNzNG8rSitYNllBSUlvMnlsSHg0bmh1M2Z3ZEU4a2d2emZOQ09OTkFZcS94Q2JQN2VNay8wb1BrclorMWNmV2JabzBlVFNkR2g1T05GRkFWb1BYbFJvY3ZzMi9vZEluMWtxUFFqUll2R2YvZElzSWpWZHFIc2RsNWhzYjFMVVNMa0hGZWU5ekRFL1RKYmJldElUYkd1S0liODBzN3JYQk1rWlZvRW5OK3NqWDM3OXRqQUx0cGQyazVDSHZUN0pEQmE4dUMyM1NibnB2bnpLQ0sxMmJwQ09lTlFmZHlMTnJydWF4dlZ1ZzI1WnB0Yi9IenNVTDZsQ2EvMXBIT25WUUQ3WGRkZ3Y3ejdWUTVVUXhnZEdDcElYV0tKMnV3ckF1bFNjNUNlMURRSjdoTFMyY3VoU2lLSUxzZ3Z1YjFOOWtBZ1RTT0JEeEJFQVRwRlhwOXowNGJDWlFRbDM3NnhqSGpVcTkwMHVvanhYZlRHYXJkbFI1NzVLVjJOOFJmVFYvcmNOdHROcS9weWNzbThNR1IrK212akxvcG14ZVE2NjJSdS9FV3paVm9mbG9penNZR2Q5ZE1aTVRBS1VOZjdiWDhSVThJbXN2MjhpZk1vcEQySU9IVG9FbzJaRWJaajMwZE83blhRa2hlcWRkZHRpRDV0VTJKc0hUbVdiNlhqWUlpMW1Od2o2RXNLdGQ5NUFQdWRGTml2OHB3T1lYU0FTRzdNUUkwRjdIWmV5V0V6NWxud09qZkRpU0tOZGNEWVY1RnNpVGVVOHBkVUlQMlAra3NYSm9VeStNNjFydWVjTmcvUXVRbCtiUDRwT2tadFdwVHFvbnZ1dU9oT3R4aS9GSStpVUl1UXRpL09kUTV5N1dpM2c2NEpGT0xUc2tBM2JydDNZbDFzbmFRTGZNdUM4TitPNWJ2V09ybDBuQmVtTHlKRlBEcjNGU0wwK1Z5RWtVMkY3M0FWelNKdHUvTWhDQzU5Nkc5RW9NdjBPWEVGWDdwV24rNVZYVXQ3VDY3L21MQzdIOUsySWJiYTkzMXhKWDI4aXJndWZWS3NiZlM4Uk44dzdWRzl5dk1lR0xjQXFOVFhvd0tiVFR6S0YydGJkTjJwRU9sWWVGaEgrb1BNT09qaXUwdWRtMlNmNjl1MlA2eDZLS0ZManRGRFI2RUUyc1dKQ1JjZGdSaGlRYU4wcFFPUXc1ckU1cElIdzVZSHE0dkUydkYrUmh6ejlwZE54bC9HNmlzZlREdWltZEtFM1RJQXJYb1FBVngxUE1PMy85NWVDczJ4ekJFVVFyVS9XUXg5cm1IT0pndUhVYWc1b1M0aUlqM0pWL3JGZDJaN3pycjBNSXVuZmlwbmtaMVhOcDgyRU1wdWh5SHJXcC8vWEhON3BYWWJiN0ZicE0vd3hiSmxicHZkTm0yMG80b0ZTejIwSWZ2YzR4ZGwvOHRmTE05ZFI1MHM1TXFVNzIyT1A4ZDZpVCt2UTJ4bnpHbGIrM3JhNzN1ei9iQ29TSi81dTdhcnRXUDdMVk1mM3dxK3c4ZHZndFpsamQ5VGR6L2owd2NXaWpKNi8zUHRyN2YxTittenJBdDhxUmN2ckRMOVVYYjhtbFo0dnZoRjI0aHJLR1BhSjAyMWJFVjk1dWR0ZFpmSlBldnF1M2x6bm5WTDJ1WmZ6eWw2aXRicDFESzJydE94dFdCT2NsTkRuV2JuVFdYS1dPUmZ3ZnFsTk9XUEhocVZIUk5lSGpaV3h2ZnpmS1lTLzJLOUFiQWJWQ1NkNmlSMDJsR0I1S21UUnd4dHhGOUdtVUZ0YXBvUlN0UEpqeXlFSXVvWkFBQUFBSnJnN09QSGhkbCtJTkc1UnAxMS9mbEdtZmw4VmhDSzlUSmR6YlVLMERVUVJnRmF3QXZSS3hWTTI0YUlZakk0eXh1YmlIeWhyZkFiOFpXeCtzeHY1dSszdW1YOUozM3ptMDdDZms4blkrUUpCUUFBQUlCZGNmYnhvNXl3UGR2eXEwTUVRd0FJeVd0TUFMQjdWR1JjbVV3ZWtNZWp2YW41Vy9DYW1IK0dsdGRGZHB1RUNHVnJSTExXK2sxYVR5dXNBUUFBQUFBOUltOTNWSXhwQUNBa1JJd0NkQXdWVElYMDMzOXZtVGlNWHZ4TXhMUE5sa25GNy9yZmtmd1BBaWdBQUFBQUFPd1N6WXY0WTh1dk5ucWdFUUJBTUlnWUJlZ1lHZkV5d2hvQUFBQUFBTkF6WmprL1ovMERBTUY1aFFrQUFBQUFBQUFBb0F4eU1KTG1BSzNqM3JMejdUVG4xMSt3UGdDRUJtRVVBQUFBQUFBQUFBbzUrL2h4WnA1UGk1L1ZKSTdLUGZQT1ZTQ3ZQZ0FFaHh5akFBQUFBQUFBQUdEbDdPUEhhZkxQL1lzZlI4bDFjdjNwMHliQS9jK1NmNjV5ZnIxTXZtTk9MUUJBYUJCR0FRQUFBQUFBQUNDWHM0OGY1V0JYRVVXM1JYT0tLRHEvL3ZScDVYaHZ1YWNJb3JPY1A1SDdIeVQzajZrSkFBak4vNFlKQUFBQUFBQUFBQ0NQLytOLy9JLy96K1J2Y2YvZmsrdi9UUDVtbWx6Ly9YLy81Ly84Lzh2ZVY3Zm0vOS9KTmJYODJmOTEvZW5ULzBNdEFFQWRFREVLQUFBQUFBQUFBTG1vZ0ZrMnA2aEVlRWJKOWQzODh5UjVFVmNsK3ZTdGVSWkRSd1gzV2wxLytuUkNEUUJBWFNDTUFnQUFBQUFBQUlBVnpURjZaNHJGekZDc2src3dSUDVTQUlBOE9KVWVBQUFBQUFBQUFLeGNmL29VSmYvc20zOUdnZGJCMGlDS0FrQURFREVLQUFBQUFBQUFBS1hScmZVWHlUVU9mT3M0dWM1ZEQzSUNBS2dLd2lnQUFBQUFBQUFBVkVZRjB2ZkpkZXg1cXppNWJwSnJTWlFvQURRSndpZ0FBQUFBQUFBQU9IUDI4YVBrSFJWeFZBNVZtdWhseTBVcStVUGo1UHFXWE5IMXAwOXJyQWdBdStCL0NUQUFrajBVb3N6YzMxa0FBQUFBU1VWT1JLNUNZSUk9Ii8+CjwvZGVmcz4KPC9zdmc+Cg==" alt="logo"/>';

  $html_message = "<div>{$contact_img}{$thanks_message}{$text}{$email_message}{$password_message}{$button}{$contact}</div>";

  $wp_new_user_notification_email['subject'] = sprintf(__('[%s] Your username and password'), $blogname);
  $wp_new_user_notification_email['message'] = $html_message;

  return $wp_new_user_notification_email;
}

// add company menu item for admin to manage companies
add_action('admin_menu', 'kmq_company_submenu_page');
function kmq_company_submenu_page() {
    add_submenu_page(
        'users.php',
        'Company',
        'All Companies',
        'manage_options',
        'company',
        'kmq_company_menu_callback'
    );
}

function kmq_company_menu_callback() {
    wp_enqueue_style('my-custom-style', get_template_directory_uri() . '/css/companymenu.css');
    ?> 
    <form method="post" action="" class="company-form">
    <label for="company_name">Company Name:</label><br>
    <div class="input-submit">
        <input type="text" id="company_name" name="company_name"><br>
        <input type="submit" value="Submit">
    </div>
  </form>

  <?php 
  global $wpdb;
  if (isset($_POST['company_name'])) {
    
    $table_name = $wpdb->prefix . 'kmq_companies';
  
    $company_name = sanitize_text_field($_POST['company_name']);
    $company_id = wp_generate_uuid4();
    $company_exists = $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM $table_name WHERE name = %s", $company_name ) );
    if ( $company_exists ) {
        // If the company name already exists, return an error message
        echo 'Company name already exists';
    } else {
            $kmq_compnay_post_id = array(
              "company_id" => $company_id
            );
            $kmq_jwt_converted = kmq_createJWT($kmq_compnay_post_id);
            $kmq_company_create_response = wp_remote_post( WORDPRESS_DJANGO_API_BASE_URL . WORDPRESS_CREATE_COMPANY, array(
              'method' => 'POST',
              'headers' => array(
                'Content-Type' => 'application/json',
                'Authorization'=> 'Token 7b4c76eaa68c192da374d197b2497151c4b08bc9',
                'KMQJWT' => $kmq_jwt_converted,
              ),
            ) );

            if ( is_wp_error( $kmq_company_create_response ) ) {
              // There was an error making the request
              echo $kmq_company_create_response->get_error_message();
            } else {
              // The request was successful
              $kmq_http_response_code = wp_remote_retrieve_response_code( $kmq_company_create_response );
              $kmq_response_body = wp_remote_retrieve_body( $kmq_company_create_response );
              $kmq_response_body_json = json_decode($kmq_response_body,true);
              if($kmq_response_body_json['status'] == 'Company Created') {
                $wpdb->insert(
                  $table_name,  
                  array(
                      'name' => $company_name,
                      'company_id' => $company_id
                  )
                  );
                  echo 'Company Created';
              } else {
                echo 'Error connecting to backend';
              }
            }
        } 
    }

  // Get all the companies from the database
  $table_name = $wpdb->prefix . 'kmq_companies';
  $companies = $wpdb->get_results( "SELECT * FROM $table_name" );

// Check if there are any companies in the database
if ( !empty( $companies ) ) {
  // If there are companies, loop through them and display them in a list
  ?>
  <table id="company-table">
  <tr>
    <th>Company Name</th>
    <th>Company ID </th>
    <th>is active</th>
  </tr>
<?php
  foreach ( $companies as $company ) {
    ?> 
    <tr>
      <td><?php echo esc_html( $company->name ); ?></td>
      <td><?php echo esc_html( $company->company_id ); ?></td>
      <td><?php echo esc_html( $company->is_company_active);?></td>
    </tr>
  <?php } ?>
</ul>
<?php 
} else { ?>
  <p>No companies have been added yet.</p>
  <?php
}
}

//add action to rewrite rules to include candidate/candidate_id list, ([0-9]+) is regex for numbers assuming candidate id is a number
add_action('init', 'kmq_rewrite_rule');
function kmq_rewrite_rule () {
  // We are redirecting all endpoints into the /index.php...
  add_rewrite_rule( 'user-login', 'index.php?type=user-login', 'top' );
  add_rewrite_rule( 'main-page', 'index.php?type=main-page', 'top' );
  add_rewrite_rule( 'assessment/?', 'index.php?type=assessment', 'top' );
  add_rewrite_rule( 'my-results', 'index.php?type=individual-results-list', 'top' );
  add_rewrite_rule( 'get-results', 'index.php?type=individual-results', 'top' );
  add_rewrite_rule( 'admin-page/company-results/?', 'index.php?type=CompanyAdmin&term=company-result', 'top' );
  add_rewrite_rule( 'admin-page/companies-list/?', 'index.php?type=NGenAdmin', 'top' );
  flush_rewrite_rules();
}
add_filter( 'query_vars', function( $query_vars ) {
  $query_vars[] = 'type';
  return $query_vars;
} );
add_action( 'template_include', function( $template ) {
  $theme_dir_path = dirname(__FILE__);
  return $theme_dir_path . DIRECTORY_SEPARATOR . 'index.php';
} );

/* Rest API initialization. */
add_action( 'rest_api_init', 'kmq_register_api_hooks', 10, 1 );
function kmq_register_api_hooks() {
    register_rest_route( 'knowmeq-api', '/finish-later', array(
        'methods'             => 'POST',
        'callback'            => 'kmq_finish_later'
    ) );
    register_rest_route( 'knowmeq-api', '/get-draft', array(
        'methods'             => 'GET',
        'callback'            => 'kmq_get_draft'
    ) );
    register_rest_route( 'knowmeq-api', '/get-assessments-status', array(
        'methods'             => 'GET',
        'callback'            => 'kmq_get_status'
    ) );
    register_rest_route( 'knowmeq-api', '/retake-assessment', array(
      'methods'             => 'POST',
      'callback'            => 'kmq_retake_assessment'
    ) );
    register_rest_route( 'knowmeq-api', '/get-company-list', array(
      'methods'             => 'GET',
      'callback'            => 'kmq_get_company_list'
    ) );
    register_rest_route( 'knowmeq-api', '/participants/(?P<id>[\d]+)', array(
      'methods'             => 'GET',
      'callback'            => 'kmq_get_participants'
    ) );
    register_rest_route( 'knowmeq-api', 'users/me', array(
      'methods'             => 'GET',
      'callback'            => 'kmq_get_me'
    ) );
    register_rest_route( 'knowmeq-api', 'users/(?P<id>[\d]+)', array(
      'methods'             => 'GET',
      'callback'            => 'kmq_get_user'
    ) );
    register_rest_route( 'knowmeq-api', '/get-company-name', array(
      'methods'             => 'GET',
      'callback'            => 'kmq_get_print_info'
    ) );
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
    register_rest_route(
      'knowmeq-api', '/accept-terms-and-conditions',
      array(
        'methods'  => 'POST',
        'callback' => 'kmq_accept_terms_and_conditions',
      )
    );
    register_rest_route(
      'knowmeq-api', '/accept-terms-and-conditions',
      array(
        'methods'  => 'GET',
        'callback' => 'kmq_get_accept_terms_and_conditions',
      )
    );
}

?>

