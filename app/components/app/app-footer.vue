<template>
  <footer class="app-footer bg-secondary text-white">
    <div class="footer-border" />
    <UContainer class="py-12">
      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <nav
          v-for="pageInfo in pageInfos"
          :key="pageInfo.title"
          aria-label="Footer navigation"
        >
          <NuxtLink
            :to="pageInfo.url"
            class="footer-link flex items-center rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white no-underline transition-all duration-300"
          >
            {{ pageInfo.title }}
          </NuxtLink>
        </nav>
      </div>

      <hr class="my-10 border-white/15" />

      <div class="space-y-2 text-center text-sm font-medium text-white/70">
        <p>© 2023 Jessé Correia Lins. Todos os direitos reservados.</p>
        <p class="text-xs text-white/50">Website criado por Jessé Correia Lins</p>
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
const pageInfos = usePortalPagesInfo()
</script>

<style scoped>
.app-footer {
  position: relative;
}

.footer-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0.2) 80%,
    transparent 100%
  );
}

.footer-link:hover {
  border-color: rgba(255, 255, 255, 0.35);
  background-color: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.3);
}
</style>

