// Component loader utility
class ComponentLoader {
    static async loadComponent(elementSelector, componentPath, baseURL = '') {
        try {
            const response = await fetch(baseURL + componentPath);
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            const html = await response.text();
            
            const element = document.querySelector(elementSelector);
            if (element) {
                element.innerHTML = html;
                console.log(`✓ Component loaded: ${componentPath}`);
                return true;
            }
            throw new Error(`Element not found: ${elementSelector}`);
        } catch (error) {
            console.error(`✗ Failed to load ${componentPath}:`, error);
            const element = document.querySelector(elementSelector);
            if (element) {
                element.innerHTML = `<div style="color:red;">Failed to load ${componentPath}</div>`;
            }
            return false;
        }
    }
    
    static async loadMultipleComponents(components, baseURL = '') {
        const promises = components.map(({selector, path}) => 
            this.loadComponent(selector, path, baseURL)
        );
        
        try {
            const results = await Promise.all(promises);
            console.log('All components loaded:', results.every(r => r));
            return results.every(r => r);
        } catch (error) {
            console.error('Error loading components:', error);
            return false;
        }
    }
}

// Usage for index.html
if (typeof window !== 'undefined') {
    window.ComponentLoader = ComponentLoader;
}
