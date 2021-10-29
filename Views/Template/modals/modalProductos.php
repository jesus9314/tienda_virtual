<!-- Modal -->
<div class="modal fade" id="modalFormProductos" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-xl" >
    <div class="modal-content">
      <div class="modal-header headerRegister">
        <h5 class="modal-title" id="titleModal">Nueva Producto</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <i class="fa fa-close"></i>
        </button>
      </div>
      <div class="modal-body">
        
            <form id="formProductos" name="formProductos" class="form-horizontal">
              <div class="tile">
              <input type="hidden" id="idProducto" name="idProducto" value="">
              <p class="text-primary">Los campos con asterisco (<span class="required">*</span>) son obligatorios.</p>
              <hr>
              <div class="row">
                <div class="col-md-8">
                    <div class="form-group">
                      <label class="control-label">Nombre Producto <span class="required">*</span></label>
                      <input class="form-control" id="txtNombre" name="txtNombre" type="text" required="">
                    </div>
                    <div class="form-group">
                      <label class="control-label">Descripción Producto</label>
                      <textarea class="form-control" id="txtDescripcion" name="txtDescripcion" ></textarea>
                    </div>
                    
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="control-label">Código <span class="required">*</span></label>
                        <input class="form-control" id="txtCodigo" name="txtCodigo" type="text" placeholder="Código de barra" required="">
                        <br>
                        <div id="divBarCode" class="notBlock textcenter">
                            <div id="printCode">
                                <svg id="barcode"></svg> 
                            </div>
                            <button class="btn btn-success btn-sm" type="button" onClick="page.PrintBarCode('#printCode')"><i class="fas fa-print"></i> Imprimir</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">Precio <span class="required">*</span></label>
                            <input class="form-control" id="txtPrecio" name="txtPrecio" type="text" required="" placeholder="0.0">
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">Stock <span class="required">*</span></label>
                            <input class="form-control" id="txtStock" name="txtStock" type="text" required="" placeholder="0">
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="listCategoria">Categoría <span class="required">*</span></label>
                            <select class="form-control" data-live-search="true" id="listCategoria" name="listCategoria" required=""></select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="listStatus">Estado <span class="required">*</span></label>
                            <select class="form-control selectpicker" id="listStatus" name="listStatus" required="">
                              <option value="1">Activo</option>
                              <option value="2">Inactivo</option>
                            </select>
                        </div>
                    </div>

 
                </div>
              </div>
              
              <div class="tile-footer">
                 <div class="form-group col-md-12">
                     <div id="containerGallery">
                         <span>Agregar foto (440 x 545)</span>
                         <button class="btnAddImage btn btn-info btn-sm" type="button">
                             <i class="fas fa-plus"></i>
                         </button>
                     </div>
                     <div id="containerImages">
                         <!-- <div id="div24">
                             <div class="prevImage">
                                 <img src="<?= media(); ?>/images/uploads/producto1.jpg">
                             </div>
                             <input type="file" name="foto" id="img1" class="inputUploadfile">
                             <label for="img1" class="btnUploadfile"><i class="fas fa-upload "></i></label>
                             <button class="btnDeleteImage" type="button" onclick="fntDelItem('div24')"><i class="fas fa-trash-alt"></i></button>
                         </div>
                         <div id="div24">
                             <div class="prevImage">
                                 <img class="loading" src="<?= media(); ?>/images/loading.svg">
                             </div>
                             <input type="file" name="foto" id="img1" class="inputUploadfile">
                             <label for="img1" class="btnUploadfile"><i class="fas fa-upload "></i></label>
                             <button class="btnDeleteImage" type="button" onclick="fntDelItem('div24')"><i class="fas fa-trash-alt"></i></button>
                         </div> -->
                        
                     </div>
                 </div>
                                
              </div>
              </div>
              <div class="modal-footer">
                <button id="btnActionForm" class="btn btn-primary" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i><span id="btnText">Guardar</span></button>
                <button class="btn btn-danger" type="button" data-dismiss="modal"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cerrar</button>
              </div>
            </form>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modalViewProducto" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-xl" >
    <div class="modal-content">
      <div class="modal-header header-primary">
        <h5 class="modal-title" id="titleModal">Datos del Producto</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="tile">
          <ul class="nav nav-tabs bar_tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Info</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Descripcion</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Fotos</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <br>
            <table class="table table-hover table-striped" style="width:100%">
              <tbody>
                <tr>
                  <td>Codigo:</td>
                  <td id="celCodigo"></td>
                </tr>
                <tr>
                  <td>Nombres:</td>
                  <td id="celNombre"></td>
                </tr>
                <tr>
                  <td>Precio:</td>
                  <td id="celPrecio"></td>
                </tr>
                <tr>
                  <td>Stock:</td>
                  <td id="celStock"></td>
                </tr>
                <tr>
                  <td>Categoría:</td>
                  <td id="celCategoria"></td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td id="celStatus"></td>
                </tr>
              </tbody>
            </table>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div id="celDescripcion"></div>
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
            <div id="celFotos"></div>
            </div>
          </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

                  