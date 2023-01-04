<?php 
include "kmq-jwt.php";
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
            $kmq_jwt_converted = createJWT($kmq_compnay_post_id);
            $kmq_company_create_response = wp_remote_post( 'https://kmq-ngen-tlp-django.azurewebsites.net/api/create-new-company', array(
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

