<script>
	import '../../app.css';
</script>

<header>
	<div class="logo">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="24" height="24" rx="6" fill="#2563eb" />
			<path
				d="M8 12L11 15L16 9"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		Card<span>Manager</span>
	</div>

	<nav>
		<a href="/about">Sobre</a>
	</nav>
</header>

<style>
	header {
		background: white;
		padding: 0 2rem;
		height: 64px;
		border-bottom: 1px solid var(--border-color);
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: var(--shadow-sm);
		z-index: 10;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 700;
		font-size: 1.25rem;
		color: var(--text-main);
	}

	.logo span {
		color: var(--primary);
	}

	nav {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	nav a {
		text-decoration: none;
		color: var(--text-muted);
		font-weight: 500;
		font-size: 0.95rem;
		transition: color 0.2s;
	}

	nav a:hover {
		color: var(--text-main);
	}
</style>
