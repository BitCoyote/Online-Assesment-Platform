<?php 
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
            $wpdb->insert(
            $table_name,
            array(
                'name' => $company_name,
                'company_id' => $company_id
            )
            );
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
  </tr>
<?php
  foreach ( $companies as $company ) {
    ?> 
    <tr>
      <td><?php echo esc_html( $company->name ); ?></td>
      <td><?php echo esc_html( $company->company_id ); ?></td>
    </tr>
  <?php } ?>
</ul>
<?php 
} else { ?>
  <p>No companies have been added yet.</p>
  <?php
}
}

