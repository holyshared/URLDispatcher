<?php if (empty($images)): ?>

	<p>aaaaaaaaaaaaaaaaaaa</p>

<?php else: ?>

	<ul class="thumbnails">
		<?php foreach($images as $key => $image): ?>
			<li><a title="<?php echo $image['title'] ?>" href="<?php echo $image['link'] ?>"><img title="<?php echo $image['title'] ?>" alt="<?php echo $image['title'] ?>" src="<?php echo $image['thumbnail'] ?>" width="75" height="75" /></a></li>
		<?php endforeach; ?>
	</ul>

<?php endif; ?>
