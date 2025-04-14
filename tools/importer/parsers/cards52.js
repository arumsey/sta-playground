/* global WebImporter */

export default function parse(element, { document }) {
    // Define the header row explicitly to match the example exactly
    const headerRow = ['Cards'];

    // Extract Cards Data
    const cardsData = [];

    element.querySelectorAll('.panel').forEach((panel) => {
        const imageDiv = panel.querySelector('.panel__image');
        const titleElement = panel.querySelector('h1, h2');
        const descriptionElement = panel.querySelector('p:not(.panel__kicker)');
        const ctaElement = panel.querySelector('.cta-btn, .panel__tags a');
        const newsList = panel.querySelector('.panel__news-list');

        const imageUrl = imageDiv ? imageDiv.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/)[1] : '';
        const title = titleElement ? titleElement.textContent.trim() : '';
        const description = descriptionElement ? descriptionElement.textContent.trim() : '';
        const cta = ctaElement ? ctaElement.textContent.trim() : '';

        const rowContent = [];

        // Add image to row
        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            rowContent.push(img);
        }

        // Add text content (title, description, CTA, news list if applicable)
        const textContent = document.createElement('div');
        if (title) {
            const titleEl = document.createElement('strong');
            titleEl.textContent = title;
            textContent.appendChild(titleEl);
        }
        if (description) {
            const descEl = document.createElement('p');
            descEl.textContent = description;
            textContent.appendChild(descEl);
        }
        if (cta) {
            const ctaEl = document.createElement('p');
            ctaEl.textContent = cta;
            textContent.appendChild(ctaEl);
        }
        if (newsList) {
            const listItems = [...newsList.querySelectorAll('li')].map((li) => {
                const link = li.querySelector('a');
                const time = li.querySelector('time');
                return `${time.textContent.trim()} - ${link.textContent.trim()}`;
            });

            const listEl = document.createElement('ul');
            listItems.forEach((item) => {
                const li = document.createElement('li');
                li.textContent = item;
                listEl.appendChild(li);
            });
            textContent.appendChild(listEl);
        }
        rowContent.push(textContent);

        // Avoid creating rows with empty content and remove duplicate entries
        if (rowContent.length > 0) {
            cardsData.push(rowContent);
        }
    });

    // Clean up 'Se flere nyheder' duplicate in 'PFA Nyheder'
    cardsData.forEach((row) => {
        const textContent = row[1];
        if (textContent) {
            const paragraphs = textContent.querySelectorAll('p');
            const uniqueParagraphs = Array.from(paragraphs).filter((p, index, self) =>
                self.findIndex((t) => t.textContent.trim() === p.textContent.trim()) === index
            );
            paragraphs.forEach((p) => p.remove()); // Remove originals
            uniqueParagraphs.forEach((p) => textContent.appendChild(p)); // Append filtered
        }
    });

    // Create Cards Table
    const cardsTable = WebImporter.DOMUtils.createTable([
        headerRow,
        ...cardsData
    ], document);

    // Replace original element with Cards Table
    element.replaceWith(cardsTable);
}