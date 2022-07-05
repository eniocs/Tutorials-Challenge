<template>
  <div>
    <header>
        <!-- Requirement:Named Slot -->
        <slot name="mainmenu"></slot> 
    </header>
    <main >
      <slot ></slot>
    </main>
  </div>
</template>

<style>
  footer {
    border-top: 1px solid #ccc;
    color: #666;
    font-size: 0.8em;
  }
</style>