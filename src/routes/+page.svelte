<script lang="ts">
	import storable from '$lib/index.js';

	const count = storable('count', 0, { saveInitial: true });
	// const count = storable('count', 0, { saveInitial: false });
</script>

<h1>Count: {$count}</h1>
<div class="buttons">
	<button onclick={() => count.reset()}>Reset</button>
	<button onclick={() => count.remove(false)}>Remove from storage</button>
	<button onclick={() => count.remove()}>Remove from storage and reset value</button>
	<button onclick={() => count.update((n) => n + 1)}>Increment</button>
	<button onclick={() => count.update((n) => n - 1)}>Decrement</button>
	<button onclick={() => count.set(100)}>Set to 100</button>
	<button onclick={() => count.set(Math.floor(Math.random() * 100))}>Set to Random</button>
</div>

<style>
	.buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		& > button {
			padding: 0.5rem;
		}
	}
</style>
