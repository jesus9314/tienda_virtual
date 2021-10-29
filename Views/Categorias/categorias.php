<!-- Header -->
<?php headerAdmin($data); 
  getModal('modalCategorias',$data);
?>
  <div class="right_col" role="main">
          <div class="">
            <div class="row">
              <div class="col-md-12 col-sm-12 ">
                <div class="x_panel">
                  <div class="x_title">
                    <h1><?= $data['page_tittle'];?>
                    <?php if($_SESSION['permisosMod']['w']){ ?>
                    <span class="float-right"><button class="btn btn-sm btn-dark" title="Agregar nueva categoría" type="button" onclick="page.openModal();"><i class="fas fa-plus-circle"></i> Nueva Categoría</button></span>
                    <?php } ?>
                  </h1> 
                  </div>
                    <div class="x_content">
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="tile">
                            <div class="tile-body">
                              <div class="table-responsive">
                              <table class="table table-sm responsive table-hover table-striped table-bordered" id="tableCategorias" style="width:100%">
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