// Utility to handle single-select button groups
function handleButtonGroup(groupClass, callback) {
    document.querySelectorAll('.' + groupClass).forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.' + groupClass).forEach(b => {
                b.classList.remove('bg-black', 'text-white');
                b.classList.add('bg-[#e6b7a9]', 'text-black');
                b.setAttribute('aria-pressed', 'false');
            });
            this.classList.remove('bg-[#e6b7a9]', 'text-black');
            this.classList.add('bg-black', 'text-white');
            this.setAttribute('aria-pressed', 'true');
            if (callback) callback();
        });
    });
}
// For groups with multiple selection (like syrups), use a different handler
function handleMultiButtonGroup(groupClass, callback) {
    document.querySelectorAll('.' + groupClass).forEach(btn => {
        btn.addEventListener('click', function () {
            const isActive = this.classList.contains('bg-black');
            if (isActive) {
                this.classList.remove('bg-black', 'text-white');
                this.classList.add('bg-[#e6b7a9]', 'text-black');
                this.setAttribute('aria-pressed', 'false');
            } else {
                this.classList.remove('bg-[#e6b7a9]', 'text-black');
                this.classList.add('bg-black', 'text-white');
                this.setAttribute('aria-pressed', 'true');
            }
            if (callback) callback();
        });
    });
}

function updateTotal() {
    // Base price
    let total = 3.99;
    // Count selected options (excluding syrup, which can be multi-select)
    const sizeSelected = document.querySelector('.size-btn.bg-black') ? 1 : 0;
    const sweetSelected = document.querySelector('.sweet-btn.bg-black') ? 1 : 0;
    const whippedSelected = document.querySelector('.whipped-btn.bg-black') ? 1 : 0;
    const sweetnessSelected = document.querySelector('.sweetness-btn.bg-black') ? 1 : 0;
    // Syrup: count all selected
    const syrupSelected = document.querySelectorAll('.syrup-btn.bg-black').length;

    // Each selected option is $0.50
    const optionsCount = sizeSelected + sweetSelected + whippedSelected + sweetnessSelected + syrupSelected;
    total += optionsCount * 0.5;

    // Update the total in the DOM
    const totalDiv = document.getElementById('cartTotal');
    if (totalDiv) {
        totalDiv.textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Enable/disable Order Now button based on selections
function checkSelections() {
    const sizeSelected = !!document.querySelector('.size-btn.bg-black');
    const sweetSelected = !!document.querySelector('.sweet-btn.bg-black');
    const whippedSelected = !!document.querySelector('.whipped-btn.bg-black');
    const sweetnessSelected = !!document.querySelector('.sweetness-btn.bg-black');
    const orderBtn = document.getElementById('orderNowBtn');
    if (orderBtn) {
        if (sizeSelected && sweetSelected && whippedSelected && sweetnessSelected) {
            orderBtn.disabled = false;
            orderBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            orderBtn.disabled = true;
            orderBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
    updateTotal();
}

// Single-select groups
document.addEventListener('DOMContentLoaded', function () {
    handleButtonGroup('size-btn', checkSelections);
    handleButtonGroup('sweet-btn', checkSelections);
    handleButtonGroup('whipped-btn', checkSelections);
    handleButtonGroup('sweetness-btn', checkSelections);
    // Multi-select group (syrups)
    handleMultiButtonGroup('syrup-btn', checkSelections);

    // Initial check
    checkSelections();
});