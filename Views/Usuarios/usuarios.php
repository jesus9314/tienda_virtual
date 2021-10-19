<!-- Header -->
<?php 
  headerAdmin($data);
  getModal('modalUsuarios',$data);
       ?>
    <main class="app-content">
      <div class="app-title">
                <h1>
                  <i class="fas fa-user-tag"></i>
                  <?= $data['page_tittle'];?>   <!-- Título de la página-->

                </h1>
                
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="<?= base_url();?>/usuarios"><?= $data['page_tittle'];?></a></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile" >
            <div class="tile-body">
              <?php if($_SESSION['permisosMod']['w']){ ?>
              <button class="btn btn-primary" type="button" onclick="openModal();"><i class="fas fa-plus-circle"></i> Nuevo usuario</button>
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
    </main>

<!-- Footer-->
<?php footerAdmin($data); ?>