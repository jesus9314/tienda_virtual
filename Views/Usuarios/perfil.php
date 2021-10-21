<?php 
		headerAdmin($data); 
		getModal('modalPerfil', $data);?>
      <div class="right_col" role="main">
          <div class="">
            <div class="page-title">
              <div class="title_left">
                <h3><?= $data['page_tittle'];?></h3>
              </div>
            </div>
            
            <div class="clearfix"></div>

            <div class="row">
              <div class="col-md-12 col-sm-12 ">
                <div class="x_panel">
                  <br>
                    <div class="col-md-3 col-sm-3  profile_left">
                      <div class="profile_img">
                        <div id="crop-avatar">
                          <!-- Current avatar -->
                          <img class="img-responsive avatar-view" src='<?= media();?>/images/uploads/users_img/<?= $_SESSION["userData"]["img_perfil"]?>' alt="Avatar" style="width: 220px;" title="Change the avatar">
                        </div>
                      </div>
                      <h3><?= $_SESSION['userData']['nombres'].' '.$_SESSION['userData']['apellidos'] ?></h3>

                      <ul class="list-unstyled user_data">
                        <li><i class="fa fa-user user-profile-icon"></i> <?= $_SESSION['userData']['nombrerol'] ?>
                        </li>
                      </ul>
                      <button class="btn btn-success" type="submit" onclick="openModalPerfil()"><i class="fa fa-edit m-right-xs"></i>Editar Perfil</button>
                      <br />
                    </div>
                    <div class="col-md-9 col-sm-9 ">
                    <div class="x_content">
                    <ul class="nav nav-tabs bar_tabs" id="myTab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Datos Personales</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Datos Fiscales</a>
                      </li>
                    </ul>
                        <div class="tab-content" id="myTabContent">
                          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                          <table class="data table table-striped no-margin">
                            <tbody>
                              <tr>
                                <td style="width: 150px;">Identificación:</td>
                                <td id="cellIdentidicacion"><?= $_SESSION['userData']['identificacion'] ?></td>
                              </tr>
                              <tr>
                                <td >Nombres: </td>
                                <td id="cellNombre"><?= $_SESSION['userData']['nombres'] ?></td>
                              </tr>
                              <tr>
                                <td >Apellidos </td>
                                <td id="cellApellido"><?= $_SESSION['userData']['apellidos'] ?></td>
                              </tr>
                              <tr>
                                <td >Teléfono: </td>
                                <td id="cellTelefono"><?= $_SESSION['userData']['telefono'] ?></td>
                              </tr>
                              <tr>
                                <td >Email (Usuario): </td>
                                <td id="cellEmail"><?= $_SESSION['userData']['email_user'] ?></td>
                              </tr>
                              <tr>
                                <td >Tipo de Usuario: </td>
                                <td id="cellTipoUsuario"><?= $_SESSION['userData']['nombrerol'] ?></td>
                              </tr>
                            </tbody>
                          </table>

                          </div>
                          <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                          <form id="formDataFiscal" name="formDataFiscal">
                  <div class="row mb-4">
                    <div class="col-md-6">
                      <label>Identificación Tributaria</label>
                      <input class="form-control" type="text" id="txtNit" name="txtNit" value="<?= $_SESSION['userData']['nit'] ?>">
                    </div>
                    <div class="col-md-6">
                      <label>Nombre fiscal</label>
                      <input class="form-control" type="text" id="txtNombreFiscal" name="txtNombreFiscal" value="<?= $_SESSION['userData']['nombrefiscal'] ?>">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 mb-4">
                      <label>Dirección fiscal</label>
                      <input class="form-control" type="text" id="txtDirFiscal" name="txtDirFiscal" value="<?= $_SESSION['userData']['direccionfiscal'] ?>">
                    </div>
                  </div>
                  <div class="row mb-10">
                    <div class="col-md-12">
                      <span class="float-right"><button class="btn btn-sm btn-primary" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i> Actualizar</button></span>
                    </div>
                  </div>
                </form>

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

    

    