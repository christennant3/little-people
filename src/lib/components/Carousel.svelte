
<script lang="ts">
  import {slide} from 'svelte/transition';
  import { sineInOut } from 'svelte/easing';
  import { onMount } from 'svelte';

    const gallery_items = [{
    url: '/src/lib/images/gallery/corn.jpg',
    description: 'Corn'
  }, {
    url: '/src/lib/images/gallery/sand.jpg',
    description: 'Beach'
  },{
    url: '/src/lib/images/gallery/trunk.jpg',
    description: 'Woods'
  },{
    url: '/src/lib/images/gallery/owl.jpg',
    description: 'Children with owl'
  },
  {
    url: '/src/lib/images/gallery/woods2.jpg',
    description: 'Exploring in the woods'
  },
]

  let currentSlideItem = 0;

  const nextImage = () => {
    currentSlideItem = (currentSlideItem + 1) % gallery_items.length;
  }

  const prevImage = () => {
    if (currentSlideItem != 0) {
        currentSlideItem = (currentSlideItem - 1) % gallery_items.length;
    } else {
        currentSlideItem = gallery_items.length - 1;
    }
  }

  const interval = setInterval(nextImage, 7000);
  
onMount(() => {
  
  gallery_items.forEach(item => {
    const img = new Image();
    img.src = item.url;
  });
});

</script>
<div>
{#each [gallery_items[currentSlideItem]] as item (currentSlideItem)}
    <img transition:slide={{ duration: 500, easing:sineInOut }} src={item.url} alt={item.description} class="mx-auto text-center"/>
{/each}
</div>

<div class="carousel-buttons">
    <button on:click={() => prevImage()}>Previous</button>
    <button on:click={() => nextImage()}>Next</button>
</div>

