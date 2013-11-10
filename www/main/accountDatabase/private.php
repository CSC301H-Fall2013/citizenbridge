Name: <?php echo htmlentities($_SESSION['user']['first'], ENT_QUOTES, 'UTF-8'); ?> <?php echo htmlentities($_SESSION['user']['last'], ENT_QUOTES, 'UTF-8'); ?><br />
Email: <?php echo htmlentities($_SESSION['user']['email'], ENT_QUOTES, 'UTF-8'); ?> <br />
Postal Code: <?php echo htmlentities($_SESSION['user']['postalcode'], ENT_QUOTES, 'UTF-8'); ?> <br />

