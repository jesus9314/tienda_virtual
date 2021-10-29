<!-- Header -->
<?php headerAdmin($data); 
  getModal('modalRoles',$data);
?>
<!-- Header -->


  <div id="contentAjax"></div>
  <div class="right_col" role="main">
          <div class="">
            <div class="row">
              <div class="col-md-12 col-sm-12 ">
                <div class="x_panel">
                  <div class="x_title">
                    <h1>
                      <?= $data['page_name'];?>
                      <?php if($_SESSION['permisosMod']['w']){ ?>
                        <span class="float-right"><button class="btn-sm btn-dark" title="Agregar nuevo rol" type="button" onclick="openModal();"><i class="fas fa-plus-circle"></i> Nuevo Rol</button></span>
                      <?php } ?>
                    </h1> 
                  </div>
                    <div class="x_content">
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="tile">
                            <div class="tile-body">
                              <div class="table-responsive">
                              <table class="table table-sm responsive table-hover table-striped table-bordered" id="tableRoles" style="width:100%">
                                  <thead>
                                    <tr>
                                      <th><center>ID</center></th>
                                      <th><center>Nombre</center></th>
                                      <th><center>Descripción</center></th>
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

    

<!-- Footer-->
<?php footerAdmin($data); ?>

