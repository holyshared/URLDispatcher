<?php

    include('lib/fitzgerald.php');

    class Application extends Fitzgerald {

		public function get_index(){
			return $this->render('index');
		}

		public function get_category_index(){
			$this->options->layout = null;
			return $this->render('partials/list');
		}

		public function get_category_list(){
			$this->options->layout = null;
			return $this->render('partials/list');
		}

    }

    $app = new Application(array('layout' => 'layout/layout'));

    $app->get('/', 'get_index');
    $app->get('/category', 'get_category_index');
    $app->get('/category/:category', 'get_category_list', array(
		'category' => '\w+'
	));

    $app->run();
