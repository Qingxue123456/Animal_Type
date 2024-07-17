// Loading 
export default {
    mounted(el, binding) {
        binding.value ? el.classList.add('loading') : el.classList.remove('loading');
    },
    updated(el, binding) {
        binding.value ? el.classList.add('loading') : el.classList.remove('loading');
    }
};

   

