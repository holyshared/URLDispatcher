<?php

    include('lib/fitzgerald.php');

	define('API_KEY', 'dd8d028d2f1ddb38a1597babb285d3ce');
	define('API_URL', 'http://api.flickr.com/services/rest/?');
	define('API_METHOD', 'method=flickr.photos.search');

    class Application extends Fitzgerald {

		public function get_index(){
			return $this->render('index');
		}

		public function get_category_index(){
			$this->options->layout = null;

			$images = $this->getImages('cat');

			return $this->render('partials/list', array(
				'images' => $images
			));
		}

		public function get_category_list($category){
			$this->options->layout = null;

			$images = $this->getImages($category);

			return $this->render('partials/list', array(
				'images' => $images
			));
		}

		public function getImages($tags){

			$url = API_URL . API_METHOD
				. '&api_key=' . API_KEY
				. '&per_page=20'
				. '&tags=' . $tags;

			$tree = $this->load($url);

			if ($tree->attributes()->stat != 'ok') {
				return false;
			}

			$nodes = $tree->xpath('photos/photo');
			if (empty($nodes)) {
				return false;
			}

			$images = array();
			foreach ($nodes as $key => $node) {
				$image = array();
				$image['thumbnail'] = $this->toThumbnail($node->attributes());
				$image['link'] = $this->toLink($node->attributes());
				foreach ($node->attributes() as $name => $value) {
					$image[$name] = $value;
				}
				$images[] = $image;
			};
			return $images;
		}

		public function load($url) {
			$handle = fopen($url, "rb");
			$response = '';
			while (!feof($handle)) {
				$response .= fread($handle, 8192);
			}
			fclose($handle);
			return simplexml_load_string($response, null, LIBXML_NOCDATA);
		}

		public function toThumbnail($attribs) {
			$url  = $this->toBaseUrl($attribs);
			$url .= $attribs->id . '_' . $attribs->secret . '_s.jpg';
			return $url;
		}

		public function toLink($attribs) {
			$url  = $this->toBaseUrl($attribs);
			$url .= $attribs->id . '_' . $attribs->secret . '.jpg';
			return $url;
		}

		public function toBaseUrl($attribs) {
			$url  = '';
			$url .= 'http://farm' . $attribs->farm;
			$url .= '.static.flickr.com/' . $attribs->server . '/';
			return $url;
		}

	}

    $app = new Application(array('layout' => 'layout/layout'));

    $app->get('/', 'get_index');
    $app->get('/category', 'get_category_index');
    $app->get('/category/:category', 'get_category_list', array(
		'category' => '\w+'
	));

    $app->run();
