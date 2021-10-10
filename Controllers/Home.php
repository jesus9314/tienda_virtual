<?php 
	/**
	 * 
	 */
	class Home extends Controllers
	{
		
		public function __construct()
		{
			parent::__construct();
		}
		public function home()
		{	
			$data['page_id']=1;
			$data['page_tag']="Home";
			$data['page_tittle']="Página principal";
			$data['page_name']="home";
			$data['page_content']="Lorem ipsum quis mollit sit nulla est esse aliqua incididunt in occaecat est minim sunt consectetur magna occaecat eiusmod officia labore.";
			$this->views->getView($this,"home",$data);
		}
	}
 ?>