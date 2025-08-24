import { website_traffic_data } from '../data/sample.js';

class DashboardManagement {
    constructor() {
        this.trafficData = website_traffic_data;
        this.currentView = 'daily'; // 'daily', 'weekly', 'monthly', 'yearly'
        this.init();
    }

    init() {
        console.log('Dashboard Management initialized');
        this.setupEventListeners();
        this.renderTrafficChart();
        this.updateStatistics();
    }

    setupEventListeners() {
        // Time period buttons
        const dayBtn = document.querySelector('.time-period-btn[data-period="day"]');
        const weekBtn = document.querySelector('.time-period-btn[data-period="week"]');
        const monthBtn = document.querySelector('.time-period-btn[data-period="month"]');
        const yearBtn = document.querySelector('.time-period-btn[data-period="year"]');

        if (dayBtn) dayBtn.addEventListener('click', () => this.switchView('daily'));
        if (weekBtn) weekBtn.addEventListener('click', () => this.switchView('weekly'));
        if (monthBtn) monthBtn.addEventListener('click', () => this.switchView('monthly'));
        if (yearBtn) yearBtn.addEventListener('click', () => this.switchView('yearly'));
    }

    switchView(view) {
        this.currentView = view;
        this.updateActiveButton(view);
        this.renderTrafficChart();
    }

    updateActiveButton(activeView) {
        document.querySelectorAll('.time-period-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const viewMap = { 'daily': 'day', 'weekly': 'week', 'monthly': 'month', 'yearly': 'year' };
        const activeBtn = document.querySelector(`.time-period-btn[data-period="${viewMap[activeView]}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    renderTrafficChart() {
        let data, labels;
        
        switch(this.currentView) {
            case 'daily':
                // Generate 24 hours of data
                data = this.generateHourlyData();
                labels = Array.from({length: 24}, (_, i) => `${i}h`);
                break;
            case 'weekly':
                // Generate 7 days of data
                data = this.generateWeeklyData();
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                break;
            case 'monthly':
                // Generate 4 weeks of data
                data = this.generateMonthlyData();
                labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                break;
            case 'yearly':
                // Use monthly data as months of the year
                data = this.trafficData.monthly;
                labels = data.map(d => new Date(d.month + '-01').toLocaleDateString('en', { month: 'short' }));
                break;
        }

        this.updateChartDisplay(data, labels);
        this.updateTotalVisitors(data);
    }

    generateHourlyData() {
        // Generate realistic hourly traffic data
        const baseTraffic = 150;
        return Array.from({length: 24}, (_, hour) => {
            let multiplier = 1;
            if (hour >= 8 && hour <= 12) multiplier = 1.8; // Morning peak
            else if (hour >= 14 && hour <= 18) multiplier = 2.2; // Afternoon peak
            else if (hour >= 19 && hour <= 23) multiplier = 1.6; // Evening peak
            else if (hour >= 0 && hour <= 6) multiplier = 0.3; // Night low
            
            const visitors = Math.floor(baseTraffic * multiplier + Math.random() * 100);
            return { hour, visitors };
        });
    }

    generateWeeklyData() {
        // Generate daily data for a week
        const baseDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return baseDays.map((day, index) => {
            let multiplier = 1;
            if (index >= 4 && index <= 6) multiplier = 1.5; // Weekend boost
            const visitors = Math.floor(1200 * multiplier + Math.random() * 400);
            return { day, visitors };
        });
    }

    generateMonthlyData() {
        // Generate weekly data for a month
        return Array.from({length: 4}, (_, week) => {
            const visitors = Math.floor(8000 + Math.random() * 3000);
            return { week: week + 1, visitors };
        });
    }

    aggregateWeekly() {
        const weeklyData = {};
        this.trafficData.daily.forEach(day => {
            const date = new Date(day.date);
            const week = this.getWeekNumber(date);
            const key = `${date.getFullYear()}-W${week}`;
            
            if (!weeklyData[key]) {
                weeklyData[key] = { week: week, visitors: 0 };
            }
            weeklyData[key].visitors += day.visitors;
        });
        
        return Object.values(weeklyData);
    }

    aggregateYearly() {
        const yearlyData = {};
        this.trafficData.monthly.forEach(month => {
            const year = month.month.split('-')[0];
            if (!yearlyData[year]) {
                yearlyData[year] = { year: year, visitors: 0 };
            }
            yearlyData[year].visitors += month.visitors;
        });
        
        return Object.values(yearlyData);
    }

    getWeekNumber(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    updateChartDisplay(data, labels) {
        const chartContainer = document.querySelector('.chart-bars');
        if (!chartContainer) return;

        // báo cho CSS biết có bao nhiêu cột
        chartContainer.style.setProperty('--cols', data.length);

        chartContainer.innerHTML = '';

        const maxValue = Math.max(...data.map(d => d.visitors));

        data.forEach((item, index) => {
            const barHeight = (item.visitors / maxValue) * 100;

            const barContainer = document.createElement('div');
            barContainer.className = 'bar-container';

            barContainer.innerHTML = `
            <div class="bar-value">${this.formatNumber(item.visitors)}</div>
            <div class="bar" style="height:${barHeight}%"></div>
            <div class="bar-label">${labels[index]}</div>
            `;

            chartContainer.appendChild(barContainer);
        });
    }

    updateTotalVisitors(data) {
        const total = data.reduce((sum, item) => sum + item.visitors, 0);
        const totalElement = document.querySelector('.total-visitors');
        if (totalElement) {
            totalElement.textContent = this.formatNumber(total);
        }
    }

    updateStatistics() {
        // Calculate real statistics from data
        const totalVisitors = this.trafficData.monthly.reduce((sum, month) => sum + month.visitors, 0);
        const currentMonthVisitors = this.trafficData.monthly[this.trafficData.monthly.length - 1].visitors;
        
        // Update dashboard statistics
        const statNumbers = document.querySelectorAll('.statistic .number');
        if (statNumbers.length >= 4) {
            statNumbers[0].textContent = this.formatNumber(totalVisitors);
            statNumbers[1].textContent = this.formatNumber(currentMonthVisitors);
            // Keep games and tournaments as they are for now
        }
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Method to search traffic data
    searchTrafficByDate(startDate, endDate) {
        return this.trafficData.daily.filter(day => {
            const date = new Date(day.date);
            return date >= new Date(startDate) && date <= new Date(endDate);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DashboardManagement();
});

export default DashboardManagement;
