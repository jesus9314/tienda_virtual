<div class="modal fade modalPermisos" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title h4" id="myExtraLargeModalLabel">Permisos de Roles de usuario</h5>
        <button type="button" class="close" data-dismiss="modal" arial-label="close">
          <span aria-hidden="true">x</span>
        </button>
      </div>
      <div class="modal-body">
        <?php 
          //dep($data);
         ?>
        <div class="col-md-12">
          <div class="tile">
            <form action="" id="formPermisos" name="formPermisos">
              <input type="hidden" id="idrol" name="idrol" value="<?= $data['idrol']; ?>" required="">
            <div class="table-responsive">
              <table class="table table-striped table-hover table-dark rounded-bottom" width="100%">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Módulo</th>
                    <th>Ver <i class="far fa-eye"></i></th>
                    <th>Crear <i class="far fa-plus-square"></i></i></th>
                    <th>Actualizar <i class="far fa-edit"></i></th>
                    <th>Eliminar <i class="fas fa-trash"></i></th>
                  </tr>
                </thead>
                <tbody>
                  <?php 
                    $no = 1;
                    $modulos = $data['modulo'];
                    for ($i=0; $i < count($modulos) ; $i++) 
                    { 
                      $permisos = $modulos[$i]['permisos'];
                      $rCheck = $permisos['r'] == 1 ? " checked " : "";
                      $wCheck = $permisos['w'] == 1 ? " checked " : "";
                      $uCheck = $permisos['u'] == 1 ? " checked " : "";
                      $dCheck = $permisos['d'] == 1 ? " checked " : "";
                      $idmod = $modulos[$i]['idmodulo'];
                   ?>
                  <tr>
                    <td>
                      <?= $no; ?>
                      <input type="hidden" name="modulos[<?= $i; ?>][idmodulo]" value="<?= $idmod; ?>" required>
                    </td>
                    <td>
                      <?= 
                        $modulos[$i]['titulo'];
                      ?>
                    </td>
                    <td>
                      <div class="toggle-flip">
                        <label>
                          <input type="checkbox" name="modulos[<?= $i; ?>][r]" <?= $rCheck ?>><span class="flip-indecator" data-toggle-on="ON" data-toggle-off="OFF"></span>
                        </label>
                      </div>
                    </td>
                    <td>
                      <div class="toggle-flip">
                        <label>
                          <input type="checkbox" name="modulos[<?= $i; ?>][w]" <?= $wCheck ?>><span class="flip-indecator" data-toggle-on="ON" data-toggle-off="OFF"></span>
                        </label>
                      </div>
                    </td>
                    <td>
                      <div class="toggle-flip">
                        <label>
                          <input type="checkbox" name="modulos[<?= $i; ?>][u]" <?= $uCheck ?>><span class="flip-indecator" data-toggle-on="ON" data-toggle-off="OFF"></span>
                        </label>
                      </div>
                    </td>
                    <td>
                      <div class="toggle-flip">
                        <label>
                          <input type="checkbox" name="modulos[<?= $i; ?>][d]" <?= $dCheck ?>><span class="flip-indecator" data-toggle-on="ON" data-toggle-off="OFF"></span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  <?php 
                    $no++;
                    }
                   ?>
                </tbody>
              </table>
            </div>

            <div class="text-center">
                  <button class="btn btn-success" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i><span id="btnText">Guardar</span>
                  </button>&nbsp;&nbsp;&nbsp;<a class="btn btn-warning" href="#" data-dismiss="modal"><i class="fa fa-fw fa-lg fa-times-circle"></i>Salir</a>
                </div>
                </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
