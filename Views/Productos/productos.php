<?php 
    headerAdmin($data); 
    getModal('modalProductos',$data);
?>
    <div class="right_col" role="main">
          <div class="">
            <div class="row">
              <div class="col-md-12 col-sm-12 ">
                <div class="x_panel">
                  <div class="x_title">
                    <h1><?= $data['page_tittle'];?>
                    <?php if($_SESSION['permisosMod']['w']){ ?>
                      <span class="float-right"><button class="btn btn-sm btn-dark" title="Agregar nuevo producto" type="button" onclick="page.openModal();" ><i class="fas fa-plus-circle"></i> Nuevo Producto</button></span>
                    <?php } ?> 
                  </h1> 
                  </div>
                    <div class="x_content">
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="tile">
                            <div class="tile-body">
                              <div class="table-responsive">
                              <table class="table table-sm responsive table-hover table-striped table-bordered" id="tableProductos" style="width:100%">
                                  <thead>
                                    <tr>
                                      <th><center>ID</center></th>
                                      <th><center>Código</center></th>
                                      <th><center>Nombre</center></th>
                                      <th><center>Stock</center></th>
                                      <th><center>Precio</center></th>
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
<?php footerAdmin($data); ?>
