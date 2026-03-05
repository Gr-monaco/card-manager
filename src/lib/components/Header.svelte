<script>
	import '../../app.css';
	import { resolve } from '$app/paths';
	import LanguageDropDown from './LanguageDropDown.svelte';
	import { _ } from 'svelte-i18n';

	let menuClicked = $state(false);
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

	<nav class="nav-desktop">
		<LanguageDropDown />
		<a href={resolve('/about')}>{$_('header.about')}</a>
	</nav>

	<button
		class="hamburger-label"
		class:menu-active={menuClicked}
		aria-label={$_('header.hamburguerMenuLabel')}
		onclick={() => (menuClicked = !menuClicked)}
	>
		<span></span>
		<span></span>
		<span></span>
	</button>

	<button
		class:menu-active={menuClicked}
		onclick={() => (menuClicked = !menuClicked)}
		title={$_('header.overlayLabel')}
		aria-label={$_('header.overlayLabel')}
		class="overlay"
	></button>

	<nav class="nav-mobile" class:menu-active={menuClicked}>
		<ul class="nav-list">
			<li class="nav-item">
				<LanguageDropDown mobileMode={true} onLanguageChange={() => menuClicked = false}/>
			</li>

			<li class="nav-item">
				<a href={resolve('/about')} onclick={() => (menuClicked = false)}>{$_('header.about')}</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	/* ========================================
       CONTAINER PRINCIPAL
       ======================================== */
	header {
		background: white;
		padding: 0 2rem;
		height: 64px;
		border-bottom: 1px solid var(--border-color);
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: var(--shadow-sm);
		z-index: var(--z-header);
	}

	/* ========================================
       LOGO
       ======================================== */
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

	/* ========================================
       NAVEGAÇÃO DESKTOP
       ======================================== */
	.nav-desktop {
		display: none;
	}

	nav a {
		text-decoration: none;
		color: var(--text-muted);
		font-weight: 500;
		font-size: 0.95rem;
		transition: color 0.2s;
		position: relative;
		padding-bottom: 4px;
	}

	nav a:hover {
		color: var(--text-main);
	}

	/* Underline animado para desktop */
	nav a::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 3px;
		transition: background 0.3s ease;
		border-radius: 1px;
	}

	.nav-desktop a:hover::after,
	.nav-mobile a:hover::after {
		background: var(--primary);
	}

	/* ========================================
       NAVEGAÇÃO MOBILE
       ======================================== */
	.nav-mobile {
		position: fixed;
		top: 0;
		right: 0;
		width: 80%;
		max-width: 300px;
		min-width: 250px;
		height: 100vh;
		background: var(--bg-body);
		padding: 4rem 1.5rem 1.5rem;
		z-index: var(--z-nav-mobile);
		transform: translateX(100%);
		transition: transform 0.3s ease;
	}

	.nav-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.nav-item {
		padding-bottom: 0.5rem;
	}

	/* Underline animado para mobile */
	.nav-mobile a {
		display: block;
		padding-bottom: 4px;
		position: relative;
		font-size: 1.1rem;
		font-weight: 500;
	}

	.nav-mobile a::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 3px;
		background: var(--border-color);
		transition: background 0.3s ease;
		border-radius: 1px;
	}

	.nav-mobile a:hover::after {
		background: var(--primary);
	}

	/* ========================================
       HAMBURGER BUTTON
       ======================================== */
	.hamburger-label {
		background: none;
		border: none;
		padding: 8px;
		font-family: inherit;
		color: var(--text-main);
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 5px;
		cursor: pointer;
		z-index: var(--z-hamburger);
	}

	.hamburger-label span {
		display: block;
		width: 24px;
		height: 2px;
		background-color: var(--text-main);
		transition:
			transform 0.3s,
			opacity 0.3s;
	}

	/* ========================================
       OVERLAY
       ======================================== */
	.overlay {
		border: none;
		padding: 0;
		background: transparent;
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		display: block;
		background-color: rgba(0, 0, 0, 0.6);
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.3s ease,
			visibility 0.3s ease;
		z-index: var(--z-overlay);
		cursor: default;
	}

	/* ========================================
       ESTADOS E MODIFICADORES
       ======================================== */
	.menu-active.nav-mobile {
		transform: translateX(0);
	}

	.menu-active.overlay {
		opacity: 1;
		visibility: visible;
	}

	.menu-active.hamburger-label span:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.menu-active.hamburger-label span:nth-child(2) {
		opacity: 0;
	}

	.menu-active.hamburger-label span:nth-child(3) {
		transform: rotate(-45deg) translate(5px, -5px);
	}

	/* ========================================
       MEDIA QUERIES
       ======================================== */
	@media (max-width: 375px) {
		.nav-mobile {
			width: 90%;
		}
	}

	@media (max-width: 320px) {
		.nav-mobile {
			width: 100%;
			padding: 3.5rem 1rem 1rem;
		}
	}

	@media (min-width: 768px) {
		.nav-desktop {
			display: flex;
			align-items: center;
			gap: 1.5rem;
		}

		.nav-mobile {
			display: none;
		}

		.overlay {
			display: none;
		}

		.hamburger-label {
			display: none;
		}
	}
</style>
