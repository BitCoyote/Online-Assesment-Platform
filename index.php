<<<<<<< HEAD
<?php
echo "<script> const wpApiNonce='" . wp_create_nonce( 'wp_rest' ) . "' </script>"
?>
<?php
get_header(); 
?>
=======
<?php get_header();?>
>>>>>>> merge-branch

<div class="max-w-4xl mx-auto px-4">

  <!-- example react component -->
  <div id="render-react-here"></div>
  <!-- end example react component -->

<<<<<<< HEAD
  <!-- assessment react component -->
  <div id="render-react-assessment-component"></div>
  <!-- end assessment react component -->

=======
>>>>>>> merge-branch
  <div class="prose max-w-full">
    <h2> <?php print_r($testdata) ?></h2>
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