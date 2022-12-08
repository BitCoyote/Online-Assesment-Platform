<?php

get_header(); 

function kmq_testing() {
  $t1 = "https://kmq-ngen-tlp-django.azurewebsites.net/sat-tool/get-sat-questions";
  $a1 = array(
    'headers'     => array(
    'Authorization' => 'Token ' . '7b4c76eaa68c192da374d197b2497151c4b08bc9',
    'KMQJWT' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0X2lkIjoxLCJjb21wYW55X2lkIjoiOGRkMGRlZjktOTdhNC00NTE4LWFmNjItNWVhNjI5ZjRiZDMwIiwidXNlcl9pZCI6NjcwfQ.SOrF2dAuvfVTif6cfKSrxEqNoF7Pm_xkKwEDdS8U1Es'
    ),
  ); 
  $d1 = wp_remote_get( $t1, $a1 );
  
  if( is_wp_error( $d1 ) ) {
    return false;
  }

  $body1 = wp_remote_retrieve_body( $d1 );
  $fdata = json_decode( $body1 );
  return $fdata;
}

$testdata = kmq_testing();
?>

<div class="max-w-4xl mx-auto px-4">

  <!-- example react component -->
  <div id="render-react-example-here"></div>
  <!-- end example react component -->

  <div class="prose max-w-full">
    <h2>Hello <?php print_r($testdata) ?></h2>
    <?php if (have_posts()) {
      while(have_posts()) {
        the_post(); ?>
        <div>
          <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
          <?php the_content(); ?>
        </div>
      <?php }
    } ?>
  </div>
</div>

<?php get_footer();