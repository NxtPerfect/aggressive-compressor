<nav>
  <a href="/">Home</a>
  <!-- {#if checkFeatureFlag("login")} -->
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  <!-- {/if} -->
  <!-- {#if checkFeatureFlag("pricing")} -->
  <!--   <a href="#pricing">Pricing</a> -->
  <!-- {/if} -->
  <a href="#faq">FAQ</a>
</nav>
