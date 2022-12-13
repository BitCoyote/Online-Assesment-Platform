<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php 
    wp_head(); 
    echo "<script> const wpApiNonce='" . wp_create_nonce( 'wp_rest' ) . "' </script>"
    ?>
  </head>
  <body <?php body_class(); ?>>
    <div>
    </div>