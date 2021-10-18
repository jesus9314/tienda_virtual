
<!-- Header -->
<?php headerAdmin($data); ?>
<!--
    <main class="app-content">
      <div class="app-title">
        <div>
          <h1>
            <i class="fa fa-dashboard"></i>-->
            <?php // echo $data['page_tittle'];?>  
          <!--</h1> 
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="<?php // echo base_url();?>/dashboard">Dashboard</a></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <div class="tile-body">Dashboard
            </div>
          </div>
        </div>
      </div>
    </main>-->

<!-- Footer-->

<div class="right_col" role="main">
          <div class="">

            <div class="clearfix"></div>

            <div class="row">
              <div class="col-md-12 col-sm-12 ">
                <div class="x_panel">
                  <div class="x_title">
                    <h1><?php echo $data['page_tittle'];?>  </h1>
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                      <div class="row">
                          <div class="col-sm-12">
                              <!-- Contenido Aquí-->
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
   