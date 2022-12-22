<?php 
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

      // Get company list from the db...
      function get_company_list () {
              
        global $wpdb;
        $table_name = $wpdb->prefix . 'kmq_companies';
        $sql = "SELECT * FROM `$table_name`;";
        $results = $wpdb->get_results($sql);
        
        return $results;
      }
?>