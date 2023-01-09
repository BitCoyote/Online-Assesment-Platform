<?php 

    function is_NGen_admin() {
      $user = wp_get_current_user();
      $roles = $user->roles;
      $is_admin = in_array( 'administrator', $roles );
      $is_ngen_admin = in_array( 'NGen_Admin', $roles );
        // check the user role and only ngen_admin, administrator can see the company list.
      return $is_admin || $is_ngen_admin;
    }

    function is_Company_admin () {
      $user = wp_get_current_user();
      $roles = $user->roles;
      $is_admin = in_array( 'administrator', $roles );
      $is_company_admin = in_array( 'Company_Admin', $roles );
        // check the user role and only company_admin, administrator can see the user list of that company.
      return $is_admin || $is_company_admin;
    }

    function kmq_function_get_participants ($request) {
      $test_id = $request['id'];
      $user = wp_get_current_user();
      $company_id = $request->get_param('company');
      global $wpdb;
      $table_name = 'get_all_participants';
      
      if ($test_id == 'all') {
        if(!is_NGen_admin()) {
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
        if(!is_Company_admin() && !is_NGen_admin()) {
          return new WP_Error( 'user_not_allowed',
                'Sorry, you are not allowed to access the REST API.',
                array( 'status' => 403 )
          );
        }
        $sql = "select get_all_participants.*, `t`.quiz_id, `t`.quiz_finished 
        from get_all_participants left join (select * from wp_kmq_finish_later where wp_kmq_finish_later.quiz_id = $test_id) `t` on get_all_participants.ID = `t`.user_id 
        where get_all_participants.company_id = '$company_id';";
        $results = $wpdb->get_results($sql);
        return $results;
      }
    }

    // Get company name and date time of the server.
    function kmq_function_get_print_info($request) {
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

    function kmq_function_get_user($request) {
      if(!is_Company_admin() && !is_NGen_admin()) {
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

    function kmq_function_get_me ($request) {
      $user = wp_get_current_user();
      $company_id = get_user_meta( $user->ID, 'company', true );
      //var_export($user);
      $data = array(
          'id' => $user->ID,
          'role' => $user->roles[0],
          'company_id' => $company_id,
          'name' => $user->display_name,
          'email' => $user->user_email
      );
      return $data;
    }

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

      function kmq_function_retake_assessment ($request) {
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
      // Get user meta data callback...
      function user_meta_callback( $user, $field_name, $request) {
        return get_user_meta( $user[ 'id' ], 'company', true );
      }

      function user_role_callback( $user, $field_name, $request) {
        if( is_user_logged_in() ) {
 
          $user = wp_get_current_user();
       
          $roles = ( array ) $user->roles;
       
          return $roles[0];
       
        } else {
       
          return "";
       
        }
      }
      // Get company list from the db...
      function get_company_list () {
        // check the user role and only ngen_admin, administrator can see the company list.
        if(!is_NGen_admin()) {
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
       
      function kmq_function_get_company_list () {
        return json_encode(get_company_list());
      }
?>