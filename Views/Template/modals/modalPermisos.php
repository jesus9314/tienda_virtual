<div class="modal fade modalPermisos" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title h4" id="myExtraLargeModalLabel">Permisos de Roles de usuario</h5>
        <button type="button" class="close" data-dismiss="modal" arial-label="close">
          <span aria-hidden="true"><i class="fa fa-close"></i></span>
        </button>
      </div>
      <div class="modal-body">
        <div class="col-md-12">
          <div class="tile">
            <form action="" id="formPermisos" name="formPermisos">
              <input type="hidden" id="idrol" name="idrol" value="<?= $data['idrol']; ?>" required="">
            <div class="table-responsive">
              <table class="table table-sm responsive table-hover table-striped table-bordered" width="100%">
                <thead>
                  <tr>
                    <th><center>#</center></th>
                    <th><center>Módulo</center></th>
                    <th><center>Ver <i class="far fa-eye"></i></center></th>
                    <th><center>Crear <i class="far fa-plus-square"></center></i></th>
                    <th><center>Actualizar <i class="far fa-edit"></center></i></th>
                    <th><center>Eliminar <i class="fas fa-trash"></center></i></th>
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
                      <center>
                      <?= $no; ?>
                      <input type="hidden" name="modulos[<?= $i; ?>][idmodulo]" value="<?= $idmod; ?>" required>
                      </center>
                    </td>
                    <td>
                     <center>
                     <?= 
                        $modulos[$i]['titulo'];
                      ?>
                     </center>
                    </td>
                    <td>
                      <center>
                      <div class="toggle-flip">
                        <label>
                          <input type="checkbox" name="modulos[<?= $i; ?>][r]" <?= $rCheck ?>><span class="flip-indecator" data-toggle-on="ON" data-toggle-off="OFF"></span>
                        </label>
                      </div>
                      </center>
                    </td>
                    <td>
                      <center>
                      <div class="toggle-flip">
                        <label>
                          <input type="checkbox" name="modulos[<?= $i; ?>][w]" <?= $wCheck ?>><span class="flip-indecator" data-toggle-on="ON" data-toggle-off="OFF"></span>
                        </label>
                      </div>
                      </center>
                    </td>
                    <td>
                      <center>
                      <div class="toggle-flip">
                        <label>
                          <input type="checkbox" name="modulos[<?= $i; ?>][u]" <?= $uCheck ?>><span class="flip-indecator" data-toggle-on="ON" data-toggle-off="OFF"></span>
                        </label>
                      </div>
                      </center>
                    </td>
                    <td>
                      <center>
                      <div class="toggle-flip">
                        <label>
                          <input type="checkbox" name="modulos[<?= $i; ?>][d]" <?= $dCheck ?>><span class="flip-indecator" data-toggle-on="ON" data-toggle-off="OFF"></span>
                        </label>
                      </div>
                      </center>
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
