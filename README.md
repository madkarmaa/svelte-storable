# @madkarma/svelte-storable

A lightweight Svelte store that automatically persists its value to `localStorage`. Perfect for maintaining state across browser sessions with minimal setup.

## Features

- 🔄 **Auto-persistence**: Automatically syncs store values with `localStorage`
- 🎯 **Type-safe**: Full TypeScript support with generic types
- 🛠️ **Customizable**: Custom serialization/deserialization functions
- 🧹 **Clean API**: Simple, intuitive interface extending Svelte's writable store

## 📦 Installation

```bash
npm install @madkarma/svelte-storable
```

```bash
bun add @madkarma/svelte-storable
```

```bash
pnpm add @madkarma/svelte-storable
```

```bash
yarn add @madkarma/svelte-storable
```

## 🚀 Basic Usage

```typescript
import storable from '@madkarma/svelte-storable';

// Create a persisted store
const count = storable('count', 0);

// Use it like a regular Svelte store
count.set(5);
count.update((n) => n + 1);

// The value is automatically saved to localStorage
// and restored on page reload
```

In your Svelte component:

```svelte
<script>
	import storable from '@madkarma/svelte-storable';

	const count = storable('count', 0);
</script>

<h1>Count: {$count}</h1>
<button on:click={() => count.update((n) => n + 1)}> Increment </button>
```

## 📖 API

### `storable(key, initial, options?)`

Creates a persistent Svelte store.

#### Parameters

- **`key`** (`string`): The localStorage key to store the value under
- **`initial`** (`T`): The initial value of the store
- **`options`** (optional): Configuration object
  - **`serialize`** (`(value: T) => string`): Custom serialization function (defaults to `JSON.stringify`)
  - **`deserialize`** (`(value: string) => T`): Custom deserialization function (defaults to `JSON.parse`)
  - **`saveInitial`** (`boolean`): Whether to save the initial value to localStorage if no stored value exists (defaults to `true`)

#### Returns

A store object with the following methods:

- **`subscribe(callback)`**: Subscribe to store changes (standard Svelte store method)
- **`set(value)`**: Set a new value
- **`update(updater)`**: Update the value using an updater function
- **`reset()`**: Reset the store to its initial value
- **`remove(reset?)`**: Remove the value from localStorage
  - **`reset`** (`boolean`): Whether to also reset the store value to initial (defaults to `true`)

## 💡 Examples

### Basic Counter

```typescript
import storable from '@madkarma/svelte-storable';

const count = storable('count', 0);

count.update((n) => n + 1); // Automatically saved to localStorage
```

### Custom Serialization (Date Example)

```typescript
const lastVisit = storable('lastVisit', new Date(), {
	serialize: (date) => date.toISOString(),
	deserialize: (str) => new Date(str)
});
```

### Don't Save Initial Value

Useful when you only want to persist values that the user has explicitly set:

```typescript
const preferences = storable('prefs', { theme: 'dark' }, { saveInitial: false });

// Initial value won't be saved to localStorage until user changes it
```

### User Preferences

```typescript
type UserPreferences = {
	theme: 'light' | 'dark';
	language: string;
	notifications: boolean;
};

const preferences = storable<UserPreferences>('user-prefs', {
	theme: 'dark',
	language: 'en',
	notifications: true
});
```

### Reset to Initial Value

```typescript
const settings = storable('settings', { volume: 50 });

settings.set({ volume: 80 });
settings.reset(); // Back to { volume: 50 }
```

### Remove from Storage

```typescript
const token = storable('auth-token', null);

// Remove from localStorage and reset to initial value
token.remove();

// Remove from localStorage but keep current value in store
token.remove(false);
```

## 📘 TypeScript

Full TypeScript support is included. The store is generic and will infer types from your initial value:

```typescript
// Type is inferred as Writable<number>
const count = storable('count', 0);

// Type is inferred as Writable<string>
const name = storable('name', 'John');

// Explicit type annotation
const data = storable<{ id: number; name: string }>('data', {
	id: 1,
	name: 'Example'
});
```

## ✅ Requirements

- Svelte 5.0.0 or higher

## 📄 License

[MIT](./LICENSE)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
