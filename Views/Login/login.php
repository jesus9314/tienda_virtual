<!DOCTYPE html>
<html lang="es">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?= $data['page_tag']; ?></title>
    <!-- Main CSS-->
    <link rel="stylesheet" type="text/css" href="<?= media(); ?>css/style.css">
    <link rel="shortcut icon" href="<?= media(); ?>images/favicon.ico">

    <!-- Bootstrap -->
    <link href="<?= media(); ?>gentella/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="<?= media(); ?>gentella/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="<?= media(); ?>gentella/vendors/nprogress/nprogress.css" rel="stylesheet">
    <!-- Animate.css -->
    <link href="<?= media(); ?>gentella/vendors/animate.css/animate.min.css" rel="stylesheet">

    <!-- Custom Theme Style -->
    <link href="<?= media(); ?>gentella/build/css/custom.min.css" rel="stylesheet">
  </head>

  <body class="login">
    <div>
      <a class="hiddenanchor" id="signup"></a>
      <a class="hiddenanchor" id="signin"></a>

      <div class="login_wrapper">
        <div class="animate form login_form">
          <section class="login_content">
          <div class="login-box">
          <div id="divLoading">
            <div>
              <img src="<?= media(); ?>/images/loading.svg" alt="Loading">
            </div>
          </div>
            <form class="login-form" action="" name="formLogin" id="formLogin">
              <h1>Iniciar Sesión</h1>
              <div>
              <input id="txtEmail" name="txtEmail" class="form-control" type="email" placeholder="Usuario" autofocus required=""/>
              </div>
              <div>
              <input id="txtPassword" name="txtPassword" class="form-control" type="password" placeholder="Contraseña" required=""/>
              </div>
              <div>
              <button type="submit" class="btn btn-default submit"><i class="fas fa-sign-in-alt"></i> Ingresar</button>
              </div>

              <div class="clearfix"></div>

              <div class="separator">
                <p class="change_link">¿Olvidaste tu Contraseña?
                  <a href="#signup" class="to_register"> Recuperarla </a>
                </p>

                <div class="clearfix"></div>
                <br />

                <div>
                  <h1><i class="fa fa-paw"></i> Tienda Virtual</h1>
                  <p>©2016 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>
                </div>
              </div>
            </form>
          </section>
        </div>

        <div id="register" class="animate form registration_form">
          <section class="login_content">
            <form id="formRecetPass" name="formRecetPass" class="forget-form" action="">
              <h1>Recuperar Contraseña</h1>
              <div>
              <input id="txtEmailReset" name="txtEmailReset" class="form-control" type="email" placeholder="Correo">
              </div>
              <div>
              <button type="submit" class="btn btn-default submit"><i class="fa fa-unlock fa-lg fa-fw"></i>Reiniciar</button>
              </div>

              <div class="clearfix"></div>

              <div class="separator">
                <p class="change_link">¿Recordaste tu contraseña?
                  <a href="#signin" class="to_register"> Iniciar Sesión </a>
                </p>

                <div class="clearfix"></div>
                <br />

                <div>
                  <h1><i class="fa fa-paw"></i>Tienda Virtual</h1>
                  <p>©2021 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>

    <script>
      const base_url = "<?= base_url();?>";
    </script>
    <!-- Essential javascripts for application to work-->
    <script src="<?= media(); ?>js/jquery-3.3.1.min.js"></script>
    <script src="<?= media(); ?>js/popper.min.js"></script>
    <script src="<?= media(); ?>js/bootstrap.min.js"></script>
    <script src="<?= media(); ?>js/fontawsome.js"></script>
    <script src="<?= media(); ?>js/main.js"></script>
    <!-- The javascript plugin to display page loading on top-->
    <script src="<?= media(); ?>js/plugins/pace.min.js"></script>
    <script type="text/javascript" src="<?= media();?>js/plugins/sweetalert.min.js"></script>
    <script src="<?= media(); ?>js/<?= $data['page_functions_js']; ?>"></script>
  </body>
</html>