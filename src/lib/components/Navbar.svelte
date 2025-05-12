<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { page } from '$app/stores';
  import { cn } from '$lib/utils';

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "Extras" }
  ];
</script>

<nav class="sticky flex top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div class="container flex h-14 max-w-screen-2xl items-center justify-center">
    <div class="flex items-center space-x-1 sm:space-x-2">
      {#each navLinks as link (link.href)}
        <Button 
          href="{link.href}" 
          variant="ghost" 
          class="{cn(
            'px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            $page.url.pathname === link.href 
              ? 'bg-accent-blue text-accent-blue-foreground hover:bg-accent-blue/90'
              : 'text-muted-foreground hover:text-accent-blue hover:bg-accent-blue/10'
          )}"
        >
          {link.label}
        </Button>
      {/each}
    </div>
  </div>
</nav>