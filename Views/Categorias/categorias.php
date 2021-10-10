<!-- Header -->
<?php headerAdmin($data); 
  getModal('modalCategorias',$data);
?>
  <div id="contentAjax"></div>
    <main class="app-content">
      <div class="app-title">
                <h1>
                  <i class="fas fa-box-tissue"></i>
                  <?= $data['page_tittle'];?>   <!-- Título de la página-->

                </h1>
                
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="<?= base_url();?>/categorias"><?= $data['page_tittle'];?></a></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <div class="tile-body">
              <?php if($_SESSION['permisosMod']['w']){ ?>
              <button class="btn btn-primary" type="button" onclick="openModal();"><i class="fas fa-plus-circle"></i> Nueva Categoría</button>
              <?php } ?>
              <br>
              <br>
              <div class="table-responsive">
                <table class="table table-bordered responsive table-hover table-striped nowrap rounded-bottom" id="tableCategorias" style="width:100%">
                  <thead class="border-bottom">
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
    </main>

<!-- Footer-->
<?php footerAdmin($data); ?>