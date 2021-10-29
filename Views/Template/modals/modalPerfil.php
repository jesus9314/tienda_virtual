<!-- Modal -->
<div class="modal fade" id="modalFormPerfil" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered" >
    <div class="modal-content">
      <div class="modal-header headerUpdate">
        <h5 class="modal-title" id="titleModal">Actualizar Datos</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <i class="fa fa-close"></i>
        </button>
      </div>
      <div class="modal-body">
          <div class="tile">
            <form id="formPerfil" name="formPerfil" class="form-horizontal">
              <p class="text-primary">Todos los campos con asterisco (<span class="required">*</span>) son obligatorios.</p>
    <hr>
              <div class="form-group">
                <div class="form-group col-md-6">
                <div class="form-group col-md-12">
                  <label for="txtIdentificacion">Identificación<span class="required control-label">*</span></label>
                  <input type="text" class="form-control form-control-sm" id="txtIdentificacion" value="<?= $_SESSION['userData']['identificacion'] ?>" name="txtIdentificacion" required="">
                </div>
                <div class="form-group col-md-12">
                  <label for="txtTelefono">Teléfono<span class="required control-label">*</span></label>
                  <input type="text" class="form-control form-control-sm valid validNumber" id="txtTelefono" name="txtTelefono" value="<?= $_SESSION['userData']['telefono'] ?>" required="" onkeypress="return controlTag(event);">
                </div>
                <div class="form-group col-md-12">
                  <label for="txtEmail" class="control-label">Email</label>
                  <input type="email" class="form-control form-control-sm valid validEmail" id="txtEmail" value="<?= $_SESSION['userData']['email_user'] ?>" name="txtEmail" required="" readonly disabled>
                </div>
                <div class="form-group col-md-12">
                  <label for="txtPassword" class="control-label">Password</label>
                  <input type="password" class="form-control form-control-sm" id="txtPassword" name="txtPassword" >
                </div>
                <div class="form-group col-md-12">
                  <label for="txtPassword" class="control-label">Confirmar Password</label>
                  <input type="password" class="form-control form-control-sm" id="txtPasswordConfirm" name="txtPasswordConfirm" >
                </div>
                </div>
                <div class="form-group col-md-6">
                <div class="form-group col-md-12">
                  <label for="txtNombre">Nombres<span class="required control-label">*</span></label>
                  <input type="text" class="form-control form-control-sm valid validText" id="txtNombre" name="txtNombre" value="<?= $_SESSION['userData']['nombres'] ?>" required="">
                </div>
                <div class="form-group col-md-12">
                  <label for="txtApellido">Apellidos<span class="required control-label">*</span></label>
                  <input type="text" class="form-control form-control-sm valid validText" id="txtApellido" name="txtApellido" value="<?= $_SESSION['userData']['apellidos'] ?>" required="">
                </div>
                <div class="form-group col-md-12">
                <div class="photo">
                        <label for="foto">Foto de Perfil <i class="fa fa-photo"></i> <small>(Click sobre tu foto para cambiarla)</small></label>
                        <div class="prevPhoto perfil">
                          <span class="delPhoto notBlock"><i class="fa fa-close"></i></span>
                          <label for="foto"></label>
                          <div>
                            <img id="img" src="<?= media(); ?>images/uploads/users_img/<?= $_SESSION['userData']['img_perfil'] ?>" class="img-thumbnail">
                          </div>
                        </div>
                        <div class="upimg">
                          <input type="file" name="foto" id="foto">
                        </div>
                        <div id="form_alert"></div>
                    </div>
                </div>
                </div>
              </div>
             </div>
                <span class="float-right">
                <button id="btnActionForm" class="btn btn-info" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i><span id="btnText">Actualizar</span></button>&nbsp;&nbsp;&nbsp;
                <button class="btn btn-danger" type="button" data-dismiss="modal"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cerrar</button>
                </span>
            </form>
      </div>
    </div>
  </div>
</div>
