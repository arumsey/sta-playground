/* global WebImporter */
export default function parse(element, { document }) {
    // Critical review of the solution...

    // Helper function to extract slider details dynamically
    function extractSliderDetails(sliderContainer) {
        // Extract content for title dynamically
        const titleElement = sliderContainer.querySelector('.slider-title h5');
        const title = titleElement ? titleElement.textContent.trim() : '';

        // Extract min value dynamically
        const minValueElement = sliderContainer.querySelector('.slider-min span');
        const minValue = minValueElement ? minValueElement.textContent.trim() : '';

        // Extract max value dynamically
        const maxValueElement = sliderContainer.querySelector('.slider-max span');
        const maxValue = maxValueElement ? maxValueElement.textContent.trim() : '';

        // Extract current value dynamically
        const currentValueElement = sliderContainer.querySelector('.slider-value h3');
        const currentValue = currentValueElement ? currentValueElement.textContent.trim() : '';

        // Extract value unit dynamically
        const unitElement = sliderContainer.querySelector('.slider-value span:last-child');
        const unit = unitElement ? unitElement.textContent.trim() : '';

        // Create dynamic HTML structure
        const sliderDetails = document.createElement('div');
        sliderDetails.innerHTML = `<p>${title}</p><p>Min: ${minValue}</p><p>Max: ${maxValue}</p><p>Current: ${currentValue} ${unit}</p>`;

        return sliderDetails;
    }

    // Extract slider containers from the input element
    const sliderContainers = element.querySelectorAll('.slider-container');

    // Ensure edge case handling: No containers found
    if (!sliderContainers.length) {
        const placeholder = document.createElement('div');
        placeholder.textContent = 'No sliders available';
        element.replaceWith(placeholder);
        return;
    }

    // Extract dynamic data for table rows
    const sliderDetailsBlocks = Array.from(sliderContainers).map((container) => extractSliderDetails(container));

    // Example table format header defined as 'Columns'
    const headerRow = ['Columns'];

    // Define second table row with dynamic slider content extracted above
    const secondRow = sliderDetailsBlocks;

    // Define cells array for creating the block table
    const cells = [
        headerRow,
        secondRow
    ];

    // Create the table block using WebImporter.DOMUtils.createTable()
    const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the newly structured block
    element.replaceWith(tableBlock);
}