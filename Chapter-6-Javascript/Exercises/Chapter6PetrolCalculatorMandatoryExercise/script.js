document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const priceInput = document.getElementById('price-per-liter');
    const litersInput = document.getElementById('liters');
    const calculateBtn = document.getElementById('calculate-btn');
    const totalCostDisplay = document.getElementById('total-cost');

   
    function calculateTotalCost() {
        // inputs to convert into numbers
        const pricePerLiter = parseFloat(priceInput.value);
        const liters = parseFloat(litersInput.value);
        
        
        const totalCost = pricePerLiter * liters;
        
        totalCostDisplay.textContent = `Total cost: €${totalCost.toFixed(2)}`;
        
        // Highlight effect
        totalCostDisplay.classList.add('highlight');
        
        
        setTimeout(() => {
            totalCostDisplay.classList.remove('highlight');
        }, 1000);
    }

    // Add click event listener to the calculate button
    calculateBtn.addEventListener('click', calculateTotalCost);

    // when Enter is pressed, the calculation will start
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateTotalCost();
        }
    });

    // Input validation 
    [priceInput, litersInput].forEach(input => {
        input.addEventListener('change', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
});