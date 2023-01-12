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
    `wp_usermeta`.`meta_value` AS `company_id` 
  from ((`wp_users` join `wp_usermeta`) join (select `wp_usermeta`.`user_id` AS `user_id`,`wp_usermeta`.`meta_value` AS `meta_value` from `wp_usermeta` where ((`wp_usermeta`.`meta_key` = 'wp_capabilities') 
   and (substring_index(substring_index(`wp_usermeta`.`meta_value`,'\"',2),'\"',-(1)) = 'Participant'))) `t`) 
   where ((`wp_users`.`ID` = `wp_usermeta`.`user_id`) 
   and (`wp_usermeta`.`user_id` = `t`.`user_id`) 
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

add_action('user_register', 'kmq_save_company_info');
add_action('profile_update', 'kmq_save_company_info');
function kmq_save_company_info($user_id){
  # again do this only if you can
  if(!current_user_can('manage_options'))
      return false;

  # save my custom field
  update_user_meta($user_id, 'company', $_POST['company']);
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

  $thanks_message = "<p>Thank you for registering in NGen’s Transformation Leadership Program as a part of the DAIR Supplier Development Initiative. The following is your username and password to get into the system. The content will be accessible when we begin at 8am Tuesday January 24th.  Please log in before this time to ensure that any access issues may be resolved. You will need a computer to access the Strategic Assessment Tools (SATs). We ask that you not complete any SAT before you have attended the corresponding module.  The Zoom links for the program sessions will be sent separately.</p><br/>";
  $url_message = '<a href="http://20.220.211.23/login-user" target="_blank" rel="noopener noreferrer">20.220.211.23/login-user</a>';
  $email_message = "<p>Email: {$user_email}</p>";
  $password_message = "<p>Password: {$new_password}</p><br/>";
  $contact_issues = "</p>For technical issues please email <strong>ngensupport@knowmeq.com</strong></p>";
  $contact = "<p>For all other questions about the Transformation Leadership Program please email <strong>tlp@ngen.ca</strong></p><br/>";
  $contact_img = "<img src='http://20.220.211.23/wp-content/themes/kmq-ngen-wp-theme/build/images/logo.a6823ed7.png'/>";

  $html_message = "<!DOCTYPE html><html><body>{$thanks_message}{$url_message}{$email_message}{$password_message}{$contact_issues}{$contact}{$contact_img}</body></html>";

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

