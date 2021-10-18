 <!-- sidebar menu -->
 <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">

              <div class="menu_section">
                <h3><?= $_SESSION['userData']['nombrerol'] ?></h3>
                
                <!--Menú Principal-->
                <ul class="nav side-menu">

                  <!--Inicio-->
                  <?php if(!empty($_SESSION['permisos'][1]['r'])){ ?>
                  <li><a href="<?= base_url();?>/dashboard"><i class="fa fa-home"></i> Inicio </a></li>
                  <?php } ?> 

                  <!--Usuarios Main-->
                  <?php if(!empty($_SESSION['permisos'][2]['r']) ||!empty($_SESSION['permisos'][7]['r'])){ ?>
                  <li><a><i class="fa fa-users"></i>Usuarios<span class="fa fa-chevron-down"></span></a>
                      <ul class="nav child_menu">
                        <!--Usuarios-->
                        <?php if(!empty($_SESSION['permisos'][2]['r'])){ ?>
                        <li><a href="<?= base_url();?>/usuarios">Usuarios</a></li>
                        <?php } ?>
                        <!--Roles-->
                        <?php if(!empty($_SESSION['permisos'][7]['r'])){ ?>
                        <li><a href="<?= base_url();?>/roles">Roles</a></li>
                        <?php } ?>
                      </ul>
                    </li>
                  <?php } ?>

                  <!--Clientes-->
                  <?php if(!empty($_SESSION['permisos'][3]['r'])){ ?>
                  <li><a href="javascript:void(0)"><i class="fa fa-user"></i> Clientes </a></li>
                  <?php } ?>

                  <!--Tienda Main-->
                  <?php if(!empty($_SESSION['permisos'][4]['r']) || !empty($_SESSION['permisos'][6]['r'])){ ?>
                  <li><a><i class="fa fa-archive"></i> Tienda <span class="fa fa-chevron-down"></span></a>
                      <ul class="nav child_menu">
                        <!--Productos-->
                        <?php if(!empty($_SESSION['permisos'][4]['r'])){ ?>
                        <li><a href="<?= base_url();?>/productos">Productos</a></li>
                        <?php } ?>
                        <!--Categorias-->
                        <?php if(!empty($_SESSION['permisos'][6]['r'])){ ?>
                        <li><a href="<?= base_url();?>/categorias">Categorías</a></li>
                        <?php } ?>
                      </ul>
                  </li>
                  <?php } ?>

                  <!--Pedidos-->
                  <?php if(!empty($_SESSION['permisos'][5]['r'])){ ?>
                  <li><a href="<?= base_url();?>/pedidos"><i class="fa fa-shopping-cart"></i> Pedidos </a></li>
                  <?php } ?>
                </ul>
                <!--Menú Principal-->
              </div>

            </div>
            <!-- /sidebar menu -->

            <!-- /menu footer buttons -->
            <div class="sidebar-footer hidden-small">
              <a data-toggle="tooltip" data-placement="top" title="Settings">
                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Lock">
                <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Logout" href="<?= base_url();?>/logout">
                <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
              </a>
            </div>
            <!-- /menu footer buttons -->

          </div>
        </div>

        <!-- top navigation -->
        <div class="top_nav">
            <div class="nav_menu">
                <div class="nav toggle">
                  <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                </div>
                <nav class="nav navbar-nav">
                <ul class=" navbar-right">
                  <li class="nav-item dropdown open" style="padding-left: 15px;">
                    <a href="javascript:;" class="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                      <img src="<?= media();?>/images/avatar.png" alt=""><?= $_SESSION['userData']['nombres']?>
                    </a>
                    <div class="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item"  href="<?= base_url();?>/usuarios/perfil"> Perfil</a>
                        <a class="dropdown-item"  href="<?= base_url();?>/opciones">
                          <span>Opciones</span>
                        </a>
                      <a class="dropdown-item"  href="<?= base_url();?>/logout"><i class="fa fa-sign-out pull-right"></i> Desconectarse</a>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        <!-- /top navigation -->