<?php
include "init.php";

function kmq_login_callback($request){
  $creds = array();
  $creds['user_login'] = $request["username"];
  $creds['user_password'] =  $request["password"];
  $creds['remember'] = true;
  $user = wp_signon( $creds, false );
  wp_set_auth_cookie( $user->ID );

  if ( is_wp_error($user) ) {
    echo $user->get_error_message();
  }

  return $user;
}

function kmq_logout_callback(){
  return wp_logout_url('/user-login');
}

function kmq_accept_terms_and_conditions($request) {
    $user = wp_get_current_user();
    $data = add_user_meta($user->ID, 'accepted_conditions', true);
    return $data;
}

function kmq_get_accept_terms_and_conditions($request) {
    $user = wp_get_current_user();
    $accepted = get_user_meta($user->ID, 'accepted_conditions');
    return !empty($accepted) && $accepted[0];
}

function kmq_is_NGen_admin() {
  $user = wp_get_current_user();
  $roles = $user->roles;
  $is_admin = in_array( 'administrator', $roles );
  $is_ngen_admin = in_array( 'NGen_Admin', $roles );
    // check the user role and only ngen_admin, administrator can see the company list.
  return $is_admin || $is_ngen_admin;
}

function kmq_is_company_admin () {
  $user = wp_get_current_user();
  $roles = $user->roles;
  $is_admin = in_array( 'administrator', $roles );
  $is_company_admin = in_array( 'Company_Admin', $roles );
    // check the user role and only company_admin, administrator can see the user list of that company.
  return $is_admin || $is_company_admin;
}

function kmq_get_participants ($request) {
  $test_id = $request['id'];
  $user = wp_get_current_user();
  $company_id = $request->get_param('company');
  global $wpdb;
  $table_name = 'get_all_participants';

  if ($test_id == '0') {
    if(!kmq_is_NGen_admin() && !kmq_is_company_admin()) {
      return new WP_Error( 'user_not_allowed',
            'Sorry, you are not allowed to access the REST API.',
            array( 'status' => 403 )
      );
    }
    $sql = "select get_all_participants.*, `t`.quiz_id, `t`.quiz_finished
    from get_all_participants left join (select * from wp_kmq_finish_later) `t` on get_all_participants.ID = `t`.user_id
    where get_all_participants.company_id = '$company_id';";
    $results = $wpdb->get_results($sql);
    return $results;
  }
   else if ($test_id == 'all') {
    if(!kmq_is_NGen_admin()) {
      return new WP_Error( 'user_not_allowed',
            'Sorry, you are not allowed to access the REST API.',
            array( 'status' => 403 )
      );
    }
    $sql = "SELECT * FROM $table_name";
    $results = $wpdb->get_results($sql);
    return $results;
  }
  else {
    if(!kmq_is_company_admin() && !kmq_is_NGen_admin()) {
      return new WP_Error( 'user_not_allowed',
            'Sorry, you are not allowed to access the REST API.',
            array( 'status' => 403 )
      );
    }
    $sql = "select get_all_participants.*, `t`.quiz_id, `t`.quiz_finished, `user_meta`.meta_value as 'job_title'
    from get_all_participants left join (select * from wp_kmq_finish_later where wp_kmq_finish_later.quiz_id = $test_id) `t` on get_all_participants.ID = `t`.user_id 
    left join (select * from wp_usermeta) `user_meta` on get_all_participants.ID = `user_meta`.user_id and `user_meta`.meta_key = 'job_title'
    where get_all_participants.company_id = '$company_id';";
    $results = $wpdb->get_results($sql);
    return $results;
  }
}

// Get company name and date time of the server.
function kmq_get_print_info($request) {
  global $wpdb;
  $table_name = $wpdb->prefix . 'kmq_companies';
  $company_id = $request['company_id'];
  $sql = "SELECT `name` FROM $table_name WHERE company_id = '$company_id' OR id = '$company_id'";
  $results = $wpdb->get_results($sql);
  $result = $results[0];
  $data = array(
    'name' => $result->name,
    'timestamp' => date("Y-m-d H:i:s") // calculated date time in server side. because we have to get time in server side.
  );
  return $data;
}

function kmq_get_user($request) {
  if(!kmq_is_company_admin() && !kmq_is_NGen_admin()) {
    return new WP_Error( 'user_not_allowed',
            'Sorry, you are not allowed to access the REST API.',
            array( 'status' => 403 )
    );
  }
  $user = get_user_by('id', $request['id']);
  $company_id = get_user_meta( $user->ID, 'company', true );
  $data = array(
    'id' => $user->ID,
    'role' => $user->roles[0],
    'company_id' => $company_id,
    'name' => $user->display_name
  );
  return $data;
}

function kmq_get_me ($request) {
  $user = wp_get_current_user();
  $company_id = get_user_meta( $user->ID, 'company', true );
  $data = array(
      'id' => $user->ID,
      'role' => $user->roles[0],
      'company_id' => $company_id,
      'name' => $user->display_name,
      'email' => $user->user_email
  );
  return $data;
}

function kmq_finish_later ($request) {
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
      if ($completed) {
          $wpdb->query( $wpdb->prepare("UPDATE $table_name
                      SET quiz_finished = '%s'
                  WHERE user_id = %s AND quiz_id = %s", $completed, $user_id, $quiz_id));
      } else {
          $wpdb->query( $wpdb->prepare("UPDATE $table_name
                      SET answers_obj = '".$answer_ids."', quiz_finished = '%s'
                  WHERE user_id = %s AND quiz_id = %s", $completed, $user_id, $quiz_id));
      }

    }
    if($check == 0) {
      $wpdb->query("INSERT INTO `$table_name`($fields) VALUES ($format)");
    }

    return $completed;
  }
  
  function kmq_get_draft ($request) {
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
  
  function kmq_get_status ($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'kmq_finish_later';
    $user_id = $request["user_id"];
    $int_user_id = intval($user_id);
    $sql_one = "SELECT quiz_id, quiz_finished, answers_obj from `$table_name` WHERE user_id = $int_user_id";
    $results = $wpdb->get_results($sql_one);
    return json_encode($results);
  }

  function kmq_retake_assessment ($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'kmq_finish_later';
    $user_id = $request["user_id"];
    $quiz_id = $request["quiz_id"];
    $quiz_title = $request["quiz_title"];
    $int_user_id = intval($user_id);
    $int_quiz_id = intval($quiz_id);
    $data = array(
        'user_id'=>$user_id,
        'quiz_id'=>$quiz_id,
        'quiz_title'=>$quiz_title,
        'answers_obj'=>'',
        'quiz_finished'=>'0'
      );
    $fields = '`' . implode('`,`', array_keys($data)) . '`';
    $format = "'" . implode("', '", $data) . "'";
    $sql_one = "SELECT * from `$table_name` WHERE user_id = $int_user_id AND quiz_id = $int_quiz_id";
    $check = $wpdb->query($sql_one);
    if($check == 1) {
      $wpdb->query( $wpdb->prepare("UPDATE $table_name 
                  SET answers_obj = NULL, quiz_finished = NULL 
              WHERE user_id = %s AND quiz_id = %s", $user_id, $quiz_id));
    }
    if($check == 0) {
      $wpdb->query("INSERT INTO `$table_name`($fields) VALUES ($format)");
    }
  }
  
  // Get company list from the db...
  function get_company_list () {
    // check the user role and only ngen_admin, administrator can see the company list.
    if(!kmq_is_NGen_admin()) {
      return new WP_Error( 'user_not_allowed',
            'Sorry, you are not allowed to access the REST API.',
            array( 'status' => 403 )
      );
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'kmq_companies';
    $sql = "SELECT * FROM `$table_name`;";
    $results = $wpdb->get_results($sql);   
    return $results;
  }
   
  function kmq_get_company_list () {
    return json_encode(get_company_list());
  }

  function kmq_createJWT($data) {
    $header = json_encode(array(
        "alg" => "HS256",
        "typ" => "JWT"
    ));

    $payload = json_encode($data);

    $base64UrlHeader = kmq_base64UrlEncode($header);
    $base64UrlPayload = kmq_base64UrlEncode($payload);
    $signature = hash_hmac("sha256", $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);
    $base64UrlSignature = kmq_base64UrlEncode($signature);

    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

function kmq_base64UrlEncode($input) {
    return str_replace("=", "", strtr(base64_encode($input), "+/", "-_"));
}

