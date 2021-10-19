<!-- Header -->
<?php 
  headerAdmin($data);
  getModal('modalClientes',$data);
?>
    <div class="right_col" role="main">
          <div class="">
            <div class="row">
              <div class="col-md-12 col-sm-12 ">
                <div class="x_panel">
                  <div class="x_title">
                    <h1><?= $data['page_tittle'];?>
                    <?php if($_SESSION['permisosMod']['w']){ ?>
                    <span class="float-right"><button class="btn-sm btn-dark" title="Agregar nuevo cliente" type="button" onclick="openModal();"><i class="fas fa-plus-circle"></i> Nuevo Cliente</button></span>
                    <?php } ?>
                  </h1> 
                  </div>
                    <div class="x_content">
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="tile">
                            <div class="tile-body">
                              <div class="table-responsive">
                              <table class="table table-sm table-hover table-striped" id="tableClientes" style="width:100%">
                                  <thead>
                                    <tr>
                                      <th><center>Id</center></th>
                                      <th><center>Identificación</center></th>
                                      <th><center>Nombres</center></th>
                                      <th><center>Apellidos</center></th>    
                                      <th><center>Email</center></th>
                                      <th><center>Teléfono</center></th>
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


