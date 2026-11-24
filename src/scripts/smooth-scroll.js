import 'lenis/dist/lenis.css';

// Touch keeps the browser's own inertia. Only wheel/trackpad input is smoothed.
export async function initSmoothScroll() {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(pointer: fine)');
  let lenis;
  let loading = false;
  const legal = document.getElementById('legal');

  const syncLegal = () => {
    if (!lenis) return;
    if (legal.classList.contains('open')) {
      lenis.stop();
    } else {
      lenis.start();
      // The reference restores its saved native scroll position on close.
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    }
  };

  const syncPreferences = async () => {
    if (motion.matches || !pointer.matches) {
      lenis?.destroy();
      lenis = undefined;
      return;
    }
    if (lenis || loading) return;
    loading = true;
    try {
      const { default: Lenis } = await import('lenis');
      if (motion.matches || !pointer.matches) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        // Lenis reads the root's scroll-padding-top (compact navigation height).
        anchors: true,
        prevent: (node) => node.id === 'legal'
          || node.tagName === 'TEXTAREA',
      });
      syncLegal();
    } catch (error) {
      // A failed optional enhancement must leave native scrolling available.
      console.warn('Défilement natif conservé : Lenis indisponible.', error);
    } finally {
      loading = false;
    }
  };

  new MutationObserver(syncLegal).observe(legal, {
    attributes: true,
    attributeFilter: ['class'],
  });
  motion.addEventListener('change', syncPreferences);
  pointer.addEventListener('change', syncPreferences);
  await syncPreferences();
}
