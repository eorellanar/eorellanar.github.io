function calculate() {
    const input = document.getElementById("numbers").value;
    const numbers = input
      .split(",")
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));
  
    if (numbers.length === 0) {
      alert("Please enter a valid list of numbers.");
      return;
    }
  
    // Mean
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  
    // Median
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  
    // Mode
    const freq = {};
    let maxFreq = 0;
    let mode = [];
  
    numbers.forEach(n => {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > maxFreq) maxFreq = freq[n];
    });
  
    for (let num in freq) {
      if (freq[num] === maxFreq && maxFreq > 1) {
        mode.push(Number(num));
      }
    }
  
    // Range
    const range = Math.max(...numbers) - Math.min(...numbers);
  
    // Variance
    const variance = numbers.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / numbers.length;
  
    // Standard Deviation
    const standardDeviation = Math.sqrt(variance);
  
    // Populate results
    document.getElementById("mean").textContent = mean.toFixed(2);
    document.getElementById("median").textContent = median;
    document.getElementById("mode").textContent = mode.length ? mode.join(", ") : "No mode";
    document.getElementById("range").textContent = range;
    document.getElementById("variance").textContent = variance.toFixed(2);
    document.getElementById("standardDeviation").textContent = standardDeviation.toFixed(2);
}