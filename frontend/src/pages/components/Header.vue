<script>
export default {
  name: 'AppHeader',
}
</script>

<template>
  <header class="fixed top-0 flex justify-between items-center bg-base-bg-300 backdrop-blur-md w-screen z-50! px-4">
    <div class="drawer z-50! overflow-hidden">
      <input id="my-drawer-1" type="checkbox" class="drawer-toggle"/>

      <div class="drawer-content flex flex-col">
        <!-- Navbar -->
        <div class="navbar flex gap-4 lg:px-2! px-0!">
          <div class="flex-none lg:hidden">
            <label for="my-drawer-1" aria-label="open sidebar" class="btn btn-square btn-ghost drawer-button">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block h-6 w-6 stroke-current"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>

          <h2 class="flex-1 px-2 font-semibold">DevPortfolio</h2>

          <nav class="gap-5 hidden flex-none lg:flex">
            <ul class="h-full flex justify-items-center text-center">
              <li class="py-1 w-[72px] hover:border-b hover:cursor-pointer hover:font-semibold">Projects</li>
              <li class="py-1 w-[80px] hover:border-b hover:cursor-pointer hover:font-semibold">Stack</li>
              <li class="py-1 w-[96px] hover:border-b hover:cursor-pointer hover:font-semibold">Experience</li>
              <li class="py-1 w-[80px] hover:border-b hover:cursor-pointer hover:font-semibold">Contact</li>
            </ul>
          </nav>

          <div class="flex">
            <button class="btn btn-primary rounded-lg">
              <router-link to="/review">Review Me</router-link>
            </button>
          </div>
        </div>

        <!-- Page content here -->
      </div>

      <div class="drawer-side">
        <label for="my-drawer-1" aria-label="close sidebar" class="drawer-overlay"></label>

        <nav class="z-50!">
          <ul class="menu bg-base-200 min-h-screen w-80 p-4">
            <!-- Sidebar content here -->
            <li class="py-1 px-1.5 hover:border-b hover:cursor-pointer w-fit">Projects</li>
            <li class="py-1 px-1.5 hover:border-b hover:cursor-pointer w-fit">Stack</li>
            <li class="py-1 px-1.5 hover:border-b hover:cursor-pointer w-fit">Experience</li>
            <li class="py-1 px-1.5 hover:border-b hover:cursor-pointer w-fit">Contact</li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>