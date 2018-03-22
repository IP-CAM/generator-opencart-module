<?php

class ControllerModuleIhorModuleNew extends Controller {
	
	protected function index() {
		
		//Load language file
		$this->language->load('module/ihor_module_new');

		//Set title from language file
      	$data['heading_title'] = $this->language->get('heading_title');

		//Load model
		$this->load->model('module/ihor_module_new');

		//Sample - get data from loaded model
		$data['customers'] = $this->model_module_ihor_module_new->getCustomerData();

		//Select template
		if (file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/module/ihor_module_new.tpl')) {
			$this->response->setOutput($this->load->view('module/ihor_module_new.tpl', $data));
		} else {
			$this->response->setOutput($this->load->view('module/ihor_module_new.tpl', $data));
		}

	}
}

?>