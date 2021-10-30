<!--HEADER-->
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta name="author" content="Jesus Inchicaque">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="<?= media();?>/images/favicon.ico">
    <title><?= $data['page_tag'];?></title>
    <!-- Bootstrap -->
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/bootstrap-select.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" type="text/css" href="<?= media();?>/fonts/font-awesome.min.css">
    <!-- Datatables -->
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/buttons.bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/fixedHeader.bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/responsive.bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/scroller.bootstrap.min.css">
    <!-- Custom Theme Style -->
    <link rel="stylesheet" type="text/css" href="<?php echo media();?>/css/main.css">
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/style.css">
    <script>
        const base_url = "<?= base_url(); ?>";
    </script>
    <script src="<?= media(); ?>js/fontawsome.js"></script>
    <!-- jQuery -->
    <script src="<?= media(); ?>js/plugins/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="<?= media(); ?>js/plugins/bootstrap.bundle.min.js"></script>
    <!-- Data table plugin-->
    <script type="text/javascript" src="<?= media(); ?>js/plugins/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="<?= media(); ?>js/plugins/dataTables.bootstrap.min.js"></script>
        <!-- Page specific javascripts-->
    <script type="text/javascript" src="<?= media(); ?>js/plugins/sweetalert.min.js"></script>
    <script type="text/javascript" src="<?= media(); ?>/js/tinymce/tinymce.min.js"></script>
    <script type="text/javascript" src="<?= media(); ?>/js/tinymce/langs/es_419.js"></script>
    <!-- Bootstrap-select-->
    <script type="text/javascript" src="<?= media(); ?>js/plugins/bootstrap-select.min.js"></script>
    <!-- ExportDatatables-->
    <script type="text/javascript" src="<?= media(); ?>js/plugins/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="<?= media(); ?>js/plugins/jszip.min.js"></script>
    <script type="text/javascript" src="<?= media(); ?>js/plugins/pdfmake.min.js"></script>
    <script type="text/javascript" src="<?= media(); ?>js/plugins/vfs_fonts.js"></script>
    <script type="text/javascript" src="<?= media(); ?>js/plugins/buttons.html5.min.js"></script>
    <!-- Custom Theme Scripts -->
    <script src="<?= media(); ?>js/functions_admin.js"></script>
    <script src="<?= media(); ?>js/<?= $data['page_functions_js']; ?>"></script>
  </head>
  <body class="nav-md">
        <div id="divLoading">
          <div>
            <img src="<?= media(); ?>/images/loading.svg" alt="Loading">
          </div>
        </div>
    <div class="container body">
      <div class="main_container">
        <div class="col-md-3 left_col">
          <div class="left_col scroll-view">
            <div class="navbar nav_title" style="border: 0;">
              <a href="index.html" class="site_title"><i class="fa fa-laptop"></i> <span>Tienda Virtual</span></a>
            </div>
            <div class="clearfix"></div>
            <!-- menu profile quick info -->
            <div class="profile clearfix">
              <div class="profile_pic">
                <img src='<?= media();?>/images/uploads/users_img/<?= $_SESSION["userData"]["img_perfil"]?>' alt="..." class="img-circle profile_img">
              </div>
              <div class="profile_info">
                <h2><?= $_SESSION['userData']['nombres']?></h2>
                <h2><?= $_SESSION['userData']['apellidos'] ?></h2>
              </div>
            </div>
            <!-- /menu profile quick info -->
            <br />
<!--HEADER-->
<?php require_once("nav_admin_gentella.php");?>