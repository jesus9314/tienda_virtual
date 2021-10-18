<!-- Header -->
<?php 
  headerAdmin($data);
  getModal('modalUsuarios',$data);
       ?>
<!-- Header -->

<!-- Content -->
        <div class="right_col" role="main">
          <div class="">
            <div class="row">
              <div class="col-md-12 col-sm-12 ">
                <div class="x_panel">
                  <div class="x_title">
                    <h1><?php echo $data['page_tittle'];?></h1> 
                  </div>
                    <div class="x_content">
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="tile">
                            <div class="tile-body">
                              <?php if($_SESSION['permisosMod']['w']){ ?>
                              <button class="btn btn-dark" type="button" onclick="openModal();"><i class="fa fa-plus-circle"></i> Nuevo usuario</button>
                              <?php } ?>
                              <br>
                              <br>
                              <div class="table-responsive">
                                <table class="table table-hover table-striped" id="tableUsuarios" style="width:100%">
                                  <thead>
                                    <tr>
                                      <th><center>Id</center></th>
                                      <th><center>Nombres</center></th>
                                      <th><center>Apellidos</center></th>
                                      <th><center>Identificación</center></th>
                                      <th><center>Teléfono</center></th>
                                      <th><center>Email</center></th>
                                      <th><center>Rol</center></th>
                                      <th><center>Estado</center></th>
                                      <th><center>Acciones</center></th>  
                                    </tr>
                                  </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
<!-- Content -->

<!-- Footer-->
<?php footerAdmin($data); ?>